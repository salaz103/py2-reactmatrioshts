import entorno from "../entorno/entorno";
import { tipo_dato } from "../entorno/tipo";
import expresion from "../expresiones/expresion";
import instruccion from "./instruccion";
import {almacen} from '../../../src/app';
import {errores} from '../../actions/ts.js';
import { generacion } from "../helpers/generacion";
import { traduccionexp } from "../expresiones/traduccionexp";


export class llamarfuncion implements instruccion{

    nombrefuncion:string;
    parametros:expresion[];
    tipo:tipo_dato;
    linea:number;
    columna:number;

    constructor(nombre:string,parametros:expresion[],linea:number,columna:number){
        this.nombrefuncion=nombre;
        this.parametros=parametros;
        this.linea=linea;
        this.columna=columna;
    }
    
    traducir(ambito: entorno) {
        const generador= generacion.getGenerador();
        //CUANDO SE LLAMA A UNA FUNCION, LO PRIMERO ES VERIFICAR SI EXISTE DICHA FUNCION
        let funcion= ambito.existeFuncion(this.nombrefuncion.toLowerCase());


        if(funcion){
            const parametros= new Array<traduccionexp>();
            const tamaño_ambito_temporal= generador.guardarTemporales(ambito);

            //VERIFICAR SI TRAE PARAMETROS PARA GUARDARLOS
            if(this.parametros!=null){
                this.parametros.forEach(parametro => {
                    let retorno_parametro:traduccionexp= parametro.traducir(ambito);
                    parametros.push(retorno_parametro);
               });
            }

            

            const temp_parametro= generador.generarTemporal();
            generador.sacarTemporal(temp_parametro);

            //COMENZAMOS A GUARDAR LOS PARAMETROS PARA QUE YA SOLO LOS LEAMOS CUANDO ESTEMOS EN LA FUNCION
            //COMIENZA EL PASO DE PARAMETROS A LA FUNCION
            if(parametros.length>0){
                generador.agregarComentarios("INICIO- Paso de parametros");
                generador.agregarExpresion(temp_parametro,"p","+",ambito.tamaño+1);
                parametros.forEach((parametro,indice) => {
                    generador.stack(temp_parametro,parametro.obtenerValor());
                    //VAMOS A UTILIZAR EL MISMO TEMPORAL SI HAY MÁS PARAMETROS QUE PASAR 
                    if(indice!= parametros.length-1){
                        generador.agregarExpresion(temp_parametro,temp_parametro,"+","1");
                    }
                });
                generador.agregarComentarios("FIN- Paso de parametros");
            }

            //AHORA MOVEMOS EL PUNTERO DEL STACK "P" AL INICIO DEL NUEVO AMBITO
            generador.moverAmbito(ambito.tamaño);
            generador.agregarComentarios("LLAMADA A FUNCION");
            generador.agregarcodigo3d(this.nombrefuncion+"();");
            //AHORA OBTENEMOS EL VALOR DEL RETURN
            generador.getValorStack(temp_parametro,"p");
            //Y NOS TENEMOS QUE REGRESAR AL AMBITO ANTERIOR
            generador.regresarAmbito(ambito.tamaño);
            //RECUPERAMOS LOS TEMPORALES SI FUERA NECESARIO
            generador.recuperarTemporales(ambito,tamaño_ambito_temporal);
            //VOLVEMOS A AGREGAR EL TEMP_PARAMETRO AL STORE DE TEMPORALES POR QUE ESE TIENE EL VALOR DEL RETURN
            generador.agregarTemporal(temp_parametro);

            if(funcion.tipodato==tipo_dato.BOOLEAN){

                //PENDIENTE -- REVISAR

            }else{
                let ret= new traduccionexp(temp_parametro,true,tipo_dato.UNDEFINED,false);
                if(funcion.tipodato==tipo_dato.NUMBER){
                    ret.tipodato=tipo_dato.ENTERO;
                    return ret
                }else{
                    ret.tipodato=funcion.tipodato;
                    return ret;
                }
            }


        }else{
            //ERROR - LA FUNCION NO EXISTE
            almacen.dispatch(errores({
                tipo:'SEMANTICO',
                descripcion:'FUNCION: '+this.nombrefuncion+ ' NO EXISTE',
                ambito:ambito.nombre,
                linea:this.linea,
                columna:this.columna
            }));
            return new traduccionexp("",false,tipo_dato.UNDEFINED,false);
        }

    }

}
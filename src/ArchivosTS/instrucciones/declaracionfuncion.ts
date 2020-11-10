import entorno from "../entorno/entorno";
import { tipo_ambito, tipo_dato } from "../entorno/tipo";
import instruccion from "./instruccion";
import { parametro } from "./parametro";
import {almacen} from '../../../src/app';
import {errores} from '../../actions/ts.js';
import { generacion } from "../helpers/generacion";

export class declaracionfuncion implements instruccion{

    nombre:string;
    parametros:parametro[];
    tipodato:tipo_dato;
    listainstrucciones:instruccion[];
    linea:number;
    columna:number;

    constructor(nombre:string, parametros:parametro[],tipodato:tipo_dato,lista:instruccion[],linea:number,columna:number){
        this.nombre=nombre;
        this.parametros=parametros;
        this.tipodato=tipodato;
        this.listainstrucciones=lista
        this.linea=linea;
        this.columna=columna;
    }


    traducir(ambito: entorno) {

        const generador= generacion.getGenerador();

        //PRIMERO BUSCAR SI LA FUNCION YA EXISTE
        let funcion= ambito.existeFuncionReal(this.nombre);

        if(!funcion){
            almacen.dispatch(errores({
                tipo:'SEMANTICO',
                descripcion:'FUNCION CON NOMBRE REPETIDO: '+this.nombre,
                ambito:ambito.nombre,
                linea:this.linea,
                columna:this.columna
            }));
        }else{
            //SI NO EXISTE LA FUNCION, PODEMOS INICIAR A TRADUCIRLA
            console.log("INICIA LA TRADUCCION DE LA FUNCION: "+ this.nombre);

            //PENDIENTE
            //PRIMERO VALIDAR PARAMETROS
            //SEGUNDO VALIDAR TYPE SI ES UN TYPE

            //UNA VEZ PASA LAS VALIDACIONES, GUARDAMOS LA FUNCION
            ambito.agregarFuncion(this);

            //COMENZAMOS LA TRADUCCION
            const ambito_funcion= new entorno(this.nombre,tipo_ambito.LOCAL,ambito);
            const etiqueta_return= generador.generarEtiqueta();
            //AQUI VAMOS A GUARDAR EL "ESTADO" DE LOS TEMPORALES QUE PODAMOS TENER NO USADOS
            const storetemporales= generador.getStoreTemporales();
            //VAMOS A SETEAR AL ENTORNO LA FUNCION
            ambito_funcion.setearFuncion(this,etiqueta_return);
            //AHORA TOCA RECORRER LOS PARAMETROS Y AGREGARLOS AL AMBITO
            if(this.parametros!=null){

                this.parametros.forEach(parametro => {

                    if(parametro.tipodato==tipo_dato.NUMBER){
                        ambito_funcion.agregarSimbolo(parametro.id,tipo_dato.ENTERO,ambito_funcion.nombre,parametro.linea,parametro.columna,false);
                    }else{
                        ambito_funcion.agregarSimbolo(parametro.id,parametro.tipodato,ambito_funcion.nombre,parametro.linea,parametro.columna,false);
                    }
    
                });

            }

            
            //AHORA LIMPIAMOS EL STORE DE LOS TEMPORALES
            generador.limpiarStoreTemporales();
            generador.agregarcodigo3d(this.nombre+"(){");
            for (let i = 0; i < this.listainstrucciones.length; i++) {  
                try {
                    let retorno_ins = this.listainstrucciones[i].traducir(ambito_funcion);
                } catch (error) {
                    console.log(error);
                }
            }
            generador.agregarEtiqueta(etiqueta_return);
            generador.agregarcodigo3d("return ;");
            generador.agregarcodigo3d("}");
            //RESTAURAMOS LOS TEMPORALES QUE SE GUARDARON
            generador.restaurarTemporales(storetemporales);

        }


    }

}
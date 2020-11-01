import entorno from "../entorno/entorno";
import { tipo_dato } from "../entorno/tipo";
import expresion from "../expresiones/expresion";
import { traduccionexp } from "../expresiones/traduccionexp";
import { generacion } from "../helpers/generacion";
import instruccion from "./instruccion";
import {almacen} from '../../../src/app';
import {errores} from '../../actions/ts.js';

export class imprimir implements instruccion{

    linea:number;
    columna:number;
    expresion:expresion;

    constructor(exp:expresion,linea:number,columna:number){
        this.expresion=exp;
        this.linea=linea;
        this.columna=columna;
    }
    traducir(ambito: entorno) {
        const retornoexpresion:traduccionexp= this.expresion.traducir(ambito);
        const generador= generacion.getGenerador();
        //SEGUN EL ANEXO SOLO SE VAN A IMPRIMIR VALORES DE TIPO DE DATO:
        //1. STRING
        //2. BOOLEAN
        //3. NUMBER
        if(retornoexpresion.tipodato==tipo_dato.ENTERO){
            generador.printf("d","int",retornoexpresion.obtenerValor());
        }else if(retornoexpresion.tipodato==tipo_dato.DECIMAL){
            generador.printf("f","float",retornoexpresion.obtenerValor());
        }else if(retornoexpresion.tipodato==tipo_dato.BOOLEAN){
         
                let etiqueta_salida= generador.generarEtiqueta();
                let tmp_valorboolean= generador.generarTemporal();
                generador.sacarTemporal(tmp_valorboolean);
                generador.agregarEtiqueta(retornoexpresion.etiquetastrue);
                generador.agregarExpresion(tmp_valorboolean,"1","","");
                generador.printf("d","int",tmp_valorboolean);
                generador.agregarGoTo(etiqueta_salida);
                generador.agregarEtiqueta(retornoexpresion.etiquetasfalse);
                generador.agregarExpresion(tmp_valorboolean,"0","","");
                generador.printf("d","int",tmp_valorboolean);
                generador.agregarEtiqueta(etiqueta_salida);

        }else if(retornoexpresion.tipodato==tipo_dato.STRING){

        }else if(retornoexpresion.tipodato==tipo_dato.NUMBER){
            generador.printf("d","int",retornoexpresion.obtenerValor());
        }else{
            almacen.dispatch(errores({
                tipo:'SEMANTICO',
                descripcion:'NO SE PUEDE IMPRIMIR EL TIPO DE DATO:' +retornoexpresion.tipodato,
                ambito:ambito.nombre,
                linea:this.linea,
                columna:this.columna
            }));
        }
    }

   
    
}
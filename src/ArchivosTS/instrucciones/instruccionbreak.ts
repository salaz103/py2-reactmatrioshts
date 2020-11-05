import entorno from "../entorno/entorno";
import instruccion from "./instruccion";
import {almacen} from '../../../src/app';
import {errores} from '../../actions/ts.js';
import { generacion } from "../helpers/generacion";

export class instruccionbreak implements instruccion{

    linea:number;
    columna:number;

    constructor(linea:number,columna:number){
        this.linea=linea;
        this.columna=columna;
    }


    traducir(ambito: entorno) {
        //PARA QUE COMIENCE LA TRADUCCION DEBEMOS PREGUNTAR SI EL AMBITO DONDE ESTAMOS TIENE
        // UNA ETIQUETA DE BREAK, SERA NUESTRO "DISPLAY"
        const generador= generacion.getGenerador();
        if(ambito.etq_break!=null){
            //SI ES DIFERENTE DE NULO, SIGNIFICA QUE SI TRAE UNA ETIQUETA Y PODEMOS TRADUCIR ESTE BREAK 
            generador.agregarGoTo(ambito.etq_break);
        }else{
            //ERROR, BREAK NO VIENE EN UN CICLO
            almacen.dispatch(errores({
                tipo:'SEMANTICO',
                descripcion:'BREAK NO VIENE EN UN CICLO Ó SWITCH',
                ambito:ambito.nombre,
                linea:this.linea,
                columna:this.columna
            }));
        }
    }
    
}
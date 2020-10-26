import {almacen} from '../../../src/app';
import {aumentartemporales,aumentaretiquetas,aumentarheap,aumentarstack} from '../../actions/ts';
import { error } from '../entorno/error';
import { listaerrores } from '../entorno/listaerrores';
import { generacion } from './generacion';
import {errores} from '../../actions/ts.js';

export function generartmp():string{

    //PARA GENERAR EL TMP PRIMERO VAMOS A LA "STORE" A INCREMENTAR EL CONTADOR DE LOS TMP
    almacen.dispatch(aumentartemporales());
    //UNA VEZ YA ESTE EL TEMPORAL AUMENTADO, PODEMOS IR A TRAERLO PARA USARLO
    let temporal:string= "t"+almacen.getState().storecodigo.contadortemporales;
    
    return temporal;
}

export function agregarErrores_L_S(){
    let lista= listaerrores.obtenerLista().getLista();
    lista.forEach((element:error) => {
        almacen.dispatch(errores({
            tipo:element.tipo,
            descripcion:element.valor,
            ambito:"",
            linea: element.linea,
            columna: element.columna
        }));
    });
}


export function generaretiqueta():string{

    //PARA GENERAR LA ETIQUETA PRIMERO VAMOS A LA "STORE" A INCREMENTAR EL CONTADOR DE LAS ETQ
    almacen.dispatch(aumentaretiquetas());
    //UNA VEZ YA ESTE LA ETIQUETA AUMENTADA, PODEMOS IR A TRAERLA PARA USARLA
    let etiqueta:string= "L"+almacen.getState().storecodigo.contadoretiquetas;
    
    return etiqueta;
}




export function codigo3dfinal():string{

    const codigofinal:string = generacion.getGenerador().getCodigoFinal();
    return codigofinal;

}

export function limpiarTodo(){
    generacion.getGenerador().limpiarTodo();
}
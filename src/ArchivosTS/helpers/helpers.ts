import {almacen} from '../../../src/app';
import {aumentartemporales,aumentaretiquetas,aumentarheap,aumentarstack} from '../../actions/ts';

export function generartmp():string{

    //PARA GENERAR EL TMP PRIMERO VAMOS A LA "STORE" A INCREMENTAR EL CONTADOR DE LOS TMP
    almacen.dispatch(aumentartemporales());
    //UNA VEZ YA ESTE EL TEMPORAL AUMENTADO, PODEMOS IR A TRAERLO PARA USARLO
    let temporal:string= "t"+almacen.getState().storecodigo.contadortemporales;
    
    return temporal;
}


export function generaretiqueta():string{

    //PARA GENERAR LA ETIQUETA PRIMERO VAMOS A LA "STORE" A INCREMENTAR EL CONTADOR DE LAS ETQ
    almacen.dispatch(aumentaretiquetas());
    //UNA VEZ YA ESTE LA ETIQUETA AUMENTADA, PODEMOS IR A TRAERLA PARA USARLA
    let etiqueta:string= "L"+almacen.getState().storecodigo.contadoretiquetas;
    
    return etiqueta;
}

export function listaTemporales():string{
    //EN ESTA FUNCIÓN SE GENERARA LA LISTA DE TEMPORALES, IREMOS A LA "STORE" A TRAER EL # DE TEMPORALES 
    //UTILIZADOS
    let cantidad:number= almacen.getState().storecodigo.contadortemporales;
    let lista="float ";
    if(cantidad!=-1){
        //SI LA CANTIDAD ES DIFERENTE DE -1 ENTONCES SIGNIFICA QUE SI HAY TEMPORALES
        for (let i = 0; i <= cantidad; i++) {
            
            if(i==cantidad){
                lista+= "t"+i+"; \n"
            }else{
                lista+= "t"+i+","
            }
            
        }
    }

    return lista;
}


export function getPosicionLibreHeap():number{

    almacen.dispatch(aumentarheap());
    let pos:number= almacen.getState().storecodigo.heap;
    return pos;

}

export function codigo3dfinal():string{

    //EL CODIGO SE DEBE ARMAR
    //ENCABEZADO
    //LISTA TEMPORALES
    //VOID MAIN(){ CODIGO3D  RETURN; }

    let codigo3dfinal="";

    let encabezado:string= almacen.getState().storecodigo.encabezado;
    let listatmp= listaTemporales();
    let c3d:string= almacen.getState().storecodigo.codigo3d;
    codigo3dfinal= encabezado + listatmp + "void main(){\n"+ c3d + "return; \n}";

    return codigo3dfinal;
}
import { declaracion } from '../instrucciones/declaracion';
import { declaracionfuncion } from '../instrucciones/declaracionfuncion';
import { funcion } from './funcion';
import simbolo from './simbolo';
import {tipo_valor} from './tipo';

class entorno{

    apuntadorPadre:entorno;
    //ts:simbolo[];
    tablasimbolos: Map<String,simbolo>
    nombre:string;
    //tablafunciones:declaracionfuncion[];
    tablaf: Map<String,declaracionfuncion>

    constructor(nombre:string,ambitoPadre?:entorno){
        this.apuntadorPadre = ambitoPadre != null ? ambitoPadre : null;
        //this.ts=[];
        //this.tablafunciones=[];
        this.nombre= nombre;
        this.tablasimbolos= new Map();
        this.tablaf= new Map();
    }

    agregarSimbolo(nuevoSimbolo:simbolo){
        //this.ts.push(nuevoSimbolo)
        this.tablasimbolos.set(nuevoSimbolo.getId(),nuevoSimbolo);
    }

    agregarFuncion(funcion:declaracionfuncion){
        //this.tablafunciones.push(funcion);
        this.tablaf.set(funcion.nombre,funcion);
    }

    asignarValor(id:string,valor:object,tipo:tipo_valor){

        /*for(let entornoactual:entorno = this; entornoactual!=null ; entornoactual=entornoactual.apuntadorPadre){
            for (let i = 0; i < entornoactual.ts.length; i++) {
                if(entornoactual.ts[i].getId()==id){
                    entornoactual.ts[i].setTipo(tipo);
                    entornoactual.ts[i].setValor(valor);
                    return;
                 }
            }
         }*/

        //PRIMERO SE RECORREN LOS ENTORNOS
         for(let entornoactual:entorno= this; entornoactual!=null; entornoactual= entornoactual.apuntadorPadre){
             let simbolo= entornoactual.tablasimbolos.get(id);
             if(simbolo!=null){
                simbolo.setTipo(tipo);
                simbolo.setValor(valor);
                entornoactual.tablasimbolos.set(id,simbolo);
             }

         }

    }

    getEntornoGlobal(){
        for (let e:entorno = this; e!=null; e= e.apuntadorPadre) {
            if(e.apuntadorPadre==null){
                return e
            }
        }
    }

    existe(id:string):boolean{

        /*
        //RECORRIENDO LOS ENTORNOS
        for (let entornoactual:entorno = this; entornoactual!=null ; entornoactual=entornoactual.apuntadorPadre) {
            console.log("RECORRIENDO AMBITOS: ");
            console.log(entornoactual);

            //RECORRIENDO LA TABLA DE SIMBOLOS DEL ENTORNO ACTUAL
            for (let i = 0; i <entornoactual.ts.length; i++) {
                if(entornoactual.ts[i].getId()==id){
                    return true;
                }
            }
        } 

        //SI REGRESA FALSE ES POR QUE NO ENCONTRO EL ID EN NINGUN AMBITO
        return false;*/

        for (let entornoactual:entorno = this; entornoactual!=null ; entornoactual=entornoactual.apuntadorPadre) {
            let simbolo= entornoactual.tablasimbolos.get(id);
            if(simbolo!=null){
                return true;
            }
        }
        return false;
    }

    existeLocal(id:string):boolean{
       /*
        //RECORRIENDO LA TABLA DE SIMBOLOS DEL ENTORNO ACTUAL
        for (let i = 0; i <this.ts.length; i++) {
            if(this.ts[i].getId()==id){
                return true;
            }
        }*/

        let simbolo= this.tablasimbolos.get(id);
        if(simbolo!=null){
            return true;
        }

        return false;
    }

    
    getSimbolo(id:string):simbolo{

         /*for(let entornoactual:entorno = this; entornoactual!=null ; entornoactual=entornoactual.apuntadorPadre){
            for (let i = 0; i < entornoactual.ts.length; i++) {
                if(entornoactual.ts[i].getId()==id){
                    return entornoactual.ts[i];
                 }
            }
         }*/
    
         for(let entornoactual:entorno = this; entornoactual!=null ; entornoactual=entornoactual.apuntadorPadre){
             let simbolo= entornoactual.tablasimbolos.get(id);
             if(simbolo!=null){
                return simbolo;
             }
         }
    
    }


    existeFuncion(id:string):declaracionfuncion{

       /*
        //RECORRIENDO LOS ENTORNOS
        for (let entornoactual:entorno = this; entornoactual!=null ; entornoactual=entornoactual.apuntadorPadre) {
            console.log("RECORRIENDO AMBITOS PARA BUSCAR FUNCION: ");
            console.log(entornoactual);

            //RECORRIENDO LA TABLA DE FUNCIONES DEL ENTORNO ACTUAL
            for (let i = 0; i <entornoactual.tablafunciones.length; i++) {
                if(entornoactual.tablafunciones[i].nombre ==id){
                    //AQUI REGRESO LA DECLARACION DE FUNCION {function(...){..}}
                    return entornoactual.tablafunciones[i];
                }
            }
        } 

        //SI REGRESA NULL ES POR QUE NO ENCONTRO LA FUNCION
        return null;*/
    
        for (let entornoactual:entorno = this; entornoactual!=null ; entornoactual=entornoactual.apuntadorPadre){
            let funcion= entornoactual.tablaf.get(id);
            if(funcion!=null){
                return funcion;
            }
        }

        return null;

    }

}


export default entorno;
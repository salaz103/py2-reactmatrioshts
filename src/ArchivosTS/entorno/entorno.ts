import { declaracionfuncion } from '../instrucciones/declaracionfuncion';
import simbolo from './simbolo';
import {tipo_ambito, tipo_valor} from './tipo';

class entorno{

    apuntadorPadre:entorno;
    tablasimbolos: Map<String,simbolo>
    nombre:string;
    tipoambito:tipo_ambito;
    tablaf: Map<String,declaracionfuncion>

    constructor(nombre:string,tipoambito:tipo_ambito,ambitoPadre?:entorno){
        this.nombre= nombre;
        this.apuntadorPadre = ambitoPadre != null ? ambitoPadre : null;
        this.tablasimbolos= new Map();
        this.tablaf= new Map();
        this.tipoambito=tipoambito;
    }

    agregarSimbolo(nuevoSimbolo:simbolo){
        this.tablasimbolos.set(nuevoSimbolo.getNombre(),nuevoSimbolo);
    }

    agregarFuncion(funcion:declaracionfuncion){
        //this.tablaf.set(funcion.nombre,funcion);
    }

    asignarValor(id:string,valor:object,tipo:tipo_valor){


    }

   

    existe(id:string):boolean{
        return false;
    }   

    existeLocal(id:string):boolean{

        let simbolo= this.tablasimbolos.get(id);
        if(simbolo!=null){
            return true;
        }

        return false;
    }

    
    getSimbolo(id:string):simbolo{
    
         for(let entornoactual:entorno = this; entornoactual!=null ; entornoactual=entornoactual.apuntadorPadre){
             let simbolo= entornoactual.tablasimbolos.get(id);
             if(simbolo!=null){
                return simbolo;
             }
         }
    
    }


    existeFuncion(id:string):declaracionfuncion{

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

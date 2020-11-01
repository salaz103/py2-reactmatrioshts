import { declaracionfuncion } from '../instrucciones/declaracionfuncion';
import simbolo from './simbolo';
import {tipo_ambito, tipo_dato} from './tipo';

class entorno{

    apuntadorPadre:entorno;
    tablasimbolos: Map<String,simbolo>
    nombre:string;
    tipoambito:tipo_ambito;
    tablaf: Map<String,declaracionfuncion>
    tamaño:number;
    funcionActual: declaracionfuncion;
    etq_retorno:string;

    constructor(nombre:string,tipoambito:tipo_ambito,ambitoPadre?:entorno){
        this.nombre= nombre;
        this.apuntadorPadre = ambitoPadre != null ? ambitoPadre : null;
        this.tablasimbolos= new Map();
        this.tablaf= new Map();
        this.tipoambito=tipoambito;
        this.tamaño= ambitoPadre!=null? ambitoPadre.tamaño:0;
        this.funcionActual= ambitoPadre!=null? ambitoPadre.funcionActual: null;
        this.etq_retorno= ambitoPadre!=null? ambitoPadre.etq_retorno:null;
    }

    agregarSimbolo(id:string,tipodato:tipo_dato,nombreambito:string,fila:number,columna:number,reasignable:boolean){
        const nuevosim= new simbolo(id,tipodato,nombreambito,fila,columna,this.apuntadorPadre==null,reasignable,this.tamaño++);
        this.tablasimbolos.set(id,nuevosim);
        return nuevosim;
    }

    agregarFuncion(funcion:declaracionfuncion){
        //this.tablaf.set(funcion.nombre,funcion);
        this.tablaf.set(funcion.nombre.toLowerCase(),funcion);
    }

    asignarValor(id:string,valor:object,tipo:tipo_dato){


    }

    setearFuncion(funcion:declaracionfuncion, etiqueta_retorno:string){
        //SI SE ENTRA A ESTE METODO, ES POR QUE ESTAMOS SETEANDO UNA FUNCION AL AMBITO (LOCAL)
        //SE COLOCA TAMAÑO 1, DEBIDO A QUE SI ES UNA FUNCION PUEDE TENER UN RETURN
        //POR LO QUE LA POS 0 ESTA RESERVADA
        this.tamaño=1;
        this.etq_retorno= etiqueta_retorno;
        this.funcionActual= funcion;
    }

   

    existe(id:string):boolean{
        for (let entornoactual:entorno = this; entornoactual!=null ; entornoactual=entornoactual.apuntadorPadre) {
            let simbolo= entornoactual.tablasimbolos.get(id);
            if(simbolo!=null){
                return true;
            }
        }
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

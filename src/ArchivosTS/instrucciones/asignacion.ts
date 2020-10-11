import entorno from "../entorno/entorno";
import { simbolo } from "../entorno/simbolo";
import expresion from "../expresiones/expresion";
import instruccion from "./instruccion";
import {almacen} from '../../../src/app';
import {errores} from '../../actions/ts.js';

export class asignacion implements instruccion{

    id:string;
    expresion:expresion;

    constructor(id:string, ex:expresion){
        this.id=id;
        this.expresion=ex;
    }

    ejecutar(ambito: entorno): object {
        //1. RECORRER LOS AMBITOS PARA VER SI EXISTE EL ID
        let sim:simbolo;
        if(ambito.existe(this.id)){
            sim=ambito.getSimbolo(this.id);
        }

    //2. OPERACIONES DESPUES DE HABER BUSCADO EL ID PARA ACTUALIZAR
    if(sim){

        if(sim.reasignable==true){
            //SIGNIFICA QUE ES UNA VARIABLE LET
            //PRIMERO HAY QUE VALIDAR SI TRAE UN TIPO DE DATO
            if(sim.getTipo()){
                //SI TRAE UN TIPO, HAY QUE VALIDAR QUE EL TIPO DE LA EXPRESION, SEA IGUAL AL QUE TIENE
                //Y ASI PODER SETEAR LA NUEVA ASIGNACION
                //PARA PODER SABER QUE TIPO DE VALOR ES, HAY QUE EJECUTAR PRIMERO ESA EXPRESION
                const valorexpresion= this.expresion.obtenerValor(ambito);
                //AHORA QUE YA SE EJECUTO YA PODEMOS VER QUE TIPO DE VALOR ES
                const tipovalor= this.expresion.obtenerTipo(ambito);

                if(sim.getTipo()==tipovalor){
                    ambito.asignarValor(this.id,valorexpresion,sim.getTipo());
                }else{
                    almacen.dispatch(errores({
                        tipo:'SEMANTICO',
                        descripcion:'EL TIPO DE LA VARIABLE '+ sim.getId()+' NO ES IGUAL AL TIPO DEL VALOR',
                        ambito:ambito.nombre
                    }));
                    console.log("ERROR - EL TIPO DE LA VARIABLE "+sim.getId()+" NO ES IGUAL AL TIPO DEL VALOR");
                }

            }else{
                //SI NO TRAE UN TIPO DE VALOR, HAY QUE SACAR EL TIPO DE VALOR DE LA EXPRESION Y ASIGNARSELO
                //A LA VARIABLE
                //PARA SABER EL TIPO DE VALOR DE LA EXPRESION, TENEMOS QUE EJECUTARLA
                const valor= this.expresion.obtenerValor(ambito);
                const tipo= this.expresion.obtenerTipo(ambito);
                ambito.asignarValor(this.id,valor,tipo);
            }

        }else{
            //SIGNIFCA QUE ES UNA VARIABLE CONST Y ESTAS NO SE PUEDEN REASIGNAR
            almacen.dispatch(errores({
                tipo:'SEMANTICO',
                descripcion:'VARIABLE CONST '+ sim.getId()+' NO SE PUEDE REASIGNAR',
                ambito:ambito.nombre
            }));
            console.log("ERROR - VARIABLE CONST: "+sim.getId()+" NO SE PUEDE REASIGNAR");
        }


    }else{
        almacen.dispatch(errores({
            tipo:'SEMANTICO',
            descripcion:'VARIABLE '+this.id+' NO PUEDE SER ASIGNADA POR QUE NO EXISTE',
            ambito:ambito.nombre
        }));
        console.log("ERROR- VARIABLE: "+this.id+" NO PUEDE SER ASIGNADA POR QUE NO EXISTE");
    }
        return null;
    }
    
}
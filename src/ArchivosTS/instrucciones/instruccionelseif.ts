import entorno from "../entorno/entorno";
import { tipo_instruccion, tipo_valor } from "../entorno/tipo";
import expresion from "../expresiones/expresion";
import instruccion from "./instruccion";
import {almacen} from '../../../src/app';
import {errores} from '../../actions/ts.js';
import { instruccionbreak } from "./instruccionBreak";
import { instruccioncontinue } from "./instruccioncontinue";
import { instruccionreturn } from "./instruccionreturn";

export class instruccionelseif implements instruccion{

    condicion:expresion;
    listainstrucciones:instruccion[];
    instruccionelseif:instruccion;

    constructor(cond:expresion,lista:instruccion[],instr:instruccion){
        this.condicion=cond;
        this.listainstrucciones=lista;
        this.instruccionelseif=instr;
    }


    ejecutar(ambito: entorno): object {
        
        //ANTES DE REVISAR SI LAS CONDICIONES SON BOOLEANAS 
        //TENGO QUE REVISAR SI LA INSTRUCCIONELSEIF VIENE "UNDEFINED" Ó NO
        //1. SI VIENE "UNDEFINED" ES POR QUE NO TRAE UN ELSE
        //2. SI NO ES POR QUE TRAE UN ELSE
        if(this.instruccionelseif==undefined){

            //AQUI COMIENZA LA EVALUACION INICIAL
            const valorcondicion= this.condicion.obtenerValor(ambito);
            const tipocondicion= this.condicion.obtenerTipo(ambito);
            if(tipocondicion==tipo_valor.BOOLEAN){
                let valorc= valorcondicion as Boolean;
                //SI ES BOOLEAN LA CONDICION ENTONCES SI SE PUEDE EJECUTAR
                //EVALUO LA CONDICION QUE TRAE EL ELSE IF
                //SI NO SE CUMPLE ENTONCES YA NO HAGO NADA POR QUE ESTOY EN EL PRIMER CASO
                //DONDE NO TRAE UN ELSE
                if(valorc.valueOf()){
                    const tselseif= new entorno("ELSE-IF",ambito);
                    for (let i = 0; i < this.listainstrucciones.length; i++) {
                        let valori= this.listainstrucciones[i].ejecutar(tselseif); 
                        
                        if(valori instanceof instruccionbreak || valori instanceof instruccioncontinue || valori instanceof instruccionreturn){
                            return valori;
                        }
                        /*if(valori && valori.valueOf()==tipo_instruccion.BREAK){
                            return valori;
                        }else if(valori && valori.valueOf()==tipo_instruccion.CONTINUE){
                            return valori;
                        }else if(valori!=null){
                            return valori;
                        }*/
                    }
                }



            }else{
                //ERROR SEMANTICO EN EL IF-ELSE, LA CONDICION NO ES BOOLEANA
                almacen.dispatch(errores({
                    tipo:'SEMANTICO',
                    descripcion:'CONDICION EN IF-ELSE NO ES BOOLEANA',
                    ambito:ambito.nombre
                }));
            }


        }else{
            //SIGNIFICA QUE ESTA INSTRUCCION ELSE IF() VIENE CON UN ELSE

            //AQUI COMIENZA LA EVALUACION INICIAL
            const valorcondicion= this.condicion.obtenerValor(ambito);
            const tipocondicion= this.condicion.obtenerTipo(ambito);
            if(tipocondicion==tipo_valor.BOOLEAN){
                let valorc= valorcondicion as Boolean;
                //SI ES BOOLEAN LA CONDICION ENTONCES SI SE PUEDE EJECUTAR
                //EVALUO LA CONDICION QUE TRAE EL ELSE IF
                //SI NO SE CUMPLE ENTONCES AQUI SI TENGO QUE IR A EJECUTAR AL ELSE 
                if(valorc.valueOf()){
                    const tselseif= new entorno("ELSE-IF",ambito);
                    for (let i = 0; i < this.listainstrucciones.length; i++) {
                        let valori=this.listainstrucciones[i].ejecutar(tselseif);
                        
                        if(valori && valori.valueOf()==tipo_instruccion.BREAK){
                            return valori;
                        }else if(valori && valori.valueOf()==tipo_instruccion.CONTINUE){
                            return valori;
                        }else if(valori!=null){
                            return valori;
                        }
                    }
                }else{
                    //AQUI ESTOY EJECUTANDO AL ELSE
                     return this.instruccionelseif.ejecutar(ambito);
                }



            }else{
                //ERROR SEMANTICO EN EL IF-ELSE, LA CONDICION NO ES BOOLEANA
                almacen.dispatch(errores({
                    tipo:'SEMANTICO',
                    descripcion:'CONDICION EN IF-ELSE NO ES BOOLEANA',
                    ambito:ambito.nombre
                }));
            }


        }


        return null;
    }
    
}
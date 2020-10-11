import entorno from "../entorno/entorno";
import simbolo from "../entorno/simbolo";
import { operador, tipo_valor } from "../entorno/tipo";
import instruccion from "./instruccion";
import {almacen} from '../../../src/app';
import {errores} from '../../actions/ts.js';

export class incremento_decremento implements instruccion{

    id:string;
    tipooperador:operador;

    constructor(id:string, op:operador){
        this.id=id;
        this.tipooperador=op;
    }


    obtenerValor(ambito:entorno):object{
        //CUANDO VIENE COMO UNA EXPRESION, FUNCIONA COMO UN IDENTIFICADOR
        //PERO PRIMERO HAY QUE BUSCAR EL ID Y DEVOLVER SU VALOR

        //LO PRIMERO QUE HAY QUE HACER ES BUSCAR EL ID
        //SI EXISTE LO GUARDAMOS PARA PODER REVISAR SUS PROPIEDADES
        let sim:simbolo;

        if(ambito.existe(this.id)){
            //console.log("SI EXISTE EL ID: "+ this.id);
            sim=ambito.getSimbolo(this.id);
            //AHORA QUE YA SABEMOS QUE EXISTE, HAY QUE HACER 3 VALIDACIONES
            //1. VERIFICAR SI ES CONST O NO 
            //2. VERIFICAR SI ES NUMBER O NO
            //3. VERIFICAR SI YA FUE INICIALIZADA LA VARIABLE, ES DECIR !=NULL

            //VALIDACION 1)
            if(sim.getReasignable()==true){

                //VALIDACION 2)
                if(sim.getTipo()==tipo_valor.NUMBER){

                    //VALIDACION 3)
                    if(JSON.stringify(sim.getValor())!=null){
                        //SI PASO TODAS LAS VALIDACIONES
                        //AHORA TOCA VER SI ES UN INCREMENTO O UN DECREMENTO
                        let valor= JSON.stringify(sim.getValor());
                        const valornecesitado= new Number(sim.getValor()); 
                        if(this.tipooperador==operador.INCREMENTO){
                            const nuevo=new Number(Number(valor)+Number(1));
                            ambito.asignarValor(this.id,nuevo,sim.getTipo());

                        }else{
                            const nuevo=new Number(Number(valor)-Number(1));
                            ambito.asignarValor(this.id,nuevo,sim.getTipo());
                        }
                        return valornecesitado;
                    }else{
                        almacen.dispatch(errores({
                            tipo:'SEMANTICO',
                            descripcion:'IDENTIFICADOR '+ this.id+' ESTA SIENDO USADA ANTES DE HABER SIDO ASIGNADA',
                            ambito:ambito.nombre
                        }));
                        console.log("ERROR - ID:"+this.id+" ESTA SIENDO USADA ANTES DE HABER SIDO ASIGNADA");
                    }

                }else{
                    almacen.dispatch(errores({
                        tipo:'SEMANTICO',
                        descripcion:'IDENTIFICADOR '+ this.id+' NO ES DE TIPO NUMBER',
                        ambito:ambito.nombre
                    }));
                    console.log("ERROR - ID: "+this.id+" NO ES DE TIPO NUMBER");
                }

            }else{

                almacen.dispatch(errores({
                    tipo:'SEMANTICO',
                    descripcion:'NO SE PUEDE MODIFICAR: '+ this.id+' ES UNA VARIABLE CONST',
                    ambito:ambito.nombre
                }));
                //SIGNIFICA QUE NO ES DE TIPO NUMBER O QUE ES UNA CONSTANTE, POR QUE NO SE PUEDE REASIGNAR
                console.log("ERROR - NO SE PUEDE MODIFICAR: "+ this.id+" ES UNA VARIABLE CONST");

                
            }

        }else{

            almacen.dispatch(errores({
                tipo:'SEMANTICO',
                descripcion:'VARIABLE: '+ this.id+' NO ESTA DEFINIDA',
                ambito:ambito.nombre
            }));
            console.log("ERROR - VARIABLE: "+ this.id+" NO ESTA DEFINIDA");
        }

        return null;
    }

    ejecutar(ambito: entorno): object {

        //LO PRIMERO QUE HAY QUE HACER ES BUSCAR EL ID
        //SI EXISTE LO GUARDAMOS PARA PODER REVISAR SUS PROPIEDADES
        let sim:simbolo;
        if(ambito.existe(this.id)){
            //console.log("SI EXISTE EL ID: "+ this.id);
            sim=ambito.getSimbolo(this.id);
            //AHORA QUE YA SABEMOS QUE EXISTE, HAY QUE HACER 3 VALIDACIONES
            //1. VERIFICAR SI ES CONST O NO 
            //2. VERIFICAR SI ES NUMBER O NO
            //3. VERIFICAR SI YA FUE INICIALIZADA LA VARIABLE, ES DECIR !=NULL

            //VALIDACION 1)
            if(sim.getReasignable()==true){

                //VALIDACION 2)
                if(sim.getTipo()==tipo_valor.NUMBER){

                    //VALIDACION 3)
                    if(JSON.stringify(sim.getValor())!=null){
                        //SI PASO TODAS LAS VALIDACIONES
                        //AHORA TOCA VER SI ES UN INCREMENTO O UN DECREMENTO
                        let valor= JSON.stringify(sim.getValor());

                        if(this.tipooperador==operador.INCREMENTO){
                            const nuevo=new Number(Number(valor)+Number(1));
                            ambito.asignarValor(this.id,nuevo,sim.getTipo());

                        }else{
                            const nuevo=new Number(Number(valor)-Number(1));
                            ambito.asignarValor(this.id,nuevo,sim.getTipo());
                        }

                    }else{
                        almacen.dispatch(errores({
                            tipo:'SEMANTICO',
                            descripcion:'IDENTIFICADOR: '+ this.id+' ESTA SIENDO USADA ANTES DE HABER SIDO ASIGNADA',
                            ambito:ambito.nombre
                        }));
                        console.log("ERROR - ID:"+this.id+" ESTA SIENDO USADA ANTES DE HABER SIDO ASIGNADA");
                    }

                }else{
                    almacen.dispatch(errores({
                        tipo:'SEMANTICO',
                        descripcion:'IDENTIFICADOR: '+ this.id+' NO ES DE TIPO NUMBER',
                        ambito:ambito.nombre
                    }));
                    console.log("ERROR - ID: "+this.id+" NO ES DE TIPO NUMBER");
                }

            }else{
                //SIGNIFICA QUE NO ES DE TIPO NUMBER O QUE ES UNA CONSTANTE, POR QUE NO SE PUEDE REASIGNAR
                console.log("ERROR - NO SE PUEDE MODIFICAR: "+ this.id+" ES UNA VARIABLE CONST");
                almacen.dispatch(errores({
                    tipo:'SEMANTICO',
                    descripcion:'IDENTIFICADOR NO SE PUEDE MODIFICAR: '+ this.id+' ES UNA VARIABLE CONST',
                    ambito:ambito.nombre
                }));
            }

        }else{
            almacen.dispatch(errores({
                tipo:'SEMANTICO',
                descripcion:'VARIABLE: '+ this.id+' NO ESTA DEFINIDA',
                ambito:ambito.nombre
            }));
            console.log("ERROR - VARIABLE: "+ this.id+" NO ESTA DEFINIDA");
        }


        return null;
    }

}
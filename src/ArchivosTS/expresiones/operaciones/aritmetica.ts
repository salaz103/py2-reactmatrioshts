import entorno from "../../entorno/entorno";
import { operador, tipo_dato } from "../../entorno/tipo";
import { generacion } from "../../helpers/generacion";
import expresion from "../expresion";
import { traduccionexp } from "../traduccionexp";
import operacion from "./operacion";
import {almacen} from '../../../../src/app';
import {errores} from '../../../actions/ts.js';

export class aritmetica extends operacion implements expresion{

    tipodato:tipo_dato;
    linea:number;
    columna:number;
    
    constructor(expiz:expresion,op:operador,expder:expresion,linea:number,columna:number){
        super(expiz,op,expder);
        this.linea=linea;
        this.columna=columna;
    }


    traducir(ambito: entorno) {
        const generador= generacion.getGenerador();
        const valorizquierdo:traduccionexp= this.expresionizquierda.traducir(ambito);
        const valorderecha:traduccionexp= this.expresionderecha.traducir(ambito);
        const temporalresultado= generador.generarTemporal();
        if(this.tipooperador==operador.MAS){
            //SUMA - POSIBLES COMBINACIONES
            //NUMBER -NUMBER --->HECHO
            //NUMBER- BOOLEAN
            //STRING - NUMBER
            //STRING - BOOLEAN
            //STRING - STRING
            if(valorizquierdo.tipodato == tipo_dato.NUMBER && valorderecha.tipodato== tipo_dato.NUMBER){
                generador.agregarExpresion(temporalresultado,valorizquierdo.obtenerValor(),"+",valorderecha.obtenerValor());
                return new traduccionexp(temporalresultado,true,tipo_dato.NUMBER,false);
            }

        }else if(this.tipooperador==operador.MENOS){

            if(valorizquierdo.tipodato == tipo_dato.NUMBER && valorderecha.tipodato== tipo_dato.NUMBER){
                generador.agregarExpresion(temporalresultado,valorizquierdo.obtenerValor(),"-",valorderecha.obtenerValor());
                return new traduccionexp(temporalresultado,true,tipo_dato.NUMBER,false);
            }else{
                almacen.dispatch(errores({
                    tipo:'SEMANTICO',
                    descripcion: valorizquierdo.tipodato+' NO SE PUEDE RESTAR CON '+ valorderecha.tipodato,
                    ambito:ambito.nombre,
                    linea: this.linea,
                    columna: this.columna
                }));
            }

        }else if(this.tipooperador==operador.POR){

            if(valorizquierdo.tipodato == tipo_dato.NUMBER && valorderecha.tipodato== tipo_dato.NUMBER){
                generador.agregarExpresion(temporalresultado,valorizquierdo.obtenerValor(),"*",valorderecha.obtenerValor());
                return new traduccionexp(temporalresultado,true,tipo_dato.NUMBER,false);
            }else{
                almacen.dispatch(errores({
                    tipo:'SEMANTICO',
                    descripcion: valorizquierdo.tipodato+' NO SE PUEDE MULTIPLICAR CON '+ valorderecha.tipodato,
                    ambito:ambito.nombre,
                    linea: this.linea,
                    columna: this.columna
                }));
            }


        }else if(this.tipooperador==operador.DIVISION){

            if(valorizquierdo.tipodato == tipo_dato.NUMBER && valorderecha.tipodato== tipo_dato.NUMBER){
                generador.agregarExpresion(temporalresultado,valorizquierdo.obtenerValor(),"/",valorderecha.obtenerValor());
                return new traduccionexp(temporalresultado,true,tipo_dato.NUMBER,false);
            }else{
                almacen.dispatch(errores({
                    tipo:'SEMANTICO',
                    descripcion: valorizquierdo.tipodato+' NO SE PUEDE DIVIDIR CON '+ valorderecha.tipodato,
                    ambito:ambito.nombre,
                    linea: this.linea,
                    columna: this.columna
                }));
            }


        }else if(this.tipooperador==operador.MODULO){

            if(valorizquierdo.tipodato == tipo_dato.NUMBER && valorderecha.tipodato== tipo_dato.NUMBER){
                generador.agregarExpresion(temporalresultado,"fmod("+valorizquierdo.obtenerValor()+","+valorderecha.obtenerValor()+")","","");
                return new traduccionexp(temporalresultado,true,tipo_dato.NUMBER,false);
            }else{
                almacen.dispatch(errores({
                    tipo:'SEMANTICO',
                    descripcion: valorizquierdo.tipodato+' NO SE PUEDE DIVIDIR CON '+ valorderecha.tipodato,
                    ambito:ambito.nombre,
                    linea: this.linea,
                    columna: this.columna
                }));
            }

        }else if(this.tipooperador==operador.EXPONENTE){

        }

        return new traduccionexp("",false,tipo_dato.UNDEFINED,false);
    }
    
}
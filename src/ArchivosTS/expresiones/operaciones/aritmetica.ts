import entorno from "../../entorno/entorno";
import { operador, tipo_valor } from "../../entorno/tipo";
import expresion from "../expresion";
import operacion from "./operacion";
import {almacen} from '../../../../src/app';
import {errores} from '../../../actions/ts.js';


export class aritmetica extends operacion implements expresion{

    tipo:tipo_valor;

    constructor(expiz:expresion,op:operador,expder:expresion){
        super(expiz,op,expder);
    }

    obtenerValor(ambito:entorno){
        const valorizquierdo= this.expresionizquierda.obtenerValor(ambito);
        const valorderecha= this.expresionderecha.obtenerValor(ambito);

        const tipoiz= this.expresionizquierda.obtenerTipo(ambito);
        const tipoder= this.expresionderecha.obtenerTipo(ambito);

        //PRIMERO VEMOS SI ES +,-,*,/
        if(this.tipooperador==operador.MAS){

            if(tipoiz==tipo_valor.NUMBER && tipoder==tipo_valor.NUMBER){
                const res= Number(valorizquierdo) + Number(valorderecha);
                this.tipo=tipo_valor.NUMBER;
                return new Number(res);
            }else if(tipoiz==tipo_valor.STRING && tipoder==tipo_valor.NUMBER){
                const res= String(valorizquierdo) + String(valorderecha);
                this.tipo=tipo_valor.STRING;
                return new String(res);
            }else if(tipoiz==tipo_valor.NUMBER && tipoder==tipo_valor.STRING){
                const res= String(valorizquierdo) + String(valorderecha);
                this.tipo=tipo_valor.STRING;
                return new String(res);
            }else if(tipoiz==tipo_valor.STRING && tipoder==tipo_valor.STRING){
                const res= String(valorizquierdo) + String(valorderecha);
                this.tipo=tipo_valor.STRING;
                return new String(res);
            }else{
                //AQUI IRIA UN ERRROR SEMANTICO YA QUE NO SE PUEDE HACER SUMA DE OTROS TIPOS
                almacen.dispatch(errores({
                    tipo:'SEMANTICO',
                    descripcion: tipoiz+' NO SE PUEDE SUMAR CON '+ tipoder,
                    ambito:ambito.nombre
                }));
            }
    
        }else if(this.tipooperador==operador.MENOS){
            
            if(tipoiz==tipo_valor.NUMBER && tipoder==tipo_valor.NUMBER){
                const res= Number(valorizquierdo) - Number(valorderecha);
                this.tipo=tipo_valor.NUMBER;
                return new Number(res);
            }else{
                //ERROR SEMANTICO
                almacen.dispatch(errores({
                    tipo:'SEMANTICO',
                    descripcion: tipoiz+' NO SE PUEDE RESTAR CON '+ tipoder,
                    ambito:ambito.nombre
                }));
            }

        }else if(this.tipooperador==operador.POR){

            if(tipoiz==tipo_valor.NUMBER && tipoder==tipo_valor.NUMBER){
                const res= Number(valorizquierdo) * Number(valorderecha);
                this.tipo=tipo_valor.NUMBER;
                return new Number(res);
            }else{
                almacen.dispatch(errores({
                    tipo:'SEMANTICO',
                    descripcion: tipoiz+' NO SE PUEDE MULTIPLICAR CON '+ tipoder,
                    ambito:ambito.nombre
                }));
            }

        }else if(this.tipooperador==operador.DIVISION){

            if(tipoiz==tipo_valor.NUMBER && tipoder==tipo_valor.NUMBER){
                const res= Number(valorizquierdo) / Number(valorderecha);
                this.tipo=tipo_valor.NUMBER;
                return new Number(res);
            }else{
                almacen.dispatch(errores({
                    tipo:'SEMANTICO',
                    descripcion: tipoiz+' NO SE PUEDE DIVIDIR DENTRO DE '+ tipoder,
                    ambito:ambito.nombre
                }));
            }

        }else if(this.tipooperador==operador.MODULO){

            if(tipoiz==tipo_valor.NUMBER && tipoder==tipo_valor.NUMBER){
                const res= Number(valorizquierdo) % Number(valorderecha);
                this.tipo=tipo_valor.NUMBER;
                return new Number(res);
            }else{
                //ERROR SEMANTICO
                almacen.dispatch(errores({
                    tipo:'SEMANTICO',
                    descripcion: 'NO SE PUEDE RELIZAR EL MOD ENTRE '+ tipoiz+ ' Y '+tipoder,
                    ambito:ambito.nombre
                }));
            }

        }else if(this.tipooperador==operador.EXPONENTE){

            if(tipoiz==tipo_valor.NUMBER && tipoder==tipo_valor.NUMBER){
                const res= Number(valorizquierdo) ** Number(valorderecha);
                this.tipo=tipo_valor.NUMBER;
                return new Number(res);
            }else{
                //ERROR SEMANTICO
                almacen.dispatch(errores({
                    tipo:'SEMANTICO',
                    descripcion: tipoiz+' NO SE PUEDE REALIZAR EXPONENTE CON '+ tipoder,
                    ambito:ambito.nombre
                }));
            }

        }
      
        return null;
    }

    obtenerTipo(){
        return this.tipo;
    }

}
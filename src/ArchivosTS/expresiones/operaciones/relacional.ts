import entorno from "../../entorno/entorno";
import { operador, tipo_valor } from "../../entorno/tipo";
import expresion from "../expresion";
import operacion from "./operacion";
import {almacen} from '../../../../src/app';
import {errores} from '../../../actions/ts.js';

export class relacional extends operacion implements expresion{

    tipo:tipo_valor;

    constructor(expiz:expresion,op:operador,expder:expresion){
        super(expiz,op,expder);
    }

    obtenerValor(ambito:entorno){
        const valorizquierdo= this.expresionizquierda.obtenerValor(ambito);
        const valorderecha= this.expresionderecha.obtenerValor(ambito);

        /*console.log(valorizquierdo.valueOf());
        console.log(valorderecha.valueOf());*/
        const tipoiz= this.expresionizquierda.obtenerTipo(ambito);
        const tipoder= this.expresionderecha.obtenerTipo(ambito);

        //PRIMERO VEMOS SI ES >,<,>=,<=,!=,==
        if(this.tipooperador==operador.MAYORQUE){

            if(tipoiz==tipo_valor.NUMBER && tipoder==tipo_valor.NUMBER){
                const res= Number(valorizquierdo) > Number(valorderecha);
                this.tipo=tipo_valor.BOOLEAN;
                return new Boolean(res);
            }else{
                //ERROR SEMANTICO
                almacen.dispatch(errores({
                    tipo:'SEMANTICO',
                    descripcion:'OPERADOR > NECESITA OPERANDOS NUMBER',
                    ambito:ambito.nombre
                }));
            }
            
        
    
        }else if(this.tipooperador==operador.MENORQUE){
            
           if(tipoiz==tipo_valor.NUMBER && tipoder==tipo_valor.NUMBER){
                const res= Number(valorizquierdo) < Number(valorderecha);
                this.tipo=tipo_valor.BOOLEAN;
                return new Boolean(res);
            }else{
                //ERROR SEMANTICO
                almacen.dispatch(errores({
                    tipo:'SEMANTICO',
                    descripcion:'OPERADOR < NECESITA OPERANDOS NUMBER',
                    ambito:ambito.nombre
                }));
            }

        }else if(this.tipooperador==operador.MAYORIGUALQUE){

            if(tipoiz==tipo_valor.NUMBER && tipoder==tipo_valor.NUMBER){
                const res= Number(valorizquierdo) >= Number(valorderecha);
                this.tipo=tipo_valor.BOOLEAN;
                return new Boolean(res);
            }else{
                //ERROR SEMANTICO
                almacen.dispatch(errores({
                    tipo:'SEMANTICO',
                    descripcion:'OPERADOR >= NECESITA OPERANDOS NUMBER',
                    ambito:ambito.nombre
                }));
            }
           

        }else if(this.tipooperador==operador.MENORIGUALQUE){

            if(tipoiz==tipo_valor.NUMBER && tipoder==tipo_valor.NUMBER){
                const res= Number(valorizquierdo) <= Number(valorderecha);
                this.tipo=tipo_valor.BOOLEAN;
                return new Boolean(res);
            }else{
                //ERROR SEMANTICO
                almacen.dispatch(errores({
                    tipo:'SEMANTICO',
                    descripcion:'OPERADOR <= NECESITA OPERANDOS NUMBER',
                    ambito:ambito.nombre
                }));
            }

        }else if(this.tipooperador==operador.DIFERENTEQUE){

            if(tipoiz==tipo_valor.NUMBER && tipoder==tipo_valor.NUMBER){
                const res= Number(valorizquierdo) != Number(valorderecha);
                this.tipo=tipo_valor.BOOLEAN;
                return new Boolean(res);
            }else if(tipoiz==tipo_valor.STRING && tipoder==tipo_valor.STRING){
                const res= String(valorizquierdo) != String(valorderecha);
                this.tipo=tipo_valor.BOOLEAN;
                return new Boolean(res);
            }else if(tipoiz== tipo_valor.BOOLEAN && tipoder==tipo_valor.BOOLEAN){
                const res= valorizquierdo.valueOf() != valorderecha.valueOf();
                this.tipo= tipo_valor.BOOLEAN;
                return new Boolean(res);
            }else{
                //ERROR SEMANTICO
                almacen.dispatch(errores({
                    tipo:'SEMANTICO',
                    descripcion:'OPERADOR != NECESITA OPERANDOS NUMBER O STRING',
                    ambito:ambito.nombre
                }));
            }
            

        }else if(this.tipooperador==operador.IGUALQUE){

            if(tipoiz==tipo_valor.NUMBER && tipoder==tipo_valor.NUMBER){
                const res= Number(valorizquierdo) == Number(valorderecha);
                this.tipo=tipo_valor.BOOLEAN;
                return new Boolean(res);
            }else if(tipoiz==tipo_valor.STRING && tipoder==tipo_valor.STRING){
                const res= String(valorizquierdo) == String(valorderecha);
                this.tipo=tipo_valor.BOOLEAN;
                return new Boolean(res);
            }else if(tipoiz== tipo_valor.BOOLEAN && tipoder==tipo_valor.BOOLEAN){
                /*const r1= Boolean(valorizquierdo);
                console.log(r1);
                const r2= Boolean(valorderecha);
                console.log(r2);*/
                const res= valorizquierdo.valueOf() == valorderecha.valueOf();
                this.tipo= tipo_valor.BOOLEAN;
                return new Boolean(res);
            }
            else{
                //ERROR SEMANTICO
                almacen.dispatch(errores({
                    tipo:'SEMANTICO',
                    descripcion:'OPERADOR == NECESITA OPERANDOS NUMBER O STRING',
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
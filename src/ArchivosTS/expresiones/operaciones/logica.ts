import entorno from "../../entorno/entorno";
import { operador, tipo_valor } from "../../entorno/tipo";
import expresion from "../expresion";
import operacion from "./operacion";
import {almacen} from '../../../../src/app';
import {errores} from '../../../actions/ts.js';

export class logica extends operacion implements expresion{

    tipo:tipo_valor;

    constructor(expiz:expresion,op:operador,expder:expresion){
        super(expiz,op,expder);
    }

    obtenerValor(ambito:entorno){
        const valorizquierdo= this.expresionizquierda.obtenerValor(ambito);
        const valorderecha= this.expresionderecha.obtenerValor(ambito);

        const tipoiz= this.expresionizquierda.obtenerTipo(ambito);
        const tipoder= this.expresionderecha.obtenerTipo(ambito);

        //PRIMERO VEMOS SI ES AND,OR
        if(this.tipooperador==operador.AND){

            if(tipoiz==tipo_valor.BOOLEAN && tipoder==tipo_valor.BOOLEAN){
                const i= valorizquierdo as Boolean;
                const d= valorderecha as Boolean;
                const res= i.valueOf() && d.valueOf();
                this.tipo=tipo_valor.BOOLEAN;
                return new Boolean(res);
            }else{
                //ERROR SEMANTICO
                almacen.dispatch(errores({
                    tipo:'SEMANTICO',
                    descripcion:'OPERADOR && SOLO ACEPTA BOOLEAN',
                    ambito:ambito.nombre
                }));
            }
            
    
        }else if(this.tipooperador==operador.OR){

           if(tipoiz==tipo_valor.BOOLEAN && tipoder==tipo_valor.BOOLEAN){
            const i= valorizquierdo as Boolean;
            const d= valorderecha as Boolean;
            const res= i.valueOf() || d.valueOf();
            this.tipo=tipo_valor.BOOLEAN;
            return new Boolean(res);
            }else{
                //ERROR SEMANTICO
                almacen.dispatch(errores({
                    tipo:'SEMANTICO',
                    descripcion:'OPERADOR OR SOLO ACEPTA BOOLEAN',
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
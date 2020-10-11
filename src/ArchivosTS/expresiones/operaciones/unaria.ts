import entorno from "../../entorno/entorno";
import { operador, tipo_valor } from "../../entorno/tipo";
import expresion from "../expresion";
import {almacen} from '../../../../src/app';
import {errores} from '../../../actions/ts.js';

export class unaria implements expresion{

    tipo:tipo_valor;
    expresionderecha:expresion;
    tipooperador:operador;

    constructor(op:operador,expder:expresion){
        this.expresionderecha= expder;
        this.tipooperador=op;

    }

    obtenerValor(ambito:entorno){
        const valorderecha= this.expresionderecha.obtenerValor(ambito);
        const tipoder= this.expresionderecha.obtenerTipo(ambito);

        //PRIMERO VEMOS SI ES NOT O MENOS (-)
        if(this.tipooperador==operador.MENOS){

            if(tipoder==tipo_valor.NUMBER){
                const d= Number(valorderecha)*-1;
                this.tipo=tipo_valor.NUMBER;
                return new Number(d);
            }else{
                //ERROR SEMANTICO
                almacen.dispatch(errores({
                    tipo:'SEMANTICO',
                    descripcion:'OPERADOR NEGATIVO SOLO ES APLICABLE A NUMBER',
                    ambito:ambito.nombre
                }));
            }
            
    
        }else if(this.tipooperador==operador.NOT){

           if(tipoder==tipo_valor.BOOLEAN){
            const d= valorderecha as Boolean;
            const res= !(d.valueOf());
            this.tipo=tipo_valor.BOOLEAN;
            return new Boolean(res);
            }else{
                //ERROR SEMANTICO
                almacen.dispatch(errores({
                    tipo:'SEMANTICO',
                    descripcion:'NOT ES SOLO APLICABLE A BOOLEAN',
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
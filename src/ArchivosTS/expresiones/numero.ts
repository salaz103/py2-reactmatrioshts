import expresion from "./expresion";
import {tipo_valor} from "../entorno/tipo";
import entorno from "../entorno/entorno";

export class numero implements expresion{

    valor:number;
    tipovalor:tipo_valor;

    constructor(valor:number,tipo:tipo_valor){
        this.valor=valor;
        this.tipovalor=tipo;
    }

    obtenerValor(ambito:entorno){
        return new Number(this.valor);
    }

    obtenerTipo(){
        return this.tipovalor;
    }
}
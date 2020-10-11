import expresion from "./expresion";
import {tipo_valor} from "../entorno/tipo";
import entorno from "../entorno/entorno";

export class valorLogico implements expresion{

    valorlogico:string;
    tipovalor:tipo_valor;

    constructor(valor:string,tipo:tipo_valor){
        this.valorlogico=valor;
        this.tipovalor=tipo;
    }

    obtenerValor(ambito:entorno){
        if(this.valorlogico=='TRUE'){
            return new Boolean(true);
        }else if(this.valorlogico=='FALSE'){
            return new Boolean(false);
        }

        return null;
    }

    obtenerTipo(){
        return this.tipovalor;
    }
}
import expresion from "./expresion";
import {tipo_valor} from "../entorno/tipo";
import entorno from "../entorno/entorno";

export class cadena implements expresion{

    valorcadena:object;
    tipoCadena:tipo_valor;

    constructor(valor:object,tipo:tipo_valor){
        this.valorcadena=valor;
        this.tipoCadena=tipo;
    }

    obtenerValor(ambito:entorno){
        return this.valorcadena;
    }

    obtenerTipo(){
        return this.tipoCadena;
    }
}
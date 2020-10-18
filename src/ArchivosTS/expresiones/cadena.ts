import entorno from "../entorno/entorno";
import { tipo_valor } from "../entorno/tipo";
import expresion from "./expresion";

export class cadena implements expresion{

    valorcadena:string;
    tipoCadena:tipo_valor;
    linea:number;
    columna:number;

    constructor(valor:string,tipo:tipo_valor,linea:number,columna:number){
        this.valorcadena=valor;
        this.tipoCadena=tipo;
        this.linea=linea;
        this.columna=columna;
    }


    traducir(ambito: entorno) {
        throw new Error("Method not implemented.");
    }
    
}
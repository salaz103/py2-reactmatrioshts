import entorno from "../entorno/entorno";
import { tipo_valor } from "../entorno/tipo";
import expresion from "./expresion";

export class valorLogico implements expresion{

    valorlogico:string;
    tipovalor:tipo_valor;
    linea:number;
    columna:number;

    constructor(valor:string,tipo:tipo_valor,linea:number,columna:number){
        this.valorlogico=valor;
        this.tipovalor=tipo;
        this.linea=linea;
        this.columna=columna;
    }


    traducir(ambito: entorno) {
        throw new Error("Method not implemented.");
    }
    
}
import entorno from "../entorno/entorno";
import { tipo_dato } from "../entorno/tipo";
import expresion from "./expresion";

export class cadena implements expresion{

    valorcadena:string;
    tipodato:tipo_dato;
    linea:number;
    columna:number;

    constructor(valor:string,tipo:tipo_dato,linea:number,columna:number){
        this.valorcadena=valor;
        this.tipodato=tipo;
        this.linea=linea;
        this.columna=columna;
    }


    traducir(ambito: entorno) {
        return null;        
    }
    
}
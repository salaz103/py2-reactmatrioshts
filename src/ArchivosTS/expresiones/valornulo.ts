import entorno from "../entorno/entorno";
import { tipo_dato } from "../entorno/tipo";
import expresion from "./expresion";
import { traduccionexp } from "./traduccionexp";

export class valornulo implements expresion{

    tipodato:tipo_dato;
    linea:number;
    columna:number;

    constructor(tipo:tipo_dato,linea:number,columna:number){
        this.tipodato=tipo;
        this.linea=linea;
        this.columna=columna;
    }


    traducir(ambito: entorno) {
        return new traduccionexp("-1",false,tipo_dato.NULL,false,null,0);
    }
    
}
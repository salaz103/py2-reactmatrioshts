import entorno from "../entorno/entorno";
import { tipo_metodo } from "../entorno/tipo";
import expresion from "./expresion";

export class stringmetodos{

    metodo:tipo_metodo;
    exp:expresion;
    linea:number;
    columna:number;

    constructor(metodo:tipo_metodo,exp:expresion,linea:number,columna:number){
        this.metodo=metodo;
        this.exp=exp;
        this.linea=linea;
        this.columna=columna;
    }

}
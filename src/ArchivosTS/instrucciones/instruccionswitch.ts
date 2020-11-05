import entorno from "../entorno/entorno";
import expresion from "../expresiones/expresion";
import { caso } from "./caso";
import instruccion from "./instruccion";

export class instruccionswitch implements instruccion{

    exp:expresion;
    casos:caso[];
    linea:number;
    columna:number;

    constructor(ex:expresion,casos:caso[],linea:number,columna:number){
        this.exp=ex;
        this.casos=casos;
        this.linea=linea;
        this.columna=columna;
    }


    traducir(ambito: entorno) {
        throw new Error("Method not implemented.");
    }

}
import entorno from "../entorno/entorno";
import expresion from "../expresiones/expresion";
import instruccion from "./instruccion";

export class imprimir implements instruccion{

    linea:number;
    columna:number;
    expresion:expresion;

    constructor(exp:expresion,linea:number,columna:number){
        this.expresion=exp;
        this.linea=linea;
        this.columna=columna;
    }



    traducir(ambito: entorno) {
        //SEGUN EL ANEXO SOLO SE VAN A IMPRIMIR VALORES DE TIPO DE DATO:
        //1. STRING
        //2. BOOLEAN
        //3. NUMBER
        throw new Error("Method not implemented.");
    }
    
}
import entorno from "../../entorno/entorno";
import { operador, tipo_valor } from "../../entorno/tipo";
import expresion from "../expresion";

export class unaria implements expresion{

    tipo:tipo_valor;
    expresionderecha:expresion;
    tipooperador:operador;
    linea:number;
    columna:number;

    constructor(op:operador,expder:expresion,linea:number,columna:number){
        this.expresionderecha= expder;
        this.tipooperador=op;
        this.linea=linea;
        this.columna=columna;
    }


    traducir(ambito: entorno) {
        throw new Error("Method not implemented.");
    }

}
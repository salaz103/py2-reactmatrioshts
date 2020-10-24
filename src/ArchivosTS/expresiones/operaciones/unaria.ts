import entorno from "../../entorno/entorno";
import { operador, tipo_dato } from "../../entorno/tipo";
import expresion from "../expresion";

export class unaria implements expresion{

    tipodato:tipo_dato;
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
        
        return null;
    }

}
import entorno from "../../entorno/entorno";
import { operador, tipo_valor } from "../../entorno/tipo";
import expresion from "../expresion";
import operacion from "./operacion";

export class relacional extends operacion implements expresion{

    tipo:tipo_valor;
    linea:number;
    columna:number;

    constructor(expiz:expresion,op:operador,expder:expresion,linea:number,columna:number){
        super(expiz,op,expder);
        this.linea=linea;
        this.columna=columna;
    }

    traducir(ambito: entorno) {
        throw new Error("Method not implemented.");
    }

}
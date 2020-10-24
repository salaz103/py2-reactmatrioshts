import entorno from "../../entorno/entorno";
import { operador, tipo_dato } from "../../entorno/tipo";
import expresion from "../expresion";
import operacion from "./operacion";

export class relacional extends operacion implements expresion{

    tipodato:tipo_dato;
    linea:number;
    columna:number;

    constructor(expiz:expresion,op:operador,expder:expresion,linea:number,columna:number){
        super(expiz,op,expder);
        this.linea=linea;
        this.columna=columna;
    }

    traducir(ambito: entorno) {
        return null;
    }

}
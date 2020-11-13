import instruccion from "./instruccion";
import { literal } from "./literal";

export class asignaciondirecta implements instruccion{

    ladoizquierdo:string;
    ladoderecho:literal;
    linea:number;

    constructor(izquierdo:string,derecho:literal,linea:number) {
        this.ladoizquierdo=izquierdo;
        this.ladoderecho=derecho;
        this.linea=linea;
    }


    optimizar(): string {
        let derecho= this.ladoderecho.obtenercodigo();
        let codigo= this.ladoizquierdo+"="+derecho.valor+";\n";
        return codigo;
    }
    
}
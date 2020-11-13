import instruccion from "./instruccion";
import { literal } from "./literal";

export class heap_stack implements instruccion{

    acceso:string;
    ladoderecho:literal;
    linea:number;

    constructor(acceso:string,derecho:literal,linea:number) {
        this.acceso=acceso;
        this.ladoderecho=derecho;
        this.linea=linea;
    }


    optimizar(): string {
        let derecho= this.ladoderecho.obtenercodigo();
        let codigo= this.acceso+"="+derecho.valor+";\n";
        return codigo;
    }
    
}
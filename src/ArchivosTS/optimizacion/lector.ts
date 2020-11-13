import instruccion from "./instruccion";

export class lector implements instruccion{

    codigo:string;
    linea:number;

    constructor(codigo:string,linea:number){
        this.codigo=codigo;
        this.linea=linea;
    }

    optimizar(): string {
        return this.codigo+"\n";
    }
    
}
import { cadena } from "../expresiones/cadena";
import instruccion from "./instruccion";
import { literal } from "./literal";

export class printf implements instruccion{

    tipo:string;
    casteo:string;
    valor:literal;
    linea:number;

    constructor(tipo:string,casteo:string,valor:literal,linea:number){
        this.tipo=tipo;
        this.casteo=casteo;
        this.valor=valor;
        this.linea=linea;
    }

    optimizar(): string {
        //DEBEMOS ARMAR EL CODIGO
        let codigo3dvalor= this.valor.obtenercodigo();
        let codigo="printf("+this.tipo+",("+this.casteo+")"+codigo3dvalor.valor+");\n";
        return codigo;
    }
    
}
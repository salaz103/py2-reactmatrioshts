import instruccion from "./instruccion";
import { literal } from "./literal";

export class instruccionif implements instruccion{

    ladoizquierdo:literal;
    operador:string;
    ladoderecho:literal;
    etiquetatrue:string;
    linea:number;

    constructor(opiz:literal,operador:string,opder:literal,etiquetatrue:string,linea:number){
        this.ladoizquierdo=opiz;
        this.operador=operador;
        this.ladoderecho=opder;
        this.etiquetatrue=etiquetatrue;
        this.linea=linea;
    }

    optimizar(): string {
        //ARMAMOS EL CODIGO PARA REGRESARLO
        let codigoizquierdo= this.ladoizquierdo.obtenercodigo();
        let codigoderecho= this.ladoderecho.obtenercodigo();
        let codigo= "if("+codigoizquierdo.valor+this.operador+codigoderecho.valor+") goto "+this.etiquetatrue+";\n"
        return codigo;
    }
    
}
import instruccion from "./instruccion";
import { literal } from "./literal";

export class fmod implements instruccion{

    temporal:string;
    literal1:literal;
    literal2:literal;
    linea:number;

    constructor(temporal:string,l1:literal,l2:literal,linea:number){
        this.temporal=temporal;
        this.literal1=l1;
        this.literal2=l2;
        this.linea=linea;

    }

    optimizar(): string {
        //TOCAR ARMAR EL CODIGO
        let codigol1=this.literal1.obtenercodigo();
        let codigol2= this.literal2.obtenercodigo();
        let codigo= this.temporal+"= fmod("+codigol1.valor+","+codigol2.valor+");\n";
        return codigo;
    }

}
import entorno from "../entorno/entorno";
import { tipo_valor } from "../entorno/tipo";
import expresion from "../expresiones/expresion";
import instruccion from "./instruccion";

export class declaracionarreglo implements instruccion{

    id:string;
    tipodato:tipo_valor;
    listaexpresiones:expresion[];

    constructor(n:string,tipo:tipo_valor,valores:expresion[]){
        this.id=n;
        this.tipodato=tipo;
        this.listaexpresiones=valores;
    }


    ejecutar(ambito: entorno): object {
        throw new Error("Method not implemented.");
    }

}
import entorno from "../entorno/entorno";
import { tipo_instruccion } from "../entorno/tipo";
import instruccion from "./instruccion";

export class instruccioncontinue implements instruccion{

    tipo:tipo_instruccion;

    constructor(t:tipo_instruccion){
        this.tipo= t;
    }


    ejecutar(ambito: entorno): object {
            return this;
    }
    
}
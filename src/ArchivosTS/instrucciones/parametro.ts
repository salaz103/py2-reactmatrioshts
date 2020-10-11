import { tipo_valor } from "../entorno/tipo";
import expresion from "../expresiones/expresion";
import instruccion from "./instruccion";

export class parametro{

    id:string;
    tipo:tipo_valor;
    
    
    
    constructor(nombre:string,t:tipo_valor){
        this.id=nombre;
        this.tipo=t;
        
    }

}
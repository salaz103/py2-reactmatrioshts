import { declaracionfuncion } from "../instrucciones/declaracionfuncion";
import { tipo_valor } from "./tipo";

export class funcion {

    tipovalor:tipo_valor;
    id:string;
    valor:declaracionfuncion;
    
    constructor(t:tipo_valor,nombre:string,obfuncion:declaracionfuncion){
        this.tipovalor= t;
        this.id=nombre;
        this.valor=obfuncion;
    }

    getTipo(){
        return this.tipovalor;
    }

    getValor(){
        //AQUI SOLO RETORNAMOS LA FUNCION, PARA PODER EJECUTARLA
        return this.valor;
    }

    getId(){
        return this.id;
    }
    
    
}
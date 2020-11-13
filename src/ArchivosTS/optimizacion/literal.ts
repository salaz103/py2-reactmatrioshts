import instruccion from "./instruccion";

export class literal  {

    //1---IDENTIFICADOR
    //2-- NUMERO

    tipo:number;
    valor:string;
    constructor(tipo:number,valor:string){
        this.tipo=tipo;
        this.valor=valor;
    }


    obtenercodigo(){
        return {tipo:this.tipo,valor:this.valor};
    }
    
}
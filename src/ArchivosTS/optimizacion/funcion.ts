import instruccion from "./instruccion";

export class funcion implements instruccion{

    nombreFuncion:string;
    lista_instrucciones:instruccion[];
    linea:number;

    constructor(nombre:string,lista:instruccion[],linea:number){
        this.nombreFuncion=nombre;
        this.lista_instrucciones=lista;
        this.linea=linea;
    }

    optimizar(): string {
       let retorno= this.nombreFuncion+"(){\n";
       for (let i = 0; i < this.lista_instrucciones.length; i++) {

        retorno= retorno + this.lista_instrucciones[i].optimizar();
       }
       retorno= retorno +"\n } \n";
       return retorno;
    }
    
}
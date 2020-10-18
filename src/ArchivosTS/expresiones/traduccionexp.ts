import { tipo_valor } from "../entorno/tipo";

export class traduccionexp{
    
    temp:string;
    tipovalor:tipo_valor;
    etiquetas:boolean;
    etiquetastrue:string[];
    etiquetasfalse:string[];


    constructor(temporal:string,tipovalor:tipo_valor,etiquetas:boolean,etiquetastrue:string[],etiquetasfalse:string[]){
        this.temp=temporal;
        this.tipovalor=tipovalor;
        this.etiquetas=etiquetas;
        this.etiquetastrue= etiquetastrue;
        this.etiquetasfalse= etiquetasfalse;
    }



}
import { tipo_valor } from "../entorno/tipo";
import expresion from "../expresiones/expresion";

export class variable{

    id:string;
    tipodato:tipo_valor;
    exp:expresion;
    linea:number;
    columna:number;
    listae:expresion[];
    arreglo:boolean;

    constructor(a:boolean,id:string,l:number,c:number)
    constructor(a:boolean,id:string,l:number,c:number,tipodato?:tipo_valor)
    constructor(a:boolean,id:string,l:number,c:number,tipodato?:tipo_valor,exp?:expresion)
    constructor(a:boolean,id:string,l:number,c:number,tipodato?:tipo_valor,exp?:expresion,listaexpresiones?:expresion[]){

        this.arreglo= a;
        this.id=id;
        this.tipodato=tipodato;
        this.exp=exp;
        this.listae=listaexpresiones;

        //POSICION
        this.linea=l;
        this.columna=c;
    }


}
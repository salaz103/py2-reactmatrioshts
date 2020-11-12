import { tipo_dato } from "../entorno/tipo";
import expresion from "../expresiones/expresion";

export class variable{

    id:string;
    tipodato:tipo_dato;
    exp:expresion;
    linea:number;
    columna:number;
    array:boolean;
    dimensiones:number;

    constructor(id:string,tipodato:tipo_dato,l:number,c:number)
    constructor(id:string,tipodato:tipo_dato,l:number,c:number,ex?:expresion)
    constructor(id:string,tipodato:tipo_dato,l:number,c:number,ex?:expresion,array?:boolean,dimensiones?:number){

        this.id=id;
        this.tipodato=tipodato;
        //POSICION
        this.linea=l;
        this.columna=c;
        //EXPRESION
        this.exp=ex!=null?ex:null;
        //ARREGLO
        this.array=array;
        this.dimensiones=dimensiones;
    }


}
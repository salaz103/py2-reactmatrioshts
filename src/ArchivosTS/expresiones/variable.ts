import { tipo_valor } from "../entorno/tipo";
import expresion from "../expresiones/expresion";

export class variable{

    id:string;
    tipodato:tipo_valor;
    exp:expresion;
    linea:number;
    columna:number;
    

    constructor(id:string,tipodato:tipo_valor,l:number,c:number)
    constructor(id:string,tipodato:tipo_valor,l:number,c:number,ex?:expresion){

        this.id=id;
        this.tipodato=tipodato;
        //POSICION
        this.linea=l;
        this.columna=c;
        //EXPRESION
        this.exp=ex!=null?ex:null;
        
    }


}
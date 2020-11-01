import { tipo_dato } from "../entorno/tipo";

export class parametro{

    id:string;
    tipodato:tipo_dato;
    arreglo:boolean
    linea:number;
    columna:number;
    
    
    constructor(nombre:string,t:tipo_dato,arreglo:boolean,linea:number,columna:number){
        this.id=nombre;
        this.tipodato=t;
        this.arreglo=arreglo;
        this.linea=linea;
        this.columna=columna;
    }

}
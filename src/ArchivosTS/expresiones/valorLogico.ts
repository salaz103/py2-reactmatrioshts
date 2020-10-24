import entorno from "../entorno/entorno";
import { tipo_dato } from "../entorno/tipo";
import expresion from "./expresion";
import { traduccionexp } from "./traduccionexp";

export class valorLogico implements expresion{

    valorlogico:string;
    tipodato:tipo_dato;
    linea:number;
    columna:number;

    constructor(valor:string,tipo:tipo_dato,linea:number,columna:number){
        this.valorlogico=valor;
        this.tipodato=tipo;
        this.linea=linea;
        this.columna=columna;
    }


    traducir(ambito: entorno) {
        let retorno= new traduccionexp('',false,this.tipodato,false);
        if(this.valorlogico=='TRUE'){
            retorno.valor='1';
        }else if(this.valorlogico=='FALSE'){
            retorno.valor='0';
        }
        return retorno;
    }
    
}
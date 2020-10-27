import entorno from "../entorno/entorno";
import { tipo_dato } from "../entorno/tipo";
import { generacion } from "../helpers/generacion";
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
        const generador= generacion.getGenerador();

        let retorno= new traduccionexp('',false,this.tipodato,true);
        let etqtrue= generador.generarEtiqueta();
        let etqfalse= generador.generarEtiqueta();

        this.valorlogico=="TRUE"?generador.agregarGoTo(etqtrue):generador.agregarGoTo(etqfalse);
        if(this.valorlogico=='TRUE'){
            retorno.valor='1';
        }else if(this.valorlogico=='FALSE'){
            retorno.valor='0';
        }
        retorno.etiquetastrue=etqtrue;
        retorno.etiquetasfalse=etqfalse;
        return retorno;
    }
    
}
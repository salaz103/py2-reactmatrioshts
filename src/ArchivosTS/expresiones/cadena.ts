import entorno from "../entorno/entorno";
import { tipo_dato } from "../entorno/tipo";
import { generacion } from "../helpers/generacion";
import expresion from "./expresion";
import { traduccionexp } from "./traduccionexp";

export class cadena implements expresion{

    valorcadena:string;
    tipodato:tipo_dato;
    linea:number;
    columna:number;

    constructor(valor:string,tipo:tipo_dato,linea:number,columna:number){
        this.valorcadena=valor;
        this.tipodato=tipo;
        this.linea=linea;
        this.columna=columna;
    }


    traducir(ambito: entorno):traduccionexp {
        //PUEDE QUE VENGA UNA SOLA LETRA (CHAR) Ó QUE VENGA UNA CADENA
        const generador= generacion.getGenerador();
        let temp_pos_inicio= generador.generarTemporal();
        //AQUI ESTAMOS GUARDANDO LA POSICION DONDE INICIARA LA CADENA
        generador.agregarExpresion(temp_pos_inicio,"h","","");
        for (let i = 0; i < this.valorcadena.length; i++) {
            generador.heap("h",this.valorcadena.charCodeAt(i));
            generador.siguienteHeap();
        }
        generador.heap("h","-1");
        generador.siguienteHeap();
        return new traduccionexp(temp_pos_inicio,true,this.tipodato,false);  
    }
    
}
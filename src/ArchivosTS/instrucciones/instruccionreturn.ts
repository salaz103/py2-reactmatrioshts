import entorno from "../entorno/entorno";
import { tipo_instruccion } from "../entorno/tipo";
import expresion from "../expresiones/expresion";
import { generacion } from "../helpers/generacion";
import instruccion from "./instruccion";

export class instruccionreturn implements instruccion{

    exp:expresion;
    linea:number;
    columna:number;

    constructor(exp:expresion,linea:number,columna:number){
        this.exp=exp;
        this.linea=linea;
        this.columna=columna;
    }

    traducir(ambito: entorno) {
        const generador= generacion.getGenerador();

        //PRIMERO TENEMOS QUE VER SI ES UN RETURN CON EXPRESION
        if(this.exp!=null){
            const retorno_exp= this.exp.traducir(ambito);
            generador.stack("p",retorno_exp.obtenerValor());
            generador.agregarGoTo(ambito.etq_retorno);

        }else{

            generador.agregarGoTo(ambito.etq_retorno);
        }


    }
    
}
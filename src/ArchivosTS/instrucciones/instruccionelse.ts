import entorno from "../entorno/entorno";
import { tipo_instruccion } from "../entorno/tipo";
import instruccion from "./instruccion";
import { instruccionbreak } from "./instruccionBreak";
import { instruccioncontinue } from "./instruccioncontinue";
import { instruccionreturn } from "./instruccionreturn";

export class instruccionelse implements instruccion{

    listaelse:instruccion[];

    constructor(lista:instruccion[]){
        this.listaelse=lista;
    }

    ejecutar(ambito: entorno): object {
        //SI LLAMAN A ESTE METODO DEL ELSE, SIGNIFICA QUE NINGUNA OTRA CONDICION FUE VERDADERA
        //EN ALGUN IF O ELSE IF() DE ARRIBA
        const tselse= new entorno("ELSE",ambito);
        //ENTONCES AQUI SOLO EJECUTO LAS INSTRUCCIONES
        for (let i = 0; i < this.listaelse.length; i++) {
            let valori= this.listaelse[i].ejecutar(tselse);

            if(valori instanceof instruccionbreak || valori instanceof instruccioncontinue || valori instanceof instruccionreturn){
                return valori;
            }
            /*if(valori && valori.valueOf()==tipo_instruccion.BREAK){
                return valori;
            }else if(valori && valori.valueOf()==tipo_instruccion.CONTINUE){
                return valori;
            }else if(valori!=null){
                return valori;
            }*/
           
        }
        return null;
    }

    
}
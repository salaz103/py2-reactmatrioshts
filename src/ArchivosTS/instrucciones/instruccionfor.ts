import entorno from "../entorno/entorno";
import { tipo_instruccion } from "../entorno/tipo";
import expresion from "../expresiones/expresion";
import instruccion from "./instruccion";
import { instruccionbreak } from "./instruccionBreak";
import { instruccioncontinue } from "./instruccioncontinue";
import { instruccionreturn } from "./instruccionreturn";

export class instruccionfor implements instruccion{

primerainstruccion:instruccion;
expresion:expresion;
tercerainstruccion:instruccion;
listainstrucciones:instruccion[];

    constructor(i1:instruccion,i2:expresion,i3:instruccion,lista:instruccion[]){
        this.primerainstruccion=i1;
        this.expresion=i2;
        this.tercerainstruccion=i3;
        this.listainstrucciones=lista;
    }



    ejecutar(ambito: entorno): object {

        
        //PRIMERO HAY QUE HACER UNA NUEVA TS 
        const tsfor= new entorno("FOR",ambito);
        this.primerainstruccion.ejecutar(tsfor);

        while(this.expresion.obtenerValor(tsfor).valueOf()){
            let tsinstrucciones= new entorno("CONTENIDO_FOR",tsfor);
            for (let i = 0; i < this.listainstrucciones.length; i++) {
                //AQUI VAMOS EJECUTANDO CADA UNA DE LAS INSTRUCCIONES
                //SABEMOS QUE TODAS LAS INSTRUCCIONES DEVUELVEN NULO
                //LAS INSTRUCCIONES SOLO EJECUTAN, PERO SI VINIERA ALGUN VALOR
                // EN ESTE CASO PUEDE SER BREAK O CONTINUE
                    let resultado=this.listainstrucciones[i].ejecutar(tsinstrucciones);

                    if(resultado instanceof(instruccionbreak) || resultado instanceof(instruccionreturn)){
                        return resultado;
                    }else if(resultado instanceof instruccioncontinue){
                        break;
                    }

                    /*if(resultado && resultado.valueOf()==tipo_instruccion.BREAK){
                        //SI VIENE UNA INSTRUCCION BREAK, NO SEGUIMOS EL FOR
                        return resultado;
                    }else if(resultado && resultado.valueOf()==tipo_instruccion.CONTINUE){
                        //SI VIENE UNA FUNCION CONTINUE ENTONCES TENEMOS QUE
                        //SALIR DONDE ESTEMOS EN EL CICLO FOR Y EJECUTAR LA SIGUIENTE PASADA
                        break;
                    }else if(resultado!=null){
                        return resultado;
                    }*/
                    //console.log("RESULTADO DE UNA PASADA EN FOR:");
                    //console.log(resultado);            
            }
            this.tercerainstruccion.ejecutar(tsfor);
        }

        return null;
    }

}
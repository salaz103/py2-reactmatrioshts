import entorno from "../entorno/entorno";
import { tipo_instruccion, tipo_valor } from "../entorno/tipo";
import expresion from "../expresiones/expresion";
import instruccion from "./instruccion";
import {almacen} from '../../../src/app';
import {errores} from '../../actions/ts.js';
import { instruccionreturn } from "./instruccionreturn";
import { instruccionbreak } from "./instruccionBreak";
import { instruccioncontinue } from "./instruccioncontinue";

export class instruccionif implements instruccion{

    exp:expresion;
    instrucciones:instruccion[];

    constructor(exp:expresion, listai:instruccion[]){
        this.exp=exp;
        this.instrucciones=listai;
    }


    ejecutar(ambito: entorno): object {
        //1. OBTENER EL VALOR Y TIPO DE LA CONDICION
        //YA QUE TIENE QUE SER DE TIPO BOOLEAN
        const valorcondicion= this.exp.obtenerValor(ambito);
        const tipocondicion= this.exp.obtenerTipo(ambito);
        /*console.log("VALOR CONDICION");
        console.log(valorcondicion);
        console.log("TIPO");
        console.log(tipocondicion);*/
        if(tipocondicion==tipo_valor.BOOLEAN){
            let valorc= valorcondicion as Boolean;
            //SI ES BOOLEAN LA CONDICION ENTONCES SI SE PUEDE EJECUTAR
            
            if(valorc.valueOf()){
                const tsif= new entorno("if",ambito);
                
                for (let i = 0; i < this.instrucciones.length; i++) {
                    //AQUI TENEMOS QUE IR RECIBIENDO EL "VALOR" DE LAS INSTRUCCIONES
                    //QUE POR SER INSTRUCCIONES NO DEVUELVEN NADA
                    //A EXCEPCION DEL BREAK, CONTINUE Y RETURN
                    let valori= this.instrucciones[i].ejecutar(tsif);
                    
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
            }

        }else{
            almacen.dispatch(errores({
                tipo:'SEMANTICO',
                descripcion:'LA CONDICION '+ String(valorcondicion)+' EN EL IF, NO ES BOOLEANA',
                ambito:ambito.nombre
            }));
            console.log("ERROR - LA CONDICION "+ String(valorcondicion) +"NO ES BOOLEANA");
        }
        return null;
    }

}
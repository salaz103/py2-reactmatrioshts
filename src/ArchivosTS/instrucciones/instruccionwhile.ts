import entorno from "../entorno/entorno";
import { tipo_instruccion, tipo_valor } from "../entorno/tipo";
import expresion from "../expresiones/expresion";
import instruccion from "./instruccion";
import {almacen} from '../../../src/app';
import {errores} from '../../actions/ts.js';
import { instruccionbreak } from "./instruccionBreak";
import { instruccionreturn } from "./instruccionreturn";
import { instruccioncontinue } from "./instruccioncontinue";

export class instruccionwhile implements instruccion{

    expresioncondicion:expresion;
    lista:instruccion[];

    constructor(exp:expresion,listawhile:instruccion[]){
        this.expresioncondicion=exp;
        this.lista=listawhile;
    }


    ejecutar(ambito: entorno): object {
        //PRIMERO TENEMOS QUE VERIFICAR QUE LA EXPRESION SEA DE TIPO BOOLEANA
        //SIEMPRE ANTES DE OBTENER EL TIPO, HAY QUE EJECUTAR LA EXPRESION
        //YA QUE CUANDO SE EJECUTA ES CUANDO SE LE COLCA EL TIPO
        console.log("INICIANDO WHILE");
        const valorexpresion= this.expresioncondicion.obtenerValor(ambito);
        const tipoexpresion= this.expresioncondicion.obtenerTipo(ambito);

        if(tipoexpresion==tipo_valor.BOOLEAN){
            /*console.log("LISTA INSTRUCCIONES WHILE");
            console.log(this.lista);
            console.log("VALOR EXPRESION DE LA CONDICION");
            console.log(JSON.stringify(this.expresioncondicion.obtenerValor(ambito)));*/
            while(this.expresioncondicion.obtenerValor(ambito).valueOf()){
                const tswhile=new entorno("WHILE",ambito);
                for (let i = 0; i < this.lista.length; i++) {

                    let resultado=this.lista[i].ejecutar(tswhile);

                    //AQUI REVISAMOS SI EL VALOR DE LA INSTRUCCION ES, BREAK, CONTINUE O RETURN
                    
                    if(resultado instanceof(instruccionbreak) || resultado instanceof(instruccionreturn)){
                        return resultado;
                    }else if(resultado instanceof instruccioncontinue){
                        break;
                    }
                    
                    
                    /*if(tipoinstruccion && tipoinstruccion.valueOf()==tipo_instruccion.BREAK){
                        //SI DENTRO DEL WHILE VIENE UN BREAK ENTONCES NOS SALIMOS DEL MISMO
                        return;   

                    }else if(tipoinstruccion && tipoinstruccion.valueOf()==tipo_instruccion.CONTINUE){
                        //SI VIENE CONTINUE DENTRO DEL WHILE, ENTONCES VOLVEMOS A EJECUTAR EL WHILE
                        //EN ESTE CASO USAMOS BREAK PARA SALIRNOS DE LAS INSTRUCCIONES QUE ESTAMOS RECORRIENDO
                        break;
                    }*/
                }
            }

        }else{
            almacen.dispatch(errores({
                tipo:'SEMANTICO',
                descripcion:'LA EXPRESION EN EL WHILE NO ES DE TIPO BOOLEANA',
                ambito:ambito.nombre
            }));
            console.log("ERROR - LA EXPRESION EN EL WHILE NO ES DE TIPO BOOLEANA");
        }

        return null;
    }


}
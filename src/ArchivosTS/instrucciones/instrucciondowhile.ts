import entorno from "../entorno/entorno";
import instruccion from "./instruccion";
import {almacen} from '../../../src/app';
import {errores} from '../../actions/ts.js';
import expresion from "../expresiones/expresion";
import { generacion } from "../helpers/generacion";
import { tipo_ambito, tipo_dato } from "../entorno/tipo";

export class instrucciondowhile implements instruccion{

    lista_do:instruccion[];
    condicion:expresion;
    linea:number;
    columna:number;

    constructor(lista:instruccion[],exp:expresion,linea:number,columna:number){
        this.lista_do=lista;
        this.condicion=exp;
        this.linea=linea;
        this.columna= columna;
    }

    traducir(ambito: entorno) {

        const generador= generacion.getGenerador();
        const ambito_dowhile= new entorno("DO-WHILE",tipo_ambito.LOCAL,ambito);
        //PENDIENTE
        /**REVISAR LO DEL BREAK O CONTINUE */

        generador.agregarComentarios("INICIO- DO_WHILE");
        let etiqueta_inicio= generador.generarEtiqueta();
        generador.agregarEtiqueta(etiqueta_inicio);
        for (let i = 0; i < this.lista_do.length; i++) {
            let retorno_ins= this.lista_do[i].traducir(ambito_dowhile)
        }
        //YA TERMINAMOS DE TRADUCIR LAS INSTRUCCIONES, TOCA LA CONDICION
        let retorno_condicion= this.condicion.traducir(ambito);
        if(retorno_condicion.tipodato==tipo_dato.BOOLEAN){
            generador.agregarEtiqueta(retorno_condicion.etiquetastrue);
            generador.agregarGoTo(etiqueta_inicio);
            generador.agregarEtiqueta(retorno_condicion.etiquetasfalse);
            generador.agregarComentarios("FIN- DO_WHILE");
        }else{

            almacen.dispatch(errores({
                tipo:'SEMANTICO',
                descripcion:'LA EXPRESION EN EL DO-WHILE NO ES DE TIPO BOOLEANA',
                ambito:ambito.nombre,
                linea:this.linea,
                columna:this.columna
            }));

        }


    }

}
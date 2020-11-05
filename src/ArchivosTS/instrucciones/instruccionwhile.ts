import entorno from "../entorno/entorno";
import { tipo_ambito, tipo_dato } from "../entorno/tipo";
import expresion from "../expresiones/expresion";
import { generacion } from "../helpers/generacion";
import instruccion from "./instruccion";
import {almacen} from '../../../src/app';
import {errores} from '../../actions/ts.js';

export class instruccionwhile implements instruccion{

    expresioncondicion:expresion;
    lista:instruccion[];
    linea:number;
    columna:number;

    constructor(exp:expresion,listawhile:instruccion[],linea:number,columna:number){
        this.expresioncondicion=exp;
        this.lista=listawhile;
        this.linea=linea;
        this.columna= columna;
    }

    traducir(ambito: entorno) {
       //PRIMERO TENEMOS QUE VERIFICAR QUE LA EXPRESION SEA DE TIPO BOOLEANA
        //SIEMPRE ANTES DE OBTENER EL TIPO, HAY QUE TRADUCIR LA EXPRESION
        //YA QUE CUANDO SE TRADUCE ES CUANDO SE LE COLCA EL TIPO
        const generador= generacion.getGenerador();
        const ambito_While= new entorno("WHILE",tipo_ambito.LOCAL,ambito);
        generador.agregarComentarios("INICIANDO WHILE");
        let etiqueta_inicio= generador.generarEtiqueta();
        generador.agregarEtiqueta(etiqueta_inicio);
        let retorno_condicion= this.expresioncondicion.traducir(ambito);

        if(retorno_condicion.tipodato==tipo_dato.BOOLEAN){
            ambito_While.etq_break= retorno_condicion.etiquetasfalse;
            ambito_While.etq_continue= etiqueta_inicio;

            //SI LA CONDICION ES BOOLEAN, PODEMOS SEGUIR TRADUCIENDO
            generador.agregarEtiqueta(retorno_condicion.etiquetastrue);
            //AHORA SE COMIENZA A TRADUCIR EL CUERPO DE LA FUNCION
            for (let i = 0; i < this.lista.length; i++) {
                let retorno_ins= this.lista[i].traducir(ambito_While)
            }
            generador.agregarGoTo(etiqueta_inicio);
            generador.agregarEtiqueta(retorno_condicion.etiquetasfalse);
            generador.agregarComentarios("FIN - WHILE");

        }else{

            almacen.dispatch(errores({
                tipo:'SEMANTICO',
                descripcion:'LA EXPRESION EN EL WHILE NO ES DE TIPO BOOLEANA',
                ambito:ambito.nombre,
                linea:this.linea,
                columna:this.columna
            }));

        }


    }
    
}
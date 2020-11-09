import entorno from "../entorno/entorno";
import { tipo_dato } from "../entorno/tipo";
import { generacion } from "../helpers/generacion";
import expresion from "./expresion";
import { traduccionexp } from "./traduccionexp";
import { almacen } from '../../../src/app';
import { errores } from '../../actions/ts.js';

export class operadorternario implements expresion {

    condicion: expresion;
    expresiontrue: expresion;
    expresionfalse: expresion;
    linea: number;
    columna: number;

    constructor(c: expresion, et: expresion, ef: expresion, linea: number, columna: number) {
        this.condicion = c;
        this.expresiontrue = et;
        this.expresionfalse = ef;
        this.linea = linea;
        this.columna = columna;
    }


    traducir(ambito: entorno): traduccionexp {
        const generador = generacion.getGenerador();
        const retornocondicion = this.condicion.traducir(ambito);

        if (retornocondicion.tipodato == tipo_dato.BOOLEAN) {
            const etiqueta_salida_ternario = generador.generarEtiqueta();
            const tmp_retorno = generador.generarTemporal();
            generador.agregarEtiqueta(retornocondicion.etiquetastrue);
            const retorno_true = this.expresiontrue.traducir(ambito);
            if (retorno_true.tipodato != tipo_dato.BOOLEAN) {
                generador.agregarExpresion(tmp_retorno, retorno_true.obtenerValor(), "", "");
                generador.agregarGoTo(etiqueta_salida_ternario);
            } else {
                //ES BOOLEAN
                const tmp_guardado = generador.generarTemporal();
                generador.sacarTemporal(tmp_guardado);
                const etiqueta_salida = generador.generarEtiqueta();
                generador.agregarEtiqueta(retorno_true.etiquetastrue);
                generador.agregarExpresion(tmp_guardado, "1", "", "",);
                generador.agregarGoTo(etiqueta_salida);
                generador.agregarEtiqueta(retorno_true.etiquetasfalse);
                generador.agregarExpresion(tmp_guardado, "0", "", "",);
                generador.agregarEtiqueta(etiqueta_salida);
                generador.agregarExpresion(tmp_retorno, tmp_guardado, "", "");
                generador.agregarGoTo(etiqueta_salida_ternario);

            }
            generador.agregarEtiqueta(retornocondicion.etiquetasfalse);
            const retorno_false = this.expresionfalse.traducir(ambito);
            if (retorno_false.tipodato != tipo_dato.BOOLEAN) {
                generador.agregarExpresion(tmp_retorno, retorno_false.obtenerValor(), "", "");
                generador.agregarGoTo(etiqueta_salida_ternario);
            } else {
                //ES BOOLEAN
                const tmp_guardado = generador.generarTemporal();
                generador.sacarTemporal(tmp_guardado);
                const etiqueta_salida = generador.generarEtiqueta();
                generador.agregarEtiqueta(retorno_false.etiquetastrue);
                generador.agregarExpresion(tmp_guardado, "1", "", "",);
                generador.agregarGoTo(etiqueta_salida);
                generador.agregarEtiqueta(retorno_false.etiquetasfalse);
                generador.agregarExpresion(tmp_guardado, "0", "", "",);
                generador.agregarEtiqueta(etiqueta_salida);
                generador.agregarExpresion(tmp_retorno, tmp_guardado, "", "");
                generador.agregarGoTo(etiqueta_salida_ternario);
            }
            generador.agregarEtiqueta(etiqueta_salida_ternario);


            if(retorno_true.tipodato== retorno_false.tipodato){
                //SI SON IGUALES ENTONCES LO DEVOLVEMOS
                if (retorno_true.tipodato == tipo_dato.BOOLEAN || retorno_false.tipodato == tipo_dato.BOOLEAN) {
                    let etqtrue = generador.generarEtiqueta();
                    let etqfalse = generador.generarEtiqueta();
                    const retvalor = new traduccionexp("", false, tipo_dato.BOOLEAN, true);
                    generador.sacarTemporal(tmp_retorno);
                    generador.agregarIf(tmp_retorno, "==", "1", etqtrue);
                    generador.agregarGoTo(etqfalse);
                    retvalor.etiquetastrue = etqtrue;
                    retvalor.etiquetasfalse = etqfalse;
                    return retvalor;
                } else {
                    return new traduccionexp(tmp_retorno, true, retorno_true.tipodato, false);
                }

            }else{
                almacen.dispatch(errores({
                    tipo: 'SEMANTICO',
                    descripcion: 'TIPOS EN TERNARIO NO SON DEL MISMO TIPO, SE RECIBIO: '+retorno_true.tipodato+" Y "+retorno_false.tipodato,
                    ambito: ambito.nombre,
                    linea: this.linea,
                    columna: this.columna
                }));
                return new traduccionexp("", false, tipo_dato.UNDEFINED, false);
            }

            

        } else {
            almacen.dispatch(errores({
                tipo: 'SEMANTICO',
                descripcion: 'CONDICION EN TERNARIO, NO ES DE TIPO BOOLEAN',
                ambito: ambito.nombre,
                linea: this.linea,
                columna: this.columna
            }));
            return new traduccionexp("", false, tipo_dato.UNDEFINED, false);
        }

    }

}
import entorno from "../../entorno/entorno";
import { operador, tipo_dato } from "../../entorno/tipo";
import { generacion } from "../../helpers/generacion";
import expresion from "../expresion";
import { traduccionexp } from "../traduccionexp";
import operacion from "./operacion";
import { almacen } from '../../../../src/app';
import { errores } from '../../../actions/ts.js';

export class igualdad extends operacion implements expresion {

    tipodato: tipo_dato;
    linea: number;
    columna: number;

    constructor(expiz: expresion, op: operador, expder: expresion, linea: number, columna: number) {
        super(expiz, op, expder);
        this.linea = linea;
        this.columna = columna;
    }

    traducir(ambito: entorno) {
        const generador = generacion.getGenerador();
        const retornoizquierdo = this.expresionizquierda.traducir(ambito);
        //const retornoderecho= this.expresionderecha.traducir(ambito);


        if ((retornoizquierdo.tipodato == tipo_dato.ENTERO || retornoizquierdo.tipodato == tipo_dato.DECIMAL)) {
            const retornoderecho = this.expresionderecha.traducir(ambito);
            if (retornoderecho.tipodato == tipo_dato.DECIMAL || retornoderecho.tipodato == tipo_dato.ENTERO) {
                let etiquetatrue = generador.generarEtiqueta();
                let etiquetafalse = generador.generarEtiqueta();
                generador.agregarIf(retornoizquierdo.obtenerValor(), "==", retornoderecho.obtenerValor(), etiquetatrue);
                generador.agregarGoTo(etiquetafalse);
                const valorretorno = new traduccionexp("", false, tipo_dato.BOOLEAN, true);
                valorretorno.etiquetastrue = etiquetatrue;
                valorretorno.etiquetasfalse = etiquetafalse;
                return valorretorno;
            } else {
                //ERROR , IGUALDAD SOLO SE PUEDE ENTRE NUMEROS
                almacen.dispatch(errores({
                    tipo: 'SEMANTICO',
                    descripcion: retornoizquierdo + ' SOLO SE PUEDE IGUALAR CON NUMBER, SE RECIBIO ' + retornoderecho.tipodato,
                    ambito: ambito.nombre,
                    linea: this.linea,
                    columna: this.columna
                }));
                //COMO NO SE PUDO REALIZAR LA IGUALACION, HAY QUE SACAR EL TEMPORAL DEL LADO IZQUIERDO
                retornoizquierdo.obtenerValor();
                return new traduccionexp("", false, tipo_dato.UNDEFINED, false);
            }

        } else if (retornoizquierdo.tipodato == tipo_dato.BOOLEAN) {
            generador.agregarEtiqueta(retornoizquierdo.etiquetastrue);
            const tmp_bool1 = generador.generarTemporal();
            generador.sacarTemporal(tmp_bool1);
            const etiqueta_salida1 = generador.generarEtiqueta();
            generador.agregarExpresion(tmp_bool1, "1", "", "");
            generador.agregarGoTo(etiqueta_salida1);
            generador.agregarEtiqueta(retornoizquierdo.etiquetasfalse);
            generador.agregarExpresion(tmp_bool1, "0", "", "");
            generador.agregarEtiqueta(etiqueta_salida1);
            const retornoderecho = this.expresionderecha.traducir(ambito);
            console.log(retornoderecho);
            if (retornoderecho.tipodato == tipo_dato.BOOLEAN) {
                generador.agregarEtiqueta(retornoderecho.etiquetastrue);
                const tmp_bool2 = generador.generarTemporal();
                const etiqueta_salida2 = generador.generarEtiqueta();
                generador.agregarExpresion(tmp_bool2, "1", "", "");
                generador.agregarGoTo(etiqueta_salida2);
                generador.agregarEtiqueta(retornoderecho.etiquetasfalse);
                generador.agregarExpresion(tmp_bool2, "0", "", "");
                generador.agregarEtiqueta(etiqueta_salida2);
                //YA HACEMOS LA IGUALACION
                let etiquetatrueigual = generador.generarEtiqueta();
                let etiquetafalseigual = generador.generarEtiqueta();
                generador.agregarIf(tmp_bool1, "==", tmp_bool2, etiquetatrueigual);
                generador.agregarGoTo(etiquetafalseigual);
                generador.sacarTemporal(tmp_bool2);
                const valorretorno = new traduccionexp("", false, tipo_dato.BOOLEAN, true);
                valorretorno.etiquetastrue = etiquetatrueigual;
                valorretorno.etiquetasfalse = etiquetafalseigual;
                return valorretorno;
            } else {
                //ERROR - BOOLEAN SOLO SE PUEDE IGUALAR CON BOOLEAN
                console.log("ERROR- BOOLEAN SOLO SE PUEDE IGUALAR CON BOOLEAN");
                almacen.dispatch(errores({
                    tipo: 'SEMANTICO',
                    descripcion: 'BOOLEAN SOLO SE PUEDE IGUALAR CON BOOLEAN',
                    ambito: ambito.nombre,
                    linea: this.linea,
                    columna: this.columna
                }));

                return new traduccionexp("", false, tipo_dato.UNDEFINED, false);
            }

        } else if (retornoizquierdo.tipodato == tipo_dato.STRING) {
            const retornoderecho = this.expresionderecha.traducir(ambito);
            if (retornoderecho.tipodato == tipo_dato.STRING) {
                const temp_parametros = generador.generarTemporal();
                generador.sacarTemporal(temp_parametros);
                generador.agregarExpresion(temp_parametros,"p","+",ambito.tamaño+1);
                generador.stack(temp_parametros,retornoizquierdo.obtenerValor());
                generador.agregarExpresion(temp_parametros,temp_parametros,"+","1");
                generador.stack(temp_parametros,retornoderecho.obtenerValor());
                generador.moverAmbito(ambito.tamaño);
                generador.agregarcodigo3d("igualacion_strings();");
                const temporal_resultado= generador.generarTemporal();
                generador.getValorStack(temporal_resultado,"p");
                generador.regresarAmbito(ambito.tamaño);

                let etiqueta_true= generador.generarEtiqueta();
                let etiqueta_false= generador.generarEtiqueta();
                generador.agregarIf(temporal_resultado,"==","1",etiqueta_true);
                generador.agregarGoTo(etiqueta_false);
                const regreso= new traduccionexp("",false,tipo_dato.BOOLEAN,true,);
                regreso.etiquetastrue=etiqueta_true;
                regreso.etiquetasfalse=etiqueta_false;
                return regreso;

            } else if (retornoderecho.tipodato == null) {
                //PENDIENTE
            } else {
                //SI NO SE PUEDE LA IGUALDAD ENTRE STRING, HAY QUE SACAR EL VALOR DEL LADO IZQUIERDO
                retornoizquierdo.obtenerValor();
                //ERROR
            }

        }





        return null;
    }

}
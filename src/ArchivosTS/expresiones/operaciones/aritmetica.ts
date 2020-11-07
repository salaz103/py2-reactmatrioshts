import entorno from "../../entorno/entorno";
import { operador, tipo_dato } from "../../entorno/tipo";
import { generacion } from "../../helpers/generacion";
import expresion from "../expresion";
import { traduccionexp } from "../traduccionexp";
import operacion from "./operacion";
import { almacen } from '../../../../src/app';
import { errores } from '../../../actions/ts.js';

export class aritmetica extends operacion implements expresion {

    linea: number;
    columna: number;

    constructor(expiz: expresion, op: operador, expder: expresion, linea: number, columna: number) {
        super(expiz, op, expder);
        this.linea = linea;
        this.columna = columna;
    }


    traducir(ambito: entorno) {
        const generador = generacion.getGenerador();
        const valorizquierdo: traduccionexp = this.expresionizquierda.traducir(ambito);
        const valorderecha: traduccionexp = this.expresionderecha.traducir(ambito);
        const temporalresultado = generador.generarTemporal();




        //**********************************SUMA********************************************************** */
        if (this.tipooperador == operador.MAS) {
            //STRING - NUMBER, SALIDA= STRING
            //STRING - BOOLEAN, SALIDA =STRING
            //STRING - STRING

            switch (valorizquierdo.tipodato) {
                case tipo_dato.ENTERO:
                    switch (valorderecha.tipodato) {
                        case tipo_dato.ENTERO:
                        case tipo_dato.DECIMAL:
                            generador.agregarExpresion(temporalresultado, valorizquierdo.obtenerValor(), "+", valorderecha.obtenerValor());
                            return new traduccionexp(temporalresultado, true, valorderecha.tipodato == tipo_dato.DECIMAL ? valorderecha.tipodato : valorizquierdo.tipodato, false);
                        case tipo_dato.BOOLEAN:
                            let tmp_guardado = generador.generarTemporal();
                            let etiqueta_salida = generador.generarEtiqueta();
                            generador.sacarTemporal(tmp_guardado);
                            generador.agregarEtiqueta(valorderecha.etiquetastrue);
                            generador.agregarExpresion(tmp_guardado, "1", "", "");
                            generador.agregarGoTo(etiqueta_salida);
                            generador.agregarEtiqueta(valorderecha.etiquetasfalse);
                            generador.agregarExpresion(tmp_guardado, "0", "", "");
                            generador.agregarEtiqueta(etiqueta_salida);
                            generador.agregarExpresion(temporalresultado, valorizquierdo.obtenerValor(), "+", tmp_guardado);
                            return new traduccionexp(temporalresultado, true, tipo_dato.ENTERO, false);
                        //FALTA
                        //ENTERO -STRING
                        default:
                            almacen.dispatch(errores({
                                tipo: 'SEMANTICO',
                                descripcion: valorizquierdo.tipodato + ' NO SE PUEDE SUMAR CON ' + valorderecha.tipodato,
                                ambito: ambito.nombre,
                                linea: this.linea,
                                columna: this.columna
                            }));
                            break;
                    }
                    break;
                case tipo_dato.DECIMAL:
                    switch (valorderecha.tipodato) {
                        case tipo_dato.ENTERO:
                        case tipo_dato.DECIMAL:
                            generador.agregarExpresion(temporalresultado, valorizquierdo.obtenerValor(), "+", valorderecha.obtenerValor());
                            return new traduccionexp(temporalresultado, true, tipo_dato.DECIMAL, false);
                        case tipo_dato.BOOLEAN:
                            let tmp_guardado = generador.generarTemporal();
                            let etiqueta_salida = generador.generarEtiqueta();
                            generador.sacarTemporal(tmp_guardado);
                            generador.agregarEtiqueta(valorderecha.etiquetastrue);
                            generador.agregarExpresion(tmp_guardado, "1", "", "");
                            generador.agregarGoTo(etiqueta_salida);
                            generador.agregarEtiqueta(valorderecha.etiquetasfalse);
                            generador.agregarExpresion(tmp_guardado, "0", "", "");
                            generador.agregarEtiqueta(etiqueta_salida);
                            generador.agregarExpresion(temporalresultado, valorizquierdo.obtenerValor(), "+", tmp_guardado);
                            return new traduccionexp(temporalresultado, true, tipo_dato.DECIMAL, false);
                        //FALTA
                        //DECIMAL -STRING
                        default:
                            almacen.dispatch(errores({
                                tipo: 'SEMANTICO',
                                descripcion: valorizquierdo.tipodato + ' NO SE PUEDE SUMAR CON ' + valorderecha.tipodato,
                                ambito: ambito.nombre,
                                linea: this.linea,
                                columna: this.columna
                            }));
                            break;
                    }
                    break;
                case tipo_dato.BOOLEAN:
                    switch (valorderecha.tipodato) {
                        case tipo_dato.ENTERO:
                        case tipo_dato.DECIMAL:
                                let tmp_guardado = generador.generarTemporal();
                                let etiqueta_salida = generador.generarEtiqueta();
                                generador.sacarTemporal(tmp_guardado);
                                generador.agregarEtiqueta(valorizquierdo.etiquetastrue);
                                generador.agregarExpresion(tmp_guardado, "1", "", "");
                                generador.agregarGoTo(etiqueta_salida);
                                generador.agregarEtiqueta(valorizquierdo.etiquetasfalse);
                                generador.agregarExpresion(tmp_guardado, "0", "", "");
                                generador.agregarEtiqueta(etiqueta_salida);
                                generador.agregarExpresion(temporalresultado, tmp_guardado, "+", valorderecha.obtenerValor());
                                return new traduccionexp(temporalresultado, true, valorderecha.tipodato == tipo_dato.ENTERO ? tipo_dato.ENTERO : tipo_dato.DECIMAL, false);

                        //FALTA
                        //BOOLEAN -STRING
                        default:
                            almacen.dispatch(errores({
                                tipo: 'SEMANTICO',
                                descripcion: valorizquierdo.tipodato + ' NO SE PUEDE SUMAR CON ' + valorderecha.tipodato,
                                ambito: ambito.nombre,
                                linea: this.linea,
                                columna: this.columna
                            }));
                            break;
                    }
                    break;
                case tipo_dato.STRING:
                    const tmp_p= generador.generarTemporal();
                    generador.sacarTemporal(tmp_p);
                    switch(valorderecha.tipodato){
                        case tipo_dato.ENTERO:
                            generador.agregarExpresion(tmp_p,"p","+",ambito.tamaño+1);
                            generador.stack(tmp_p,valorizquierdo.obtenerValor());
                            generador.agregarExpresion(tmp_p,tmp_p,"+","1");
                            generador.stack(tmp_p,valorderecha.obtenerValor());
                            generador.moverAmbito(ambito.tamaño);
                            generador.agregarcodigo3d("union_string_entero();");
                            generador.getValorStack(temporalresultado,"p");
                            generador.regresarAmbito(ambito.tamaño);
                            return new traduccionexp(temporalresultado,true,tipo_dato.STRING,false);
                        
                            default:
                                break

                    }


                    break;

                default:
                    break;
            }

            //***************************************************RESTA************************************* */
        } else if (this.tipooperador == operador.MENOS) {

            if (valorizquierdo.tipodato == tipo_dato.ENTERO && valorderecha.tipodato == tipo_dato.ENTERO) {
                generador.agregarExpresion(temporalresultado, valorizquierdo.obtenerValor(), "-", valorderecha.obtenerValor());
                return new traduccionexp(temporalresultado, true, tipo_dato.ENTERO, false);
            } else if (valorizquierdo.tipodato == tipo_dato.ENTERO && valorderecha.tipodato == tipo_dato.DECIMAL) {
                generador.agregarExpresion(temporalresultado, valorizquierdo.obtenerValor(), "-", valorderecha.obtenerValor());
                return new traduccionexp(temporalresultado, true, tipo_dato.DECIMAL, false);
            } else if (valorizquierdo.tipodato == tipo_dato.DECIMAL && valorderecha.tipodato == tipo_dato.ENTERO) {
                generador.agregarExpresion(temporalresultado, valorizquierdo.obtenerValor(), "-", valorderecha.obtenerValor());
                return new traduccionexp(temporalresultado, true, tipo_dato.DECIMAL, false);
            } else if (valorizquierdo.tipodato == tipo_dato.DECIMAL && valorderecha.tipodato == tipo_dato.DECIMAL) {
                generador.agregarExpresion(temporalresultado, valorizquierdo.obtenerValor(), "-", valorderecha.obtenerValor());
                return new traduccionexp(temporalresultado, true, tipo_dato.DECIMAL, false);
            } else {
                almacen.dispatch(errores({
                    tipo: 'SEMANTICO',
                    descripcion: valorizquierdo.tipodato + ' NO SE PUEDE RESTAR CON ' + valorderecha.tipodato,
                    ambito: ambito.nombre,
                    linea: this.linea,
                    columna: this.columna
                }));
            }
            //***************************************************MULTIPLICACION************************************* */
        } else if (this.tipooperador == operador.POR) {

            if (valorizquierdo.tipodato == tipo_dato.ENTERO && valorderecha.tipodato == tipo_dato.ENTERO) {
                generador.agregarExpresion(temporalresultado, valorizquierdo.obtenerValor(), "*", valorderecha.obtenerValor());
                return new traduccionexp(temporalresultado, true, tipo_dato.ENTERO, false);
            } else if (valorizquierdo.tipodato == tipo_dato.ENTERO && valorderecha.tipodato == tipo_dato.DECIMAL) {
                generador.agregarExpresion(temporalresultado, valorizquierdo.obtenerValor(), "*", valorderecha.obtenerValor());
                return new traduccionexp(temporalresultado, true, tipo_dato.DECIMAL, false);
            } else if (valorizquierdo.tipodato == tipo_dato.DECIMAL && valorderecha.tipodato == tipo_dato.ENTERO) {
                generador.agregarExpresion(temporalresultado, valorizquierdo.obtenerValor(), "*", valorderecha.obtenerValor());
                return new traduccionexp(temporalresultado, true, tipo_dato.DECIMAL, false);
            } else if (valorizquierdo.tipodato == tipo_dato.DECIMAL && valorderecha.tipodato == tipo_dato.DECIMAL) {
                generador.agregarExpresion(temporalresultado, valorizquierdo.obtenerValor(), "*", valorderecha.obtenerValor());
                return new traduccionexp(temporalresultado, true, tipo_dato.DECIMAL, false);
            } else {
                almacen.dispatch(errores({
                    tipo: 'SEMANTICO',
                    descripcion: valorizquierdo.tipodato + ' NO SE PUEDE MULTIPLICAR CON ' + valorderecha.tipodato,
                    ambito: ambito.nombre,
                    linea: this.linea,
                    columna: this.columna
                }));
            }

            //***************************************************DIVISION************************************* */
        } else if (this.tipooperador == operador.DIVISION) {

            if (!valorderecha.es_temporal && valorderecha.valor == '0') {
                almacen.dispatch(errores({
                    tipo: 'SEMANTICO',
                    descripcion: 'DIVISION ENTRE 0, NO ESTA PERMITIDA',
                    ambito: ambito.nombre,
                    linea: this.linea,
                    columna: this.columna
                }));
            } else {

                if (valorizquierdo.tipodato == tipo_dato.ENTERO && valorderecha.tipodato == tipo_dato.ENTERO) {
                    generador.agregarExpresion(temporalresultado, valorizquierdo.obtenerValor(), "/", valorderecha.obtenerValor());
                    return new traduccionexp(temporalresultado, true, tipo_dato.ENTERO, false);
                } else if (valorizquierdo.tipodato == tipo_dato.ENTERO && valorderecha.tipodato == tipo_dato.DECIMAL) {
                    generador.agregarExpresion(temporalresultado, valorizquierdo.obtenerValor(), "/", valorderecha.obtenerValor());
                    return new traduccionexp(temporalresultado, true, tipo_dato.DECIMAL, false);
                } else if (valorizquierdo.tipodato == tipo_dato.DECIMAL && valorderecha.tipodato == tipo_dato.ENTERO) {
                    generador.agregarExpresion(temporalresultado, valorizquierdo.obtenerValor(), "/", valorderecha.obtenerValor());
                    return new traduccionexp(temporalresultado, true, tipo_dato.DECIMAL, false);
                } else if (valorizquierdo.tipodato == tipo_dato.DECIMAL && valorderecha.tipodato == tipo_dato.DECIMAL) {
                    generador.agregarExpresion(temporalresultado, valorizquierdo.obtenerValor(), "/", valorderecha.obtenerValor());
                    return new traduccionexp(temporalresultado, true, tipo_dato.DECIMAL, false);
                } else {
                    almacen.dispatch(errores({
                        tipo: 'SEMANTICO',
                        descripcion: valorizquierdo.tipodato + ' NO SE PUEDE DIVIDIR CON ' + valorderecha.tipodato,
                        ambito: ambito.nombre,
                        linea: this.linea,
                        columna: this.columna
                    }));
                }

            }



            //***************************************************MODULO************************************* */
        } else if (this.tipooperador == operador.MODULO) {

            if (valorizquierdo.tipodato == tipo_dato.ENTERO && valorderecha.tipodato == tipo_dato.ENTERO) {
                generador.agregarExpresion(temporalresultado, "fmod(" + valorizquierdo.obtenerValor() + "," + valorderecha.obtenerValor() + ")", "", "");
                return new traduccionexp(temporalresultado, true, tipo_dato.DECIMAL, false);
            } else if (valorizquierdo.tipodato == tipo_dato.ENTERO && valorderecha.tipodato == tipo_dato.DECIMAL) {
                generador.agregarExpresion(temporalresultado, "fmod(" + valorizquierdo.obtenerValor() + "," + valorderecha.obtenerValor() + ")", "", "");
                return new traduccionexp(temporalresultado, true, tipo_dato.DECIMAL, false);
            } else if (valorizquierdo.tipodato == tipo_dato.DECIMAL && valorderecha.tipodato == tipo_dato.ENTERO) {
                generador.agregarExpresion(temporalresultado, "fmod(" + valorizquierdo.obtenerValor() + "," + valorderecha.obtenerValor() + ")", "", "");
                return new traduccionexp(temporalresultado, true, tipo_dato.DECIMAL, false);
            } if (valorizquierdo.tipodato == tipo_dato.DECIMAL && valorderecha.tipodato == tipo_dato.DECIMAL) {
                generador.agregarExpresion(temporalresultado, "fmod(" + valorizquierdo.obtenerValor() + "," + valorderecha.obtenerValor() + ")", "", "");
                return new traduccionexp(temporalresultado, true, tipo_dato.DECIMAL, false);
            } else {
                almacen.dispatch(errores({
                    tipo: 'SEMANTICO',
                    descripcion: valorizquierdo.tipodato + ' NO SE PUEDE REALIZAR MOD CON ' + valorderecha.tipodato,
                    ambito: ambito.nombre,
                    linea: this.linea,
                    columna: this.columna
                }));
            }
            //***************************************************POTENCIA-EXPONENTE************************************* */
        } else if (this.tipooperador == operador.EXPONENTE) {
                if(valorizquierdo.tipodato == tipo_dato.ENTERO && valorderecha.tipodato == tipo_dato.ENTERO){
                    //COMENZAMOS A PASAR LOS PARAMETROS, LA BASE Y EL EXPONENTE
                    generador.agregarExpresion(temporalresultado,"p","+",ambito.tamaño+1);
                    //PASAMOS LA BASE
                    generador.stack(temporalresultado,valorizquierdo.obtenerValor());
                    generador.agregarExpresion(temporalresultado,temporalresultado,"+","1");
                    //PASAMOS EL EXPONENTE
                    generador.stack(temporalresultado,valorderecha.obtenerValor());
                    //CAMBIAR DE AMBITO
                    generador.moverAmbito(ambito.tamaño);
                    generador.agregarcodigo3d("potencia();")
                    generador.getValorStack(temporalresultado,"p");
                    //REGRESAMOS AL AMBITO DE DONDE HICIMOS LA LLAMADA
                    generador.regresarAmbito(ambito.tamaño);
                    return new traduccionexp(temporalresultado,true,tipo_dato.ENTERO,false);

                }else{
                    almacen.dispatch(errores({
                        tipo: 'SEMANTICO',
                        descripcion: valorizquierdo.tipodato + ' NO SE PUEDE REALIZAR POTENCIA CON ' + valorderecha.tipodato,
                        ambito: ambito.nombre,
                        linea: this.linea,
                        columna: this.columna
                    }));
                }

        }

        return new traduccionexp("", false, tipo_dato.UNDEFINED, false);
    }

}
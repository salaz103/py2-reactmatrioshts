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
        //const valorizquierdo: traduccionexp = this.expresionizquierda.traducir(ambito);
        //const valorderecha: traduccionexp = this.expresionderecha.traducir(ambito);
        let valorizquierdo = this.expresionizquierda.traducir(ambito);
        const temporalresultado = generador.generarTemporal();


        if (this.tipooperador == operador.MAS) {

            switch (valorizquierdo.tipodato) {
                case tipo_dato.ENTERO:
                    const valorderecha: traduccionexp = this.expresionderecha.traducir(ambito);
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
                        case tipo_dato.STRING:
                            const tmp_p = generador.generarTemporal();
                            generador.sacarTemporal(tmp_p);
                            generador.agregarExpresion(tmp_p, "p", "+", ambito.tamaño + 1);
                            generador.stack(tmp_p, valorizquierdo.obtenerValor());
                            generador.agregarExpresion(tmp_p, tmp_p, "+", "1");
                            generador.stack(tmp_p, valorderecha.obtenerValor());
                            generador.moverAmbito(ambito.tamaño);
                            generador.agregarcodigo3d("union_entero_string();");
                            generador.getValorStack(temporalresultado, "p");
                            generador.regresarAmbito(ambito.tamaño);
                            return new traduccionexp(temporalresultado, true, tipo_dato.STRING, false);
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
                    const valorderecha2: traduccionexp = this.expresionderecha.traducir(ambito);
                    switch (valorderecha2.tipodato) {
                        case tipo_dato.ENTERO:
                        case tipo_dato.DECIMAL:
                            generador.agregarExpresion(temporalresultado, valorizquierdo.obtenerValor(), "+", valorderecha2.obtenerValor());
                            return new traduccionexp(temporalresultado, true, tipo_dato.DECIMAL, false);
                        case tipo_dato.BOOLEAN:
                            let tmp_guardado = generador.generarTemporal();
                            let etiqueta_salida = generador.generarEtiqueta();
                            generador.sacarTemporal(tmp_guardado);
                            generador.agregarEtiqueta(valorderecha2.etiquetastrue);
                            generador.agregarExpresion(tmp_guardado, "1", "", "");
                            generador.agregarGoTo(etiqueta_salida);
                            generador.agregarEtiqueta(valorderecha2.etiquetasfalse);
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
                    let tmp_guardado = generador.generarTemporal();
                    let etiqueta_salida = generador.generarEtiqueta();
                    generador.sacarTemporal(tmp_guardado);
                    generador.agregarEtiqueta(valorizquierdo.etiquetastrue);
                    generador.agregarExpresion(tmp_guardado, "1", "", "");
                    generador.agregarGoTo(etiqueta_salida);
                    generador.agregarEtiqueta(valorizquierdo.etiquetasfalse);
                    generador.agregarExpresion(tmp_guardado, "0", "", "");
                    generador.agregarEtiqueta(etiqueta_salida);
                    const valorderecha3: traduccionexp = this.expresionderecha.traducir(ambito);
                    switch (valorderecha3.tipodato) {
                        case tipo_dato.ENTERO:
                        case tipo_dato.DECIMAL:
                            generador.agregarExpresion(temporalresultado, tmp_guardado, "+", valorderecha3.obtenerValor());
                            return new traduccionexp(temporalresultado, true, valorderecha3.tipodato == tipo_dato.ENTERO ? tipo_dato.ENTERO : tipo_dato.DECIMAL, false);
                        case tipo_dato.STRING:
                            const tparametro= generador.generarTemporal();
                            generador.sacarTemporal(tparametro);
                            generador.agregarExpresion(tparametro,"p","+",ambito.tamaño+1);
                            generador.stack(tparametro,tmp_guardado);
                            generador.agregarExpresion(tparametro,tparametro,"+","1");
                            generador.stack(tparametro,valorderecha3.obtenerValor());
                            generador.moverAmbito(ambito.tamaño);
                            generador.agregarcodigo3d("concat_boolean_string();");
                            generador.getValorStack(temporalresultado, "p");
                            generador.regresarAmbito(ambito.tamaño);
                            return new traduccionexp(temporalresultado, true, tipo_dato.STRING, false);
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
                    const tmp_p = generador.generarTemporal();
                    generador.sacarTemporal(tmp_p);
                    const valorderecha4: traduccionexp = this.expresionderecha.traducir(ambito);
                    switch (valorderecha4.tipodato) {
                        case tipo_dato.ENTERO:
                            generador.agregarExpresion(tmp_p, "p", "+", ambito.tamaño + 1);
                            generador.stack(tmp_p, valorizquierdo.obtenerValor());
                            generador.agregarExpresion(tmp_p, tmp_p, "+", "1");
                            generador.stack(tmp_p, valorderecha4.obtenerValor());
                            generador.moverAmbito(ambito.tamaño);
                            generador.agregarcodigo3d("union_string_entero();");
                            generador.getValorStack(temporalresultado, "p");
                            generador.regresarAmbito(ambito.tamaño);
                            return new traduccionexp(temporalresultado, true, tipo_dato.STRING, false);

                        case tipo_dato.STRING:
                            generador.agregarExpresion(tmp_p, "p", "+", ambito.tamaño + 1);
                            generador.stack(tmp_p, valorizquierdo.obtenerValor());
                            generador.agregarExpresion(tmp_p, tmp_p, "+", "1");
                            generador.stack(tmp_p, valorderecha4.obtenerValor());
                            generador.moverAmbito(ambito.tamaño);
                            generador.agregarcodigo3d("union_string_string();");
                            generador.getValorStack(temporalresultado, "p");
                            generador.regresarAmbito(ambito.tamaño);
                            return new traduccionexp(temporalresultado, true, tipo_dato.STRING, false);
                        
                        case tipo_dato.BOOLEAN:
                            let tmp_valor_boolean= generador.generarTemporal();
                            let etiqueta_salida_boolean= generador.generarEtiqueta();
                            generador.sacarTemporal(tmp_valor_boolean);
                            generador.agregarEtiqueta(valorderecha4.etiquetastrue);
                            generador.agregarExpresion(tmp_valor_boolean, "1", "", "");
                            generador.agregarGoTo(etiqueta_salida_boolean);
                            generador.agregarEtiqueta(valorderecha4.etiquetasfalse);
                            generador.agregarExpresion(tmp_valor_boolean, "0", "", "");
                            generador.agregarEtiqueta(etiqueta_salida_boolean);
                            const temporal_paso_parametro= generador.generarTemporal();
                            generador.sacarTemporal(temporal_paso_parametro);
                            generador.agregarExpresion(temporal_paso_parametro,"p","+",ambito.tamaño+1);
                            generador.stack(temporal_paso_parametro,valorizquierdo.obtenerValor());
                            generador.agregarExpresion(temporal_paso_parametro,temporal_paso_parametro,"+","1");
                            generador.stack(temporal_paso_parametro, tmp_valor_boolean);
                            generador.moverAmbito(ambito.tamaño);
                            generador.agregarcodigo3d("concat_string_boolean();");
                            generador.getValorStack(temporalresultado, "p");
                            generador.regresarAmbito(ambito.tamaño);
                            return new traduccionexp(temporalresultado, true, tipo_dato.STRING, false);
                        default:
                            break;

                    }

                    break;

                default:
                    break;
            }


        }else if (this.tipooperador == operador.MENOS) {
            const valorderecha= this.expresionderecha.traducir(ambito);

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
            
        }else if (this.tipooperador == operador.POR) {
            const valorderecha= this.expresionderecha.traducir(ambito);

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

           
        } else if (this.tipooperador == operador.DIVISION) {
            const valorderecha= this.expresionderecha.traducir(ambito);

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



            
        } else if (this.tipooperador == operador.MODULO) {
            const valorderecha= this.expresionderecha.traducir(ambito);

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
           
        } else if (this.tipooperador == operador.EXPONENTE) {
            const valorderecha= this.expresionderecha.traducir(ambito);
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



        //const generador = generacion.getGenerador();
        //const valorizquierdo: traduccionexp = this.expresionizquierda.traducir(ambito);
        //const valorderecha: traduccionexp = this.expresionderecha.traducir(ambito);
        //**********************************SUMA********************************************************** */
        /*if (this.tipooperador == operador.MAS) {
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
                        case tipo_dato.STRING:
                            const tmp_p= generador.generarTemporal();
                            generador.sacarTemporal(tmp_p);
                            generador.agregarExpresion(tmp_p,"p","+",ambito.tamaño+1);
                            generador.stack(tmp_p,valorizquierdo.obtenerValor());
                            generador.agregarExpresion(tmp_p,tmp_p,"+","1");
                            generador.stack(tmp_p,valorderecha.obtenerValor());
                            generador.moverAmbito(ambito.tamaño);
                            generador.agregarcodigo3d("union_entero_string();");
                            generador.getValorStack(temporalresultado,"p");
                            generador.regresarAmbito(ambito.tamaño);
                            return new traduccionexp(temporalresultado,true,tipo_dato.STRING,false);
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
                        
                        case tipo_dato.STRING:
                            generador.agregarExpresion(tmp_p,"p","+",ambito.tamaño+1);
                            generador.stack(tmp_p,valorizquierdo.obtenerValor());
                            generador.agregarExpresion(tmp_p,tmp_p,"+","1");
                            generador.stack(tmp_p,valorderecha.obtenerValor());
                            generador.moverAmbito(ambito.tamaño);
                            generador.agregarcodigo3d("union_string_string();");
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
                    return new traduccionexp(temporalresultado,true,tipo_dato.DECIMAL,false);

                }else{
                    almacen.dispatch(errores({
                        tipo: 'SEMANTICO',
                        descripcion: valorizquierdo.tipodato + ' NO SE PUEDE REALIZAR POTENCIA CON ' + valorderecha.tipodato,
                        ambito: ambito.nombre,
                        linea: this.linea,
                        columna: this.columna
                    }));
                }

        }*/

        
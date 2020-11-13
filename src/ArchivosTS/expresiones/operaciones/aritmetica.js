"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var tipo_1 = require("../../entorno/tipo");
var generacion_1 = require("../../helpers/generacion");
var traduccionexp_1 = require("../traduccionexp");
var operacion_1 = require("./operacion");
var app_1 = require("../../../../src/app");
var ts_js_1 = require("../../../actions/ts.js");
var aritmetica = /** @class */ (function (_super) {
    __extends(aritmetica, _super);
    function aritmetica(expiz, op, expder, linea, columna) {
        var _this = _super.call(this, expiz, op, expder) || this;
        _this.linea = linea;
        _this.columna = columna;
        return _this;
    }
    aritmetica.prototype.traducir = function (ambito) {
        var generador = generacion_1.generacion.getGenerador();
        //const valorizquierdo: traduccionexp = this.expresionizquierda.traducir(ambito);
        //const valorderecha: traduccionexp = this.expresionderecha.traducir(ambito);
        var valorizquierdo = this.expresionizquierda.traducir(ambito);
        var temporalresultado = generador.generarTemporal();
        if (this.tipooperador == tipo_1.operador.MAS) {
            switch (valorizquierdo.tipodato) {
                case tipo_1.tipo_dato.ENTERO:
                    var valorderecha = this.expresionderecha.traducir(ambito);
                    switch (valorderecha.tipodato) {
                        case tipo_1.tipo_dato.ENTERO:
                        case tipo_1.tipo_dato.DECIMAL:
                            generador.agregarExpresion(temporalresultado, valorizquierdo.obtenerValor(), "+", valorderecha.obtenerValor());
                            return new traduccionexp_1.traduccionexp(temporalresultado, true, valorderecha.tipodato == tipo_1.tipo_dato.DECIMAL ? valorderecha.tipodato : valorizquierdo.tipodato, false);
                        case tipo_1.tipo_dato.BOOLEAN:
                            var tmp_guardado_1 = generador.generarTemporal();
                            var etiqueta_salida_1 = generador.generarEtiqueta();
                            generador.sacarTemporal(tmp_guardado_1);
                            generador.agregarEtiqueta(valorderecha.etiquetastrue);
                            generador.agregarExpresion(tmp_guardado_1, "1", "", "");
                            generador.agregarGoTo(etiqueta_salida_1);
                            generador.agregarEtiqueta(valorderecha.etiquetasfalse);
                            generador.agregarExpresion(tmp_guardado_1, "0", "", "");
                            generador.agregarEtiqueta(etiqueta_salida_1);
                            generador.agregarExpresion(temporalresultado, valorizquierdo.obtenerValor(), "+", tmp_guardado_1);
                            return new traduccionexp_1.traduccionexp(temporalresultado, true, tipo_1.tipo_dato.ENTERO, false);
                        case tipo_1.tipo_dato.STRING:
                            var tmp_p_1 = generador.generarTemporal();
                            generador.sacarTemporal(tmp_p_1);
                            generador.agregarExpresion(tmp_p_1, "p", "+", ambito.tamaño + 1);
                            generador.stack(tmp_p_1, valorizquierdo.obtenerValor());
                            generador.agregarExpresion(tmp_p_1, tmp_p_1, "+", "1");
                            generador.stack(tmp_p_1, valorderecha.obtenerValor());
                            generador.moverAmbito(ambito.tamaño);
                            generador.agregarcodigo3d("union_entero_string();");
                            generador.getValorStack(temporalresultado, "p");
                            generador.regresarAmbito(ambito.tamaño);
                            return new traduccionexp_1.traduccionexp(temporalresultado, true, tipo_1.tipo_dato.STRING, false);
                        default:
                            app_1.almacen.dispatch(ts_js_1.errores({
                                tipo: 'SEMANTICO',
                                descripcion: valorizquierdo.tipodato + ' NO SE PUEDE SUMAR CON ' + valorderecha.tipodato,
                                ambito: ambito.nombre,
                                linea: this.linea,
                                columna: this.columna
                            }));
                            break;
                    }
                    break;
                case tipo_1.tipo_dato.DECIMAL:
                    var valorderecha2 = this.expresionderecha.traducir(ambito);
                    switch (valorderecha2.tipodato) {
                        case tipo_1.tipo_dato.ENTERO:
                        case tipo_1.tipo_dato.DECIMAL:
                            generador.agregarExpresion(temporalresultado, valorizquierdo.obtenerValor(), "+", valorderecha2.obtenerValor());
                            return new traduccionexp_1.traduccionexp(temporalresultado, true, tipo_1.tipo_dato.DECIMAL, false);
                        case tipo_1.tipo_dato.BOOLEAN:
                            var tmp_guardado_2 = generador.generarTemporal();
                            var etiqueta_salida_2 = generador.generarEtiqueta();
                            generador.sacarTemporal(tmp_guardado_2);
                            generador.agregarEtiqueta(valorderecha2.etiquetastrue);
                            generador.agregarExpresion(tmp_guardado_2, "1", "", "");
                            generador.agregarGoTo(etiqueta_salida_2);
                            generador.agregarEtiqueta(valorderecha2.etiquetasfalse);
                            generador.agregarExpresion(tmp_guardado_2, "0", "", "");
                            generador.agregarEtiqueta(etiqueta_salida_2);
                            generador.agregarExpresion(temporalresultado, valorizquierdo.obtenerValor(), "+", tmp_guardado_2);
                            return new traduccionexp_1.traduccionexp(temporalresultado, true, tipo_1.tipo_dato.DECIMAL, false);
                        //FALTA
                        //DECIMAL -STRING
                        default:
                            app_1.almacen.dispatch(ts_js_1.errores({
                                tipo: 'SEMANTICO',
                                descripcion: valorizquierdo.tipodato + ' NO SE PUEDE SUMAR CON ' + valorderecha.tipodato,
                                ambito: ambito.nombre,
                                linea: this.linea,
                                columna: this.columna
                            }));
                            break;
                    }
                    break;
                case tipo_1.tipo_dato.BOOLEAN:
                    var tmp_guardado = generador.generarTemporal();
                    var etiqueta_salida = generador.generarEtiqueta();
                    generador.sacarTemporal(tmp_guardado);
                    generador.agregarEtiqueta(valorizquierdo.etiquetastrue);
                    generador.agregarExpresion(tmp_guardado, "1", "", "");
                    generador.agregarGoTo(etiqueta_salida);
                    generador.agregarEtiqueta(valorizquierdo.etiquetasfalse);
                    generador.agregarExpresion(tmp_guardado, "0", "", "");
                    generador.agregarEtiqueta(etiqueta_salida);
                    var valorderecha3 = this.expresionderecha.traducir(ambito);
                    switch (valorderecha3.tipodato) {
                        case tipo_1.tipo_dato.ENTERO:
                        case tipo_1.tipo_dato.DECIMAL:
                            generador.agregarExpresion(temporalresultado, tmp_guardado, "+", valorderecha3.obtenerValor());
                            return new traduccionexp_1.traduccionexp(temporalresultado, true, valorderecha3.tipodato == tipo_1.tipo_dato.ENTERO ? tipo_1.tipo_dato.ENTERO : tipo_1.tipo_dato.DECIMAL, false);
                        case tipo_1.tipo_dato.STRING:
                            var tparametro = generador.generarTemporal();
                            generador.sacarTemporal(tparametro);
                            generador.agregarExpresion(tparametro, "p", "+", ambito.tamaño + 1);
                            generador.stack(tparametro, tmp_guardado);
                            generador.agregarExpresion(tparametro, tparametro, "+", "1");
                            generador.stack(tparametro, valorderecha3.obtenerValor());
                            generador.moverAmbito(ambito.tamaño);
                            generador.agregarcodigo3d("concat_boolean_string();");
                            generador.getValorStack(temporalresultado, "p");
                            generador.regresarAmbito(ambito.tamaño);
                            return new traduccionexp_1.traduccionexp(temporalresultado, true, tipo_1.tipo_dato.STRING, false);
                        default:
                            app_1.almacen.dispatch(ts_js_1.errores({
                                tipo: 'SEMANTICO',
                                descripcion: valorizquierdo.tipodato + ' NO SE PUEDE SUMAR CON ' + valorderecha.tipodato,
                                ambito: ambito.nombre,
                                linea: this.linea,
                                columna: this.columna
                            }));
                            break;
                    }
                    break;
                case tipo_1.tipo_dato.STRING:
                    var tmp_p = generador.generarTemporal();
                    generador.sacarTemporal(tmp_p);
                    var valorderecha4 = this.expresionderecha.traducir(ambito);
                    switch (valorderecha4.tipodato) {
                        case tipo_1.tipo_dato.ENTERO:
                            generador.agregarExpresion(tmp_p, "p", "+", ambito.tamaño + 1);
                            generador.stack(tmp_p, valorizquierdo.obtenerValor());
                            generador.agregarExpresion(tmp_p, tmp_p, "+", "1");
                            generador.stack(tmp_p, valorderecha4.obtenerValor());
                            generador.moverAmbito(ambito.tamaño);
                            generador.agregarcodigo3d("union_string_entero();");
                            generador.getValorStack(temporalresultado, "p");
                            generador.regresarAmbito(ambito.tamaño);
                            return new traduccionexp_1.traduccionexp(temporalresultado, true, tipo_1.tipo_dato.STRING, false);
                        case tipo_1.tipo_dato.STRING:
                            generador.agregarExpresion(tmp_p, "p", "+", ambito.tamaño + 1);
                            generador.stack(tmp_p, valorizquierdo.obtenerValor());
                            generador.agregarExpresion(tmp_p, tmp_p, "+", "1");
                            generador.stack(tmp_p, valorderecha4.obtenerValor());
                            generador.moverAmbito(ambito.tamaño);
                            generador.agregarcodigo3d("union_string_string();");
                            generador.getValorStack(temporalresultado, "p");
                            generador.regresarAmbito(ambito.tamaño);
                            return new traduccionexp_1.traduccionexp(temporalresultado, true, tipo_1.tipo_dato.STRING, false);
                        case tipo_1.tipo_dato.BOOLEAN:
                            var tmp_valor_boolean = generador.generarTemporal();
                            var etiqueta_salida_boolean = generador.generarEtiqueta();
                            generador.sacarTemporal(tmp_valor_boolean);
                            generador.agregarEtiqueta(valorderecha4.etiquetastrue);
                            generador.agregarExpresion(tmp_valor_boolean, "1", "", "");
                            generador.agregarGoTo(etiqueta_salida_boolean);
                            generador.agregarEtiqueta(valorderecha4.etiquetasfalse);
                            generador.agregarExpresion(tmp_valor_boolean, "0", "", "");
                            generador.agregarEtiqueta(etiqueta_salida_boolean);
                            var temporal_paso_parametro = generador.generarTemporal();
                            generador.sacarTemporal(temporal_paso_parametro);
                            generador.agregarExpresion(temporal_paso_parametro, "p", "+", ambito.tamaño + 1);
                            generador.stack(temporal_paso_parametro, valorizquierdo.obtenerValor());
                            generador.agregarExpresion(temporal_paso_parametro, temporal_paso_parametro, "+", "1");
                            generador.stack(temporal_paso_parametro, tmp_valor_boolean);
                            generador.moverAmbito(ambito.tamaño);
                            generador.agregarcodigo3d("concat_string_boolean();");
                            generador.getValorStack(temporalresultado, "p");
                            generador.regresarAmbito(ambito.tamaño);
                            return new traduccionexp_1.traduccionexp(temporalresultado, true, tipo_1.tipo_dato.STRING, false);
                        default:
                            break;
                    }
                    break;
                default:
                    break;
            }
        }
        else if (this.tipooperador == tipo_1.operador.MENOS) {
            var valorderecha = this.expresionderecha.traducir(ambito);
            if (valorizquierdo.tipodato == tipo_1.tipo_dato.ENTERO && valorderecha.tipodato == tipo_1.tipo_dato.ENTERO) {
                generador.agregarExpresion(temporalresultado, valorizquierdo.obtenerValor(), "-", valorderecha.obtenerValor());
                return new traduccionexp_1.traduccionexp(temporalresultado, true, tipo_1.tipo_dato.ENTERO, false);
            }
            else if (valorizquierdo.tipodato == tipo_1.tipo_dato.ENTERO && valorderecha.tipodato == tipo_1.tipo_dato.DECIMAL) {
                generador.agregarExpresion(temporalresultado, valorizquierdo.obtenerValor(), "-", valorderecha.obtenerValor());
                return new traduccionexp_1.traduccionexp(temporalresultado, true, tipo_1.tipo_dato.DECIMAL, false);
            }
            else if (valorizquierdo.tipodato == tipo_1.tipo_dato.DECIMAL && valorderecha.tipodato == tipo_1.tipo_dato.ENTERO) {
                generador.agregarExpresion(temporalresultado, valorizquierdo.obtenerValor(), "-", valorderecha.obtenerValor());
                return new traduccionexp_1.traduccionexp(temporalresultado, true, tipo_1.tipo_dato.DECIMAL, false);
            }
            else if (valorizquierdo.tipodato == tipo_1.tipo_dato.DECIMAL && valorderecha.tipodato == tipo_1.tipo_dato.DECIMAL) {
                generador.agregarExpresion(temporalresultado, valorizquierdo.obtenerValor(), "-", valorderecha.obtenerValor());
                return new traduccionexp_1.traduccionexp(temporalresultado, true, tipo_1.tipo_dato.DECIMAL, false);
            }
            else {
                app_1.almacen.dispatch(ts_js_1.errores({
                    tipo: 'SEMANTICO',
                    descripcion: valorizquierdo.tipodato + ' NO SE PUEDE RESTAR CON ' + valorderecha.tipodato,
                    ambito: ambito.nombre,
                    linea: this.linea,
                    columna: this.columna
                }));
            }
        }
        else if (this.tipooperador == tipo_1.operador.POR) {
            var valorderecha = this.expresionderecha.traducir(ambito);
            if (valorizquierdo.tipodato == tipo_1.tipo_dato.ENTERO && valorderecha.tipodato == tipo_1.tipo_dato.ENTERO) {
                generador.agregarExpresion(temporalresultado, valorizquierdo.obtenerValor(), "*", valorderecha.obtenerValor());
                return new traduccionexp_1.traduccionexp(temporalresultado, true, tipo_1.tipo_dato.ENTERO, false);
            }
            else if (valorizquierdo.tipodato == tipo_1.tipo_dato.ENTERO && valorderecha.tipodato == tipo_1.tipo_dato.DECIMAL) {
                generador.agregarExpresion(temporalresultado, valorizquierdo.obtenerValor(), "*", valorderecha.obtenerValor());
                return new traduccionexp_1.traduccionexp(temporalresultado, true, tipo_1.tipo_dato.DECIMAL, false);
            }
            else if (valorizquierdo.tipodato == tipo_1.tipo_dato.DECIMAL && valorderecha.tipodato == tipo_1.tipo_dato.ENTERO) {
                generador.agregarExpresion(temporalresultado, valorizquierdo.obtenerValor(), "*", valorderecha.obtenerValor());
                return new traduccionexp_1.traduccionexp(temporalresultado, true, tipo_1.tipo_dato.DECIMAL, false);
            }
            else if (valorizquierdo.tipodato == tipo_1.tipo_dato.DECIMAL && valorderecha.tipodato == tipo_1.tipo_dato.DECIMAL) {
                generador.agregarExpresion(temporalresultado, valorizquierdo.obtenerValor(), "*", valorderecha.obtenerValor());
                return new traduccionexp_1.traduccionexp(temporalresultado, true, tipo_1.tipo_dato.DECIMAL, false);
            }
            else {
                app_1.almacen.dispatch(ts_js_1.errores({
                    tipo: 'SEMANTICO',
                    descripcion: valorizquierdo.tipodato + ' NO SE PUEDE MULTIPLICAR CON ' + valorderecha.tipodato,
                    ambito: ambito.nombre,
                    linea: this.linea,
                    columna: this.columna
                }));
            }
        }
        else if (this.tipooperador == tipo_1.operador.DIVISION) {
            var valorderecha = this.expresionderecha.traducir(ambito);
            if (!valorderecha.es_temporal && valorderecha.valor == '0') {
                app_1.almacen.dispatch(ts_js_1.errores({
                    tipo: 'SEMANTICO',
                    descripcion: 'DIVISION ENTRE 0, NO ESTA PERMITIDA',
                    ambito: ambito.nombre,
                    linea: this.linea,
                    columna: this.columna
                }));
            }
            else {
                if (valorizquierdo.tipodato == tipo_1.tipo_dato.ENTERO && valorderecha.tipodato == tipo_1.tipo_dato.ENTERO) {
                    generador.agregarExpresion(temporalresultado, valorizquierdo.obtenerValor(), "/", valorderecha.obtenerValor());
                    return new traduccionexp_1.traduccionexp(temporalresultado, true, tipo_1.tipo_dato.ENTERO, false);
                }
                else if (valorizquierdo.tipodato == tipo_1.tipo_dato.ENTERO && valorderecha.tipodato == tipo_1.tipo_dato.DECIMAL) {
                    generador.agregarExpresion(temporalresultado, valorizquierdo.obtenerValor(), "/", valorderecha.obtenerValor());
                    return new traduccionexp_1.traduccionexp(temporalresultado, true, tipo_1.tipo_dato.DECIMAL, false);
                }
                else if (valorizquierdo.tipodato == tipo_1.tipo_dato.DECIMAL && valorderecha.tipodato == tipo_1.tipo_dato.ENTERO) {
                    generador.agregarExpresion(temporalresultado, valorizquierdo.obtenerValor(), "/", valorderecha.obtenerValor());
                    return new traduccionexp_1.traduccionexp(temporalresultado, true, tipo_1.tipo_dato.DECIMAL, false);
                }
                else if (valorizquierdo.tipodato == tipo_1.tipo_dato.DECIMAL && valorderecha.tipodato == tipo_1.tipo_dato.DECIMAL) {
                    generador.agregarExpresion(temporalresultado, valorizquierdo.obtenerValor(), "/", valorderecha.obtenerValor());
                    return new traduccionexp_1.traduccionexp(temporalresultado, true, tipo_1.tipo_dato.DECIMAL, false);
                }
                else {
                    app_1.almacen.dispatch(ts_js_1.errores({
                        tipo: 'SEMANTICO',
                        descripcion: valorizquierdo.tipodato + ' NO SE PUEDE DIVIDIR CON ' + valorderecha.tipodato,
                        ambito: ambito.nombre,
                        linea: this.linea,
                        columna: this.columna
                    }));
                }
            }
        }
        else if (this.tipooperador == tipo_1.operador.MODULO) {
            var valorderecha = this.expresionderecha.traducir(ambito);
            if (valorizquierdo.tipodato == tipo_1.tipo_dato.ENTERO && valorderecha.tipodato == tipo_1.tipo_dato.ENTERO) {
                generador.agregarExpresion(temporalresultado, "fmod(" + valorizquierdo.obtenerValor() + "," + valorderecha.obtenerValor() + ")", "", "");
                return new traduccionexp_1.traduccionexp(temporalresultado, true, tipo_1.tipo_dato.DECIMAL, false);
            }
            else if (valorizquierdo.tipodato == tipo_1.tipo_dato.ENTERO && valorderecha.tipodato == tipo_1.tipo_dato.DECIMAL) {
                generador.agregarExpresion(temporalresultado, "fmod(" + valorizquierdo.obtenerValor() + "," + valorderecha.obtenerValor() + ")", "", "");
                return new traduccionexp_1.traduccionexp(temporalresultado, true, tipo_1.tipo_dato.DECIMAL, false);
            }
            else if (valorizquierdo.tipodato == tipo_1.tipo_dato.DECIMAL && valorderecha.tipodato == tipo_1.tipo_dato.ENTERO) {
                generador.agregarExpresion(temporalresultado, "fmod(" + valorizquierdo.obtenerValor() + "," + valorderecha.obtenerValor() + ")", "", "");
                return new traduccionexp_1.traduccionexp(temporalresultado, true, tipo_1.tipo_dato.DECIMAL, false);
            }
            if (valorizquierdo.tipodato == tipo_1.tipo_dato.DECIMAL && valorderecha.tipodato == tipo_1.tipo_dato.DECIMAL) {
                generador.agregarExpresion(temporalresultado, "fmod(" + valorizquierdo.obtenerValor() + "," + valorderecha.obtenerValor() + ")", "", "");
                return new traduccionexp_1.traduccionexp(temporalresultado, true, tipo_1.tipo_dato.DECIMAL, false);
            }
            else {
                app_1.almacen.dispatch(ts_js_1.errores({
                    tipo: 'SEMANTICO',
                    descripcion: valorizquierdo.tipodato + ' NO SE PUEDE REALIZAR MOD CON ' + valorderecha.tipodato,
                    ambito: ambito.nombre,
                    linea: this.linea,
                    columna: this.columna
                }));
            }
        }
        else if (this.tipooperador == tipo_1.operador.EXPONENTE) {
            var valorderecha = this.expresionderecha.traducir(ambito);
            if (valorizquierdo.tipodato == tipo_1.tipo_dato.ENTERO && valorderecha.tipodato == tipo_1.tipo_dato.ENTERO) {
                //COMENZAMOS A PASAR LOS PARAMETROS, LA BASE Y EL EXPONENTE
                generador.agregarExpresion(temporalresultado, "p", "+", ambito.tamaño + 1);
                //PASAMOS LA BASE
                generador.stack(temporalresultado, valorizquierdo.obtenerValor());
                generador.agregarExpresion(temporalresultado, temporalresultado, "+", "1");
                //PASAMOS EL EXPONENTE
                generador.stack(temporalresultado, valorderecha.obtenerValor());
                //CAMBIAR DE AMBITO
                generador.moverAmbito(ambito.tamaño);
                generador.agregarcodigo3d("potencia();");
                generador.getValorStack(temporalresultado, "p");
                //REGRESAMOS AL AMBITO DE DONDE HICIMOS LA LLAMADA
                generador.regresarAmbito(ambito.tamaño);
                return new traduccionexp_1.traduccionexp(temporalresultado, true, tipo_1.tipo_dato.ENTERO, false);
            }
            else {
                app_1.almacen.dispatch(ts_js_1.errores({
                    tipo: 'SEMANTICO',
                    descripcion: valorizquierdo.tipodato + ' NO SE PUEDE REALIZAR POTENCIA CON ' + valorderecha.tipodato,
                    ambito: ambito.nombre,
                    linea: this.linea,
                    columna: this.columna
                }));
            }
        }
        return new traduccionexp_1.traduccionexp("", false, tipo_1.tipo_dato.UNDEFINED, false);
    };
    return aritmetica;
}(operacion_1["default"]));
exports.aritmetica = aritmetica;
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

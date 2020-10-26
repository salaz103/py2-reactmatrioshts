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
        var valorizquierdo = this.expresionizquierda.traducir(ambito);
        var valorderecha = this.expresionderecha.traducir(ambito);
        var temporalresultado = generador.generarTemporal();
        //**********************************SUMA********************************************************** */
        if (this.tipooperador == tipo_1.operador.MAS) {
            //STRING - NUMBER, SALIDA= STRING
            //STRING - BOOLEAN, SALIDA =STRING
            //STRING - STRING
            switch (valorizquierdo.tipodato) {
                case tipo_1.tipo_dato.ENTERO:
                    switch (valorderecha.tipodato) {
                        case tipo_1.tipo_dato.ENTERO:
                        case tipo_1.tipo_dato.DECIMAL:
                            generador.agregarExpresion(temporalresultado, valorizquierdo.obtenerValor(), "+", valorderecha.obtenerValor());
                            return new traduccionexp_1.traduccionexp(temporalresultado, true, valorderecha.tipodato == tipo_1.tipo_dato.DECIMAL ? valorderecha.tipodato : valorizquierdo.tipodato, false);
                        case tipo_1.tipo_dato.BOOLEAN:
                            if (valorderecha.tiene_etiquetas) {
                                var tmp_guardado = generador.generarTemporal();
                                var etiqueta_salida = generador.generarEtiqueta();
                                generador.sacarTemporal(tmp_guardado);
                                generador.agregarEtiqueta(valorderecha.etiquetastrue);
                                generador.agregarExpresion(tmp_guardado, "1", "", "");
                                generador.agregarGoTo(etiqueta_salida);
                                generador.agregarEtiqueta(valorderecha.etiquetasfalse);
                                generador.agregarExpresion(tmp_guardado, "0", "", "");
                                generador.agregarEtiqueta(etiqueta_salida);
                                generador.agregarExpresion(temporalresultado, valorizquierdo.obtenerValor(), "+", tmp_guardado);
                                return new traduccionexp_1.traduccionexp(temporalresultado, true, tipo_1.tipo_dato.ENTERO, false);
                            }
                            else {
                                generador.agregarExpresion(temporalresultado, valorizquierdo.obtenerValor(), "+", valorderecha.obtenerValor());
                                return new traduccionexp_1.traduccionexp(temporalresultado, true, tipo_1.tipo_dato.ENTERO, false);
                            }
                        //FALTA
                        //ENTERO -STRING
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
                    switch (valorderecha.tipodato) {
                        case tipo_1.tipo_dato.ENTERO:
                        case tipo_1.tipo_dato.DECIMAL:
                        case tipo_1.tipo_dato.BOOLEAN:
                            generador.agregarExpresion(temporalresultado, valorizquierdo.obtenerValor(), "+", valorderecha.obtenerValor());
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
                    switch (valorderecha.tipodato) {
                        case tipo_1.tipo_dato.ENTERO:
                        case tipo_1.tipo_dato.DECIMAL:
                            if (valorizquierdo.tiene_etiquetas) {
                                var tmp_guardado = generador.generarTemporal();
                                var etiqueta_salida = generador.generarEtiqueta();
                                generador.sacarTemporal(tmp_guardado);
                                generador.agregarEtiqueta(valorizquierdo.etiquetastrue);
                                generador.agregarExpresion(tmp_guardado, "1", "", "");
                                generador.agregarGoTo(etiqueta_salida);
                                generador.agregarEtiqueta(valorizquierdo.etiquetasfalse);
                                generador.agregarExpresion(tmp_guardado, "0", "", "");
                                generador.agregarEtiqueta(etiqueta_salida);
                                generador.agregarExpresion(temporalresultado, tmp_guardado, "+", valorderecha.obtenerValor());
                                return new traduccionexp_1.traduccionexp(temporalresultado, true, valorderecha.tipodato == tipo_1.tipo_dato.ENTERO ? tipo_1.tipo_dato.ENTERO : tipo_1.tipo_dato.DECIMAL, false);
                            }
                            else {
                                generador.agregarExpresion(temporalresultado, valorizquierdo.obtenerValor(), "+", valorderecha.obtenerValor());
                                return new traduccionexp_1.traduccionexp(temporalresultado, true, valorderecha.tipodato == tipo_1.tipo_dato.ENTERO ? tipo_1.tipo_dato.ENTERO : tipo_1.tipo_dato.DECIMAL, false);
                            }
                        //FALTA
                        //BOOLEAN -STRING
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
                    break;
                default:
                    break;
            }
            //***************************************************RESTA************************************* */
        }
        else if (this.tipooperador == tipo_1.operador.MENOS) {
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
            //***************************************************MULTIPLICACION************************************* */
        }
        else if (this.tipooperador == tipo_1.operador.POR) {
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
            //***************************************************DIVISION************************************* */
        }
        else if (this.tipooperador == tipo_1.operador.DIVISION) {
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
            //***************************************************MODULO************************************* */
        }
        else if (this.tipooperador == tipo_1.operador.MODULO) {
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
            //***************************************************POTENCIA-EXPONENTE************************************* */
        }
        else if (this.tipooperador == tipo_1.operador.EXPONENTE) {
        }
        return new traduccionexp_1.traduccionexp("", false, tipo_1.tipo_dato.UNDEFINED, false);
    };
    return aritmetica;
}(operacion_1["default"]));
exports.aritmetica = aritmetica;

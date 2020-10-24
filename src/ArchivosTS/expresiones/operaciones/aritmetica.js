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
        if (this.tipooperador == tipo_1.operador.MAS) {
            //SUMA - POSIBLES COMBINACIONES
            //NUMBER -NUMBER --->HECHO
            //NUMBER- BOOLEAN
            //STRING - NUMBER
            //STRING - BOOLEAN
            //STRING - STRING
            if (valorizquierdo.tipodato == tipo_1.tipo_dato.NUMBER && valorderecha.tipodato == tipo_1.tipo_dato.NUMBER) {
                generador.agregarExpresion(temporalresultado, valorizquierdo.obtenerValor(), "+", valorderecha.obtenerValor());
                return new traduccionexp_1.traduccionexp(temporalresultado, true, tipo_1.tipo_dato.NUMBER, false);
            }
        }
        else if (this.tipooperador == tipo_1.operador.MENOS) {
            if (valorizquierdo.tipodato == tipo_1.tipo_dato.NUMBER && valorderecha.tipodato == tipo_1.tipo_dato.NUMBER) {
                generador.agregarExpresion(temporalresultado, valorizquierdo.obtenerValor(), "-", valorderecha.obtenerValor());
                return new traduccionexp_1.traduccionexp(temporalresultado, true, tipo_1.tipo_dato.NUMBER, false);
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
            if (valorizquierdo.tipodato == tipo_1.tipo_dato.NUMBER && valorderecha.tipodato == tipo_1.tipo_dato.NUMBER) {
                generador.agregarExpresion(temporalresultado, valorizquierdo.obtenerValor(), "*", valorderecha.obtenerValor());
                return new traduccionexp_1.traduccionexp(temporalresultado, true, tipo_1.tipo_dato.NUMBER, false);
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
            if (valorizquierdo.tipodato == tipo_1.tipo_dato.NUMBER && valorderecha.tipodato == tipo_1.tipo_dato.NUMBER) {
                generador.agregarExpresion(temporalresultado, valorizquierdo.obtenerValor(), "/", valorderecha.obtenerValor());
                return new traduccionexp_1.traduccionexp(temporalresultado, true, tipo_1.tipo_dato.NUMBER, false);
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
        else if (this.tipooperador == tipo_1.operador.MODULO) {
            if (valorizquierdo.tipodato == tipo_1.tipo_dato.NUMBER && valorderecha.tipodato == tipo_1.tipo_dato.NUMBER) {
                generador.agregarExpresion(temporalresultado, "fmod(" + valorizquierdo.obtenerValor() + "," + valorderecha.obtenerValor() + ")", "", "");
                return new traduccionexp_1.traduccionexp(temporalresultado, true, tipo_1.tipo_dato.NUMBER, false);
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
        else if (this.tipooperador == tipo_1.operador.EXPONENTE) {
        }
        return new traduccionexp_1.traduccionexp("", false, tipo_1.tipo_dato.UNDEFINED, false);
    };
    return aritmetica;
}(operacion_1["default"]));
exports.aritmetica = aritmetica;

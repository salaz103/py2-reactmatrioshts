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
var operacion_1 = require("./operacion");
var app_1 = require("../../../../src/app");
var ts_js_1 = require("../../../actions/ts.js");
var aritmetica = /** @class */ (function (_super) {
    __extends(aritmetica, _super);
    function aritmetica(expiz, op, expder) {
        return _super.call(this, expiz, op, expder) || this;
    }
    aritmetica.prototype.obtenerValor = function (ambito) {
        var valorizquierdo = this.expresionizquierda.obtenerValor(ambito);
        var valorderecha = this.expresionderecha.obtenerValor(ambito);
        var tipoiz = this.expresionizquierda.obtenerTipo(ambito);
        var tipoder = this.expresionderecha.obtenerTipo(ambito);
        //PRIMERO VEMOS SI ES +,-,*,/
        if (this.tipooperador == tipo_1.operador.MAS) {
            if (tipoiz == tipo_1.tipo_valor.NUMBER && tipoder == tipo_1.tipo_valor.NUMBER) {
                var res = Number(valorizquierdo) + Number(valorderecha);
                this.tipo = tipo_1.tipo_valor.NUMBER;
                return new Number(res);
            }
            else if (tipoiz == tipo_1.tipo_valor.STRING && tipoder == tipo_1.tipo_valor.NUMBER) {
                var res = String(valorizquierdo) + String(valorderecha);
                this.tipo = tipo_1.tipo_valor.STRING;
                return new String(res);
            }
            else if (tipoiz == tipo_1.tipo_valor.NUMBER && tipoder == tipo_1.tipo_valor.STRING) {
                var res = String(valorizquierdo) + String(valorderecha);
                this.tipo = tipo_1.tipo_valor.STRING;
                return new String(res);
            }
            else if (tipoiz == tipo_1.tipo_valor.STRING && tipoder == tipo_1.tipo_valor.STRING) {
                var res = String(valorizquierdo) + String(valorderecha);
                this.tipo = tipo_1.tipo_valor.STRING;
                return new String(res);
            }
            else {
                //AQUI IRIA UN ERRROR SEMANTICO YA QUE NO SE PUEDE HACER SUMA DE OTROS TIPOS
                app_1.almacen.dispatch(ts_js_1.errores({
                    tipo: 'SEMANTICO',
                    descripcion: tipoiz + ' NO SE PUEDE SUMAR CON ' + tipoder,
                    ambito: ambito.nombre
                }));
            }
        }
        else if (this.tipooperador == tipo_1.operador.MENOS) {
            if (tipoiz == tipo_1.tipo_valor.NUMBER && tipoder == tipo_1.tipo_valor.NUMBER) {
                var res = Number(valorizquierdo) - Number(valorderecha);
                this.tipo = tipo_1.tipo_valor.NUMBER;
                return new Number(res);
            }
            else {
                //ERROR SEMANTICO
                app_1.almacen.dispatch(ts_js_1.errores({
                    tipo: 'SEMANTICO',
                    descripcion: tipoiz + ' NO SE PUEDE RESTAR CON ' + tipoder,
                    ambito: ambito.nombre
                }));
            }
        }
        else if (this.tipooperador == tipo_1.operador.POR) {
            if (tipoiz == tipo_1.tipo_valor.NUMBER && tipoder == tipo_1.tipo_valor.NUMBER) {
                var res = Number(valorizquierdo) * Number(valorderecha);
                this.tipo = tipo_1.tipo_valor.NUMBER;
                return new Number(res);
            }
            else {
                app_1.almacen.dispatch(ts_js_1.errores({
                    tipo: 'SEMANTICO',
                    descripcion: tipoiz + ' NO SE PUEDE MULTIPLICAR CON ' + tipoder,
                    ambito: ambito.nombre
                }));
            }
        }
        else if (this.tipooperador == tipo_1.operador.DIVISION) {
            if (tipoiz == tipo_1.tipo_valor.NUMBER && tipoder == tipo_1.tipo_valor.NUMBER) {
                var res = Number(valorizquierdo) / Number(valorderecha);
                this.tipo = tipo_1.tipo_valor.NUMBER;
                return new Number(res);
            }
            else {
                app_1.almacen.dispatch(ts_js_1.errores({
                    tipo: 'SEMANTICO',
                    descripcion: tipoiz + ' NO SE PUEDE DIVIDIR DENTRO DE ' + tipoder,
                    ambito: ambito.nombre
                }));
            }
        }
        else if (this.tipooperador == tipo_1.operador.MODULO) {
            if (tipoiz == tipo_1.tipo_valor.NUMBER && tipoder == tipo_1.tipo_valor.NUMBER) {
                var res = Number(valorizquierdo) % Number(valorderecha);
                this.tipo = tipo_1.tipo_valor.NUMBER;
                return new Number(res);
            }
            else {
                //ERROR SEMANTICO
                app_1.almacen.dispatch(ts_js_1.errores({
                    tipo: 'SEMANTICO',
                    descripcion: 'NO SE PUEDE RELIZAR EL MOD ENTRE ' + tipoiz + ' Y ' + tipoder,
                    ambito: ambito.nombre
                }));
            }
        }
        else if (this.tipooperador == tipo_1.operador.EXPONENTE) {
            if (tipoiz == tipo_1.tipo_valor.NUMBER && tipoder == tipo_1.tipo_valor.NUMBER) {
                var res = Math.pow(Number(valorizquierdo), Number(valorderecha));
                this.tipo = tipo_1.tipo_valor.NUMBER;
                return new Number(res);
            }
            else {
                //ERROR SEMANTICO
                app_1.almacen.dispatch(ts_js_1.errores({
                    tipo: 'SEMANTICO',
                    descripcion: tipoiz + ' NO SE PUEDE REALIZAR EXPONENTE CON ' + tipoder,
                    ambito: ambito.nombre
                }));
            }
        }
        return null;
    };
    aritmetica.prototype.obtenerTipo = function () {
        return this.tipo;
    };
    return aritmetica;
}(operacion_1["default"]));
exports.aritmetica = aritmetica;

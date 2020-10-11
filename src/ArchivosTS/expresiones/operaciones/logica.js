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
var logica = /** @class */ (function (_super) {
    __extends(logica, _super);
    function logica(expiz, op, expder) {
        return _super.call(this, expiz, op, expder) || this;
    }
    logica.prototype.obtenerValor = function (ambito) {
        var valorizquierdo = this.expresionizquierda.obtenerValor(ambito);
        var valorderecha = this.expresionderecha.obtenerValor(ambito);
        var tipoiz = this.expresionizquierda.obtenerTipo(ambito);
        var tipoder = this.expresionderecha.obtenerTipo(ambito);
        //PRIMERO VEMOS SI ES AND,OR
        if (this.tipooperador == tipo_1.operador.AND) {
            if (tipoiz == tipo_1.tipo_valor.BOOLEAN && tipoder == tipo_1.tipo_valor.BOOLEAN) {
                var i = valorizquierdo;
                var d = valorderecha;
                var res = i.valueOf() && d.valueOf();
                this.tipo = tipo_1.tipo_valor.BOOLEAN;
                return new Boolean(res);
            }
            else {
                //ERROR SEMANTICO
                app_1.almacen.dispatch(ts_js_1.errores({
                    tipo: 'SEMANTICO',
                    descripcion: 'OPERADOR && SOLO ACEPTA BOOLEAN',
                    ambito: ambito.nombre
                }));
            }
        }
        else if (this.tipooperador == tipo_1.operador.OR) {
            if (tipoiz == tipo_1.tipo_valor.BOOLEAN && tipoder == tipo_1.tipo_valor.BOOLEAN) {
                var i = valorizquierdo;
                var d = valorderecha;
                var res = i.valueOf() || d.valueOf();
                this.tipo = tipo_1.tipo_valor.BOOLEAN;
                return new Boolean(res);
            }
            else {
                //ERROR SEMANTICO
                app_1.almacen.dispatch(ts_js_1.errores({
                    tipo: 'SEMANTICO',
                    descripcion: 'OPERADOR OR SOLO ACEPTA BOOLEAN',
                    ambito: ambito.nombre
                }));
            }
        }
        return null;
    };
    logica.prototype.obtenerTipo = function () {
        return this.tipo;
    };
    return logica;
}(operacion_1["default"]));
exports.logica = logica;

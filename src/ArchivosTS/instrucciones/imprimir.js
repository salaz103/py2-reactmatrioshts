"use strict";
exports.__esModule = true;
var ts_js_1 = require("../../actions/ts.js");
var app_1 = require("../../../src/app");
var imprimir = /** @class */ (function () {
    function imprimir(expresion) {
        this.storeglobal = app_1.almacen;
        this.expresion = expresion;
    }
    imprimir.prototype.ejecutar = function (ambito) {
        var exp = this.expresion.obtenerValor(ambito);
        var resultado = "> " + String(exp) + "\n";
        this.storeglobal.dispatch(ts_js_1.codigoconsola(resultado));
        return null;
    };
    return imprimir;
}());
exports.imprimir = imprimir;

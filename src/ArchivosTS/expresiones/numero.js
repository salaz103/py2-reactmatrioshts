"use strict";
exports.__esModule = true;
var numero = /** @class */ (function () {
    function numero(valor, tipo) {
        this.valor = valor;
        this.tipovalor = tipo;
    }
    numero.prototype.obtenerValor = function (ambito) {
        return new Number(this.valor);
    };
    numero.prototype.obtenerTipo = function () {
        return this.tipovalor;
    };
    return numero;
}());
exports.numero = numero;

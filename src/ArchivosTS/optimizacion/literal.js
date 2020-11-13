"use strict";
exports.__esModule = true;
var literal = /** @class */ (function () {
    function literal(tipo, valor) {
        this.tipo = tipo;
        this.valor = valor;
    }
    literal.prototype.obtenercodigo = function () {
        return { tipo: this.tipo, valor: this.valor };
    };
    return literal;
}());
exports.literal = literal;

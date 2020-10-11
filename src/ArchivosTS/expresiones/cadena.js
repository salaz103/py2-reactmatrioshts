"use strict";
exports.__esModule = true;
var cadena = /** @class */ (function () {
    function cadena(valor, tipo) {
        this.valorcadena = valor;
        this.tipoCadena = tipo;
    }
    cadena.prototype.obtenerValor = function (ambito) {
        return this.valorcadena;
    };
    cadena.prototype.obtenerTipo = function () {
        return this.tipoCadena;
    };
    return cadena;
}());
exports.cadena = cadena;

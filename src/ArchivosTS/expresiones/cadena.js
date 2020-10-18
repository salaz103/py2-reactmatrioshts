"use strict";
exports.__esModule = true;
var cadena = /** @class */ (function () {
    function cadena(valor, tipo, linea, columna) {
        this.valorcadena = valor;
        this.tipoCadena = tipo;
        this.linea = linea;
        this.columna = columna;
    }
    cadena.prototype.traducir = function (ambito) {
        throw new Error("Method not implemented.");
    };
    return cadena;
}());
exports.cadena = cadena;

"use strict";
exports.__esModule = true;
var declaracionarreglo = /** @class */ (function () {
    function declaracionarreglo(n, tipo, valores) {
        this.id = n;
        this.tipodato = tipo;
        this.listaexpresiones = valores;
    }
    declaracionarreglo.prototype.ejecutar = function (ambito) {
        throw new Error("Method not implemented.");
    };
    return declaracionarreglo;
}());
exports.declaracionarreglo = declaracionarreglo;

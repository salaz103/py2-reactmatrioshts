"use strict";
exports.__esModule = true;
var unaria = /** @class */ (function () {
    function unaria(op, expder, linea, columna) {
        this.expresionderecha = expder;
        this.tipooperador = op;
        this.linea = linea;
        this.columna = columna;
    }
    unaria.prototype.traducir = function (ambito) {
        return null;
    };
    return unaria;
}());
exports.unaria = unaria;

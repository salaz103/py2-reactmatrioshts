"use strict";
exports.__esModule = true;
var lector = /** @class */ (function () {
    function lector(codigo, linea) {
        this.codigo = codigo;
        this.linea = linea;
    }
    lector.prototype.optimizar = function () {
        return this.codigo + "\n";
    };
    return lector;
}());
exports.lector = lector;

"use strict";
exports.__esModule = true;
var goto = /** @class */ (function () {
    function goto(codigo, linea) {
        this.codigo = codigo;
        this.linea = linea;
    }
    goto.prototype.optimizar = function () {
        return this.codigo + "\n";
    };
    return goto;
}());
exports.goto = goto;

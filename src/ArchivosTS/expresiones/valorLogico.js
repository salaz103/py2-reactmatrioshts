"use strict";
exports.__esModule = true;
var valorLogico = /** @class */ (function () {
    function valorLogico(valor, tipo, linea, columna) {
        this.valorlogico = valor;
        this.tipovalor = tipo;
        this.linea = linea;
        this.columna = columna;
    }
    valorLogico.prototype.traducir = function (ambito) {
        throw new Error("Method not implemented.");
    };
    return valorLogico;
}());
exports.valorLogico = valorLogico;

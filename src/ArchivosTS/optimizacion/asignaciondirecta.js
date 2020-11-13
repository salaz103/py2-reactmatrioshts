"use strict";
exports.__esModule = true;
var asignaciondirecta = /** @class */ (function () {
    function asignaciondirecta(izquierdo, derecho, linea) {
        this.ladoizquierdo = izquierdo;
        this.ladoderecho = derecho;
        this.linea = linea;
    }
    asignaciondirecta.prototype.optimizar = function () {
        var derecho = this.ladoderecho.obtenercodigo();
        var codigo = this.ladoizquierdo + "=" + derecho.valor + ";\n";
        return codigo;
    };
    return asignaciondirecta;
}());
exports.asignaciondirecta = asignaciondirecta;

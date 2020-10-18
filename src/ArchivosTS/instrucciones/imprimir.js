"use strict";
exports.__esModule = true;
var imprimir = /** @class */ (function () {
    function imprimir(exp, linea, columna) {
        this.expresion = exp;
        this.linea = linea;
        this.columna = columna;
    }
    imprimir.prototype.traducir = function (ambito) {
        //SEGUN EL ANEXO SOLO SE VAN A IMPRIMIR VALORES DE TIPO DE DATO:
        //1. STRING
        //2. BOOLEAN
        //3. NUMBER
        throw new Error("Method not implemented.");
    };
    return imprimir;
}());
exports.imprimir = imprimir;

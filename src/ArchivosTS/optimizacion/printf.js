"use strict";
exports.__esModule = true;
var printf = /** @class */ (function () {
    function printf(tipo, casteo, valor, linea) {
        this.tipo = tipo;
        this.casteo = casteo;
        this.valor = valor;
        this.linea = linea;
    }
    printf.prototype.optimizar = function () {
        //DEBEMOS ARMAR EL CODIGO
        var codigo3dvalor = this.valor.obtenercodigo();
        var codigo = "printf(" + this.tipo + ",(" + this.casteo + ")" + codigo3dvalor.valor + ");\n";
        return codigo;
    };
    return printf;
}());
exports.printf = printf;

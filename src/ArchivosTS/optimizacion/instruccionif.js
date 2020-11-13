"use strict";
exports.__esModule = true;
var instruccionif = /** @class */ (function () {
    function instruccionif(opiz, operador, opder, etiquetatrue, linea) {
        this.ladoizquierdo = opiz;
        this.operador = operador;
        this.ladoderecho = opder;
        this.etiquetatrue = etiquetatrue;
        this.linea = linea;
    }
    instruccionif.prototype.optimizar = function () {
        //ARMAMOS EL CODIGO PARA REGRESARLO
        var codigoizquierdo = this.ladoizquierdo.obtenercodigo();
        var codigoderecho = this.ladoderecho.obtenercodigo();
        var codigo = "if(" + codigoizquierdo.valor + this.operador + codigoderecho.valor + ") goto " + this.etiquetatrue + ";\n";
        return codigo;
    };
    return instruccionif;
}());
exports.instruccionif = instruccionif;

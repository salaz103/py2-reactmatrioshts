"use strict";
exports.__esModule = true;
var tipo_1 = require("../entorno/tipo");
var instruccionreturn = /** @class */ (function () {
    function instruccionreturn(e) {
        this.exp = e;
        this.tipo = tipo_1.tipo_instruccion.RETURN;
        this.valor = null;
    }
    instruccionreturn.prototype.ejecutar = function (ambito) {
        if (this.exp == undefined) {
            //SIGNIFICA QUE ES UN RETURN SIN EXPRESION
            //return new Object(this.tipo);
            return this;
        }
        else {
            ///SIGNIFICA QUE ES UN RETURN CON EXPRESION
            //LO PRIMERO QUE TENGO QUE HACER ES EVALUAR ESA EXPRESION
            var val = this.exp.obtenerValor(ambito);
            this.valor = val;
            return this;
        }
    };
    return instruccionreturn;
}());
exports.instruccionreturn = instruccionreturn;

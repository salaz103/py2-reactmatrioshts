"use strict";
exports.__esModule = true;
var generacion_1 = require("../helpers/generacion");
var instruccionreturn = /** @class */ (function () {
    function instruccionreturn(exp, linea, columna) {
        this.exp = exp;
        this.linea = linea;
        this.columna = columna;
    }
    instruccionreturn.prototype.traducir = function (ambito) {
        var generador = generacion_1.generacion.getGenerador();
        //PRIMERO TENEMOS QUE VER SI ES UN RETURN CON EXPRESION
        if (this.exp != null) {
            var retorno_exp = this.exp.traducir(ambito);
            generador.stack("p", retorno_exp.obtenerValor());
            generador.agregarGoTo(ambito.etq_retorno);
        }
        else {
            generador.agregarGoTo(ambito.etq_retorno);
        }
    };
    return instruccionreturn;
}());
exports.instruccionreturn = instruccionreturn;

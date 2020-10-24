"use strict";
exports.__esModule = true;
var traduccionexp_1 = require("./traduccionexp");
var numero = /** @class */ (function () {
    function numero(valor, tipo, linea, columna) {
        this.valor = valor;
        this.tipodato = tipo;
        this.linea = linea;
        this.columna = columna;
    }
    numero.prototype.traducir = function (ambito) {
        ///TODAS LAS CLASES QUE HEREDEN DE EXPRESION SIEMPRE ANTES DE TRADUCIRLAS
        // SE LES COLOCARA EL TIPO 
        //EN ESTE CASO POR SER UN PRIMITIVO EL TIPO YA LO TIENEN DE FIJO
        return new traduccionexp_1.traduccionexp(this.valor.toString(), false, this.tipodato, false);
    };
    return numero;
}());
exports.numero = numero;

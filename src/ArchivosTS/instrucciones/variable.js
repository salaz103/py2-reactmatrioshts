"use strict";
exports.__esModule = true;
var variable = /** @class */ (function () {
    function variable(a, id, l, c, tipodato, exp, listaexpresiones) {
        this.arreglo = a;
        this.id = id;
        this.tipodato = tipodato;
        this.exp = exp;
        this.listae = listaexpresiones;
        //POSICION
        this.linea = l;
        this.columna = c;
    }
    return variable;
}());
exports.variable = variable;

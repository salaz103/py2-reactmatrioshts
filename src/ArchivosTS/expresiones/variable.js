"use strict";
exports.__esModule = true;
var variable = /** @class */ (function () {
    function variable(id, tipodato, l, c, ex, array, dimensiones) {
        this.id = id;
        this.tipodato = tipodato;
        //POSICION
        this.linea = l;
        this.columna = c;
        //EXPRESION
        this.exp = ex != null ? ex : null;
        //ARREGLO
        this.array = array;
        this.dimensiones = dimensiones;
    }
    return variable;
}());
exports.variable = variable;

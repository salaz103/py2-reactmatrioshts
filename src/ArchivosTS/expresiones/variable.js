"use strict";
exports.__esModule = true;
var variable = /** @class */ (function () {
    function variable(id, tipodato, l, c, ex) {
        this.id = id;
        this.tipodato = tipodato;
        //POSICION
        this.linea = l;
        this.columna = c;
        //EXPRESION
        this.exp = ex != null ? ex : null;
    }
    return variable;
}());
exports.variable = variable;

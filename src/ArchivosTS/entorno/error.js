"use strict";
exports.__esModule = true;
var error = /** @class */ (function () {
    function error(t, val, l, c) {
        this.tipo = t;
        this.valor = val;
        this.linea = l;
        this.columna = c;
    }
    return error;
}());
exports.error = error;

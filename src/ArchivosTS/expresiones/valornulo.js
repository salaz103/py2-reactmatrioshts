"use strict";
exports.__esModule = true;
var tipo_1 = require("../entorno/tipo");
var traduccionexp_1 = require("./traduccionexp");
var valornulo = /** @class */ (function () {
    function valornulo(tipo, linea, columna) {
        this.tipodato = tipo;
        this.linea = linea;
        this.columna = columna;
    }
    valornulo.prototype.traducir = function (ambito) {
        return new traduccionexp_1.traduccionexp("-1", false, tipo_1.tipo_dato.NULL, false, null, 0);
    };
    return valornulo;
}());
exports.valornulo = valornulo;

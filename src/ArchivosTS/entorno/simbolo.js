"use strict";
exports.__esModule = true;
var simbolo = /** @class */ (function () {
    function simbolo(id_e, tipo_d, amb, fila, columna, esGlobal, reasignable, direccion) {
        this.nombre = id_e;
        this.tipodato = tipo_d;
        this.ambito = amb;
        this.fila = fila;
        this.columna = columna;
        this.esGlobal = esGlobal;
        this.reasignable = reasignable;
        this.direccionrelativa = direccion != null ? direccion : 0;
    }
    simbolo.prototype.getNombre = function () {
        return this.nombre;
    };
    simbolo.prototype.getTipoDato = function () {
        return this.tipodato;
    };
    simbolo.prototype.setTipoDato = function (tipo_d) {
        this.tipodato = tipo_d;
    };
    return simbolo;
}());
exports.simbolo = simbolo;
exports["default"] = simbolo;

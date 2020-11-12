"use strict";
exports.__esModule = true;
var simbolo = /** @class */ (function () {
    function simbolo(id_e, tipo_d, amb, fila, columna, esGlobal, reasignable, direccion, dimensiones) {
        this.nombre = id_e;
        this.tipodato = tipo_d;
        this.ambito = amb;
        this.fila = fila;
        this.columna = columna;
        this.esGlobal = esGlobal;
        this.reasignable = reasignable;
        this.direccionrelativa = direccion != null ? direccion : 0;
        this.dimensiones = dimensiones == null ? 0 : dimensiones;
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
    simbolo.prototype.getReasignable = function () {
        return this.reasignable;
    };
    simbolo.prototype.getTipo = function () {
        return this.tipodato;
    };
    return simbolo;
}());
exports.simbolo = simbolo;
exports["default"] = simbolo;

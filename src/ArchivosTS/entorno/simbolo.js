"use strict";
exports.__esModule = true;
var simbolo = /** @class */ (function () {
    function simbolo(id_e, tipo_e, amb, r, fila, columna, direccion) {
        this.nombre = id_e;
        this.tipovalor = tipo_e;
        this.ambito = amb;
        this.fila = fila;
        this.columna = columna;
        this.apuntador = direccion != null ? direccion : 0;
    }
    simbolo.prototype.getNombre = function () {
        return this.nombre;
    };
    simbolo.prototype.getTipo = function () {
        return this.tipovalor;
    };
    simbolo.prototype.setTipo = function (tipo) {
        this.tipovalor = tipo;
    };
    return simbolo;
}());
exports.simbolo = simbolo;
exports["default"] = simbolo;

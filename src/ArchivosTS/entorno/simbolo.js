"use strict";
exports.__esModule = true;
var simbolo = /** @class */ (function () {
    function simbolo(id_e, reasignable, tipo_e, valor) {
        this.id = id_e;
        this.tipovalor = tipo_e;
        this.valor = valor;
        this.reasignable = reasignable;
    }
    simbolo.prototype.getId = function () {
        return this.id;
    };
    simbolo.prototype.getTipo = function () {
        return this.tipovalor;
    };
    simbolo.prototype.setTipo = function (tipo) {
        this.tipovalor = tipo;
    };
    simbolo.prototype.getValor = function () {
        return this.valor;
    };
    simbolo.prototype.setValor = function (valor_e) {
        this.valor = valor_e;
    };
    simbolo.prototype.getReasignable = function () {
        return this.reasignable;
    };
    return simbolo;
}());
exports.simbolo = simbolo;
exports["default"] = simbolo;

"use strict";
exports.__esModule = true;
var funcion = /** @class */ (function () {
    function funcion(t, nombre, obfuncion) {
        this.tipovalor = t;
        this.id = nombre;
        this.valor = obfuncion;
    }
    funcion.prototype.getTipo = function () {
        return this.tipovalor;
    };
    funcion.prototype.getValor = function () {
        //AQUI SOLO RETORNAMOS LA FUNCION, PARA PODER EJECUTARLA
        return this.valor;
    };
    funcion.prototype.getId = function () {
        return this.id;
    };
    return funcion;
}());
exports.funcion = funcion;

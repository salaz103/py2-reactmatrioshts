"use strict";
exports.__esModule = true;
var funcion = /** @class */ (function () {
    function funcion(id) {
        this.nombre = id;
        this.nuevonombre = "";
    }
    funcion.prototype.setNuevoNombre = function (nuevo) {
        this.nuevonombre = nuevo;
    };
    funcion.prototype.getNuevoNombre = function () {
        return this.nuevonombre;
    };
    return funcion;
}());
exports.funcion = funcion;

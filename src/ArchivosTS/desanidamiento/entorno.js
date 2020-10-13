"use strict";
exports.__esModule = true;
var entorno = /** @class */ (function () {
    function entorno(apuntadorpadre, nombre) {
        this.apuntadorPadre = apuntadorpadre != null ? apuntadorpadre : null;
        this.nombre = nombre != null ? nombre : null;
        this.funciones = new Map();
    }
    entorno.prototype.esPadre = function () {
        return this.nombre != null;
    };
    entorno.prototype.guardarFuncion = function (fn) {
        var ambito = this;
        if (ambito.apuntadorPadre != null) {
            ambito = ambito.apuntadorPadre;
        }
        ambito.funciones.set(fn.nombre, fn);
    };
    entorno.prototype.getNombrePadre = function (id) {
        var n = id;
        for (var ambito = this; ambito != null; ambito = ambito.apuntadorPadre) {
            console.log("NOMBRE AMBITO ACTUAL: " + ambito.getNombre());
            if (ambito.esPadre()) {
                n = ambito.getNombre() + "_" + n;
            }
        }
        return n;
    };
    entorno.prototype.getNombre = function () {
        return this.nombre;
    };
    entorno.prototype.getFuncion = function (id) {
        for (var ambito = this; ambito != null; ambito = ambito.apuntadorPadre) {
            var fn = ambito.funciones.get(id);
            if (fn != null) {
                return fn;
            }
        }
        return null;
    };
    return entorno;
}());
exports.entorno = entorno;

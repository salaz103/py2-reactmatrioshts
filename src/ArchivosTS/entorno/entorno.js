"use strict";
exports.__esModule = true;
var entorno = /** @class */ (function () {
    function entorno(nombre, tipoambito, ambitoPadre) {
        this.nombre = nombre;
        this.apuntadorPadre = ambitoPadre != null ? ambitoPadre : null;
        this.tablasimbolos = new Map();
        this.tablaf = new Map();
        this.tipoambito = tipoambito;
    }
    entorno.prototype.agregarSimbolo = function (nuevoSimbolo) {
        this.tablasimbolos.set(nuevoSimbolo.getNombre(), nuevoSimbolo);
    };
    entorno.prototype.agregarFuncion = function (funcion) {
        //this.tablaf.set(funcion.nombre,funcion);
    };
    entorno.prototype.asignarValor = function (id, valor, tipo) {
    };
    entorno.prototype.existe = function (id) {
        return false;
    };
    entorno.prototype.existeLocal = function (id) {
        var simbolo = this.tablasimbolos.get(id);
        if (simbolo != null) {
            return true;
        }
        return false;
    };
    entorno.prototype.getSimbolo = function (id) {
        for (var entornoactual = this; entornoactual != null; entornoactual = entornoactual.apuntadorPadre) {
            var simbolo_1 = entornoactual.tablasimbolos.get(id);
            if (simbolo_1 != null) {
                return simbolo_1;
            }
        }
    };
    entorno.prototype.existeFuncion = function (id) {
        for (var entornoactual = this; entornoactual != null; entornoactual = entornoactual.apuntadorPadre) {
            var funcion = entornoactual.tablaf.get(id);
            if (funcion != null) {
                return funcion;
            }
        }
        return null;
    };
    return entorno;
}());
exports["default"] = entorno;

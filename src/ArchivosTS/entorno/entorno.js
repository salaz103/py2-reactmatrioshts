"use strict";
exports.__esModule = true;
var simbolo_1 = require("./simbolo");
var entorno = /** @class */ (function () {
    function entorno(nombre, tipoambito, ambitoPadre) {
        this.nombre = nombre;
        this.apuntadorPadre = ambitoPadre != null ? ambitoPadre : null;
        this.tablasimbolos = new Map();
        this.tablaf = new Map();
        this.tipoambito = tipoambito;
        this.tamaño = ambitoPadre != null ? ambitoPadre.tamaño : 0;
        this.funcionActual = ambitoPadre != null ? ambitoPadre.funcionActual : null;
        this.etq_retorno = ambitoPadre != null ? ambitoPadre.etq_retorno : null;
        this.etq_break = ambitoPadre != null ? ambitoPadre.etq_break : null;
        this.etq_continue = ambitoPadre != null ? ambitoPadre.etq_continue : null;
    }
    entorno.prototype.agregarSimbolo = function (id, tipodato, nombreambito, fila, columna, reasignable) {
        var nuevosim = new simbolo_1["default"](id, tipodato, nombreambito, fila, columna, this.apuntadorPadre == null, reasignable, this.tamaño++);
        this.tablasimbolos.set(id, nuevosim);
        return nuevosim;
    };
    entorno.prototype.agregarFuncion = function (funcion) {
        //this.tablaf.set(funcion.nombre,funcion);
        this.tablaf.set(funcion.nombre.toLowerCase(), funcion);
    };
    entorno.prototype.asignarValor = function (id, valor, tipo) {
    };
    entorno.prototype.setearFuncion = function (funcion, etiqueta_retorno) {
        //SI SE ENTRA A ESTE METODO, ES POR QUE ESTAMOS SETEANDO UNA FUNCION AL AMBITO (LOCAL)
        //SE COLOCA TAMAÑO 1, DEBIDO A QUE SI ES UNA FUNCION PUEDE TENER UN RETURN
        //POR LO QUE LA POS 0 ESTA RESERVADA
        this.tamaño = 1;
        this.etq_retorno = etiqueta_retorno;
        this.funcionActual = funcion;
    };
    entorno.prototype.existe = function (id) {
        for (var entornoactual = this; entornoactual != null; entornoactual = entornoactual.apuntadorPadre) {
            var simbolo_2 = entornoactual.tablasimbolos.get(id);
            if (simbolo_2 != null) {
                return true;
            }
        }
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
            var simbolo_3 = entornoactual.tablasimbolos.get(id);
            if (simbolo_3 != null) {
                return simbolo_3;
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

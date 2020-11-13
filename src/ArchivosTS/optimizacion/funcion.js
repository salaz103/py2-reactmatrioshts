"use strict";
exports.__esModule = true;
var funcion = /** @class */ (function () {
    function funcion(nombre, lista, linea) {
        this.nombreFuncion = nombre;
        this.lista_instrucciones = lista;
        this.linea = linea;
    }
    funcion.prototype.optimizar = function () {
        var retorno = this.nombreFuncion + "(){\n";
        for (var i = 0; i < this.lista_instrucciones.length; i++) {
            retorno = retorno + this.lista_instrucciones[i].optimizar();
        }
        retorno = retorno + "\n } \n";
        return retorno;
    };
    return funcion;
}());
exports.funcion = funcion;

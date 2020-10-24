"use strict";
exports.__esModule = true;
var generacion_1 = require("../helpers/generacion");
var traduccionexp_1 = require("./traduccionexp");
var cadena = /** @class */ (function () {
    function cadena(valor, tipo, linea, columna) {
        this.valorcadena = valor;
        this.tipodato = tipo;
        this.linea = linea;
        this.columna = columna;
    }
    cadena.prototype.traducir = function (ambito) {
        //PUEDE QUE VENGA UNA SOLA LETRA (CHAR) Ó QUE VENGA UNA CADENA
        var generador = generacion_1.generacion.getGenerador();
        var temp_pos_inicio = generador.generarTemporal();
        //AQUI ESTAMOS GUARDANDO LA POSICION DONDE INICIARA LA CADENA
        generador.agregarExpresion(temp_pos_inicio, "h", "", "");
        for (var i = 0; i < this.valorcadena.length; i++) {
            generador.heap("h", this.valorcadena.charCodeAt(i));
            generador.siguienteHeap();
        }
        generador.heap("h", "-1");
        generador.siguienteHeap();
        return new traduccionexp_1.traduccionexp(temp_pos_inicio, true, this.tipodato, false);
    };
    return cadena;
}());
exports.cadena = cadena;

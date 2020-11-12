"use strict";
exports.__esModule = true;
var tipo_1 = require("../entorno/tipo");
var generacion_1 = require("../helpers/generacion");
var traduccionexp_1 = require("./traduccionexp");
var newArray = /** @class */ (function () {
    function newArray(tamaño, linea, columna) {
        this.tamaño = tamaño;
        this.linea = linea;
        this.columna = columna;
    }
    newArray.prototype.traducir = function (ambito) {
        var generador = generacion_1.generacion.getGenerador();
        var retorno_tamaño = this.tamaño.traducir(ambito);
        var temp_inicio_arreglo = generador.generarTemporal();
        generador.agregarExpresion(temp_inicio_arreglo, "h", "", "");
        //AHORA VAMOS A SETEAR EN LA PRIMERA POSICION, EL TAMAÑO
        generador.heap("h", retorno_tamaño.obtenerValor());
        //AHORA MOVEMOS EL APUNTADOR H EL TAMAÑO QUE NECESITAMOS
        generador.agregarExpresion("h", "h", "+", retorno_tamaño.obtenerValor());
        //SUMAMOS UNO MÁS, YA QUE EN LA PRIMERA POS, SE ESTA GUARDANDO EL TAMAÑO
        generador.siguienteHeap();
        //RETORNO CON DIMENSIONES
        return new traduccionexp_1.traduccionexp(temp_inicio_arreglo, true, tipo_1.tipo_dato.ARRAY, false, null, 1);
    };
    return newArray;
}());
exports.newArray = newArray;

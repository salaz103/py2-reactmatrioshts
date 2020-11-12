"use strict";
exports.__esModule = true;
var tipo_1 = require("../entorno/tipo");
var generacion_1 = require("../helpers/generacion");
var traduccionexp_1 = require("./traduccionexp");
var arreglo = /** @class */ (function () {
    function arreglo(lista, linea, columna) {
        this.lista_expresiones = lista;
        this.linea = linea;
        this.columna = columna;
    }
    arreglo.prototype.traducir = function (ambito) {
        var _this = this;
        var generador = generacion_1.generacion.getGenerador();
        var temporal_inicio_arreglo = generador.generarTemporal();
        var temporal_asignacion = generador.generarTemporal();
        generador.sacarTemporal(temporal_asignacion);
        var dimension = 0;
        var tipo_resultante;
        generador.agregarExpresion(temporal_inicio_arreglo, "h", "", "");
        generador.heap("h", this.lista_expresiones.length);
        //AHORA MOVEMOS H 
        generador.agregarExpresion("h", "h", "+", this.lista_expresiones.length + 1);
        generador.agregarExpresion(temporal_asignacion, temporal_inicio_arreglo, "+", "1");
        this.lista_expresiones.forEach(function (expresion, index) {
            var retorno_expresion = expresion.traducir(ambito);
            dimension = retorno_expresion.dimensiones + 1;
            if (retorno_expresion.tipodato != tipo_1.tipo_dato.BOOLEAN) {
                generador.heap(temporal_asignacion, retorno_expresion.obtenerValor());
            }
            else {
                //SIGNIFICA QUE ES BOOLEAN
                var temporal_valor = generador.generarTemporal();
                generador.sacarTemporal(temporal_valor);
                var etiqueta_salida = generador.generarEtiqueta();
                generador.agregarEtiqueta(retorno_expresion.etiquetastrue);
                generador.agregarExpresion(temporal_valor, "1", "", "");
                generador.agregarGoTo(etiqueta_salida);
                generador.agregarEtiqueta(retorno_expresion.etiquetasfalse);
                generador.agregarExpresion(temporal_valor, "0", "", "");
                generador.agregarEtiqueta(etiqueta_salida);
                generador.heap(temporal_asignacion, temporal_valor);
            }
            if (index != _this.lista_expresiones.length - 1) {
                generador.agregarExpresion(temporal_asignacion, temporal_asignacion, "+", "1");
            }
            tipo_resultante = retorno_expresion.tipodato;
        });
        if (tipo_resultante == tipo_1.tipo_dato.ENTERO) {
            tipo_resultante = tipo_1.tipo_dato.DECIMAL;
        }
        console.log(dimension);
        return new traduccionexp_1.traduccionexp(temporal_inicio_arreglo, true, tipo_resultante, false, null, dimension);
    };
    return arreglo;
}());
exports.arreglo = arreglo;

"use strict";
exports.__esModule = true;
var generacion_1 = require("../helpers/generacion");
var traduccionexp_1 = require("./traduccionexp");
var accesoarray = /** @class */ (function () {
    function accesoarray(arreglo, indice, linea, columna) {
        this.arreglo = arreglo;
        this.indice = indice;
        this.linea = linea;
        this.columna = columna;
    }
    accesoarray.prototype.traducir = function (ambito) {
        var generador = generacion_1.generacion.getGenerador();
        var retorno_arreglo = this.arreglo.traducir(ambito);
        var retorno_indice = this.indice.traducir(ambito);
        console.log(retorno_arreglo);
        //VALIDAMOS SI EL RETORNO ES UN ARREGLO
        if (retorno_arreglo.dimensiones == 0) {
            console.log("ERROR, DE ACCESO EN ARREGLO");
            return;
        }
        var temporal_regreso = generador.generarTemporal();
        var temporal_acceso = generador.generarTemporal();
        generador.sacarTemporal(temporal_acceso);
        //PRIMERO SETEAMOS EL TEMPORAL DE ACCESO EN LA POSICION DEL INDICE
        generador.agregarExpresion(temporal_acceso, retorno_arreglo.obtenerValor(), "+", retorno_indice.obtenerValor());
        //AHORA SUMAMOS UNO A ESE VALOR, YA QUE LA POSICIÓN CERO ESTA RESERVADA PARA EL LENGTH
        generador.agregarExpresion(temporal_acceso, temporal_acceso, "+", "1");
        //AHORA YA PODEMOS IR A LEER EL VALOR DEL HEAP
        generador.getValorHeap(temporal_regreso, temporal_acceso);
        return new traduccionexp_1.traduccionexp(temporal_regreso, true, retorno_arreglo.tipodato, false, null, retorno_arreglo.dimensiones - 1);
    };
    return accesoarray;
}());
exports.accesoarray = accesoarray;

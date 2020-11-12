"use strict";
exports.__esModule = true;
var generacion_1 = require("../helpers/generacion");
var traduccionexp = /** @class */ (function () {
    function traduccionexp(val, temp, tipodato, etiquetas, sim, dimensiones) {
        this.valor = val;
        this.es_temporal = temp;
        this.tipodato = tipodato;
        this.tiene_etiquetas = etiquetas;
        this.etiquetastrue = '';
        this.etiquetasfalse = '';
        this.sim = sim;
        this.dimensiones = dimensiones == null ? 0 : dimensiones;
    }
    traduccionexp.prototype.obtenerValor = function () {
        generacion_1.generacion.getGenerador().sacarTemporal(this.valor);
        return this.valor;
    };
    return traduccionexp;
}());
exports.traduccionexp = traduccionexp;

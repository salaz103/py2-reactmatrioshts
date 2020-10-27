"use strict";
exports.__esModule = true;
var generacion_1 = require("../helpers/generacion");
var traduccionexp_1 = require("./traduccionexp");
var valorLogico = /** @class */ (function () {
    function valorLogico(valor, tipo, linea, columna) {
        this.valorlogico = valor;
        this.tipodato = tipo;
        this.linea = linea;
        this.columna = columna;
    }
    valorLogico.prototype.traducir = function (ambito) {
        var generador = generacion_1.generacion.getGenerador();
        var retorno = new traduccionexp_1.traduccionexp('', false, this.tipodato, true);
        var etqtrue = generador.generarEtiqueta();
        var etqfalse = generador.generarEtiqueta();
        this.valorlogico == "TRUE" ? generador.agregarGoTo(etqtrue) : generador.agregarGoTo(etqfalse);
        if (this.valorlogico == 'TRUE') {
            retorno.valor = '1';
        }
        else if (this.valorlogico == 'FALSE') {
            retorno.valor = '0';
        }
        retorno.etiquetastrue = etqtrue;
        retorno.etiquetasfalse = etqfalse;
        return retorno;
    };
    return valorLogico;
}());
exports.valorLogico = valorLogico;

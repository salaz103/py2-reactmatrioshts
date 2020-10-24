"use strict";
exports.__esModule = true;
var traduccionexp_1 = require("./traduccionexp");
var valorLogico = /** @class */ (function () {
    function valorLogico(valor, tipo, linea, columna) {
        this.valorlogico = valor;
        this.tipodato = tipo;
        this.linea = linea;
        this.columna = columna;
    }
    valorLogico.prototype.traducir = function (ambito) {
        var retorno = new traduccionexp_1.traduccionexp('', false, this.tipodato, false);
        if (this.valorlogico == 'TRUE') {
            retorno.valor = '1';
        }
        else if (this.valorlogico == 'FALSE') {
            retorno.valor = '0';
        }
        return retorno;
    };
    return valorLogico;
}());
exports.valorLogico = valorLogico;

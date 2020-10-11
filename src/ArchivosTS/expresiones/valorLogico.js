"use strict";
exports.__esModule = true;
var valorLogico = /** @class */ (function () {
    function valorLogico(valor, tipo) {
        this.valorlogico = valor;
        this.tipovalor = tipo;
    }
    valorLogico.prototype.obtenerValor = function (ambito) {
        if (this.valorlogico == 'TRUE') {
            return new Boolean(true);
        }
        else if (this.valorlogico == 'FALSE') {
            return new Boolean(false);
        }
        return null;
    };
    valorLogico.prototype.obtenerTipo = function () {
        return this.tipovalor;
    };
    return valorLogico;
}());
exports.valorLogico = valorLogico;

"use strict";
exports.__esModule = true;
var fmod = /** @class */ (function () {
    function fmod(temporal, l1, l2, linea) {
        this.temporal = temporal;
        this.literal1 = l1;
        this.literal2 = l2;
        this.linea = linea;
    }
    fmod.prototype.optimizar = function () {
        //TOCAR ARMAR EL CODIGO
        var codigol1 = this.literal1.obtenercodigo();
        var codigol2 = this.literal2.obtenercodigo();
        var codigo = this.temporal + "= fmod(" + codigol1.valor + "," + codigol2.valor + ");\n";
        return codigo;
    };
    return fmod;
}());
exports.fmod = fmod;

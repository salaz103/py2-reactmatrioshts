"use strict";
exports.__esModule = true;
var instruccionswitch = /** @class */ (function () {
    function instruccionswitch(ex, casos, linea, columna) {
        this.exp = ex;
        this.casos = casos;
        this.linea = linea;
        this.columna = columna;
    }
    instruccionswitch.prototype.traducir = function (ambito) {
        throw new Error("Method not implemented.");
    };
    return instruccionswitch;
}());
exports.instruccionswitch = instruccionswitch;

"use strict";
exports.__esModule = true;
var declaracion = /** @class */ (function () {
    function declaracion(tipov, vars) {
        this.tipovariable = tipov;
        this.variables = vars;
    }
    declaracion.prototype.traducir = function (ambito) {
        console.log("TRADUCCION DE DECLARACION");
    };
    return declaracion;
}());
exports.declaracion = declaracion;

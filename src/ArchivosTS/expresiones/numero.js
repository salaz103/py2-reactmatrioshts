"use strict";
exports.__esModule = true;
var tipo_1 = require("../entorno/tipo");
var traduccionexp_1 = require("./traduccionexp");
var numero = /** @class */ (function () {
    function numero(valor, tipo, linea, columna) {
        this.valor = valor;
        this.tipodato = tipo;
        this.linea = linea;
        this.columna = columna;
    }
    numero.prototype.traducir = function (ambito) {
        //EL VALOR PUEDE QUE SEA ENTERO Y DECIMAL, PRIMERO TENEMOS QUE VER QUE TIPO ES
        var ret = new traduccionexp_1.traduccionexp(this.valor.toString(), false, tipo_1.tipo_dato.UNDEFINED, false);
        console.log(isInt(this.valor));
        if (isInt(this.valor)) {
            ret.tipodato = tipo_1.tipo_dato.ENTERO;
        }
        else {
            ret.tipodato = tipo_1.tipo_dato.DECIMAL;
        }
        return ret;
    };
    return numero;
}());
exports.numero = numero;
function isInt(value) {
    var x;
    if (isNaN(value)) {
        return false;
    }
    x = parseFloat(value);
    return (x | 0) === x;
}

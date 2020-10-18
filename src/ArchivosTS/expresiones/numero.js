"use strict";
exports.__esModule = true;
var tipo_1 = require("../entorno/tipo");
var app_1 = require("../../../src/app");
var ts_js_1 = require("../../actions/ts.js");
var helpers_1 = require("../helpers/helpers");
var traduccionexp_1 = require("./traduccionexp");
var numero = /** @class */ (function () {
    function numero(valor, tipo) {
        this.valor = valor;
        this.tipovalor = tipo;
    }
    numero.prototype.traducir = function (ambito) {
        //return new Number(this.valor);
        var temporal = helpers_1.generartmp();
        var c3d = temporal + " =" + this.valor + ";\n";
        //console.log(c3d);
        app_1.almacen.dispatch(ts_js_1.agregarcodigo3d(c3d));
        //console.log(almacen.getState());
        return new traduccionexp_1.traduccionexp(temporal, tipo_1.tipo_valor.NUMBER, false, [], []);
    };
    return numero;
}());
exports.numero = numero;

"use strict";
exports.__esModule = true;
var tipo_1 = require("../../entorno/tipo");
var app_1 = require("../../../../src/app");
var ts_js_1 = require("../../../actions/ts.js");
var traduccionexp_1 = require("../traduccionexp");
var unaria = /** @class */ (function () {
    function unaria(op, expder, linea, columna) {
        this.expresionderecha = expder;
        this.tipooperador = op;
        this.linea = linea;
        this.columna = columna;
    }
    unaria.prototype.traducir = function (ambito) {
        var retornoexp = this.expresionderecha.traducir(ambito);
        if (this.tipooperador == tipo_1.operador.MENOS) {
            if (retornoexp.tipodato == tipo_1.tipo_dato.NUMBER) {
                return new traduccionexp_1.traduccionexp("-" + retornoexp.obtenerValor(), retornoexp.es_temporal, retornoexp.tipodato, retornoexp.tiene_etiquetas);
            }
            else {
                app_1.almacen.dispatch(ts_js_1.errores({
                    tipo: 'SEMANTICO',
                    descripcion: 'OPERADOR NEGATIVO SOLO ES APLICABLE A NUMBER',
                    ambito: ambito.nombre,
                    linea: this.linea,
                    columna: this.columna
                }));
            }
        }
        else if (this.tipooperador == tipo_1.operador.NOT) {
        }
        return new traduccionexp_1.traduccionexp("", false, tipo_1.tipo_dato.UNDEFINED, false);
    };
    return unaria;
}());
exports.unaria = unaria;

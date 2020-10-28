"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var tipo_1 = require("../../entorno/tipo");
var operacion_1 = require("./operacion");
var app_1 = require("../../../../src/app");
var ts_js_1 = require("../../../actions/ts.js");
var generacion_1 = require("../../helpers/generacion");
var traduccionexp_1 = require("../traduccionexp");
var logica = /** @class */ (function (_super) {
    __extends(logica, _super);
    function logica(expiz, op, expder, linea, columna) {
        var _this = _super.call(this, expiz, op, expder) || this;
        _this.linea = linea;
        _this.columna = columna;
        return _this;
    }
    logica.prototype.traducir = function (ambito) {
        var generador = generacion_1.generacion.getGenerador();
        //PRIMERO VEMOS SI ES AND,OR
        if (this.tipooperador == tipo_1.operador.AND) {
            var retornoizquierdo = this.expresionizquierda.traducir(ambito);
            if (retornoizquierdo.tipodato == tipo_1.tipo_dato.BOOLEAN) {
                generador.agregarEtiqueta(retornoizquierdo.etiquetastrue);
                var retornoderecho = this.expresionderecha.traducir(ambito);
                if (retornoderecho.tipodato == tipo_1.tipo_dato.BOOLEAN) {
                    generador.agregarEtiqueta(retornoizquierdo.etiquetasfalse);
                    generador.agregarGoTo(retornoderecho.etiquetasfalse);
                    var retorno = new traduccionexp_1.traduccionexp("", false, tipo_1.tipo_dato.BOOLEAN, true);
                    retorno.etiquetastrue = retornoderecho.etiquetastrue;
                    retorno.etiquetasfalse = retornoderecho.etiquetasfalse;
                    return retorno;
                }
                else {
                    app_1.almacen.dispatch(ts_js_1.errores({
                        tipo: 'SEMANTICO',
                        descripcion: '2DO OPERADOR EN && NO ES BOOLEAN, SE RECIBIO: ' + retornoderecho.tipodato,
                        ambito: ambito.nombre,
                        linea: this.linea,
                        columna: this.columna
                    }));
                    generador.agregarEtiqueta(retornoizquierdo.etiquetasfalse);
                    return new traduccionexp_1.traduccionexp("", false, tipo_1.tipo_dato.UNDEFINED, false);
                }
            }
            else {
                app_1.almacen.dispatch(ts_js_1.errores({
                    tipo: 'SEMANTICO',
                    descripcion: '1ER OPERADOR EN && NO ES BOOLEAN, SE RECIBIO: ' + retornoizquierdo.tipodato,
                    ambito: ambito.nombre,
                    linea: this.linea,
                    columna: this.columna
                }));
                return new traduccionexp_1.traduccionexp("", false, tipo_1.tipo_dato.UNDEFINED, false);
            }
        }
        else if (this.tipooperador == tipo_1.operador.OR) {
            var retornoizquierdo = this.expresionizquierda.traducir(ambito);
            if (retornoizquierdo.tipodato == tipo_1.tipo_dato.BOOLEAN) {
                generador.agregarEtiqueta(retornoizquierdo.etiquetasfalse);
                var retornoderecho = this.expresionderecha.traducir(ambito);
                if (retornoderecho.tipodato == tipo_1.tipo_dato.BOOLEAN) {
                    generador.agregarEtiqueta(retornoderecho.etiquetastrue);
                    generador.agregarGoTo(retornoizquierdo.etiquetastrue);
                    var retorno = new traduccionexp_1.traduccionexp("", false, tipo_1.tipo_dato.BOOLEAN, true);
                    retorno.etiquetastrue = retornoizquierdo.etiquetastrue;
                    retorno.etiquetasfalse = retornoderecho.etiquetasfalse;
                    return retorno;
                }
                else {
                    app_1.almacen.dispatch(ts_js_1.errores({
                        tipo: 'SEMANTICO',
                        descripcion: '2DO OPERADOR EN || NO ES BOOLEAN, SE RECIBIO: ' + retornoderecho.tipodato,
                        ambito: ambito.nombre,
                        linea: this.linea,
                        columna: this.columna
                    }));
                    generador.agregarEtiqueta(retornoizquierdo.etiquetastrue);
                    return new traduccionexp_1.traduccionexp("", false, tipo_1.tipo_dato.UNDEFINED, false);
                }
            }
            else {
                app_1.almacen.dispatch(ts_js_1.errores({
                    tipo: 'SEMANTICO',
                    descripcion: '1ER OPERADOR EN || NO ES BOOLEAN, SE RECIBIO: ' + retornoizquierdo.tipodato,
                    ambito: ambito.nombre,
                    linea: this.linea,
                    columna: this.columna
                }));
                return new traduccionexp_1.traduccionexp("", false, tipo_1.tipo_dato.UNDEFINED, false);
            }
        }
        return null;
    };
    return logica;
}(operacion_1["default"]));
exports.logica = logica;

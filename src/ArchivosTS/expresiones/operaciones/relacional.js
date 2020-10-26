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
var generacion_1 = require("../../helpers/generacion");
var traduccionexp_1 = require("../traduccionexp");
var operacion_1 = require("./operacion");
var app_1 = require("../../../../src/app");
var ts_js_1 = require("../../../actions/ts.js");
var relacional = /** @class */ (function (_super) {
    __extends(relacional, _super);
    function relacional(expiz, op, expder, linea, columna) {
        var _this = _super.call(this, expiz, op, expder) || this;
        _this.linea = linea;
        _this.columna = columna;
        return _this;
    }
    relacional.prototype.traducir = function (ambito) {
        var generador = generacion_1.generacion.getGenerador();
        var retornoizquierdo = this.expresionizquierda.traducir(ambito);
        var retornoderecho = this.expresionderecha.traducir(ambito);
        //**********************************MAYOR QUE********************************************** */
        if (this.tipooperador == tipo_1.operador.MAYORQUE) {
            if ((retornoizquierdo.tipodato == tipo_1.tipo_dato.ENTERO || retornoizquierdo.tipodato == tipo_1.tipo_dato.DECIMAL)
                && (retornoderecho.tipodato == tipo_1.tipo_dato.ENTERO || retornoderecho.tipodato == tipo_1.tipo_dato.DECIMAL)) {
                var etiquetatrue = generador.generarEtiqueta();
                var etiquetafalse = generador.generarEtiqueta();
                generador.agregarIf(retornoizquierdo.obtenerValor(), ">", retornoderecho.obtenerValor(), etiquetatrue);
                generador.agregarGoTo(etiquetafalse);
                var valorretorno = new traduccionexp_1.traduccionexp("", false, tipo_1.tipo_dato.BOOLEAN, true);
                valorretorno.etiquetastrue = etiquetatrue;
                valorretorno.etiquetasfalse = etiquetafalse;
                return valorretorno;
            }
            else {
                app_1.almacen.dispatch(ts_js_1.errores({
                    tipo: 'SEMANTICO',
                    descripcion: 'OPERADOR > NECESITA OPERANDOS NUMBER, SE RECIBIERON:' + retornoizquierdo.tipodato + " y " + retornoderecho.tipodato,
                    ambito: ambito.nombre,
                    linea: this.linea,
                    columna: this.columna
                }));
            }
            //**********************************MAYOR O IGUAL QUE********************************************** */
        }
        else if (this.tipooperador == tipo_1.operador.MAYORIGUALQUE) {
            if ((retornoizquierdo.tipodato == tipo_1.tipo_dato.ENTERO || retornoizquierdo.tipodato == tipo_1.tipo_dato.DECIMAL)
                && (retornoderecho.tipodato == tipo_1.tipo_dato.ENTERO || retornoderecho.tipodato == tipo_1.tipo_dato.DECIMAL)) {
                var etiquetatrue = generador.generarEtiqueta();
                var etiquetafalse = generador.generarEtiqueta();
                generador.agregarIf(retornoizquierdo.obtenerValor(), ">=", retornoderecho.obtenerValor(), etiquetatrue);
                generador.agregarGoTo(etiquetafalse);
                var valorretorno = new traduccionexp_1.traduccionexp("", false, tipo_1.tipo_dato.BOOLEAN, true);
                valorretorno.etiquetastrue = etiquetatrue;
                valorretorno.etiquetasfalse = etiquetafalse;
                return valorretorno;
            }
            else {
                app_1.almacen.dispatch(ts_js_1.errores({
                    tipo: 'SEMANTICO',
                    descripcion: 'OPERADOR >= NECESITA OPERANDOS NUMBER, SE RECIBIERON:' + retornoizquierdo.tipodato + " y " + retornoderecho.tipodato,
                    ambito: ambito.nombre,
                    linea: this.linea,
                    columna: this.columna
                }));
            }
            //**********************************MENOR QUE**************************************************** */            
        }
        else if (this.tipooperador == tipo_1.operador.MENORQUE) {
            if ((retornoizquierdo.tipodato == tipo_1.tipo_dato.ENTERO || retornoizquierdo.tipodato == tipo_1.tipo_dato.DECIMAL)
                && (retornoderecho.tipodato == tipo_1.tipo_dato.ENTERO || retornoderecho.tipodato == tipo_1.tipo_dato.DECIMAL)) {
                var etiquetatrue = generador.generarEtiqueta();
                var etiquetafalse = generador.generarEtiqueta();
                generador.agregarIf(retornoizquierdo.obtenerValor(), "<", retornoderecho.obtenerValor(), etiquetatrue);
                generador.agregarGoTo(etiquetafalse);
                var valorretorno = new traduccionexp_1.traduccionexp("", false, tipo_1.tipo_dato.BOOLEAN, true);
                valorretorno.etiquetastrue = etiquetatrue;
                valorretorno.etiquetasfalse = etiquetafalse;
                return valorretorno;
            }
            else {
                app_1.almacen.dispatch(ts_js_1.errores({
                    tipo: 'SEMANTICO',
                    descripcion: 'OPERADOR < NECESITA OPERANDOS NUMBER, SE RECIBIERON:' + retornoizquierdo.tipodato + " y " + retornoderecho.tipodato,
                    ambito: ambito.nombre,
                    linea: this.linea,
                    columna: this.columna
                }));
            }
            //**********************************MENOR O IGUAL QUE******************************************** */
        }
        else if (this.tipooperador == tipo_1.operador.MENORIGUALQUE) {
            if ((retornoizquierdo.tipodato == tipo_1.tipo_dato.ENTERO || retornoizquierdo.tipodato == tipo_1.tipo_dato.DECIMAL)
                && (retornoderecho.tipodato == tipo_1.tipo_dato.ENTERO || retornoderecho.tipodato == tipo_1.tipo_dato.DECIMAL)) {
                var etiquetatrue = generador.generarEtiqueta();
                var etiquetafalse = generador.generarEtiqueta();
                generador.agregarIf(retornoizquierdo.obtenerValor(), "<=", retornoderecho.obtenerValor(), etiquetatrue);
                generador.agregarGoTo(etiquetafalse);
                var valorretorno = new traduccionexp_1.traduccionexp("", false, tipo_1.tipo_dato.BOOLEAN, true);
                valorretorno.etiquetastrue = etiquetatrue;
                valorretorno.etiquetasfalse = etiquetafalse;
                return valorretorno;
            }
            else {
                app_1.almacen.dispatch(ts_js_1.errores({
                    tipo: 'SEMANTICO',
                    descripcion: 'OPERADOR <= NECESITA OPERANDOS NUMBER, SE RECIBIERON:' + retornoizquierdo.tipodato + " y " + retornoderecho.tipodato,
                    ambito: ambito.nombre,
                    linea: this.linea,
                    columna: this.columna
                }));
            }
            //**********************************DIFERENTE QUE************************************************ */
        }
        else if (this.tipooperador == tipo_1.operador.DIFERENTEQUE) {
            //**********************************IGUAL QUE*************************************************** */
        }
        else if (this.tipooperador == tipo_1.operador.IGUALQUE) {
        }
        return null;
    };
    return relacional;
}(operacion_1["default"]));
exports.relacional = relacional;

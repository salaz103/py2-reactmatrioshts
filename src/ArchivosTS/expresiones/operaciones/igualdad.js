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
var igualdad = /** @class */ (function (_super) {
    __extends(igualdad, _super);
    function igualdad(expiz, op, expder, linea, columna) {
        var _this = _super.call(this, expiz, op, expder) || this;
        _this.linea = linea;
        _this.columna = columna;
        return _this;
    }
    igualdad.prototype.traducir = function (ambito) {
        var generador = generacion_1.generacion.getGenerador();
        var retornoizquierdo = this.expresionizquierda.traducir(ambito);
        //const retornoderecho= this.expresionderecha.traducir(ambito);
        if ((retornoizquierdo.tipodato == tipo_1.tipo_dato.ENTERO || retornoizquierdo.tipodato == tipo_1.tipo_dato.DECIMAL)) {
            var retornoderecho = this.expresionderecha.traducir(ambito);
            if (retornoderecho.tipodato == tipo_1.tipo_dato.DECIMAL || retornoderecho.tipodato == tipo_1.tipo_dato.ENTERO) {
                var etiquetatrue = generador.generarEtiqueta();
                var etiquetafalse = generador.generarEtiqueta();
                generador.agregarIf(retornoizquierdo.obtenerValor(), "==", retornoderecho.obtenerValor(), etiquetatrue);
                generador.agregarGoTo(etiquetafalse);
                var valorretorno = new traduccionexp_1.traduccionexp("", false, tipo_1.tipo_dato.BOOLEAN, true);
                valorretorno.etiquetastrue = etiquetatrue;
                valorretorno.etiquetasfalse = etiquetafalse;
                return valorretorno;
            }
            else {
                //ERROR , IGUALDAD SOLO SE PUEDE ENTRE NUMEROS
                app_1.almacen.dispatch(ts_js_1.errores({
                    tipo: 'SEMANTICO',
                    descripcion: retornoizquierdo + ' SOLO SE PUEDE IGUALAR CON NUMBER, SE RECIBIO ' + retornoderecho.tipodato,
                    ambito: ambito.nombre,
                    linea: this.linea,
                    columna: this.columna
                }));
                //COMO NO SE PUDO REALIZAR LA IGUALACION, HAY QUE SACAR EL TEMPORAL DEL LADO IZQUIERDO
                retornoizquierdo.obtenerValor();
                return new traduccionexp_1.traduccionexp("", false, tipo_1.tipo_dato.UNDEFINED, false);
            }
        }
        else if (retornoizquierdo.tipodato == tipo_1.tipo_dato.BOOLEAN) {
            generador.agregarEtiqueta(retornoizquierdo.etiquetastrue);
            var tmp_bool1 = generador.generarTemporal();
            generador.sacarTemporal(tmp_bool1);
            var etiqueta_salida1 = generador.generarEtiqueta();
            generador.agregarExpresion(tmp_bool1, "1", "", "");
            generador.agregarGoTo(etiqueta_salida1);
            generador.agregarEtiqueta(retornoizquierdo.etiquetasfalse);
            generador.agregarExpresion(tmp_bool1, "0", "", "");
            generador.agregarEtiqueta(etiqueta_salida1);
            var retornoderecho = this.expresionderecha.traducir(ambito);
            console.log(retornoderecho);
            if (retornoderecho.tipodato == tipo_1.tipo_dato.BOOLEAN) {
                generador.agregarEtiqueta(retornoderecho.etiquetastrue);
                var tmp_bool2 = generador.generarTemporal();
                var etiqueta_salida2 = generador.generarEtiqueta();
                generador.agregarExpresion(tmp_bool2, "1", "", "");
                generador.agregarGoTo(etiqueta_salida2);
                generador.agregarEtiqueta(retornoderecho.etiquetasfalse);
                generador.agregarExpresion(tmp_bool2, "0", "", "");
                generador.agregarEtiqueta(etiqueta_salida2);
                //YA HACEMOS LA IGUALACION
                var etiquetatrueigual = generador.generarEtiqueta();
                var etiquetafalseigual = generador.generarEtiqueta();
                generador.agregarIf(tmp_bool1, "==", tmp_bool2, etiquetatrueigual);
                generador.agregarGoTo(etiquetafalseigual);
                generador.sacarTemporal(tmp_bool2);
                var valorretorno = new traduccionexp_1.traduccionexp("", false, tipo_1.tipo_dato.BOOLEAN, true);
                valorretorno.etiquetastrue = etiquetatrueigual;
                valorretorno.etiquetasfalse = etiquetafalseigual;
                return valorretorno;
            }
            else {
                //ERROR - BOOLEAN SOLO SE PUEDE IGUALAR CON BOOLEAN
                console.log("ERROR- BOOLEAN SOLO SE PUEDE IGUALAR CON BOOLEAN");
                app_1.almacen.dispatch(ts_js_1.errores({
                    tipo: 'SEMANTICO',
                    descripcion: 'BOOLEAN SOLO SE PUEDE IGUALAR CON BOOLEAN',
                    ambito: ambito.nombre,
                    linea: this.linea,
                    columna: this.columna
                }));
                return new traduccionexp_1.traduccionexp("", false, tipo_1.tipo_dato.UNDEFINED, false);
            }
        }
        else if (retornoizquierdo.tipodato == tipo_1.tipo_dato.STRING) {
            var retornoderecho = this.expresionderecha.traducir(ambito);
            if (retornoderecho.tipodato == tipo_1.tipo_dato.STRING) {
                var temp_parametros = generador.generarTemporal();
                generador.sacarTemporal(temp_parametros);
                generador.agregarExpresion(temp_parametros, "p", "+", ambito.tamaño + 1);
                generador.stack(temp_parametros, retornoizquierdo.obtenerValor());
                generador.agregarExpresion(temp_parametros, temp_parametros, "+", "1");
                generador.stack(temp_parametros, retornoderecho.obtenerValor());
                generador.moverAmbito(ambito.tamaño);
                generador.agregarcodigo3d("igualacion_strings();");
                var temporal_resultado = generador.generarTemporal();
                generador.getValorStack(temporal_resultado, "p");
                generador.regresarAmbito(ambito.tamaño);
                var etiqueta_true = generador.generarEtiqueta();
                var etiqueta_false = generador.generarEtiqueta();
                generador.agregarIf(temporal_resultado, "==", "1", etiqueta_true);
                generador.agregarGoTo(etiqueta_false);
                var regreso = new traduccionexp_1.traduccionexp("", false, tipo_1.tipo_dato.BOOLEAN, true);
                regreso.etiquetastrue = etiqueta_true;
                regreso.etiquetasfalse = etiqueta_false;
                return regreso;
            }
            else if (retornoderecho.tipodato == null) {
                //PENDIENTE
            }
            else {
                //SI NO SE PUEDE LA IGUALDAD ENTRE STRING, HAY QUE SACAR EL VALOR DEL LADO IZQUIERDO
                retornoizquierdo.obtenerValor();
                //ERROR
            }
        }
        return null;
    };
    return igualdad;
}(operacion_1["default"]));
exports.igualdad = igualdad;

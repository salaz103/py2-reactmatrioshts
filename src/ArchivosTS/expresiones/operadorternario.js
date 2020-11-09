"use strict";
exports.__esModule = true;
var tipo_1 = require("../entorno/tipo");
var generacion_1 = require("../helpers/generacion");
var traduccionexp_1 = require("./traduccionexp");
var app_1 = require("../../../src/app");
var ts_js_1 = require("../../actions/ts.js");
var operadorternario = /** @class */ (function () {
    function operadorternario(c, et, ef, linea, columna) {
        this.condicion = c;
        this.expresiontrue = et;
        this.expresionfalse = ef;
        this.linea = linea;
        this.columna = columna;
    }
    operadorternario.prototype.traducir = function (ambito) {
        var generador = generacion_1.generacion.getGenerador();
        var retornocondicion = this.condicion.traducir(ambito);
        if (retornocondicion.tipodato == tipo_1.tipo_dato.BOOLEAN) {
            var etiqueta_salida_ternario = generador.generarEtiqueta();
            var tmp_retorno = generador.generarTemporal();
            generador.agregarEtiqueta(retornocondicion.etiquetastrue);
            var retorno_true = this.expresiontrue.traducir(ambito);
            if (retorno_true.tipodato != tipo_1.tipo_dato.BOOLEAN) {
                generador.agregarExpresion(tmp_retorno, retorno_true.obtenerValor(), "", "");
                generador.agregarGoTo(etiqueta_salida_ternario);
            }
            else {
                //ES BOOLEAN
                var tmp_guardado = generador.generarTemporal();
                generador.sacarTemporal(tmp_guardado);
                var etiqueta_salida = generador.generarEtiqueta();
                generador.agregarEtiqueta(retorno_true.etiquetastrue);
                generador.agregarExpresion(tmp_guardado, "1", "", "");
                generador.agregarGoTo(etiqueta_salida);
                generador.agregarEtiqueta(retorno_true.etiquetasfalse);
                generador.agregarExpresion(tmp_guardado, "0", "", "");
                generador.agregarEtiqueta(etiqueta_salida);
                generador.agregarExpresion(tmp_retorno, tmp_guardado, "", "");
                generador.agregarGoTo(etiqueta_salida_ternario);
            }
            generador.agregarEtiqueta(retornocondicion.etiquetasfalse);
            var retorno_false = this.expresionfalse.traducir(ambito);
            if (retorno_false.tipodato != tipo_1.tipo_dato.BOOLEAN) {
                generador.agregarExpresion(tmp_retorno, retorno_false.obtenerValor(), "", "");
                generador.agregarGoTo(etiqueta_salida_ternario);
            }
            else {
                //ES BOOLEAN
                var tmp_guardado = generador.generarTemporal();
                generador.sacarTemporal(tmp_guardado);
                var etiqueta_salida = generador.generarEtiqueta();
                generador.agregarEtiqueta(retorno_false.etiquetastrue);
                generador.agregarExpresion(tmp_guardado, "1", "", "");
                generador.agregarGoTo(etiqueta_salida);
                generador.agregarEtiqueta(retorno_false.etiquetasfalse);
                generador.agregarExpresion(tmp_guardado, "0", "", "");
                generador.agregarEtiqueta(etiqueta_salida);
                generador.agregarExpresion(tmp_retorno, tmp_guardado, "", "");
                generador.agregarGoTo(etiqueta_salida_ternario);
            }
            generador.agregarEtiqueta(etiqueta_salida_ternario);
            if (retorno_true.tipodato == retorno_false.tipodato) {
                //SI SON IGUALES ENTONCES LO DEVOLVEMOS
                if (retorno_true.tipodato == tipo_1.tipo_dato.BOOLEAN || retorno_false.tipodato == tipo_1.tipo_dato.BOOLEAN) {
                    var etqtrue = generador.generarEtiqueta();
                    var etqfalse = generador.generarEtiqueta();
                    var retvalor = new traduccionexp_1.traduccionexp("", false, tipo_1.tipo_dato.BOOLEAN, true);
                    generador.sacarTemporal(tmp_retorno);
                    generador.agregarIf(tmp_retorno, "==", "1", etqtrue);
                    generador.agregarGoTo(etqfalse);
                    retvalor.etiquetastrue = etqtrue;
                    retvalor.etiquetasfalse = etqfalse;
                    return retvalor;
                }
                else {
                    return new traduccionexp_1.traduccionexp(tmp_retorno, true, retorno_true.tipodato, false);
                }
            }
            else {
                app_1.almacen.dispatch(ts_js_1.errores({
                    tipo: 'SEMANTICO',
                    descripcion: 'TIPOS EN TERNARIO NO SON DEL MISMO TIPO, SE RECIBIO: ' + retorno_true.tipodato + " Y " + retorno_false.tipodato,
                    ambito: ambito.nombre,
                    linea: this.linea,
                    columna: this.columna
                }));
                return new traduccionexp_1.traduccionexp("", false, tipo_1.tipo_dato.UNDEFINED, false);
            }
        }
        else {
            app_1.almacen.dispatch(ts_js_1.errores({
                tipo: 'SEMANTICO',
                descripcion: 'CONDICION EN TERNARIO, NO ES DE TIPO BOOLEAN',
                ambito: ambito.nombre,
                linea: this.linea,
                columna: this.columna
            }));
            return new traduccionexp_1.traduccionexp("", false, tipo_1.tipo_dato.UNDEFINED, false);
        }
    };
    return operadorternario;
}());
exports.operadorternario = operadorternario;

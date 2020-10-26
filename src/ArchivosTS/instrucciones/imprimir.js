"use strict";
exports.__esModule = true;
var tipo_1 = require("../entorno/tipo");
var generacion_1 = require("../helpers/generacion");
var app_1 = require("../../../src/app");
var ts_js_1 = require("../../actions/ts.js");
var imprimir = /** @class */ (function () {
    function imprimir(exp, linea, columna) {
        this.expresion = exp;
        this.linea = linea;
        this.columna = columna;
    }
    imprimir.prototype.traducir = function (ambito) {
        var retornoexpresion = this.expresion.traducir(ambito);
        var generador = generacion_1.generacion.getGenerador();
        //SEGUN EL ANEXO SOLO SE VAN A IMPRIMIR VALORES DE TIPO DE DATO:
        //1. STRING
        //2. BOOLEAN
        //3. NUMBER
        if (retornoexpresion.tipodato == tipo_1.tipo_dato.ENTERO) {
            generador.printf("d", "int", retornoexpresion.obtenerValor());
        }
        else if (retornoexpresion.tipodato == tipo_1.tipo_dato.DECIMAL) {
            generador.printf("f", "float", retornoexpresion.obtenerValor());
        }
        else if (retornoexpresion.tipodato == tipo_1.tipo_dato.BOOLEAN) {
            //CON EL BOOLEAN HAY QUE VER SI EL RETORNO VALOR
            //SI TRAE VALOR ES POR QUE ES UN VALOR LOGICO PRIMITIVO 
            //SI NO TRAE VALOR ES POR QUE ES RESULTADO DE UNA OPERACION RELACIONAL O LOGICA
            if (retornoexpresion.valor == "") {
                var etiqueta_salida = generador.generarEtiqueta();
                var tmp_valorboolean = generador.generarTemporal();
                generador.sacarTemporal(tmp_valorboolean);
                generador.agregarEtiqueta(retornoexpresion.etiquetastrue);
                generador.agregarExpresion(tmp_valorboolean, "1", "", "");
                generador.printf("d", "int", tmp_valorboolean);
                generador.agregarGoTo(etiqueta_salida);
                generador.agregarEtiqueta(retornoexpresion.etiquetasfalse);
                generador.agregarExpresion(tmp_valorboolean, "0", "", "");
                generador.printf("d", "int", tmp_valorboolean);
                generador.agregarEtiqueta(etiqueta_salida);
            }
            else {
                generador.printf("d", "int", retornoexpresion.obtenerValor());
            }
        }
        else if (retornoexpresion.tipodato == tipo_1.tipo_dato.STRING) {
        }
        else {
            app_1.almacen.dispatch(ts_js_1.errores({
                tipo: 'SEMANTICO',
                descripcion: 'NO SE PUEDE IMPRIMIR EL TIPO DE DATO:' + retornoexpresion.tipodato,
                ambito: ambito.nombre,
                linea: this.linea,
                columna: this.columna
            }));
        }
    };
    return imprimir;
}());
exports.imprimir = imprimir;

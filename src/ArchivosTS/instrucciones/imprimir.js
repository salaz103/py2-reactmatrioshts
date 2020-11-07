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
        else if (retornoexpresion.tipodato == tipo_1.tipo_dato.STRING) {
            //PRIMERO NOS MOVEMOS AL AMBITO DE LA FUNCION NATIVA
            generador.moverAmbito(ambito.tamaño);
            //GUARDO EN EL AMBITO LA POSICION DEL INICIO DE LA CADENA EN EL HEAP
            generador.stack("p", retornoexpresion.obtenerValor());
            generador.agregarcodigo3d("console();");
            //REGRESO AL AMBITO PRINCIPAL
            generador.regresarAmbito(ambito.tamaño);
        }
        else if (retornoexpresion.tipodato == tipo_1.tipo_dato.NUMBER) {
            generador.printf("d", "int", retornoexpresion.obtenerValor());
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

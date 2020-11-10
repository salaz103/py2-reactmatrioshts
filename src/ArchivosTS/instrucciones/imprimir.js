"use strict";
exports.__esModule = true;
var tipo_1 = require("../entorno/tipo");
var generacion_1 = require("../helpers/generacion");
var app_1 = require("../../../src/app");
var ts_js_1 = require("../../actions/ts.js");
var imprimir = /** @class */ (function () {
    function imprimir(lista, linea, columna) {
        this.lista_expresiones = lista;
        this.linea = linea;
        this.columna = columna;
    }
    imprimir.prototype.traducir = function (ambito) {
        var generador = generacion_1.generacion.getGenerador();
        //COMENZAMOS A RECORRER LA LISTA DE EXPRESIONES
        for (var i = 0; i < this.lista_expresiones.length; i++) {
            var retorno_expresion = this.lista_expresiones[i].traducir(ambito);
            //SEGUN EL ANEXO SOLO SE VAN A IMPRIMIR VALORES DE TIPO DE DATO:
            //1. STRING
            //2. BOOLEAN
            //3. NUMBER
            if (retorno_expresion.tipodato == tipo_1.tipo_dato.ENTERO) {
                generador.printf("d", "int", retorno_expresion.obtenerValor());
            }
            else if (retorno_expresion.tipodato == tipo_1.tipo_dato.DECIMAL) {
                generador.printf("f", "float", retorno_expresion.obtenerValor());
            }
            else if (retorno_expresion.tipodato == tipo_1.tipo_dato.BOOLEAN) {
                var etiqueta_salida = generador.generarEtiqueta();
                var tmp_valorboolean = generador.generarTemporal();
                generador.sacarTemporal(tmp_valorboolean);
                generador.agregarEtiqueta(retorno_expresion.etiquetastrue);
                generador.imprimirTrue();
                generador.agregarGoTo(etiqueta_salida);
                generador.agregarEtiqueta(retorno_expresion.etiquetasfalse);
                generador.imprimirFalse();
                generador.agregarEtiqueta(etiqueta_salida);
            }
            else if (retorno_expresion.tipodato == tipo_1.tipo_dato.STRING) {
                //PRIMERO NOS MOVEMOS AL AMBITO DE LA FUNCION NATIVA
                generador.moverAmbito(ambito.tamaño);
                //GUARDO EN EL AMBITO LA POSICION DEL INICIO DE LA CADENA EN EL HEAP
                generador.stack("p", retorno_expresion.obtenerValor());
                generador.agregarcodigo3d("console();");
                //REGRESO AL AMBITO PRINCIPAL
                generador.regresarAmbito(ambito.tamaño);
            }
            else if (retorno_expresion.tipodato == tipo_1.tipo_dato.NUMBER) {
                generador.printf("d", "int", retorno_expresion.obtenerValor());
            }
            else {
                app_1.almacen.dispatch(ts_js_1.errores({
                    tipo: 'SEMANTICO',
                    descripcion: 'NO SE PUEDE IMPRIMIR EL TIPO DE DATO:' + retorno_expresion.tipodato,
                    ambito: ambito.nombre,
                    linea: this.linea,
                    columna: this.columna
                }));
                continue;
            }
            //VOY A IMPRIMIR UNA COMA, ESPERANDO EL OTRO 
            if (i + 1 == this.lista_expresiones.length) {
                //SI EL SIGUIENTE ES EL FINAL ENTONCES NO IMPRIMOS LA COMA
            }
            else {
                generador.printchar("44");
            }
        }
        //SIEMPRE AL TERMINAR EL CONSOLE.LOG, VAMOS A IMPRIMIR EL SALTO DE LÍNEA 
        generador.printchar("10");
    };
    return imprimir;
}());
exports.imprimir = imprimir;

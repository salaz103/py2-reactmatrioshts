"use strict";
exports.__esModule = true;
var entorno_1 = require("../entorno/entorno");
var tipo_1 = require("../entorno/tipo");
var generacion_1 = require("../helpers/generacion");
var app_1 = require("../../../src/app");
var ts_js_1 = require("../../actions/ts.js");
var instruccionwhile = /** @class */ (function () {
    function instruccionwhile(exp, listawhile, linea, columna) {
        this.expresioncondicion = exp;
        this.lista = listawhile;
        this.linea = linea;
        this.columna = columna;
    }
    instruccionwhile.prototype.traducir = function (ambito) {
        //PRIMERO TENEMOS QUE VERIFICAR QUE LA EXPRESION SEA DE TIPO BOOLEANA
        //SIEMPRE ANTES DE OBTENER EL TIPO, HAY QUE TRADUCIR LA EXPRESION
        //YA QUE CUANDO SE TRADUCE ES CUANDO SE LE COLCA EL TIPO
        var generador = generacion_1.generacion.getGenerador();
        var ambito_While = new entorno_1["default"]("WHILE", tipo_1.tipo_ambito.LOCAL, ambito);
        generador.agregarComentarios("INICIANDO WHILE");
        var etiqueta_inicio = generador.generarEtiqueta();
        generador.agregarEtiqueta(etiqueta_inicio);
        var retorno_condicion = this.expresioncondicion.traducir(ambito);
        if (retorno_condicion.tipodato == tipo_1.tipo_dato.BOOLEAN) {
            //PENDIENTE
            /*VER LO DEL BREAK Y CONTINUE */
            //SI LA CONDICION ES BOOLEAN, PODEMOS SEGUIR TRADUCIENDO
            generador.agregarEtiqueta(retorno_condicion.etiquetastrue);
            //AHORA SE COMIENZA A TRADUCIR EL CUERPO DE LA FUNCION
            for (var i = 0; i < this.lista.length; i++) {
                var retorno_ins = this.lista[i].traducir(ambito_While);
            }
            generador.agregarGoTo(etiqueta_inicio);
            generador.agregarEtiqueta(retorno_condicion.etiquetasfalse);
            generador.agregarComentarios("FIN - WHILE");
        }
        else {
            app_1.almacen.dispatch(ts_js_1.errores({
                tipo: 'SEMANTICO',
                descripcion: 'LA EXPRESION EN EL WHILE NO ES DE TIPO BOOLEANA',
                ambito: ambito.nombre,
                linea: this.linea,
                columna: this.columna
            }));
        }
    };
    return instruccionwhile;
}());
exports.instruccionwhile = instruccionwhile;

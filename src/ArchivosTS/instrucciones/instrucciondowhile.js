"use strict";
exports.__esModule = true;
var entorno_1 = require("../entorno/entorno");
var app_1 = require("../../../src/app");
var ts_js_1 = require("../../actions/ts.js");
var generacion_1 = require("../helpers/generacion");
var tipo_1 = require("../entorno/tipo");
var instrucciondowhile = /** @class */ (function () {
    function instrucciondowhile(lista, exp, linea, columna) {
        this.lista_do = lista;
        this.condicion = exp;
        this.linea = linea;
        this.columna = columna;
    }
    instrucciondowhile.prototype.traducir = function (ambito) {
        var generador = generacion_1.generacion.getGenerador();
        var ambito_dowhile = new entorno_1["default"]("DO-WHILE", tipo_1.tipo_ambito.LOCAL, ambito);
        //PENDIENTE
        /**REVISAR LO DEL BREAK O CONTINUE */
        //ambito_dowhile.etq_continue= this.condicion.etq_true= generador.generarEtiqueta();
        //ambito_dowhile.etq_break= this.condicion.etq_false= generador.generarEtiqueta();
        generador.agregarComentarios("INICIO- DO_WHILE");
        var etiqueta_inicio = generador.generarEtiqueta();
        generador.agregarEtiqueta(etiqueta_inicio);
        for (var i = 0; i < this.lista_do.length; i++) {
            var retorno_ins = this.lista_do[i].traducir(ambito_dowhile);
        }
        //YA TERMINAMOS DE TRADUCIR LAS INSTRUCCIONES, TOCA LA CONDICION
        var retorno_condicion = this.condicion.traducir(ambito);
        if (retorno_condicion.tipodato == tipo_1.tipo_dato.BOOLEAN) {
            generador.agregarEtiqueta(retorno_condicion.etiquetastrue);
            generador.agregarGoTo(etiqueta_inicio);
            generador.agregarEtiqueta(retorno_condicion.etiquetasfalse);
            generador.agregarComentarios("FIN- DO_WHILE");
        }
        else {
            app_1.almacen.dispatch(ts_js_1.errores({
                tipo: 'SEMANTICO',
                descripcion: 'LA EXPRESION EN EL DO-WHILE NO ES DE TIPO BOOLEANA',
                ambito: ambito.nombre,
                linea: this.linea,
                columna: this.columna
            }));
        }
    };
    return instrucciondowhile;
}());
exports.instrucciondowhile = instrucciondowhile;

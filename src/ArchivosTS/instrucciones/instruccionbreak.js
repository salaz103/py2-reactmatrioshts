"use strict";
exports.__esModule = true;
var app_1 = require("../../../src/app");
var ts_js_1 = require("../../actions/ts.js");
var generacion_1 = require("../helpers/generacion");
var instruccionbreak = /** @class */ (function () {
    function instruccionbreak(linea, columna) {
        this.linea = linea;
        this.columna = columna;
    }
    instruccionbreak.prototype.traducir = function (ambito) {
        //PARA QUE COMIENCE LA TRADUCCION DEBEMOS PREGUNTAR SI EL AMBITO DONDE ESTAMOS TIENE
        // UNA ETIQUETA DE BREAK, SERA NUESTRO "DISPLAY"
        var generador = generacion_1.generacion.getGenerador();
        if (ambito.etq_break != null) {
            //SI ES DIFERENTE DE NULO, SIGNIFICA QUE SI TRAE UNA ETIQUETA Y PODEMOS TRADUCIR ESTE BREAK 
            generador.agregarGoTo(ambito.etq_break);
        }
        else {
            //ERROR, BREAK NO VIENE EN UN CICLO
            app_1.almacen.dispatch(ts_js_1.errores({
                tipo: 'SEMANTICO',
                descripcion: 'BREAK NO VIENE EN UN CICLO Ó SWITCH',
                ambito: ambito.nombre,
                linea: this.linea,
                columna: this.columna
            }));
        }
    };
    return instruccionbreak;
}());
exports.instruccionbreak = instruccionbreak;

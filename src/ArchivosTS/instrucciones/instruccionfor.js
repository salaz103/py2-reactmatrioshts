"use strict";
exports.__esModule = true;
var entorno_1 = require("../entorno/entorno");
var tipo_1 = require("../entorno/tipo");
var generacion_1 = require("../helpers/generacion");
var instruccionfor = /** @class */ (function () {
    function instruccionfor(i1, i2, i3, lista, linea, columna) {
        this.primerainstruccion = i1;
        this.expresion = i2;
        this.tercerainstruccion = i3;
        this.listainstrucciones = lista;
        this.linea = linea;
        this.columna = columna;
    }
    instruccionfor.prototype.traducir = function (ambito) {
        var generador = generacion_1.generacion.getGenerador();
        var ambitofor = new entorno_1["default"]("For", tipo_1.tipo_ambito.LOCAL, ambito);
        //ESTA PRIMERA INSTRUCCION, PUEDE SER UNA DECLARACION O ASIGNACION
        generador.agregarComentarios("INICIO - FOR");
        var retorno_1 = this.primerainstruccion.traducir(ambitofor);
        var etiquetaInicio = generador.generarEtiqueta();
        generador.agregarEtiqueta(etiquetaInicio);
        //LA EXPRESION 2 ES UNA CONDICIONAL
        var retorno_2 = this.expresion.traducir(ambitofor);
        generador.agregarEtiqueta(retorno_2.etiquetastrue);
        for (var i = 0; i < this.listainstrucciones.length; i++) {
            ///AQUI HAY QUE "CACHAR LOS ERRORES"
            if (!(typeof (this.listainstrucciones[i]) == "string")) {
                this.listainstrucciones[i].traducir(ambitofor);
            }
        }
        //EN ESTE PUNTO YA SE TRADUJERON LAS INSTRUCCIONES
        //TOCA TRADUCIR LA 3ERA EXPRESION
        var retorno_3 = this.tercerainstruccion.traducir(ambitofor);
        //AHORA PONEMOS EL GOTO AL INICIO
        generador.agregarGoTo(etiquetaInicio);
        //AQUI PONEMOS LA ETIQUETA FALSA, CUANDO LA SEGUNDA CONDICION YA NO SE CUMPLA
        generador.agregarEtiqueta(retorno_2.etiquetasfalse);
        generador.agregarComentarios("FIN- FOR");
    };
    return instruccionfor;
}());
exports.instruccionfor = instruccionfor;

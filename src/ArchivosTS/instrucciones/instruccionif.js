"use strict";
exports.__esModule = true;
var entorno_1 = require("../entorno/entorno");
var tipo_1 = require("../entorno/tipo");
var generacion_1 = require("../helpers/generacion");
var app_1 = require("../../../src/app");
var ts_js_1 = require("../../actions/ts.js");
var instruccionif = /** @class */ (function () {
    function instruccionif(condicion, lista_instrucciones, elseif_else, linea, columna) {
        this.condicion = condicion;
        this.instrucciones = lista_instrucciones;
        this.elseif_else = elseif_else;
        this.linea = linea;
        this.columna = columna;
    }
    instruccionif.prototype.traducir = function (ambito) {
        var generador = generacion_1.generacion.getGenerador();
        generador.agregarComentarios("Inicio de instruccion IF");
        var retornocondicion = this.condicion.traducir(ambito);
        var ambitoif = new entorno_1["default"]("IF", tipo_1.tipo_ambito.LOCAL, ambito);
        if (retornocondicion.tipodato == tipo_1.tipo_dato.BOOLEAN) {
            generador.agregarEtiqueta(retornocondicion.etiquetastrue);
            for (var i = 0; i < this.instrucciones.length; i++) {
                try {
                    var retornoinstrucciones = this.instrucciones[i].traducir(ambitoif);
                }
                catch (error) {
                    console.log(error);
                }
            }
            if (this.elseif_else != null) {
                var etiquetasalida = generador.generarEtiqueta();
                generador.agregarGoTo(etiquetasalida);
                generador.agregarEtiqueta(retornocondicion.etiquetasfalse);
                //HAY QUE REVISAR SI EL NODO ES INSTANCIA DE INSTRUCCION IF O UNA LISTA DE INSTRUCCIONES(ELSE),
                if (this.elseif_else instanceof instruccionif) {
                    //SI ES UN NODO INSTRUCCION IF ENTONCES NO LO RECORREMOS
                    var retorno_else = this.elseif_else.traducir(ambito);
                }
                else {
                    //HACER OTRO AMBITO Y RECORRER LA LISTA DEL ELSE
                    var ambitoelse = new entorno_1["default"]("Else", tipo_1.tipo_ambito.LOCAL, ambito);
                    for (var i = 0; i < this.elseif_else.length; i++) {
                        try {
                            var retornoinstrucciones = this.elseif_else[i].traducir(ambitoelse);
                        }
                        catch (error) {
                            console.log(error);
                        }
                    }
                }
                generador.agregarEtiqueta(etiquetasalida);
            }
            else {
                generador.agregarEtiqueta(retornocondicion.etiquetasfalse);
            }
        }
        else {
            //ERROR - CONDICION EN IF NO ES BOOLEAN
            app_1.almacen.dispatch(ts_js_1.errores({
                tipo: 'SEMANTICO',
                descripcion: 'CONDICION EN IF, NO ES DE TIPO BOOLEAN',
                ambito: ambito.nombre,
                linea: this.linea,
                columna: this.columna
            }));
        }
    };
    return instruccionif;
}());
exports.instruccionif = instruccionif;

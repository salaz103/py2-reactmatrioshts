"use strict";
exports.__esModule = true;
var entorno_1 = require("../entorno/entorno");
var tipo_1 = require("../entorno/tipo");
var generacion_1 = require("../helpers/generacion");
var instruccionswitch = /** @class */ (function () {
    function instruccionswitch(ex, casos, linea, columna) {
        this.exp = ex;
        this.casos = casos;
        this.linea = linea;
        this.columna = columna;
    }
    instruccionswitch.prototype.traducir = function (ambito) {
        var generador = generacion_1.generacion.getGenerador();
        generador.agregarComentarios("INICIO - SWITCH");
        var retorno_expresion = this.exp.traducir(ambito);
        var ambito_switch = new entorno_1["default"]("SWITCH", tipo_1.tipo_ambito.LOCAL, ambito);
        var etiqueta_prueba = generador.generarEtiqueta();
        var etiqueta_break = generador.generarEtiqueta();
        ambito_switch.etq_break = etiqueta_break;
        var tmp_evaluar = generador.generarTemporal();
        generador.sacarTemporal(tmp_evaluar);
        generador.agregarExpresion(tmp_evaluar, retorno_expresion.obtenerValor(), "", "");
        generador.agregarGoTo(etiqueta_prueba);
        var casos_etiquetas = [];
        for (var i = 0; i < this.casos.length; i++) {
            var etiqueta = generador.generarEtiqueta();
            generador.agregarEtiqueta(etiqueta);
            for (var a = 0; a < this.casos[i].listainstrucciones.length; a++) {
                this.casos[i].listainstrucciones[a].traducir(ambito_switch);
            }
            var caso_etiqueta = {
                "caso": this.casos[i],
                "etiqueta": etiqueta
            };
            casos_etiquetas.push(caso_etiqueta);
        }
        generador.agregarGoTo(etiqueta_break);
        generador.agregarEtiqueta(etiqueta_prueba);
        for (var i = 0; i < casos_etiquetas.length; i++) {
            var retorno = void 0;
            if (casos_etiquetas[i].caso.exp != null) {
                retorno = casos_etiquetas[i].caso.exp.traducir(ambito_switch);
                //PENDIENTE, VER SI ES UN BOOLEANO
                //IF(RETORNO.TIPODATO==TIPODATOBOOLEAN)
                generador.agregarIf(tmp_evaluar, "==", retorno.obtenerValor(), casos_etiquetas[i].etiqueta);
            }
            else {
                generador.agregarGoTo(casos_etiquetas[i].etiqueta);
            }
            //console.log(casos_etiquetas[i].caso.exp);
        }
        generador.agregarEtiqueta(etiqueta_break);
        generador.agregarComentarios("FIN - SWITCH");
    };
    return instruccionswitch;
}());
exports.instruccionswitch = instruccionswitch;

"use strict";
exports.__esModule = true;
var tipo_1 = require("../entorno/tipo");
var traduccionexp_1 = require("./traduccionexp");
var app_1 = require("../../../src/app");
var ts_js_1 = require("../../actions/ts.js");
var generacion_1 = require("../helpers/generacion");
var identificador = /** @class */ (function () {
    function identificador(identificador, linea, columna) {
        this.id = identificador;
        this.linea = linea;
        this.columna = columna;
    }
    identificador.prototype.traducir = function (ambito) {
        var generador = generacion_1.generacion.getGenerador();
        var sim;
        //1. PUEDE QUE EL ID SEA LOCAL O VENGA DE UN AMBITO SUPERIOR
        ///  LO QUE HAY QUE HACER ES IR RECORRIENDO LOS AMBITOS, INICIANDO POR EL ACTUAL, DONDE ESTOY (ambito)
        if (ambito.existe(this.id)) {
            //console.log("SI ENCONTRE EL ID: "+this.id);
            sim = ambito.getSimbolo(this.id);
        }
        //ESTE TEMPORAL SERA EL TEMPORAL QUE RETORNAREMOS
        var tmp_guardado = generador.generarTemporal();
        if (sim) {
            //SI ENTRO AQUÍ ES POR QUE SI EXISTE LA VARIABLE PERO ANTES DE TRADUCIRLA, TOCA VER SI ES GLOBAL O LOCAL
            if (sim.esGlobal) {
                //SI EL SIMBOLO ES GLOBAL, SOLO VOY A LA POSICION QUE TIENE DIRECTAMENTE AL STACK
                generador.getValorStack(tmp_guardado, sim.direccionrelativa.toString());
                //SI NO ES BOOLEAN, SOLO REGRESO EL TEMPORAL DONDE GUARDE EL VALOR QUE OBTUVE DEL STACK
                if (sim.tipodato != tipo_1.tipo_dato.BOOLEAN) {
                    return new traduccionexp_1.traduccionexp(tmp_guardado, true, sim.tipodato, false, sim, sim.dimensiones);
                }
                else {
                    var retorno_boolean = new traduccionexp_1.traduccionexp("", false, sim.tipodato, true, sim);
                    var etqtrue = generador.generarEtiqueta();
                    var etqfalse = generador.generarEtiqueta();
                    generador.sacarTemporal(tmp_guardado);
                    generador.agregarIf(tmp_guardado, "==", "1", etqtrue);
                    generador.agregarGoTo(etqfalse);
                    retorno_boolean.etiquetastrue = etqtrue;
                    retorno_boolean.etiquetasfalse = etqfalse;
                    return retorno_boolean;
                }
            }
            else {
                //SIGNIFICA QUE EL IDENTIFICADOR ES UN VALOR LOCAL, POR LO QUE HAY QUE UTILIZAR
                //UN PUNTERO P PARA QUE ESTE SE MUEVA LA POSICION RELATIVA QUE TIENE EL ID
                var tmp_acceso = generador.generarTemporal();
                generador.sacarTemporal(tmp_acceso);
                generador.agregarExpresion(tmp_acceso, "p", "+", sim.direccionrelativa);
                generador.getValorStack(tmp_guardado, tmp_acceso);
                if (sim.tipodato != tipo_1.tipo_dato.BOOLEAN) {
                    return new traduccionexp_1.traduccionexp(tmp_guardado, true, sim.tipodato, false, sim);
                }
                else {
                    var retorno_boolean = new traduccionexp_1.traduccionexp("", false, sim.tipodato, true, sim);
                    var etqtrue = generador.generarEtiqueta();
                    var etqfalse = generador.generarEtiqueta();
                    generador.sacarTemporal(tmp_guardado);
                    generador.agregarIf(tmp_guardado, "==", "1", etqtrue);
                    generador.agregarGoTo(etqfalse);
                    retorno_boolean.etiquetastrue = etqtrue;
                    retorno_boolean.etiquetasfalse = etqfalse;
                    return retorno_boolean;
                }
            }
        }
        else {
            app_1.almacen.dispatch(ts_js_1.errores({
                tipo: 'SEMANTICO',
                descripcion: 'IDENTIFICADOR ' + this.id + ' NO EXISTE',
                ambito: ambito.nombre,
                linea: this.linea,
                columna: this.columna
            }));
            //console.log("ERROR- IDENTIFICADOR "+ this.id+" NO EXISTE");
        }
        return new traduccionexp_1.traduccionexp("", false, tipo_1.tipo_dato.UNDEFINED, false);
    };
    return identificador;
}());
exports.identificador = identificador;

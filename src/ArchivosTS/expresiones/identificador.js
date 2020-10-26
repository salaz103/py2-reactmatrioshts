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
        //AQUI COMIENZAN LAS OPERACIONES PARA VER SI ENCONTRO O NO EL SIMBOLO
        if (sim) {
            var tmp_acceso = generador.generarTemporal();
            generador.sacarTemporal(tmp_acceso);
            var tmp_guardado = generador.generarTemporal();
            generador.agregarExpresion(tmp_acceso, "p", "+", sim.direccionrelativa);
            generador.getValorStack(tmp_guardado, tmp_acceso);
            return new traduccionexp_1.traduccionexp(tmp_guardado, true, sim.getTipoDato(), false);
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

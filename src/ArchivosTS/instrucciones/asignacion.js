"use strict";
exports.__esModule = true;
var app_1 = require("../../../src/app");
var ts_js_1 = require("../../actions/ts.js");
var asignacion = /** @class */ (function () {
    function asignacion(id, ex) {
        this.id = id;
        this.expresion = ex;
    }
    asignacion.prototype.ejecutar = function (ambito) {
        //1. RECORRER LOS AMBITOS PARA VER SI EXISTE EL ID
        var sim;
        if (ambito.existe(this.id)) {
            sim = ambito.getSimbolo(this.id);
        }
        //2. OPERACIONES DESPUES DE HABER BUSCADO EL ID PARA ACTUALIZAR
        if (sim) {
            if (sim.reasignable == true) {
                //SIGNIFICA QUE ES UNA VARIABLE LET
                //PRIMERO HAY QUE VALIDAR SI TRAE UN TIPO DE DATO
                if (sim.getTipo()) {
                    //SI TRAE UN TIPO, HAY QUE VALIDAR QUE EL TIPO DE LA EXPRESION, SEA IGUAL AL QUE TIENE
                    //Y ASI PODER SETEAR LA NUEVA ASIGNACION
                    //PARA PODER SABER QUE TIPO DE VALOR ES, HAY QUE EJECUTAR PRIMERO ESA EXPRESION
                    var valorexpresion = this.expresion.obtenerValor(ambito);
                    //AHORA QUE YA SE EJECUTO YA PODEMOS VER QUE TIPO DE VALOR ES
                    var tipovalor = this.expresion.obtenerTipo(ambito);
                    if (sim.getTipo() == tipovalor) {
                        ambito.asignarValor(this.id, valorexpresion, sim.getTipo());
                    }
                    else {
                        app_1.almacen.dispatch(ts_js_1.errores({
                            tipo: 'SEMANTICO',
                            descripcion: 'EL TIPO DE LA VARIABLE ' + sim.getId() + ' NO ES IGUAL AL TIPO DEL VALOR',
                            ambito: ambito.nombre
                        }));
                        console.log("ERROR - EL TIPO DE LA VARIABLE " + sim.getId() + " NO ES IGUAL AL TIPO DEL VALOR");
                    }
                }
                else {
                    //SI NO TRAE UN TIPO DE VALOR, HAY QUE SACAR EL TIPO DE VALOR DE LA EXPRESION Y ASIGNARSELO
                    //A LA VARIABLE
                    //PARA SABER EL TIPO DE VALOR DE LA EXPRESION, TENEMOS QUE EJECUTARLA
                    var valor = this.expresion.obtenerValor(ambito);
                    var tipo = this.expresion.obtenerTipo(ambito);
                    ambito.asignarValor(this.id, valor, tipo);
                }
            }
            else {
                //SIGNIFCA QUE ES UNA VARIABLE CONST Y ESTAS NO SE PUEDEN REASIGNAR
                app_1.almacen.dispatch(ts_js_1.errores({
                    tipo: 'SEMANTICO',
                    descripcion: 'VARIABLE CONST ' + sim.getId() + ' NO SE PUEDE REASIGNAR',
                    ambito: ambito.nombre
                }));
                console.log("ERROR - VARIABLE CONST: " + sim.getId() + " NO SE PUEDE REASIGNAR");
            }
        }
        else {
            app_1.almacen.dispatch(ts_js_1.errores({
                tipo: 'SEMANTICO',
                descripcion: 'VARIABLE ' + this.id + ' NO PUEDE SER ASIGNADA POR QUE NO EXISTE',
                ambito: ambito.nombre
            }));
            console.log("ERROR- VARIABLE: " + this.id + " NO PUEDE SER ASIGNADA POR QUE NO EXISTE");
        }
        return null;
    };
    return asignacion;
}());
exports.asignacion = asignacion;

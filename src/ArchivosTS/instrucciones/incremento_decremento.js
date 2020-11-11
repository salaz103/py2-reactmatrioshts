"use strict";
exports.__esModule = true;
var tipo_1 = require("../entorno/tipo");
var app_1 = require("../../../src/app");
var ts_js_1 = require("../../actions/ts.js");
var generacion_1 = require("../helpers/generacion");
var traduccionexp_1 = require("../expresiones/traduccionexp");
var incremento_decremento = /** @class */ (function () {
    function incremento_decremento(id, op, linea, columna) {
        this.id = id;
        this.tipooperador = op;
        this.linea = linea;
        this.columna = columna;
    }
    incremento_decremento.prototype.traducir = function (ambito) {
        //LO PRIMERO QUE HAY QUE HACER ES BUSCAR EL ID
        //SI EXISTE LO GUARDAMOS PARA PODER REVISAR SUS PROPIEDADES
        var sim;
        var generador = generacion_1.generacion.getGenerador();
        if (ambito.existe(this.id)) {
            //console.log("SI EXISTE EL ID: "+ this.id);
            sim = ambito.getSimbolo(this.id);
            console.log(sim);
            //AHORA QUE YA SABEMOS QUE EXISTE, HAY QUE HACER 3 VALIDACIONES
            //1. VERIFICAR SI ES CONST O NO 
            //2. VERIFICAR SI ES NUMBER O NO
            //VALIDACION 1)
            if (sim.getReasignable()) {
                //VALIDACION 2)
                if (sim.getTipo() == tipo_1.tipo_dato.DECIMAL || tipo_1.tipo_dato.ENTERO) {
                    var tmp_guardado = generador.generarTemporal();
                    var tmp_retorno = generador.generarTemporal();
                    if (sim.esGlobal) {
                        generador.getValorStack(tmp_guardado, sim.direccionrelativa.toString());
                        generador.agregarExpresion(tmp_retorno, tmp_guardado, "", "");
                        generador.sacarTemporal(tmp_guardado);
                        if (this.tipooperador == tipo_1.operador.INCREMENTO) {
                            generador.agregarExpresion(tmp_guardado, tmp_guardado, "+", "1");
                        }
                        else {
                            generador.agregarExpresion(tmp_guardado, tmp_guardado, "-", "1");
                        }
                        generador.stack(sim.direccionrelativa, tmp_guardado);
                        return new traduccionexp_1.traduccionexp(tmp_retorno, true, sim.tipodato, false);
                    }
                    else {
                        var tmp_acceso = generador.generarTemporal();
                        generador.sacarTemporal(tmp_acceso);
                        generador.agregarExpresion(tmp_acceso, "p", "+", sim.direccionrelativa);
                        generador.getValorStack(tmp_guardado, tmp_acceso);
                        generador.agregarExpresion(tmp_retorno, tmp_guardado, "", "");
                        generador.sacarTemporal(tmp_guardado);
                        if (this.tipooperador == tipo_1.operador.INCREMENTO) {
                            generador.agregarExpresion(tmp_guardado, tmp_guardado, "+", "1");
                        }
                        else {
                            generador.agregarExpresion(tmp_guardado, tmp_guardado, "-", "1");
                        }
                        generador.stack(tmp_acceso, tmp_guardado);
                        return new traduccionexp_1.traduccionexp(tmp_retorno, true, sim.tipodato, false);
                    }
                }
                else {
                    app_1.almacen.dispatch(ts_js_1.errores({
                        tipo: 'SEMANTICO',
                        descripcion: 'IDENTIFICADOR ' + this.id + ' NO ES DE TIPO NUMBER, NO SE APLICARA INCREMENTO',
                        ambito: ambito.nombre,
                        linea: this.linea,
                        columna: this.columna
                    }));
                    console.log("ERROR - ID: " + this.id + " NO ES DE TIPO NUMBER");
                    return new traduccionexp_1.traduccionexp("", false, tipo_1.tipo_dato.UNDEFINED, false);
                }
            }
            else {
                app_1.almacen.dispatch(ts_js_1.errores({
                    tipo: 'SEMANTICO',
                    descripcion: 'NO SE PUEDE MODIFICAR: ' + this.id + ' ES UNA VARIABLE CONST',
                    ambito: ambito.nombre,
                    linea: this.linea,
                    columna: this.columna
                }));
                //SIGNIFICA QUE NO ES DE TIPO NUMBER O QUE ES UNA CONSTANTE, POR QUE NO SE PUEDE REASIGNAR
                console.log("ERROR - NO SE PUEDE MODIFICAR: " + this.id + " ES UNA VARIABLE CONST");
                return new traduccionexp_1.traduccionexp("", false, tipo_1.tipo_dato.UNDEFINED, false);
            }
        }
        else {
            app_1.almacen.dispatch(ts_js_1.errores({
                tipo: 'SEMANTICO',
                descripcion: 'VARIABLE: ' + this.id + ' NO ESTA DEFINIDA',
                ambito: ambito.nombre,
                linea: this.linea,
                columna: this.columna
            }));
            console.log("ERROR - VARIABLE: " + this.id + " NO ESTA DEFINIDA");
            return new traduccionexp_1.traduccionexp("", false, tipo_1.tipo_dato.UNDEFINED, false);
        }
    };
    return incremento_decremento;
}());
exports.incremento_decremento = incremento_decremento;

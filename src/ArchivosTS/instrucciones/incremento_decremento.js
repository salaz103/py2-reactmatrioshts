"use strict";
exports.__esModule = true;
var tipo_1 = require("../entorno/tipo");
var app_1 = require("../../../src/app");
var ts_js_1 = require("../../actions/ts.js");
var incremento_decremento = /** @class */ (function () {
    function incremento_decremento(id, op) {
        this.id = id;
        this.tipooperador = op;
    }
    incremento_decremento.prototype.obtenerValor = function (ambito) {
        //CUANDO VIENE COMO UNA EXPRESION, FUNCIONA COMO UN IDENTIFICADOR
        //PERO PRIMERO HAY QUE BUSCAR EL ID Y DEVOLVER SU VALOR
        //LO PRIMERO QUE HAY QUE HACER ES BUSCAR EL ID
        //SI EXISTE LO GUARDAMOS PARA PODER REVISAR SUS PROPIEDADES
        var sim;
        if (ambito.existe(this.id)) {
            //console.log("SI EXISTE EL ID: "+ this.id);
            sim = ambito.getSimbolo(this.id);
            //AHORA QUE YA SABEMOS QUE EXISTE, HAY QUE HACER 3 VALIDACIONES
            //1. VERIFICAR SI ES CONST O NO 
            //2. VERIFICAR SI ES NUMBER O NO
            //3. VERIFICAR SI YA FUE INICIALIZADA LA VARIABLE, ES DECIR !=NULL
            //VALIDACION 1)
            if (sim.getReasignable() == true) {
                //VALIDACION 2)
                if (sim.getTipo() == tipo_1.tipo_valor.NUMBER) {
                    //VALIDACION 3)
                    if (JSON.stringify(sim.getValor()) != null) {
                        //SI PASO TODAS LAS VALIDACIONES
                        //AHORA TOCA VER SI ES UN INCREMENTO O UN DECREMENTO
                        var valor = JSON.stringify(sim.getValor());
                        var valornecesitado = new Number(sim.getValor());
                        if (this.tipooperador == tipo_1.operador.INCREMENTO) {
                            var nuevo = new Number(Number(valor) + Number(1));
                            ambito.asignarValor(this.id, nuevo, sim.getTipo());
                        }
                        else {
                            var nuevo = new Number(Number(valor) - Number(1));
                            ambito.asignarValor(this.id, nuevo, sim.getTipo());
                        }
                        return valornecesitado;
                    }
                    else {
                        app_1.almacen.dispatch(ts_js_1.errores({
                            tipo: 'SEMANTICO',
                            descripcion: 'IDENTIFICADOR ' + this.id + ' ESTA SIENDO USADA ANTES DE HABER SIDO ASIGNADA',
                            ambito: ambito.nombre
                        }));
                        console.log("ERROR - ID:" + this.id + " ESTA SIENDO USADA ANTES DE HABER SIDO ASIGNADA");
                    }
                }
                else {
                    app_1.almacen.dispatch(ts_js_1.errores({
                        tipo: 'SEMANTICO',
                        descripcion: 'IDENTIFICADOR ' + this.id + ' NO ES DE TIPO NUMBER',
                        ambito: ambito.nombre
                    }));
                    console.log("ERROR - ID: " + this.id + " NO ES DE TIPO NUMBER");
                }
            }
            else {
                app_1.almacen.dispatch(ts_js_1.errores({
                    tipo: 'SEMANTICO',
                    descripcion: 'NO SE PUEDE MODIFICAR: ' + this.id + ' ES UNA VARIABLE CONST',
                    ambito: ambito.nombre
                }));
                //SIGNIFICA QUE NO ES DE TIPO NUMBER O QUE ES UNA CONSTANTE, POR QUE NO SE PUEDE REASIGNAR
                console.log("ERROR - NO SE PUEDE MODIFICAR: " + this.id + " ES UNA VARIABLE CONST");
            }
        }
        else {
            app_1.almacen.dispatch(ts_js_1.errores({
                tipo: 'SEMANTICO',
                descripcion: 'VARIABLE: ' + this.id + ' NO ESTA DEFINIDA',
                ambito: ambito.nombre
            }));
            console.log("ERROR - VARIABLE: " + this.id + " NO ESTA DEFINIDA");
        }
        return null;
    };
    incremento_decremento.prototype.ejecutar = function (ambito) {
        //LO PRIMERO QUE HAY QUE HACER ES BUSCAR EL ID
        //SI EXISTE LO GUARDAMOS PARA PODER REVISAR SUS PROPIEDADES
        var sim;
        if (ambito.existe(this.id)) {
            //console.log("SI EXISTE EL ID: "+ this.id);
            sim = ambito.getSimbolo(this.id);
            //AHORA QUE YA SABEMOS QUE EXISTE, HAY QUE HACER 3 VALIDACIONES
            //1. VERIFICAR SI ES CONST O NO 
            //2. VERIFICAR SI ES NUMBER O NO
            //3. VERIFICAR SI YA FUE INICIALIZADA LA VARIABLE, ES DECIR !=NULL
            //VALIDACION 1)
            if (sim.getReasignable() == true) {
                //VALIDACION 2)
                if (sim.getTipo() == tipo_1.tipo_valor.NUMBER) {
                    //VALIDACION 3)
                    if (JSON.stringify(sim.getValor()) != null) {
                        //SI PASO TODAS LAS VALIDACIONES
                        //AHORA TOCA VER SI ES UN INCREMENTO O UN DECREMENTO
                        var valor = JSON.stringify(sim.getValor());
                        if (this.tipooperador == tipo_1.operador.INCREMENTO) {
                            var nuevo = new Number(Number(valor) + Number(1));
                            ambito.asignarValor(this.id, nuevo, sim.getTipo());
                        }
                        else {
                            var nuevo = new Number(Number(valor) - Number(1));
                            ambito.asignarValor(this.id, nuevo, sim.getTipo());
                        }
                    }
                    else {
                        app_1.almacen.dispatch(ts_js_1.errores({
                            tipo: 'SEMANTICO',
                            descripcion: 'IDENTIFICADOR: ' + this.id + ' ESTA SIENDO USADA ANTES DE HABER SIDO ASIGNADA',
                            ambito: ambito.nombre
                        }));
                        console.log("ERROR - ID:" + this.id + " ESTA SIENDO USADA ANTES DE HABER SIDO ASIGNADA");
                    }
                }
                else {
                    app_1.almacen.dispatch(ts_js_1.errores({
                        tipo: 'SEMANTICO',
                        descripcion: 'IDENTIFICADOR: ' + this.id + ' NO ES DE TIPO NUMBER',
                        ambito: ambito.nombre
                    }));
                    console.log("ERROR - ID: " + this.id + " NO ES DE TIPO NUMBER");
                }
            }
            else {
                //SIGNIFICA QUE NO ES DE TIPO NUMBER O QUE ES UNA CONSTANTE, POR QUE NO SE PUEDE REASIGNAR
                console.log("ERROR - NO SE PUEDE MODIFICAR: " + this.id + " ES UNA VARIABLE CONST");
                app_1.almacen.dispatch(ts_js_1.errores({
                    tipo: 'SEMANTICO',
                    descripcion: 'IDENTIFICADOR NO SE PUEDE MODIFICAR: ' + this.id + ' ES UNA VARIABLE CONST',
                    ambito: ambito.nombre
                }));
            }
        }
        else {
            app_1.almacen.dispatch(ts_js_1.errores({
                tipo: 'SEMANTICO',
                descripcion: 'VARIABLE: ' + this.id + ' NO ESTA DEFINIDA',
                ambito: ambito.nombre
            }));
            console.log("ERROR - VARIABLE: " + this.id + " NO ESTA DEFINIDA");
        }
        return null;
    };
    return incremento_decremento;
}());
exports.incremento_decremento = incremento_decremento;

"use strict";
exports.__esModule = true;
var entorno_1 = require("../entorno/entorno");
var tipo_1 = require("../entorno/tipo");
var app_1 = require("../../../src/app");
var ts_js_1 = require("../../actions/ts.js");
var instruccionBreak_1 = require("./instruccionBreak");
var instruccioncontinue_1 = require("./instruccioncontinue");
var instruccionreturn_1 = require("./instruccionreturn");
var instruccionelseif = /** @class */ (function () {
    function instruccionelseif(cond, lista, instr) {
        this.condicion = cond;
        this.listainstrucciones = lista;
        this.instruccionelseif = instr;
    }
    instruccionelseif.prototype.ejecutar = function (ambito) {
        //ANTES DE REVISAR SI LAS CONDICIONES SON BOOLEANAS 
        //TENGO QUE REVISAR SI LA INSTRUCCIONELSEIF VIENE "UNDEFINED" Ó NO
        //1. SI VIENE "UNDEFINED" ES POR QUE NO TRAE UN ELSE
        //2. SI NO ES POR QUE TRAE UN ELSE
        if (this.instruccionelseif == undefined) {
            //AQUI COMIENZA LA EVALUACION INICIAL
            var valorcondicion = this.condicion.obtenerValor(ambito);
            var tipocondicion = this.condicion.obtenerTipo(ambito);
            if (tipocondicion == tipo_1.tipo_valor.BOOLEAN) {
                var valorc = valorcondicion;
                //SI ES BOOLEAN LA CONDICION ENTONCES SI SE PUEDE EJECUTAR
                //EVALUO LA CONDICION QUE TRAE EL ELSE IF
                //SI NO SE CUMPLE ENTONCES YA NO HAGO NADA POR QUE ESTOY EN EL PRIMER CASO
                //DONDE NO TRAE UN ELSE
                if (valorc.valueOf()) {
                    var tselseif = new entorno_1["default"]("ELSE-IF", ambito);
                    for (var i = 0; i < this.listainstrucciones.length; i++) {
                        var valori = this.listainstrucciones[i].ejecutar(tselseif);
                        if (valori instanceof instruccionBreak_1.instruccionbreak || valori instanceof instruccioncontinue_1.instruccioncontinue || valori instanceof instruccionreturn_1.instruccionreturn) {
                            return valori;
                        }
                        /*if(valori && valori.valueOf()==tipo_instruccion.BREAK){
                            return valori;
                        }else if(valori && valori.valueOf()==tipo_instruccion.CONTINUE){
                            return valori;
                        }else if(valori!=null){
                            return valori;
                        }*/
                    }
                }
            }
            else {
                //ERROR SEMANTICO EN EL IF-ELSE, LA CONDICION NO ES BOOLEANA
                app_1.almacen.dispatch(ts_js_1.errores({
                    tipo: 'SEMANTICO',
                    descripcion: 'CONDICION EN IF-ELSE NO ES BOOLEANA',
                    ambito: ambito.nombre
                }));
            }
        }
        else {
            //SIGNIFICA QUE ESTA INSTRUCCION ELSE IF() VIENE CON UN ELSE
            //AQUI COMIENZA LA EVALUACION INICIAL
            var valorcondicion = this.condicion.obtenerValor(ambito);
            var tipocondicion = this.condicion.obtenerTipo(ambito);
            if (tipocondicion == tipo_1.tipo_valor.BOOLEAN) {
                var valorc = valorcondicion;
                //SI ES BOOLEAN LA CONDICION ENTONCES SI SE PUEDE EJECUTAR
                //EVALUO LA CONDICION QUE TRAE EL ELSE IF
                //SI NO SE CUMPLE ENTONCES AQUI SI TENGO QUE IR A EJECUTAR AL ELSE 
                if (valorc.valueOf()) {
                    var tselseif = new entorno_1["default"]("ELSE-IF", ambito);
                    for (var i = 0; i < this.listainstrucciones.length; i++) {
                        var valori = this.listainstrucciones[i].ejecutar(tselseif);
                        if (valori && valori.valueOf() == tipo_1.tipo_instruccion.BREAK) {
                            return valori;
                        }
                        else if (valori && valori.valueOf() == tipo_1.tipo_instruccion.CONTINUE) {
                            return valori;
                        }
                        else if (valori != null) {
                            return valori;
                        }
                    }
                }
                else {
                    //AQUI ESTOY EJECUTANDO AL ELSE
                    return this.instruccionelseif.ejecutar(ambito);
                }
            }
            else {
                //ERROR SEMANTICO EN EL IF-ELSE, LA CONDICION NO ES BOOLEANA
                app_1.almacen.dispatch(ts_js_1.errores({
                    tipo: 'SEMANTICO',
                    descripcion: 'CONDICION EN IF-ELSE NO ES BOOLEANA',
                    ambito: ambito.nombre
                }));
            }
        }
        return null;
    };
    return instruccionelseif;
}());
exports.instruccionelseif = instruccionelseif;

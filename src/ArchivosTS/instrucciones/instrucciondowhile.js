"use strict";
exports.__esModule = true;
var entorno_1 = require("../entorno/entorno");
var tipo_1 = require("../entorno/tipo");
var app_1 = require("../../../src/app");
var ts_js_1 = require("../../actions/ts.js");
var instruccionBreak_1 = require("./instruccionBreak");
var instruccionreturn_1 = require("./instruccionreturn");
var instruccioncontinue_1 = require("./instruccioncontinue");
var instrucciondowhile = /** @class */ (function () {
    function instrucciondowhile(lista, exp) {
        this.lista_do = lista;
        this.condicion = exp;
    }
    instrucciondowhile.prototype.ejecutar = function (ambito) {
        //EL CICLO DO WHILE, NO IMPORTANDO LA CONDICION, SIEMPRE EJECUTA AL MENOS UNA VEZ SUS INSTRUCCIONES
        /*const tsdowhile= new entorno("do",ambito);
        for (let i = 0; i < this.lista_do.length; i++) {
            let valor= this.lista_do[i].ejecutar(tsdowhile);

            if(valor instanceof(instruccionbreak) || valor instanceof(instruccionreturn)){
                return valor;
            }else if(valor instanceof instruccioncontinue){
                break;
            }
        }*/
        //DESPUES HAY QUE VERIFICAR SI LA CONDICION ES BOOLEANA PARA PODER VOLVER A EJECUTAR LAS INSTRUCCIONES
        var valorexpresion = this.condicion.obtenerValor(ambito);
        var tipoexpresion = this.condicion.obtenerTipo(ambito);
        if (tipoexpresion == tipo_1.tipo_valor.BOOLEAN) {
            do {
                var nuevats = new entorno_1["default"]("do-while", ambito);
                for (var i = 0; i < this.lista_do.length; i++) {
                    var valor = this.lista_do[i].ejecutar(nuevats);
                    if (valor instanceof (instruccionBreak_1.instruccionbreak) || valor instanceof (instruccionreturn_1.instruccionreturn)) {
                        return valor;
                    }
                    else if (valor instanceof instruccioncontinue_1.instruccioncontinue) {
                        break;
                    }
                    /*if(valor && valor.valueOf()==tipo_instruccion.BREAK){
                        return;
                    }else if(valor && valor.valueOf()==tipo_instruccion.CONTINUE){
                        break;
                    }else if(valor!=null){
                        return valor;
                    }*/
                }
            } while (this.condicion.obtenerValor(ambito).valueOf());
        }
        else {
            app_1.almacen.dispatch(ts_js_1.errores({
                tipo: 'SEMANTICO',
                descripcion: 'LA EXPRESION EN EL DO-WHILE NO ES DE TIPO BOOLEANA',
                ambito: ambito.nombre
            }));
            console.log("ERROR - LA EXPRESION EN EL DO-WHILE NO ES DE TIPO BOOLEANA");
        }
        return null;
    };
    return instrucciondowhile;
}());
exports.instrucciondowhile = instrucciondowhile;

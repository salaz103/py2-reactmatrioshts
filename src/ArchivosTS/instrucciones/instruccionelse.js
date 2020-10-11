"use strict";
exports.__esModule = true;
var entorno_1 = require("../entorno/entorno");
var instruccionBreak_1 = require("./instruccionBreak");
var instruccioncontinue_1 = require("./instruccioncontinue");
var instruccionreturn_1 = require("./instruccionreturn");
var instruccionelse = /** @class */ (function () {
    function instruccionelse(lista) {
        this.listaelse = lista;
    }
    instruccionelse.prototype.ejecutar = function (ambito) {
        //SI LLAMAN A ESTE METODO DEL ELSE, SIGNIFICA QUE NINGUNA OTRA CONDICION FUE VERDADERA
        //EN ALGUN IF O ELSE IF() DE ARRIBA
        var tselse = new entorno_1["default"]("ELSE", ambito);
        //ENTONCES AQUI SOLO EJECUTO LAS INSTRUCCIONES
        for (var i = 0; i < this.listaelse.length; i++) {
            var valori = this.listaelse[i].ejecutar(tselse);
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
        return null;
    };
    return instruccionelse;
}());
exports.instruccionelse = instruccionelse;

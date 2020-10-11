"use strict";
exports.__esModule = true;
var entorno_1 = require("../entorno/entorno");
var instruccionBreak_1 = require("./instruccionBreak");
var instruccioncontinue_1 = require("./instruccioncontinue");
var instruccionreturn_1 = require("./instruccionreturn");
var instruccionfor = /** @class */ (function () {
    function instruccionfor(i1, i2, i3, lista) {
        this.primerainstruccion = i1;
        this.expresion = i2;
        this.tercerainstruccion = i3;
        this.listainstrucciones = lista;
    }
    instruccionfor.prototype.ejecutar = function (ambito) {
        //PRIMERO HAY QUE HACER UNA NUEVA TS 
        var tsfor = new entorno_1["default"]("FOR", ambito);
        this.primerainstruccion.ejecutar(tsfor);
        while (this.expresion.obtenerValor(tsfor).valueOf()) {
            var tsinstrucciones = new entorno_1["default"]("CONTENIDO_FOR", tsfor);
            for (var i = 0; i < this.listainstrucciones.length; i++) {
                //AQUI VAMOS EJECUTANDO CADA UNA DE LAS INSTRUCCIONES
                //SABEMOS QUE TODAS LAS INSTRUCCIONES DEVUELVEN NULO
                //LAS INSTRUCCIONES SOLO EJECUTAN, PERO SI VINIERA ALGUN VALOR
                // EN ESTE CASO PUEDE SER BREAK O CONTINUE
                var resultado = this.listainstrucciones[i].ejecutar(tsinstrucciones);
                if (resultado instanceof (instruccionBreak_1.instruccionbreak) || resultado instanceof (instruccionreturn_1.instruccionreturn)) {
                    return resultado;
                }
                else if (resultado instanceof instruccioncontinue_1.instruccioncontinue) {
                    break;
                }
                /*if(resultado && resultado.valueOf()==tipo_instruccion.BREAK){
                    //SI VIENE UNA INSTRUCCION BREAK, NO SEGUIMOS EL FOR
                    return resultado;
                }else if(resultado && resultado.valueOf()==tipo_instruccion.CONTINUE){
                    //SI VIENE UNA FUNCION CONTINUE ENTONCES TENEMOS QUE
                    //SALIR DONDE ESTEMOS EN EL CICLO FOR Y EJECUTAR LA SIGUIENTE PASADA
                    break;
                }else if(resultado!=null){
                    return resultado;
                }*/
                //console.log("RESULTADO DE UNA PASADA EN FOR:");
                //console.log(resultado);            
            }
            this.tercerainstruccion.ejecutar(tsfor);
        }
        return null;
    };
    return instruccionfor;
}());
exports.instruccionfor = instruccionfor;

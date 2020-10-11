"use strict";
exports.__esModule = true;
var entorno_1 = require("../entorno/entorno");
var tipo_1 = require("../entorno/tipo");
var app_1 = require("../../../src/app");
var ts_js_1 = require("../../actions/ts.js");
var instruccionreturn_1 = require("./instruccionreturn");
var instruccionBreak_1 = require("./instruccionBreak");
var instruccioncontinue_1 = require("./instruccioncontinue");
var instruccionif = /** @class */ (function () {
    function instruccionif(exp, listai) {
        this.exp = exp;
        this.instrucciones = listai;
    }
    instruccionif.prototype.ejecutar = function (ambito) {
        //1. OBTENER EL VALOR Y TIPO DE LA CONDICION
        //YA QUE TIENE QUE SER DE TIPO BOOLEAN
        var valorcondicion = this.exp.obtenerValor(ambito);
        var tipocondicion = this.exp.obtenerTipo(ambito);
        /*console.log("VALOR CONDICION");
        console.log(valorcondicion);
        console.log("TIPO");
        console.log(tipocondicion);*/
        if (tipocondicion == tipo_1.tipo_valor.BOOLEAN) {
            var valorc = valorcondicion;
            //SI ES BOOLEAN LA CONDICION ENTONCES SI SE PUEDE EJECUTAR
            if (valorc.valueOf()) {
                var tsif = new entorno_1["default"]("if", ambito);
                for (var i = 0; i < this.instrucciones.length; i++) {
                    //AQUI TENEMOS QUE IR RECIBIENDO EL "VALOR" DE LAS INSTRUCCIONES
                    //QUE POR SER INSTRUCCIONES NO DEVUELVEN NADA
                    //A EXCEPCION DEL BREAK, CONTINUE Y RETURN
                    var valori = this.instrucciones[i].ejecutar(tsif);
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
            app_1.almacen.dispatch(ts_js_1.errores({
                tipo: 'SEMANTICO',
                descripcion: 'LA CONDICION ' + String(valorcondicion) + ' EN EL IF, NO ES BOOLEANA',
                ambito: ambito.nombre
            }));
            console.log("ERROR - LA CONDICION " + String(valorcondicion) + "NO ES BOOLEANA");
        }
        return null;
    };
    return instruccionif;
}());
exports.instruccionif = instruccionif;

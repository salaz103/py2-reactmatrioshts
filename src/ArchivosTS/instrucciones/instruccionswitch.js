"use strict";
exports.__esModule = true;
var entorno_1 = require("../entorno/entorno");
var instruccionBreak_1 = require("./instruccionBreak");
var instruccionreturn_1 = require("./instruccionreturn");
var instruccionswitch = /** @class */ (function () {
    function instruccionswitch(ex, casos) {
        this.exp = ex;
        this.casos = casos;
    }
    instruccionswitch.prototype.ejecutar = function (ambito) {
        //PRIMERO OBTENEMOS EL VALOR DE LA EXPRESION DEL SWITCH
        var valorswitch = this.exp.obtenerValor(ambito);
        var tipovalorswitch = this.exp.obtenerTipo(ambito);
        /*console.log("VALOR DEL SWITCH ACTUAL");
        console.log(valorswitch);
        console.log("VALOR DEL TIPO DEL SWITCH");
        console.log(tipovalorswitch);*/
        //CREAMOS LA NUEVA TS Y LE PASAMOS EL PADRE
        var ts_switch = new entorno_1["default"]("switch", ambito);
        var evaluarDefault = true;
        var casoDefault;
        //TENEMOS QUE RECORRER CADA UNO DE LOS CASOS QUE SI TRAEN EXPRESION
        //ES DECIR RECORRER TODOS LOS CASOS A EXCEPCION DEL CASO DEFAULT
        for (var i = 0; i < this.casos.length; i++) {
            if (this.casos[i].exp != undefined) {
                //SIGNIFICA QUE ESTE ES UN CASO NORMAL, ENTONCES LO RECORRO
                var valorcaso = this.casos[i].exp.obtenerValor(ts_switch);
                var tipocaso = this.casos[i].exp.obtenerTipo(ts_switch);
                //PRIMERO HAY QUE EVALUAR SI EL TIPO DE VALOR DEL CASO
                //ES IGUAL AL TIPO DE VALOR DE LA EXPRESION DEL SWITCH
                if (tipocaso == tipovalorswitch) {
                    //SI SON IGUALES LOS TIPOS DE VALOR AHORA HAY QUE REVISAR SI LOS VALORES SON IGUALES
                    // Y ASI RECORRER LAS INSTRUCCIONES DE ESTE CASO
                    if (JSON.stringify(valorswitch) == JSON.stringify(valorcaso)) {
                        //SI LOS VALORES SON IGUALES
                        //ENTONCES RECORRO LAS INSTRUCCIONES DE ESTE CASO Y TERMINO
                        /*this.casos[i].listainstrucciones.forEach(instruccion => {
                            instruccion.ejecutar(ts_switch);
                        });*/
                        for (var a = 0; a < this.casos[i].listainstrucciones.length; a++) {
                            var valori = this.casos[i].listainstrucciones[a].ejecutar(ts_switch);
                            if (valori instanceof (instruccionBreak_1.instruccionbreak)) {
                                return;
                            }
                            else if (valori instanceof instruccionreturn_1.instruccionreturn) {
                                return valori;
                            }
                            /*if(valori && valori.valueOf()==tipo_instruccion.BREAK){
                                return;
                            }else if(valori!=null){
                                return valori;
                            }*/
                        }
                        //evaluarDefault=false;
                    }
                }
                else {
                    //ERROR - NO SON IGUALES Y SIGO CON EL SIGUIENTE CASO
                    continue;
                }
            }
            else {
                //VOY A GUARDAR EL CASO DEFAULT POR SI HUBIERA QUE EJECUTARLO
                casoDefault = this.casos[i];
            }
        }
        //SI LA BANDERA evaluarDefault viene TRUE ES POR QUE NINGUNO DE LOS CASOS FUE EL ADECUADO
        //Y SE VA A EJECUTAR LAS INSTRUCCIONES DEL CASO DEFAULT
        if (evaluarDefault) {
            /* casoDefault.listainstrucciones.forEach(instruccion => {
                 instruccion.ejecutar(ts_switch);
             });*/
            for (var i = 0; i < casoDefault.listainstrucciones.length; i++) {
                var valori = casoDefault.listainstrucciones[i].ejecutar(ts_switch);
                if (valori instanceof (instruccionBreak_1.instruccionbreak)) {
                    return;
                }
                else if (valori instanceof instruccionreturn_1.instruccionreturn) {
                    return valori;
                }
                /*if(valori && valori.valueOf()==tipo_instruccion.BREAK){
                    return valori;
                }else if(valori!=null){
                    return valori;
                }*/
            }
        }
        return null;
    };
    return instruccionswitch;
}());
exports.instruccionswitch = instruccionswitch;

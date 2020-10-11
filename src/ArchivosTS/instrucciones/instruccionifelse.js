"use strict";
exports.__esModule = true;
var entorno_1 = require("../entorno/entorno");
var tipo_1 = require("../entorno/tipo");
var app_1 = require("../../../src/app");
var ts_js_1 = require("../../actions/ts.js");
var instruccionBreak_1 = require("./instruccionBreak");
var instruccioncontinue_1 = require("./instruccioncontinue");
var instruccionreturn_1 = require("./instruccionreturn");
var instruccionifelse = /** @class */ (function () {
    function instruccionifelse(condicion, listat, elseifoelse) {
        this.condicion = condicion;
        this.listatrue = listat;
        this.elseif_else = elseifoelse;
    }
    instruccionifelse.prototype.ejecutar = function (ambito) {
        //1. OBTENER EL VALOR Y TIPO DE LA CONDICION
        //YA QUE TIENE QUE SER DE TIPO BOOLEAN
        var valorcondicion = this.condicion.obtenerValor(ambito);
        var tipocondicion = this.condicion.obtenerTipo(ambito);
        /*console.log("VALOR CONDICION");
        console.log(valorcondicion);
        console.log("TIPO");
        console.log(tipocondicion);*/
        if (tipocondicion == tipo_1.tipo_valor.BOOLEAN) {
            var valorc = valorcondicion;
            //SI ES BOOLEAN LA CONDICION ENTONCES SI SE PUEDE EJECUTAR
            if (valorc.valueOf()) {
                //SI ENTRO AQUI, SE EJECUTAN LAS INSTRUCCIONES DEL TRUE
                var tsif = new entorno_1["default"]("if", ambito);
                // this.listatrue.forEach(instruccion => {
                //         instruccion.ejecutar(tsif);
                // });
                for (var i = 0; i < this.listatrue.length; i++) {
                    //AQUI TENEMOS QUE IR RECIBIENDO EL "VALOR" DE LAS INSTRUCCIONES
                    //QUE POR SER INSTRUCCIONES NO DEVUELVEN NADA, A EXCEPCION DE LOS BREAK O CONTINUE
                    var valori = this.listatrue[i].ejecutar(tsif);
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
            else {
                //SI LA CONDICION NO ES VERDADERA SE EJECUTA LO OTRO
                //PERO PUEDE QUE AQUI VENGA UN ELSE IF O SOLO UN ELSE
                //SOLO MANDO A EJECUTAR ESE ELSE O ELSE IF Y QUE ELLOS HAGAN SUS NUEVOS AMBITOS
                return this.elseif_else.ejecutar(ambito);
            }
        }
        else {
            app_1.almacen.dispatch(ts_js_1.errores({
                tipo: 'SEMANTICO',
                descripcion: 'LA CONDICION ' + String(valorcondicion) + ' , NO ES BOOLEANA',
                ambito: ambito.nombre
            }));
            console.log("ERROR - LA CONDICION " + String(valorcondicion) + "NO ES BOOLEANA");
        }
        return null;
    };
    return instruccionifelse;
}());
exports.instruccionifelse = instruccionifelse;

"use strict";
exports.__esModule = true;
var app_1 = require("../../../src/app");
var ts_1 = require("../../actions/ts");
var graficar = /** @class */ (function () {
    function graficar() {
    }
    graficar.prototype.ejecutar = function (ambito) {
        //EL EJECUTAR DE ESTA FUNCION VA A SER ENVIAR EL AMBITO DONDE ESTA A LA STORE 
        //DEL PROYECTO Y AHI VAMOS A RECORRER AMBITOS Y TS
        var simbolos = [];
        var _loop_1 = function (entornoactual) {
            entornoactual.tablasimbolos.forEach(function (simbolo) {
                simbolos.push({
                    nombre: simbolo.id,
                    tipo: simbolo.tipovalor,
                    ambito: entornoactual.nombre,
                    valor: simbolo.valor,
                    reasignable: simbolo.reasignable
                });
            });
        };
        //AQUI SOLO ESTOY RECORRIENDO LA TS
        /*
         for (let entornoactual:entorno = ambito; entornoactual !=null ; entornoactual=entornoactual.apuntadorPadre) {
             for (let i = 0; i <entornoactual.ts.length; i++) {
                 simbolos.push({
                     nombre:entornoactual.ts[i].id,
                     tipo: entornoactual.ts[i].tipovalor,
                     ambito: entornoactual.nombre,
                     //valor: Array.isArray(entornoactual.ts[i])? JSON.stringify(entornoactual.ts[i]):entornoactual.ts[i].valor,
                     valor: entornoactual.ts[i].valor,
                     reasignable: entornoactual.ts[i].reasignable
                 });
             }
         }*/
        for (var entornoactual = ambito; entornoactual != null; entornoactual = entornoactual.apuntadorPadre) {
            _loop_1(entornoactual);
        }
        //AHORA QUE YA TENGO EL ARREGLO DE OBJETOS, VOY A INGRESAR ESTE ARREGLO
        //AL ARREGLO DE MI STORE
        app_1.almacen.dispatch(ts_1.reportets(simbolos));
        return null;
    };
    return graficar;
}());
exports.graficar = graficar;

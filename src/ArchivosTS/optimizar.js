"use strict";
exports.__esModule = true;
var app_1 = require("../../src/app");
var ts_js_1 = require("../actions/ts.js");
function inicioOptimizacion(arbolInstrucciones) {
    app_1.almacen.dispatch(ts_js_1.limpiarOptimizaciones());
    console.log("Recibiendo el ARBOL DEL CODIGO 3D para OPTIMIZAR:");
    console.log(arbolInstrucciones);
    optimizar(arbolInstrucciones);
}
function optimizar(ast) {
    var salida = "";
    ast.forEach(function (ins) {
        salida = salida + ins.optimizar();
    });
    //console.log("CODIGO SALIDA, DESPUES DE OPTIMIZAR"); 
    //console.log(salida);
}
exports["default"] = inicioOptimizacion;

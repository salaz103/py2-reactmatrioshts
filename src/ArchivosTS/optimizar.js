"use strict";
exports.__esModule = true;
var generacion_1 = require("./helpers/generacion");
var app_1 = require("../../src/app");
var ts_js_1 = require("../actions/ts.js");
function inicioOptimizacion(arbolInstrucciones) {
    app_1.almacen.dispatch(ts_js_1.limpiarOptimizaciones());
    console.log("Recibiendo el ARBOL DEL CODIGO 3D para OPTIMIZAR:");
    console.log(arbolInstrucciones);
    optimizar(arbolInstrucciones);
    app_1.almacen.dispatch(ts_js_1.codigoconsola("CODIGO OPTIMIZADO\n"));
}
function optimizar(ast) {
    var generador = generacion_1.generacion.getGenerador();
    var salida = "";
    ast.forEach(function (ins) {
        salida = salida + ins.optimizar();
    });
    generador.setearCodigoOptimizado(salida);
    //console.log("CODIGO SALIDA, DESPUES DE OPTIMIZAR"); 
    //console.log(salida);
}
exports["default"] = inicioOptimizacion;

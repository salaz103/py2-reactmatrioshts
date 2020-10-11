"use strict";
exports.__esModule = true;
var entorno_1 = require("./entorno/entorno");
var app_1 = require("../../src/app");
var ts_js_1 = require("../actions/ts.js");
var declaracionfuncion_1 = require("./instrucciones/declaracionfuncion");
function inicioEjecucion(ast) {
    //ANTES DE EJECUTAR, LIMPIAR LA CONSOLA
    app_1.almacen.dispatch(ts_js_1.limpiarconsola());
    //CADA ENTORNO TIENE UNA TABLA DE SIMBOLOS COMO UN VALOR
    var entornoGlobal = new entorno_1["default"]("global");
    console.log("Recibiendo el AST para EJECUTAR:");
    console.log(ast);
    ejecutar(ast, entornoGlobal);
    //console.log("MI ENTORNO FINAL, CON TODAS LAS VARIABLES");
    //console.log(entornoGlobal.tablasimbolos);
    var ts = entornoGlobal.tablasimbolos;
    var tf = entornoGlobal.tablaf;
    var simbolosfinales = [];
    var funcionesfinales = [];
    ts.forEach(function (element) {
        simbolosfinales.push(element);
    });
    tf.forEach(function (funcion) {
        funcionesfinales.push(funcion);
    });
    //console.log(simbolosfinales);
    //console.log(funcionesfinales);
    app_1.almacen.dispatch(ts_js_1.tsfinal(simbolosfinales, funcionesfinales));
}
function ejecutar(ast, entorno) {
    //PRIMERA PASADA, GUARDAR TODAS LAS FUNCIONES
    for (var i = 0; i < ast.length; i++) {
        if (ast[i] instanceof declaracionfuncion_1.declaracionfuncion) {
            entorno.agregarFuncion(ast[i]);
        }
    }
    //AHORA YA EJECUTO A EXCEPCION DE LAS FUNCIONES
    for (var a = 0; a < ast.length; a++) {
        if (ast[a] instanceof declaracionfuncion_1.declaracionfuncion) {
            continue;
        }
        ast[a].ejecutar(entorno);
    }
}
exports["default"] = inicioEjecucion;

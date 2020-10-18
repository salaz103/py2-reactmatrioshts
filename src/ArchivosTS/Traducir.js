"use strict";
exports.__esModule = true;
var entorno_1 = require("./entorno/entorno");
var app_1 = require("../../src/app");
var ts_js_1 = require("../actions/ts.js");
var declaracionfuncion_1 = require("./instrucciones/declaracionfuncion");
var tipo_1 = require("./entorno/tipo");
function inicioTraduccion(ast) {
    //ANTES DE EJECUTAR, LIMPIAR LA CONSOLA Y EL STORE CON LO QUE SE UTILIZA
    app_1.almacen.dispatch(ts_js_1.limpiarconsola());
    //CADA ENTORNO TIENE UNA TABLA DE SIMBOLOS COMO UN VALOR
    var entornoGlobal = new entorno_1["default"]("global", tipo_1.tipo_ambito.GLOBAL);
    console.log("Recibiendo el AST para EJECUTAR:");
    console.log(ast);
    traducir(ast, entornoGlobal);
    //console.log("MI ENTORNO FINAL, CON TODAS LAS VARIABLES");
    //console.log(entornoGlobal.tablasimbolos);
    ////**********************  CODIGO DONDE SE GUARDAN LAS FUNCIONES Y SIMBOLOS GLOBALES FINALES**********/
    /*let ts= entornoGlobal.tablasimbolos;
    let tf= entornoGlobal.tablaf;
    let simbolosfinales=[];
    let funcionesfinales=[];
    
    ts.forEach(element => {
        simbolosfinales.push(element);
    });
    
    tf.forEach(funcion => {
        funcionesfinales.push(funcion);
    });
    almacen.dispatch(tsfinal(simbolosfinales,funcionesfinales));*/
}
function traducir(ast, entorno) {
    //PRIMERA PASADA, GUARDAR TODAS LAS FUNCIONES
    /*for (let i = 0; i < ast.length; i++) {
        if(ast[i] instanceof declaracionfuncion){
            entorno.agregarFuncion(ast[i]);
        }
    }*/
    //COMIENZA LA TRADUCCION
    for (var a = 0; a < ast.length; a++) {
        if (ast[a] instanceof declaracionfuncion_1.declaracionfuncion) {
            continue;
        }
        ast[a].traducir(entorno);
    }
}
exports["default"] = inicioTraduccion;

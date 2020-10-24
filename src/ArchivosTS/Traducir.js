"use strict";
exports.__esModule = true;
var entorno_1 = require("./entorno/entorno");
var app_1 = require("../../src/app");
var ts_js_1 = require("../actions/ts.js");
var declaracionfuncion_1 = require("./instrucciones/declaracionfuncion");
var tipo_1 = require("./entorno/tipo");
var generacion_1 = require("./helpers/generacion");
function inicioTraduccion(ast) {
    //LIMPIAR LA CONSOLA
    app_1.almacen.dispatch(ts_js_1.limpiarconsola());
    //PRIMERO DECLARAMOS EL ENTORNO GLOBAL
    var entornoGlobal = new entorno_1["default"]("global", tipo_1.tipo_ambito.GLOBAL);
    console.log("Recibiendo el AST para EJECUTAR:");
    console.log(ast);
    traducir(ast, entornoGlobal);
    console.log("MI ENTORNO FINAL, CON TODAS LAS VARIABLES");
    console.log(entornoGlobal.tablasimbolos);
    ////**********************  CODIGO DONDE SE GUARDAN LAS FUNCIONES Y SIMBOLOS GLOBALES FINALES**********/
    var ts = entornoGlobal.tablasimbolos;
    //let tf= entornoGlobal.tablaf;
    var simbolosfinales = [];
    var funcionesfinales = [];
    ts.forEach(function (element) {
        simbolosfinales.push(element);
    });
    // tf.forEach(funcion => {
    //     funcionesfinales.push(funcion);
    // });
    app_1.almacen.dispatch(ts_js_1.tsfinal(simbolosfinales, funcionesfinales));
}
function traducir(ast, entorno) {
    //EN LA PRIMERA PASADA LO QUE HAREMOS SERA TRADUCIR FUNCIONES Y TYPES
    //FALTA AGREGAR TYPES
    ast.forEach(function (ins) {
        if (ins instanceof declaracionfuncion_1.declaracionfuncion) {
            ins.traducir(entorno);
        }
    });
    //AQUI IRIA EL ESPACIO DONDE TENDRIAMOS QUE INGRESAR LA FUNCIONES NATIVAS
    //AQUI COMIENZA LA SEGUNDA PASADA DONDE TRADUCIREMOS TODO A EXCEPCION DE LAS FUNCIONES Y TYPES
    //PERO AQUI YA ESTAMOS EN EL AMBITO GLOBAL ENTONCES TENEMOS QUE PONER EN EL CODIGO el main()
    var generador = generacion_1.generacion.getGenerador();
    generador.agregarcodigo3d("void main(){");
    ast.forEach(function (ins) {
        //AQUI TENDRIAMOS QUE LEER EL AST, TODAS LAS INSTRUCCIONES A EXCEPCION DE LOS TYPES, POR QUE ESOS
        //YA FUERON TRADUCIDOS ARRIBA
        //PENDIENTE
        //IF(INSTRUCCION != TYPE ){ ENTONCES TRADUCIMOS}
        ins.traducir(entorno);
    });
    //UNA VEZ YA TERMINAMOS DE TRADUCIR, TENEMOS QUE "CERRAR" EL AMBITO MAIN
    generador.agregarcodigo3d("return;");
    generador.agregarcodigo3d("}");
}
exports["default"] = inicioTraduccion;

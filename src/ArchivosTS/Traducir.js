"use strict";
exports.__esModule = true;
var entorno_1 = require("./entorno/entorno");
var app_1 = require("../../src/app");
var ts_js_1 = require("../actions/ts.js");
var declaracionfuncion_1 = require("./instrucciones/declaracionfuncion");
var tipo_1 = require("./entorno/tipo");
var generacion_1 = require("./helpers/generacion");
var nativas_1 = require("./helpers/nativas");
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
    console.log("MI ENTORNO FINAL, CON TODAS LAS FUNCIONES");
    console.log(entornoGlobal.tablaf);
    ////**********************  CODIGO DONDE SE GUARDAN LAS FUNCIONES Y SIMBOLOS GLOBALES FINALES**********/
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
    app_1.almacen.dispatch(ts_js_1.tsfinal(simbolosfinales, funcionesfinales));
    app_1.almacen.dispatch(ts_js_1.codigoconsola("TRADUCCION FINALIZADA\n"));
}
function traducir(ast, entorno) {
    var generador = generacion_1.generacion.getGenerador();
    //ANTES DE COMENZAR A TRADUCIR, TENGO QUE GUARDAR TYPES Y FUNCIONES, POR QUE 
    //PUEDE QUE DENTRO DE UN FUNCION VENGA OTRA FUNCION Y TENEMOS QUE GUARDARLAS
    //PASO 0
    for (var i = 0; i < ast.length; i++) {
        var funcion = ast[i];
        if (funcion instanceof declaracionfuncion_1.declaracionfuncion) {
            var funcion2 = entorno.existeFuncion(funcion.nombre);
            //SI NO EXISTE
            if (funcion2 == null) {
                entorno.agregarFuncion(funcion);
            }
            else {
                //SI YA EXISTE ENTONCES NO LA GUARDAMOS Y REPORTAMOS UN ERROR
            }
        }
    }
    //PASO 1 - GUARDAR EL CODIGO DEL MAIN
    generador.agregarcodigo3d("void main(){");
    ast.forEach(function (ins) {
        if (!(typeof (ins) == "string")) {
            //PENDIENTE
            //IF(INSTRUCCION != TYPE ){ ENTONCES TRADUCIMOS}
            if (ins instanceof declaracionfuncion_1.declaracionfuncion) {
            }
            else {
                ins.traducir(entorno);
            }
        }
    });
    //UNA VEZ YA TERMINAMOS DE TRADUCIR, TENEMOS QUE "CERRAR" EL AMBITO MAIN
    generador.agregarcodigo3d("return;");
    generador.agregarcodigo3d("}");
    generador.setearMain();
    //PASO 2
    //TRADUCIR FUNCIONES Y TYPES
    //FALTA AGREGAR TYPES
    ast.forEach(function (ins) {
        if (ins instanceof declaracionfuncion_1.declaracionfuncion) {
            ins.traducir(entorno);
        }
    });
    generador.setearFuncionesUsuario();
    //PASO 3
    //AQUI IRIA EL ESPACIO DONDE TENDRIAMOS QUE INGRESAR LA FUNCIONES NATIVAS
    nativas_1.generarFuncionesNativas();
    generador.setearFuncionesNativas();
    console.log(entorno.tablaf);
    console.log(generador);
    return;
}
exports["default"] = inicioTraduccion;

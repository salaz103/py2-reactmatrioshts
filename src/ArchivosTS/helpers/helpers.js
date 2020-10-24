"use strict";
exports.__esModule = true;
var app_1 = require("../../../src/app");
var ts_1 = require("../../actions/ts");
var generacion_1 = require("./generacion");
function generartmp() {
    //PARA GENERAR EL TMP PRIMERO VAMOS A LA "STORE" A INCREMENTAR EL CONTADOR DE LOS TMP
    app_1.almacen.dispatch(ts_1.aumentartemporales());
    //UNA VEZ YA ESTE EL TEMPORAL AUMENTADO, PODEMOS IR A TRAERLO PARA USARLO
    var temporal = "t" + app_1.almacen.getState().storecodigo.contadortemporales;
    return temporal;
}
exports.generartmp = generartmp;
function generaretiqueta() {
    //PARA GENERAR LA ETIQUETA PRIMERO VAMOS A LA "STORE" A INCREMENTAR EL CONTADOR DE LAS ETQ
    app_1.almacen.dispatch(ts_1.aumentaretiquetas());
    //UNA VEZ YA ESTE LA ETIQUETA AUMENTADA, PODEMOS IR A TRAERLA PARA USARLA
    var etiqueta = "L" + app_1.almacen.getState().storecodigo.contadoretiquetas;
    return etiqueta;
}
exports.generaretiqueta = generaretiqueta;
function codigo3dfinal() {
    var codigofinal = generacion_1.generacion.getGenerador().getCodigoFinal();
    return codigofinal;
}
exports.codigo3dfinal = codigo3dfinal;
function limpiarTodo() {
    generacion_1.generacion.getGenerador().limpiarTodo();
}
exports.limpiarTodo = limpiarTodo;

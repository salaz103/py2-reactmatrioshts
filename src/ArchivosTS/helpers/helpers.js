"use strict";
exports.__esModule = true;
var app_1 = require("../../../src/app");
var ts_1 = require("../../actions/ts");
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
function listaTemporales() {
    //EN ESTA FUNCIÓN SE GENERARA LA LISTA DE TEMPORALES, IREMOS A LA "STORE" A TRAER EL # DE TEMPORALES 
    //UTILIZADOS
    var cantidad = app_1.almacen.getState().storecodigo.contadortemporales;
    var lista = "float ";
    if (cantidad != -1) {
        //SI LA CANTIDAD ES DIFERENTE DE -1 ENTONCES SIGNIFICA QUE SI HAY TEMPORALES
        for (var i = 0; i <= cantidad; i++) {
            if (i == cantidad) {
                lista += "t" + i + "; \n";
            }
            else {
                lista += "t" + i + ",";
            }
        }
    }
    return lista;
}
exports.listaTemporales = listaTemporales;
function getPosicionLibreHeap() {
    app_1.almacen.dispatch(ts_1.aumentarheap());
    var pos = app_1.almacen.getState().storecodigo.heap;
    return pos;
}
exports.getPosicionLibreHeap = getPosicionLibreHeap;
function codigo3dfinal() {
    //EL CODIGO SE DEBE ARMAR
    //ENCABEZADO
    //LISTA TEMPORALES
    //VOID MAIN(){ CODIGO3D  RETURN; }
    var codigo3dfinal = "";
    var encabezado = app_1.almacen.getState().storecodigo.encabezado;
    var listatmp = listaTemporales();
    var c3d = app_1.almacen.getState().storecodigo.codigo3d;
    codigo3dfinal = encabezado + listatmp + "void main(){\n" + c3d + "return; \n}";
    return codigo3dfinal;
}
exports.codigo3dfinal = codigo3dfinal;

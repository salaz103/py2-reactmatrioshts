"use strict";
exports.__esModule = true;
function inicioOptimizacion(arbolInstrucciones) {
    console.log("Recibiendo el ARBOL DEL CODIGO 3D para OPTIMIZAR:");
    console.log(arbolInstrucciones);
    //optimizar(arbolInstrucciones);
}
function optimizar(ast) {
    var salida = "";
    ast.forEach(function (ins) {
        salida = salida + ins.optimizar();
    });
    console.log(salida);
}
exports["default"] = inicioOptimizacion;

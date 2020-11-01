"use strict";
exports.__esModule = true;
var generacion = /** @class */ (function () {
    function generacion() {
        this.temporales = 0;
        this.etiquetas = 0;
        this.setTemporales = new Set();
        this.codigo = new Array();
    }
    generacion.getGenerador = function () {
        return this.generador || (this.generador = new this());
    };
    generacion.prototype.limpiarTodo = function () {
        this.setTemporales = new Set();
        this.temporales = 0;
        this.etiquetas = 0;
        this.codigo = new Array();
    };
    generacion.prototype.getCodigoFinal = function () {
        //EL CODIGO FINAL ESTA COMPUESTO
        /*
         1. ENCABEZADO
         2. LISTA TEMPORALES
         3. FUNCIONES NATIVAS
         4. FUNCIONES "NORMALES" Ó TYPES
         5. void main(){
            CODIGO 3D
            return ;
            }
         */
        var encabezado = "#include <stdio.h> \n#include <math.h> \ndouble heap[16384]; \ndouble stack[16394]; \ndouble p; \ndouble h;\n";
        var listatemporales = "double ";
        for (var i = 0; i <= this.temporales; i++) {
            if (i == this.temporales) {
                listatemporales += "t" + i + "; \n";
            }
            else {
                listatemporales += "t" + i + ",";
            }
        }
        var c3d = this.codigo.join('\n');
        var codigofinal = encabezado + listatemporales + c3d;
        return codigofinal;
    };
    //***********************METODOS PARA TEMPORALES Y ETIQUETAS  ***************** */
    generacion.prototype.generarTemporal = function () {
        var temporal = 't' + this.temporales++;
        this.setTemporales.add(temporal);
        return temporal;
    };
    generacion.prototype.generarEtiqueta = function () {
        return 'L' + this.etiquetas++;
    };
    generacion.prototype.sacarTemporal = function (temporal) {
        var temp = this.setTemporales.has(temporal);
        if (temp) {
            this.setTemporales["delete"](temporal);
        }
    };
    generacion.prototype.getStoreTemporales = function () {
        return this.setTemporales;
    };
    generacion.prototype.limpiarStoreTemporales = function () {
        this.setTemporales.clear();
    };
    generacion.prototype.restaurarTemporales = function (storeTemporales) {
        this.setTemporales = storeTemporales;
    };
    //*****************METODOS PARA AGREGAR CODIGO 3D*************************/
    generacion.prototype.agregarcodigo3d = function (codigo) {
        this.codigo.push(codigo);
    };
    generacion.prototype.agregarExpresion = function (variable, valorizquierdo, operador, valorderecho) {
        this.codigo.push(variable + "=" + valorizquierdo + operador + valorderecho + ";");
    };
    generacion.prototype.stack = function (pos, valor) {
        this.codigo.push("stack[(int)" + pos + "]=" + valor + ";");
    };
    generacion.prototype.heap = function (pos, valor) {
        this.codigo.push("heap[(int)" + pos + "]=" + valor + ";");
    };
    generacion.prototype.getValorStack = function (tmp_guardar, pos_stack) {
        this.codigo.push(tmp_guardar + "=" + "stack[(int)" + pos_stack + "];");
    };
    generacion.prototype.printf = function (formato, casteo, valor) {
        this.codigo.push("printf(\"%" + formato + "\\" + "n" + "\",(" + casteo + ")" + valor + ");");
    };
    generacion.prototype.agregarIf = function (valorizquierdo, operador, valorderecho, etiquetaVerdadera) {
        this.codigo.push("if(" + valorizquierdo + operador + valorderecho + ") goto " + etiquetaVerdadera + ";");
    };
    generacion.prototype.agregarGoTo = function (etiqueta) {
        this.codigo.push("goto " + etiqueta + ";");
    };
    generacion.prototype.agregarEtiqueta = function (etiqueta) {
        this.codigo.push(etiqueta + ":");
    };
    generacion.prototype.agregarComentarios = function (comentario) {
        this.codigo.push("/*" + comentario + "*/");
    };
    //*******************METODOS PARA EL MANEJO DEL HEAP Y STACK**************/
    generacion.prototype.siguienteHeap = function () {
        this.codigo.push('h=h+1;');
    };
    return generacion;
}());
exports.generacion = generacion;

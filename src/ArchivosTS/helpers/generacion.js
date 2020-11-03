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
        var encabezado = "#include <stdio.h> \n#include <math.h> \ndouble heap[132000]; \ndouble stack[132000]; \ndouble p; \ndouble h;\n";
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
    generacion.prototype.agregarTemporal = function (temporal) {
        if (!this.setTemporales.has(temporal)) {
            this.setTemporales.add(temporal);
        }
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
    generacion.prototype.guardarTemporales = function (ambito) {
        var _this = this;
        if (this.setTemporales.size > 0) {
            //INICIA EL GUARDADO DE TEMPORALES
            //SI EL STORE DE TEMPORALES ES MAYOR A 0, ENTONCES VAMOS A GUARDAR ESOS TEMPORALES
            /*console.log("ENTRE AL GUARDADO DE TEMPORALES: ")
            console.log("TEMPORALES EN LA STORE");
            console.log(this.setTemporales);*/
            var temp_guardado_1 = this.generarTemporal();
            this.sacarTemporal(temp_guardado_1);
            var contador_1 = 0;
            this.agregarComentarios("INICIO- GUARDADO DE TEMPORALES");
            this.agregarExpresion(temp_guardado_1, "p", "+", ambito.tamaño);
            this.setTemporales.forEach(function (temporal) {
                contador_1++;
                _this.stack(temp_guardado_1, temporal);
                if (contador_1 != _this.setTemporales.size) {
                    _this.agregarExpresion(temp_guardado_1, temp_guardado_1, "+", "1");
                }
            });
            this.agregarComentarios("FIN- GUARDADO DE TEMPORALES");
            //AHORA HAY QUE CAMBIARLE EL TAMAÑO AL AMBITO ACTUAL 
            var tamaño_anterior = ambito.tamaño;
            ambito.tamaño = tamaño_anterior + this.setTemporales.size;
            return tamaño_anterior;
        }
        var tam_temporal = ambito.tamaño;
        ambito.tamaño = tam_temporal + this.setTemporales.size;
        return tam_temporal;
    };
    generacion.prototype.recuperarTemporales = function (ambito, posinicio) {
        var _this = this;
        if (this.setTemporales.size > 0) {
            //INICIA EL RECUPERADO DE TEMPORALES
            /*console.log("ENTRE AL RECUPERADO DE TEMPORALES: ")
            console.log("TEMPORALES EN LA STORE");
            console.log(this.setTemporales);*/
            var tmp_1 = this.generarTemporal();
            this.sacarTemporal(tmp_1);
            var contador_2 = 0;
            this.agregarComentarios("INICIO - RECUPERACION TEMPORALES");
            this.agregarExpresion(tmp_1, "p", "+", posinicio);
            this.setTemporales.forEach(function (temporal) {
                contador_2++;
                _this.getValorStack(temporal, tmp_1);
                if (contador_2 != _this.setTemporales.size) {
                    _this.agregarExpresion(tmp_1, tmp_1, "+", "1");
                }
            });
            this.agregarComentarios("FIN - RECUPERACION TEMPORALES");
            //AQUI ES NECESARIO VOLVER A CAMBIAR EL SIZE DEL AMBIENTE POR QUE YA SE ASIGNARON LOS VALORES GUARDADOS
            ambito.tamaño = posinicio;
        }
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
    generacion.prototype.moverAmbito = function (espacios) {
        this.codigo.push("p = p + " + espacios + ";");
    };
    generacion.prototype.regresarAmbito = function (espacios) {
        this.codigo.push("p = p - " + espacios + ";");
    };
    return generacion;
}());
exports.generacion = generacion;

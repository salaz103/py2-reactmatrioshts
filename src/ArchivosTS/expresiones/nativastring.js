"use strict";
exports.__esModule = true;
var tipo_1 = require("../entorno/tipo");
var generacion_1 = require("../helpers/generacion");
var traduccionexp_1 = require("./traduccionexp");
var app_1 = require("../../../src/app");
var ts_js_1 = require("../../actions/ts.js");
var nativastring = /** @class */ (function () {
    function nativastring(id, metodos, linea, columna) {
        this.id_string = id;
        this.metodos = metodos;
        this.linea = linea;
        this.columna = columna;
    }
    nativastring.prototype.traducir = function (ambito) {
        var generador = generacion_1.generacion.getGenerador();
        //PRIMERO TRADUCIR LA CADENA O IDENTIFICADOR
        var retorno_id = this.id_string.traducir(ambito);
        var tmp = generador.generarTemporal();
        generador.sacarTemporal(tmp);
        if (retorno_id.tipodato == tipo_1.tipo_dato.STRING && retorno_id.dimensiones == 0) {
            var retorno_final = new traduccionexp_1.traduccionexp("", true, tipo_1.tipo_dato.STRING, false);
            var tmp_resultado = generador.generarTemporal();
            generador.sacarTemporal(tmp_resultado);
            //INICIA LA MAGIA
            //REVISAMOS SOLO LA PRIMERA POSICION, YA QUE COMO MINIMO DEBE VENIR UNO
            switch (this.metodos[0].metodo) {
                case tipo_1.tipo_metodo.CHARAT:
                    generador.agregarExpresion(tmp, "p", "+", ambito.tamaño + 1);
                    generador.stack(tmp, retorno_id.obtenerValor());
                    //TRADUCIMOS EL INDICE
                    var retorno_indice = this.metodos[0].exp.traducir(ambito);
                    generador.agregarExpresion(tmp, tmp, "+", "1");
                    generador.stack(tmp, retorno_indice.obtenerValor());
                    generador.moverAmbito(ambito.tamaño);
                    generador.agregarcodigo3d("caracter_cadena();");
                    generador.getValorStack(tmp_resultado, "p");
                    generador.regresarAmbito(ambito.tamaño);
                    retorno_final.valor = tmp_resultado;
                    break;
                case tipo_1.tipo_metodo.CONCAT:
                    generador.agregarExpresion(tmp, "p", "+", ambito.tamaño + 1);
                    generador.stack(tmp, retorno_id.obtenerValor());
                    var retorno_expresion = this.metodos[0].exp.traducir(ambito);
                    generador.agregarExpresion(tmp, tmp, "+", "1");
                    generador.stack(tmp, retorno_expresion.obtenerValor());
                    generador.moverAmbito(ambito.tamaño);
                    generador.agregarcodigo3d("concatenacion();");
                    generador.getValorStack(tmp_resultado, "p");
                    generador.regresarAmbito(ambito.tamaño);
                    retorno_final.valor = tmp_resultado;
                    break;
                case tipo_1.tipo_metodo.LENGTH:
                    generador.agregarExpresion(tmp, "p", "+", ambito.tamaño + 1);
                    generador.stack(tmp, retorno_id.obtenerValor());
                    generador.moverAmbito(ambito.tamaño);
                    generador.agregarcodigo3d("largo_cadena();");
                    generador.getValorStack(tmp_resultado, "p");
                    generador.regresarAmbito(ambito.tamaño);
                    retorno_final.tipodato = tipo_1.tipo_dato.ENTERO;
                    retorno_final.valor = tmp_resultado;
                    return retorno_final;
                case tipo_1.tipo_metodo.TOLOWERCASE:
                    generador.agregarExpresion(tmp, "p", "+", ambito.tamaño + 1);
                    generador.stack(tmp, retorno_id.obtenerValor());
                    generador.moverAmbito(ambito.tamaño);
                    generador.agregarcodigo3d("minusculas();");
                    generador.getValorStack(tmp_resultado, "p");
                    generador.regresarAmbito(ambito.tamaño);
                    retorno_final.valor = tmp_resultado;
                    break;
                case tipo_1.tipo_metodo.TOUPPERCASE:
                    generador.agregarExpresion(tmp, "p", "+", ambito.tamaño + 1);
                    generador.stack(tmp, retorno_id.obtenerValor());
                    generador.moverAmbito(ambito.tamaño);
                    generador.agregarcodigo3d("mayusculas();");
                    generador.getValorStack(tmp_resultado, "p");
                    generador.regresarAmbito(ambito.tamaño);
                    retorno_final.valor = tmp_resultado;
                    break;
                default:
                    break;
            }
            //EL RECORRIDO COMIENZA EN EL METODO 1, YA QUE EL 0 FUE EL PRIMER LEÍDO
            //AQUI YA REALICE EL PRIMER METODO, 
            //EL RESULTADO ESTA EN RETORNO_FINAL.VALOR
            for (var i = 1; i < this.metodos.length; i++) {
                if (this.metodos[i].metodo == tipo_1.tipo_metodo.CHARAT) {
                    generador.agregarExpresion(tmp, "p", "+", ambito.tamaño + 1);
                    generador.stack(tmp, retorno_final.obtenerValor());
                    var retorno_indice = this.metodos[i].exp.traducir(ambito);
                    generador.agregarExpresion(tmp, tmp, "+", "1");
                    generador.stack(tmp, retorno_indice.obtenerValor());
                    generador.moverAmbito(ambito.tamaño);
                    generador.agregarcodigo3d("caracter_cadena();");
                    generador.getValorStack(tmp_resultado, "p");
                    generador.regresarAmbito(ambito.tamaño);
                    retorno_final.valor = tmp_resultado;
                }
                else if (this.metodos[i].metodo == tipo_1.tipo_metodo.CONCAT) {
                    generador.agregarExpresion(tmp, "p", "+", ambito.tamaño + 1);
                    generador.stack(tmp, retorno_final.obtenerValor());
                    var retorno_ex = this.metodos[i].exp.traducir(ambito);
                    generador.agregarExpresion(tmp, tmp, "+", "1");
                    generador.stack(tmp, retorno_ex.obtenerValor());
                    generador.moverAmbito(ambito.tamaño);
                    generador.agregarcodigo3d("concatenacion();");
                    generador.getValorStack(tmp_resultado, "p");
                    generador.regresarAmbito(ambito.tamaño);
                    retorno_final.valor = tmp_resultado;
                }
                else if (this.metodos[i].metodo == tipo_1.tipo_metodo.LENGTH) {
                    generador.agregarExpresion(tmp, "p", "+", ambito.tamaño + 1);
                    generador.stack(tmp, retorno_final.obtenerValor());
                    generador.moverAmbito(ambito.tamaño);
                    generador.agregarcodigo3d("largo_cadena();");
                    generador.getValorStack(tmp_resultado, "p");
                    generador.regresarAmbito(ambito.tamaño);
                    retorno_final.tipodato = tipo_1.tipo_dato.ENTERO;
                    retorno_final.valor = tmp_resultado;
                    return retorno_final;
                }
                else if (this.metodos[i].metodo == tipo_1.tipo_metodo.TOLOWERCASE) {
                    generador.agregarExpresion(tmp, "p", "+", ambito.tamaño + 1);
                    generador.stack(tmp, retorno_final.obtenerValor());
                    generador.moverAmbito(ambito.tamaño);
                    generador.agregarcodigo3d("minusculas();");
                    generador.getValorStack(tmp_resultado, "p");
                    generador.regresarAmbito(ambito.tamaño);
                    retorno_final.valor = tmp_resultado;
                }
                else if (this.metodos[i].metodo == tipo_1.tipo_metodo.TOUPPERCASE) {
                    generador.agregarExpresion(tmp, "p", "+", ambito.tamaño + 1);
                    generador.stack(tmp, retorno_final.obtenerValor());
                    generador.moverAmbito(ambito.tamaño);
                    generador.agregarcodigo3d("mayusculas();");
                    generador.getValorStack(tmp_resultado, "p");
                    generador.regresarAmbito(ambito.tamaño);
                    retorno_final.valor = tmp_resultado;
                }
            }
            return retorno_final;
        }
        else if (retorno_id.dimensiones > 0) {
            //SIGNIFICA QUE ES UN ARREGLO Y EL LARGO ESTA GUARDADO EN LA PRIMERA POSICION
            //ES DECIR EN EL STACK QUE TIENE EL INICIO DEL ARREGLO EN EL HEAP
            var largo_arreglo = generador.generarTemporal();
            generador.getValorHeap(largo_arreglo, retorno_id.obtenerValor());
            return new traduccionexp_1.traduccionexp(largo_arreglo, true, tipo_1.tipo_dato.ENTERO, false, null, retorno_id.dimensiones);
        }
        else {
            app_1.almacen.dispatch(ts_js_1.errores({
                tipo: 'SEMANTICO',
                descripcion: "NATIVAS, NO SON APLICABLES A :" + retorno_id.tipodato,
                ambito: ambito.nombre,
                linea: this.linea,
                columna: this.columna
            }));
            return new traduccionexp_1.traduccionexp("", false, tipo_1.tipo_dato.UNDEFINED, false);
        }
    };
    return nativastring;
}());
exports.nativastring = nativastring;

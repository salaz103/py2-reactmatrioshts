"use strict";
exports.__esModule = true;
var tipo_1 = require("../entorno/tipo");
var app_1 = require("../../../src/app");
var ts_js_1 = require("../../actions/ts.js");
var generacion_1 = require("../helpers/generacion");
var traduccionexp_1 = require("../expresiones/traduccionexp");
var llamarfuncion = /** @class */ (function () {
    function llamarfuncion(nombre, parametros, linea, columna) {
        this.nombrefuncion = nombre;
        this.parametros = parametros;
        this.linea = linea;
        this.columna = columna;
    }
    llamarfuncion.prototype.traducir = function (ambito) {
        var generador = generacion_1.generacion.getGenerador();
        //CUANDO SE LLAMA A UNA FUNCION, LO PRIMERO ES VERIFICAR SI EXISTE DICHA FUNCION
        var funcion = ambito.existeFuncion(this.nombrefuncion.toLowerCase());
        if (funcion) {
            var parametros_1 = new Array();
            var tamaño_ambito_temporal = generador.guardarTemporales(ambito);
            this.parametros.forEach(function (parametro) {
                var retorno_parametro = parametro.traducir(ambito);
                parametros_1.push(retorno_parametro);
            });
            var temp_parametro_1 = generador.generarTemporal();
            generador.sacarTemporal(temp_parametro_1);
            //COMENZAMOS A GUARDAR LOS PARAMETROS PARA QUE YA SOLO LOS LEAMOS CUANDO ESTEMOS EN LA FUNCION
            //COMIENZA EL PASO DE PARAMETROS A LA FUNCION
            if (parametros_1.length > 0) {
                generador.agregarComentarios("Paso de parametros");
                generador.agregarExpresion(temp_parametro_1, "p", "+", ambito.tamaño + 1);
                parametros_1.forEach(function (parametro, indice) {
                    generador.stack(temp_parametro_1, parametro.obtenerValor());
                    //VAMOS A UTILIZAR EL MISMO TEMPORAL SI HAY MÁS PARAMETROS QUE PASAR 
                    if (indice != parametros_1.length - 1) {
                        generador.agregarExpresion(temp_parametro_1, temp_parametro_1, "+", "1");
                    }
                });
            }
            //AHORA MOVEMOS EL PUNTERO DEL STACK "P" AL INICIO DEL NUEVO AMBITO
            generador.moverAmbito(ambito.tamaño);
            generador.agregarComentarios("LLAMADA A FUNCION");
            generador.agregarcodigo3d(this.nombrefuncion + "();");
            //AHORA OBTENEMOS EL VALOR DEL RETURN
            generador.getValorStack(temp_parametro_1, "p");
            //Y NOS TENEMOS QUE REGRESAR AL AMBITO ANTERIOR
            generador.regresarAmbito(ambito.tamaño);
            //RECUPERAMOS LOS TEMPORALES SI FUERA NECESARIO
            generador.recuperarTemporales(ambito, tamaño_ambito_temporal);
            //VOLVEMOS A AGREGAR AL TEMP_PARAMETRO AL STORE DE TEMPORALES POR QUE ESE TIENE EL VALOR DEL RETURN
            //generador.agregarTemporal(temp_parametro);
            if (funcion.tipodato == tipo_1.tipo_dato.BOOLEAN) {
            }
            else {
                var ret = new traduccionexp_1.traduccionexp(temp_parametro_1, true, tipo_1.tipo_dato.UNDEFINED, false);
                if (funcion.tipodato == tipo_1.tipo_dato.NUMBER) {
                    ret.tipodato = tipo_1.tipo_dato.DECIMAL;
                    return ret;
                }
                else {
                    ret.tipodato = funcion.tipodato;
                    return ret;
                }
            }
        }
        else {
            //ERROR - LA FUNCION NO EXISTE
            app_1.almacen.dispatch(ts_js_1.errores({
                tipo: 'SEMANTICO',
                descripcion: 'FUNCION: ' + this.nombrefuncion + ' NO EXISTE',
                ambito: ambito.nombre,
                linea: this.linea,
                columna: this.columna
            }));
            //PENDIENTE RETURN
            //RETURN NEW TRADUCCIONEXP(UNDEFINED)
        }
    };
    return llamarfuncion;
}());
exports.llamarfuncion = llamarfuncion;

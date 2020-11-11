"use strict";
exports.__esModule = true;
var generacion_1 = require("../helpers/generacion");
var app_1 = require("../../../src/app");
var ts_js_1 = require("../../actions/ts.js");
var tipo_1 = require("../entorno/tipo");
var asignacion = /** @class */ (function () {
    function asignacion(id, ex, linea, columna) {
        this.id = id;
        this.expresion = ex;
        this.linea = linea;
        this.columna = columna;
    }
    asignacion.prototype.traducir = function (ambito) {
        var generador = generacion_1.generacion.getGenerador();
        //1. BUSCAR EL SIMBOLO, PARA VER SI EXISTE O NO
        var sim;
        if (ambito.existe(this.id)) {
            sim = ambito.getSimbolo(this.id);
        }
        //PREGUNTAMOS SI EXISTE EL ID, PARA TIRAR ERROR O NO
        if (sim) {
            //TOCA PREGUNTAR SI ES LET O NO, YA QUE SI ES CONST, NO SE PUEDE REASIGNAR
            if (sim.reasignable == true) {
                //SI ES REASIGNABLE ENTONCES YA PODEMOS INICIAR LA TRADUCCION PARA COLOCAR NUEVO VALOR
                generador.agregarComentarios("INICIO- ASIGNACION");
                var retorno_expresion = this.expresion.traducir(ambito);
                console.log(retorno_expresion);
                //AHORA YA ESTA TRADUCIDA LA EXPRESION, TOCAR HACER OTRA VALIDACION, VER QUE SEAN
                //DEL MISMO TIPO
                if ((sim.getTipo() == tipo_1.tipo_dato.DECIMAL || sim.getTipo() == tipo_1.tipo_dato.ENTERO)
                    && (retorno_expresion.tipodato == tipo_1.tipo_dato.DECIMAL || retorno_expresion.tipodato == tipo_1.tipo_dato.ENTERO)) {
                    //TOCA PREGUNTAR SI ES GLOBAL O NO
                    if (sim.esGlobal) {
                        sim.tipodato = retorno_expresion.tipodato == tipo_1.tipo_dato.ENTERO ? tipo_1.tipo_dato.ENTERO : tipo_1.tipo_dato.DECIMAL;
                        generador.stack(sim.direccionrelativa, retorno_expresion.obtenerValor());
                    }
                    else {
                        var acceso = generador.generarTemporal();
                        generador.sacarTemporal(acceso);
                        generador.agregarExpresion(acceso, "p", "+", sim.direccionrelativa);
                        sim.tipodato = retorno_expresion.tipodato == tipo_1.tipo_dato.ENTERO ? tipo_1.tipo_dato.ENTERO : tipo_1.tipo_dato.DECIMAL;
                        generador.stack(acceso, retorno_expresion.obtenerValor());
                    }
                }
                else if (sim.getTipo() == retorno_expresion.tipodato) {
                    //SI ENTRA ACA, ES POR QUE PUEDE QUE SEA UN BOOLEAN O UN STRING
                    if (sim.getTipo() == tipo_1.tipo_dato.BOOLEAN) {
                        //SIGNIFICA QUE ES UN BOOLEAN Y DE IGUAL FORMA DEBO PREGUNTAR SI ES GLOBAL O NO
                        if (sim.esGlobal) {
                            var nuevo_valor = generador.generarTemporal();
                            var etiqueta_salida = generador.generarEtiqueta();
                            generador.sacarTemporal(nuevo_valor);
                            generador.agregarEtiqueta(retorno_expresion.etiquetastrue);
                            generador.agregarExpresion(nuevo_valor, "1", "", "");
                            generador.agregarGoTo(etiqueta_salida);
                            generador.agregarEtiqueta(retorno_expresion.etiquetasfalse);
                            generador.agregarExpresion(nuevo_valor, "0", "", "");
                            generador.agregarEtiqueta(etiqueta_salida);
                            generador.stack(sim.direccionrelativa, nuevo_valor);
                        }
                        else {
                            //SI ES LOCAL, TOCA MOVER EL PUNTERO
                            var acceso = generador.generarTemporal();
                            generador.sacarTemporal(acceso);
                            generador.agregarExpresion(acceso, "p", "+", sim.direccionrelativa);
                            var nuevo_valor = generador.generarTemporal();
                            var etiqueta_salida = generador.generarEtiqueta();
                            generador.sacarTemporal(nuevo_valor);
                            generador.agregarEtiqueta(retorno_expresion.etiquetastrue);
                            generador.agregarExpresion(nuevo_valor, "1", "", "");
                            generador.agregarGoTo(etiqueta_salida);
                            generador.agregarEtiqueta(retorno_expresion.etiquetasfalse);
                            generador.agregarExpresion(nuevo_valor, "0", "", "");
                            generador.agregarEtiqueta(etiqueta_salida);
                            generador.stack(acceso, nuevo_valor);
                        }
                    }
                    else {
                        //SIGNIFICA QUE ES STRING PERO AQUI HAY QUE PREGUNTAR SI ES GLOBAL O NO
                        if (sim.esGlobal) {
                            generador.stack(sim.direccionrelativa, retorno_expresion.obtenerValor());
                        }
                        else {
                            var acceso = generador.generarTemporal();
                            generador.sacarTemporal(acceso);
                            generador.agregarExpresion(acceso, "p", "+", sim.direccionrelativa);
                            generador.stack(acceso, retorno_expresion.obtenerValor());
                        }
                    }
                }
                else {
                    app_1.almacen.dispatch(ts_js_1.errores({
                        tipo: 'SEMANTICO',
                        descripcion: 'VARIABLE: ' + this.id + ' CON TIPO DATO: ' + sim.getTipo() + ' NO ES COMPATIBLE CON: ' + retorno_expresion.tipodato,
                        ambito: ambito.nombre,
                        linea: this.linea,
                        columna: this.columna
                    }));
                }
            }
            else {
                app_1.almacen.dispatch(ts_js_1.errores({
                    tipo: 'SEMANTICO',
                    descripcion: 'VARIABLE CONST ' + this.id + ' NO ES REASIGNABLE',
                    ambito: ambito.nombre,
                    linea: this.linea,
                    columna: this.columna
                }));
            }
        }
        else {
            app_1.almacen.dispatch(ts_js_1.errores({
                tipo: 'SEMANTICO',
                descripcion: 'VARIABLE ' + this.id + ' NO PUEDE SER ASIGNADA POR QUE NO EXISTE',
                ambito: ambito.nombre,
                linea: this.linea,
                columna: this.columna
            }));
        }
    };
    return asignacion;
}());
exports.asignacion = asignacion;

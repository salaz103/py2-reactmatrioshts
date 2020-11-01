"use strict";
exports.__esModule = true;
var tipo_1 = require("../entorno/tipo");
var app_1 = require("../../../src/app");
var ts_js_1 = require("../../actions/ts.js");
var variable_1 = require("../expresiones/variable");
var generacion_1 = require("../helpers/generacion");
var declaracion = /** @class */ (function () {
    function declaracion(tipov, vars) {
        this.tipovariable = tipov;
        this.variables = vars;
    }
    declaracion.prototype.traducir = function (ambito) {
        var generador = generacion_1.generacion.getGenerador();
        //1. Recorrer el arreglo de variables
        //2. Revisar si la variable ya existe SOLO EN ESTE AMBITO, YA SEA NUEVO O GLOBAL
        for (var i = 0; i < this.variables.length; i++) {
            if (ambito.existeLocal(this.variables[i].id)) {
                //SI EXISTE LOCALMENTE ENTONCES NO LA PODEMOS DECLARAR
                app_1.almacen.dispatch(ts_js_1.errores({
                    tipo: 'SEMANTICO',
                    descripcion: 'IDENTIFICADOR ' + this.variables[i].id + ' YA EXISTE EN AMBITO ' + ambito.nombre,
                    ambito: ambito.nombre,
                    linea: this.variables[i].linea,
                    columna: this.variables[i].columna
                }));
                console.log("ERROR- ID: " + this.variables[i].id + " YA EXISTE EN ESTE AMBITO " + ambito.nombre);
            }
            else {
                //SI NO EXISTE, ENTONCES PODEMOS TRADUCIR Y GUARDAR LA NUEVA VARIABLE
                //PERO TENEMOS 2 TIPOS DE VARIABLES
                //CONST Y LET, ENTONCES LO PRIMERO ES VER QUE TIPO DE VARIABLE ES
                if (this.tipovariable == tipo_1.tipo_variable.LET) {
                    //SI ENTRO AQUI ES POR QUE ES UNA VARIABLE LET
                    if (this.variables[i] instanceof variable_1.variable) {
                        //SIGNIFICA QUE ES UNA VARIABLE LET PLANA
                        //HAY 2 TIPOS:
                        //1. ID:TIPODATO= EXPRESION
                        //2. ID:TIPODATO
                        if (this.variables[i].exp != null) {
                            //SIGNIFICA QUE LA VARIABLE LET TRAE UNA EXPRESION
                            var retornoexpresion = this.variables[i].exp.traducir(ambito);
                            //VALIDAMOS QUE EL TIPO DE DATO ENTRANTE ES SIMILAR A LA DE LA EXPRESION
                            if (this.variables[i].tipodato == tipo_1.tipo_dato.NUMBER) {
                                if (retornoexpresion.tipodato == tipo_1.tipo_dato.ENTERO || retornoexpresion.tipodato == tipo_1.tipo_dato.DECIMAL) {
                                    var nuevosim = ambito.agregarSimbolo(this.variables[i].id, retornoexpresion.tipodato, ambito.nombre, this.variables[i].linea, this.variables[i].columna, true);
                                    var tmp = generador.generarTemporal();
                                    generador.sacarTemporal(tmp);
                                    generador.agregarExpresion(tmp, "p", "+", nuevosim.direccionrelativa);
                                    generador.stack(tmp, retornoexpresion.obtenerValor());
                                }
                                else {
                                    app_1.almacen.dispatch(ts_js_1.errores({
                                        tipo: 'SEMANTICO',
                                        descripcion: 'VARIABLE ' + this.variables[i].id + ' NO ES COMPATIBLE CON ' + retornoexpresion.tipodato,
                                        ambito: ambito.nombre,
                                        linea: this.variables[i].linea,
                                        columna: this.variables[i].columna
                                    }));
                                }
                            }
                            else if (this.variables[i].tipodato == retornoexpresion.tipodato) {
                                //SI SON IGUALES ENTONCES GUARDAMOS LA VARIABLE EN LA TS Y COMIENZA 
                                //LA TRADUCCION
                                var nuevosim = ambito.agregarSimbolo(this.variables[i].id, retornoexpresion.tipodato, ambito.nombre, this.variables[i].linea, this.variables[i].columna, true);
                                if (nuevosim.tipodato == tipo_1.tipo_dato.BOOLEAN) {
                                    var tmp_guardado = generador.generarTemporal();
                                    generador.sacarTemporal(tmp_guardado);
                                    var etiqueta_salida = generador.generarEtiqueta();
                                    generador.agregarEtiqueta(retornoexpresion.etiquetastrue);
                                    generador.agregarExpresion(tmp_guardado, "1", "", "");
                                    generador.agregarGoTo(etiqueta_salida);
                                    generador.agregarEtiqueta(retornoexpresion.etiquetasfalse);
                                    generador.agregarExpresion(tmp_guardado, "0", "", "");
                                    generador.agregarEtiqueta(etiqueta_salida);
                                    var tmp = generador.generarTemporal();
                                    generador.sacarTemporal(tmp);
                                    generador.agregarExpresion(tmp, "p", "+", nuevosim.direccionrelativa);
                                    generador.stack(tmp, tmp_guardado);
                                }
                                else {
                                    var tmp = generador.generarTemporal();
                                    generador.sacarTemporal(tmp);
                                    generador.agregarExpresion(tmp, "p", "+", nuevosim.direccionrelativa);
                                    generador.stack(tmp, retornoexpresion.obtenerValor());
                                }
                            }
                            else {
                                //ERROR - SEMANTICO - TIPO DATO VARIABLE NO COMPATIBLE CON TIPO DATO DE EXPRESION
                                app_1.almacen.dispatch(ts_js_1.errores({
                                    tipo: 'SEMANTICO',
                                    descripcion: 'VARIABLE ' + this.variables[i].id + ' NO ES COMPATIBLE CON ' + retornoexpresion.tipodato,
                                    ambito: ambito.nombre,
                                    linea: this.variables[i].linea,
                                    columna: this.variables[i].columna
                                }));
                            }
                        }
                        else {
                            //SIGNIFICA QUE LA VARIABLE LET NO TRAE EXPRESION, SE DEBE RESERVAR EL ESPACIO Y PONER VALORES POR DEFECTO
                            /**
                             NUMBER-> 0
                             BOOLEAN-> FALSE
                             STRING-> NULL
                             TYPE-> NULL
                             ARRAY-> NULL
                             */
                        }
                    }
                    else {
                        //SIGNIFICA QUE ES UN ARREGLO, YA TENDRIA QUE VER YO AQUI OTRAS COSAS
                    }
                }
                else if (this.tipovariable == tipo_1.tipo_variable.CONST) {
                    //SI ENTRO AQUI ES POR QUE ES UNA VARIABLE CONST
                }
            } //FINALIZACION DE GUARDAR VARIABLE
        } //FINALIZACION DEL FOR DE RECORRIDO DE VARIABLES
    };
    return declaracion;
}());
exports.declaracion = declaracion;

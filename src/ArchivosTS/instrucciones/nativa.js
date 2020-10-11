"use strict";
exports.__esModule = true;
var tipo_1 = require("../entorno/tipo");
var app_1 = require("../../../src/app");
var ts_js_1 = require("../../actions/ts.js");
var nativa = /** @class */ (function () {
    function nativa(nombre, i, lista) {
        this.id = nombre;
        this.instruccion = i;
        this.listaexpresiones = lista;
    }
    nativa.prototype.ejecutar = function (ambito) {
        //LO PRIMERO ES VER SI DICHO ARREGLO, EXISTE
        if (ambito.existe(this.id)) {
            //SI EXISTE AHORA HAY QUE VER SI ES UN ARRAY
            var arreglo = ambito.getSimbolo(this.id);
            if (Array.isArray(arreglo.valor)) {
                //SI ES UN ARREGLO ENTONCE SI SE LE PUEDEN APLICAR LAS FUNCIONES
                //LUEGO EVALUAR QUE TIPO DE INSTRUCION ES
                if (this.instruccion == tipo_1.tipo_instruccion.PUSH) {
                    //SI EL TIPO DE DATO ES ANY, SOLO LOS AGREGO
                    if (arreglo.tipovalor == tipo_1.tipo_valor.ANY) {
                        for (var i = 0; i < this.listaexpresiones.length; i++) {
                            arreglo.valor.push(this.listaexpresiones[i]);
                        }
                        //REGRESO EL NUEVO LENGTH 
                        return new Number(arreglo.valor.length);
                    }
                    else {
                        //SI EL TIPO DE DATO NO ES ANY, HAY QUE REVISAR QUE TODOS LOS TIPO
                        //DE DATO ENTRANTES SEAN IGUALES PARA IGUALARLO CON EL DEL ARREGLO
                        var tipo = arreglo.tipovalor;
                        var iguales = true;
                        for (var i = 0; i < this.listaexpresiones.length; i++) {
                            if (this.listaexpresiones[i].obtenerTipo(ambito) == tipo) {
                                iguales = true;
                            }
                            else {
                                iguales = false;
                                break;
                            }
                        }
                        if (iguales) {
                            //SI SON IGUALES ENTONCES YA LOS GUARDO
                            for (var a = 0; a < this.listaexpresiones.length; a++) {
                                arreglo.valor.push(this.listaexpresiones[a]);
                            }
                            //DEVULEVO EL NUEVO LENGTH
                            this.tipo = tipo_1.tipo_valor.NUMBER;
                            return new Number(arreglo.valor.length);
                        }
                        else {
                            //ERROR, LOS VALORES QUE QUIERE INGRESAR NO SON DEL MISMO TIPO QUE EL ARREGLO
                            app_1.almacen.dispatch(ts_js_1.errores({
                                tipo: 'SEMANTICO',
                                descripcion: 'ARREGLO ' + arreglo.id + ' ES DE OTRO TIPO, NO SE GUARDARAN VALORES',
                                ambito: ambito.nombre
                            }));
                        }
                    }
                }
                else if (this.instruccion == tipo_1.tipo_instruccion.POP) {
                    if (arreglo.valor.length == 0) {
                        return undefined;
                    }
                    var a = arreglo.valor.pop();
                    var valor = a.obtenerValor(ambito);
                    var tipo = a.obtenerTipo(ambito);
                    this.tipo = tipo;
                    return valor;
                }
                else if (this.instruccion == tipo_1.tipo_instruccion.LENGTH) {
                    this.tipo = tipo_1.tipo_valor.NUMBER;
                    return new Number(arreglo.valor.length);
                }
            }
        }
        else {
            //ERROR - VARIABLE this.id NO EXISTE
            app_1.almacen.dispatch(ts_js_1.errores({
                tipo: 'SEMANTICO',
                descripcion: this.id + ' NO EXISTE, NO SE HARA PUSH',
                ambito: ambito.nombre
            }));
        }
        return null;
    };
    nativa.prototype.obtenerValor = function (ambito) {
        return this.ejecutar(ambito);
    };
    nativa.prototype.obtenerTipo = function (ambito) {
        return this.tipo;
    };
    return nativa;
}());
exports.nativa = nativa;

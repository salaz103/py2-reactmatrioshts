"use strict";
exports.__esModule = true;
var tipo_1 = require("../entorno/tipo");
var app_1 = require("../../../src/app");
var ts_js_1 = require("../../actions/ts.js");
var helpers_1 = require("../helpers/helpers");
var ts_js_2 = require("../../actions/ts.js");
var variable_1 = require("../expresiones/variable");
var simbolo_1 = require("../entorno/simbolo");
var declaracion = /** @class */ (function () {
    function declaracion(tipov, vars) {
        this.tipovariable = tipov;
        this.variables = vars;
    }
    declaracion.prototype.traducir = function (ambito) {
        //console.log("TRADUCCION DE DECLARACION");
        //console.log(almacen.getState().storecodigo.contadortemporales);
        // let tmp= generartmp();
        // let lista= listaTemporales();
        // console.log(tmp);
        // console.log(lista);
        //1. Recorrer el arreglo de variables
        //2. Revisar si la variable ya existe SOLO EN ESTE AMBITO, YA SEA NUEVO O GLOBAL
        for (var i = 0; i < this.variables.length; i++) {
            if (ambito.existeLocal(this.variables[i].id)) {
                //SI EXISTE LOCALMENTE ENTONCES NO LA PODEMOS DECLARAR
                app_1.almacen.dispatch(ts_js_2.errores({
                    tipo: 'SEMANTICO',
                    descripcion: 'IDENTIFICADOR ' + this.variables[i].id + ' YA EXISTE EN AMBITO ' + ambito.nombre,
                    ambito: ambito.nombre
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
                            var valor = this.variables[i].exp.traducir(ambito);
                            var pos = helpers_1.getPosicionLibreHeap();
                            var tmp_intermedio = helpers_1.generartmp();
                            var c3d = tmp_intermedio + " = " + pos + ";\n";
                            c3d += "heap[(int)" + tmp_intermedio + "]= " + valor.temp + ";\n";
                            var nuevosimbolo = new simbolo_1["default"](this.variables[i].id, valor.tipovalor, ambito.nombre, tipo_1.tipo_rol.VARIABLE, this.variables[i].linea, this.variables[i].columna, pos);
                            ambito.agregarSimbolo(nuevosimbolo);
                            app_1.almacen.dispatch(ts_js_1.agregarcodigo3d(c3d));
                        }
                    }
                    else {
                        //SIGNIFICA QUE ES UN ARREGLO, YA TENDRIA QUE VER YO AQUI OTRAS COSAS
                    }
                }
                else if (this.tipovariable == tipo_1.tipo_variable.CONST) {
                    //SI ENTRO AQUI ES POR QUE ES UNA VARIABLE CONST
                }
                //PERO ANTES DE GUARDAR LA VARIABLE, TENEMOS QUE VERIFICAR
                //SI EL AMBITO ES "GLOBAL" U OTRO(LOCAL), YA QUE SI ES OTRO
                //NO TENEMOS QUE "RESERVAR ESPACIO EN EL HEAP"
                if (ambito.tipoambito = tipo_1.tipo_ambito.GLOBAL) {
                    //SI EL AMBITO ES GLOBAL ENTONCES ES EL HEAP EL QUE TENEMOS QUE UTILIZAR
                }
                else {
                    //SI EL AMBITO ES LOCAL, ES EL STACK EL QUE DEBEMOS UTILIZAR
                }
            } //FINALIZACION DE GUARDAR VARIABLE
        } //FINALIZACION DEL FOR DE RECORRIDO DE VARIABLES
    };
    return declaracion;
}());
exports.declaracion = declaracion;

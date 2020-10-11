"use strict";
exports.__esModule = true;
var tipo_1 = require("../entorno/tipo");
var app_1 = require("../../../src/app");
var ts_js_1 = require("../../actions/ts.js");
var operadorternario = /** @class */ (function () {
    function operadorternario(c, et, ef) {
        this.condicion = c;
        this.expresiontrue = et;
        this.expresionfalse = ef;
    }
    operadorternario.prototype.obtenerValor = function (ambito) {
        //LO PRIMERO ES EVALUAR LA CONDICION, PARA VALIDAR ERRORES, ESTA DEBE SER BOOLEANA 
        var valorcondicion = this.condicion.obtenerValor(ambito);
        var tipo = this.condicion.obtenerTipo(ambito);
        if (tipo == tipo_1.tipo_valor.BOOLEAN) {
            //SIGNIFICA QUE LA CONDICION SI ES BOOLEAN Y AHORA LA TENEMOS QUE VALIDAR PARA VER QUE DEVOLVEMOS
            if (valorcondicion.valueOf()) {
                //SI LA CONDICION ES TRUE, DEVOLVEMOS EL VALOR DE LA PRIMERA EXPRESION
                var valor = this.expresiontrue.obtenerValor(ambito);
                this.tipo = this.expresiontrue.obtenerTipo(ambito);
                return valor;
            }
            else {
                //SIGNIFCA QUE DEVOLVEREMOS EL VALOR DE LA SEGUNDA FUNCION
                var valor = this.expresionfalse.obtenerValor(ambito);
                this.tipo = this.expresionfalse.obtenerTipo(ambito);
                return valor;
            }
        }
        else {
            //ERROR - LA CONDICION DEBE SER BOOLEANA
            app_1.almacen.dispatch(ts_js_1.errores({
                tipo: 'SEMANTICO',
                descripcion: 'LA CONDICION EN EL OPERADOR TERNARIO NO ES BOOLEANA',
                ambito: ambito.nombre
            }));
            return null;
        }
    };
    operadorternario.prototype.obtenerTipo = function (ambito) {
        return this.tipo;
    };
    return operadorternario;
}());
exports.operadorternario = operadorternario;

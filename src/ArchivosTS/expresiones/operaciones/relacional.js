"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var tipo_1 = require("../../entorno/tipo");
var operacion_1 = require("./operacion");
var app_1 = require("../../../../src/app");
var ts_js_1 = require("../../../actions/ts.js");
var relacional = /** @class */ (function (_super) {
    __extends(relacional, _super);
    function relacional(expiz, op, expder) {
        return _super.call(this, expiz, op, expder) || this;
    }
    relacional.prototype.obtenerValor = function (ambito) {
        var valorizquierdo = this.expresionizquierda.obtenerValor(ambito);
        var valorderecha = this.expresionderecha.obtenerValor(ambito);
        /*console.log(valorizquierdo.valueOf());
        console.log(valorderecha.valueOf());*/
        var tipoiz = this.expresionizquierda.obtenerTipo(ambito);
        var tipoder = this.expresionderecha.obtenerTipo(ambito);
        //PRIMERO VEMOS SI ES >,<,>=,<=,!=,==
        if (this.tipooperador == tipo_1.operador.MAYORQUE) {
            if (tipoiz == tipo_1.tipo_valor.NUMBER && tipoder == tipo_1.tipo_valor.NUMBER) {
                var res = Number(valorizquierdo) > Number(valorderecha);
                this.tipo = tipo_1.tipo_valor.BOOLEAN;
                return new Boolean(res);
            }
            else {
                //ERROR SEMANTICO
                app_1.almacen.dispatch(ts_js_1.errores({
                    tipo: 'SEMANTICO',
                    descripcion: 'OPERADOR > NECESITA OPERANDOS NUMBER',
                    ambito: ambito.nombre
                }));
            }
        }
        else if (this.tipooperador == tipo_1.operador.MENORQUE) {
            if (tipoiz == tipo_1.tipo_valor.NUMBER && tipoder == tipo_1.tipo_valor.NUMBER) {
                var res = Number(valorizquierdo) < Number(valorderecha);
                this.tipo = tipo_1.tipo_valor.BOOLEAN;
                return new Boolean(res);
            }
            else {
                //ERROR SEMANTICO
                app_1.almacen.dispatch(ts_js_1.errores({
                    tipo: 'SEMANTICO',
                    descripcion: 'OPERADOR < NECESITA OPERANDOS NUMBER',
                    ambito: ambito.nombre
                }));
            }
        }
        else if (this.tipooperador == tipo_1.operador.MAYORIGUALQUE) {
            if (tipoiz == tipo_1.tipo_valor.NUMBER && tipoder == tipo_1.tipo_valor.NUMBER) {
                var res = Number(valorizquierdo) >= Number(valorderecha);
                this.tipo = tipo_1.tipo_valor.BOOLEAN;
                return new Boolean(res);
            }
            else {
                //ERROR SEMANTICO
                app_1.almacen.dispatch(ts_js_1.errores({
                    tipo: 'SEMANTICO',
                    descripcion: 'OPERADOR >= NECESITA OPERANDOS NUMBER',
                    ambito: ambito.nombre
                }));
            }
        }
        else if (this.tipooperador == tipo_1.operador.MENORIGUALQUE) {
            if (tipoiz == tipo_1.tipo_valor.NUMBER && tipoder == tipo_1.tipo_valor.NUMBER) {
                var res = Number(valorizquierdo) <= Number(valorderecha);
                this.tipo = tipo_1.tipo_valor.BOOLEAN;
                return new Boolean(res);
            }
            else {
                //ERROR SEMANTICO
                app_1.almacen.dispatch(ts_js_1.errores({
                    tipo: 'SEMANTICO',
                    descripcion: 'OPERADOR <= NECESITA OPERANDOS NUMBER',
                    ambito: ambito.nombre
                }));
            }
        }
        else if (this.tipooperador == tipo_1.operador.DIFERENTEQUE) {
            if (tipoiz == tipo_1.tipo_valor.NUMBER && tipoder == tipo_1.tipo_valor.NUMBER) {
                var res = Number(valorizquierdo) != Number(valorderecha);
                this.tipo = tipo_1.tipo_valor.BOOLEAN;
                return new Boolean(res);
            }
            else if (tipoiz == tipo_1.tipo_valor.STRING && tipoder == tipo_1.tipo_valor.STRING) {
                var res = String(valorizquierdo) != String(valorderecha);
                this.tipo = tipo_1.tipo_valor.BOOLEAN;
                return new Boolean(res);
            }
            else if (tipoiz == tipo_1.tipo_valor.BOOLEAN && tipoder == tipo_1.tipo_valor.BOOLEAN) {
                var res = valorizquierdo.valueOf() != valorderecha.valueOf();
                this.tipo = tipo_1.tipo_valor.BOOLEAN;
                return new Boolean(res);
            }
            else {
                //ERROR SEMANTICO
                app_1.almacen.dispatch(ts_js_1.errores({
                    tipo: 'SEMANTICO',
                    descripcion: 'OPERADOR != NECESITA OPERANDOS NUMBER O STRING',
                    ambito: ambito.nombre
                }));
            }
        }
        else if (this.tipooperador == tipo_1.operador.IGUALQUE) {
            if (tipoiz == tipo_1.tipo_valor.NUMBER && tipoder == tipo_1.tipo_valor.NUMBER) {
                var res = Number(valorizquierdo) == Number(valorderecha);
                this.tipo = tipo_1.tipo_valor.BOOLEAN;
                return new Boolean(res);
            }
            else if (tipoiz == tipo_1.tipo_valor.STRING && tipoder == tipo_1.tipo_valor.STRING) {
                var res = String(valorizquierdo) == String(valorderecha);
                this.tipo = tipo_1.tipo_valor.BOOLEAN;
                return new Boolean(res);
            }
            else if (tipoiz == tipo_1.tipo_valor.BOOLEAN && tipoder == tipo_1.tipo_valor.BOOLEAN) {
                /*const r1= Boolean(valorizquierdo);
                console.log(r1);
                const r2= Boolean(valorderecha);
                console.log(r2);*/
                var res = valorizquierdo.valueOf() == valorderecha.valueOf();
                this.tipo = tipo_1.tipo_valor.BOOLEAN;
                return new Boolean(res);
            }
            else {
                //ERROR SEMANTICO
                app_1.almacen.dispatch(ts_js_1.errores({
                    tipo: 'SEMANTICO',
                    descripcion: 'OPERADOR == NECESITA OPERANDOS NUMBER O STRING',
                    ambito: ambito.nombre
                }));
            }
        }
        return null;
    };
    relacional.prototype.obtenerTipo = function () {
        return this.tipo;
    };
    return relacional;
}(operacion_1["default"]));
exports.relacional = relacional;

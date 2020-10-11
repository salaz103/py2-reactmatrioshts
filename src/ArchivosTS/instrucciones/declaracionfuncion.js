"use strict";
exports.__esModule = true;
var tipo_1 = require("../entorno/tipo");
var instruccionreturn_1 = require("./instruccionreturn");
var declaracionfuncion = /** @class */ (function () {
    function declaracionfuncion(n, lista, par, t) {
        this.nombre = n;
        this.listainstrucciones = lista;
        this.parametros = par;
        this.tipodato = t != null ? t : tipo_1.tipo_valor.VOID;
    }
    declaracionfuncion.prototype.ejecutar = function (ambito) {
        //AQUI YA SE REALIZARON LAS VALIDACIONES Y EL AMBITO QUE ESTAMOS RECIBIENDO ES EL NUEVO
        for (var i = 0; i < this.listainstrucciones.length; i++) {
            //AQUI ESTOY RECORRIENDO LAS INSTRUCCIONES DE LA FUNCION
            var val = this.listainstrucciones[i].ejecutar(ambito);
            //AQUI PREGUNTO SI ES UNA INSTRUCCION RETURN
            if (val instanceof instruccionreturn_1.instruccionreturn) {
                //SI ES UNA INSTRUCCION PUEDE QUE ESTA TRAIGA O NO UN VALOR
                if (val.valor) {
                    //SI EL VALOR EXISTE ES POR QUE ES UN RETURN CON EXPRESION, ENTONCES DEVUELVO ESE VALOR
                    return val.valor;
                }
                else {
                    //SI NO SOLO REGRESO LA INSTRUCCION RETURN
                    return val;
                }
            }
            /*if(this.listainstrucciones[i] instanceof instruccionreturn){
                return this.listainstrucciones[i].ejecutar(ambito);
            }else{
                let valor=this.listainstrucciones[i].ejecutar(ambito);
                if(valor!=null){
                    return valor;
                }
                //PREGUNTO SI ES CONTINUE O BREAK
            }*/
        }
        return null;
    };
    return declaracionfuncion;
}());
exports.declaracionfuncion = declaracionfuncion;

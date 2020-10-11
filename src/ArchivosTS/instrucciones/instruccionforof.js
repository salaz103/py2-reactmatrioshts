"use strict";
exports.__esModule = true;
var entorno_1 = require("../entorno/entorno");
var simbolo_1 = require("../entorno/simbolo");
var instruccionforof = /** @class */ (function () {
    function instruccionforof(t, nombre1, objeto, instrucciones) {
        this.tipo = t;
        this.id = nombre1;
        this.iterado = objeto;
        this.lista = instrucciones;
    }
    instruccionforof.prototype.ejecutar = function (ambito) {
        //PRIMERO VAMOS A VERIFICAR QUE EL ITERABLE EXISTA
        if (ambito.existe(this.iterado)) {
            //SI EXISTE EL ITERADO ENTONCES SI PODEMOS PROCEDER A REALIZAR EL FOR OF
            var iterado = ambito.getSimbolo(this.iterado);
            var arreglo = Object.values(iterado.valor);
            var valores_1 = [];
            arreglo.forEach(function (element) {
                valores_1.push(element);
            });
            var entornodeclaracion = new entorno_1["default"]("for-of", ambito);
            //AHORA SE AGREGA EL SIMBOLO QUE SERA EL ITERADOR
            var iterador = new simbolo_1["default"](this.id, this.tipo == 'LET' ? true : false, iterado.tipovalor, undefined);
            entornodeclaracion.agregarSimbolo(iterador);
            for (var i = 0; i < valores_1.length; i++) {
                //console.log(valores[i].obtenerValor(ambito).valueOf());
                entornodeclaracion.asignarValor(this.id, valores_1[i].obtenerValor(ambito), iterado.tipovalor);
                //console.log(entornodeclaracion)
                for (var a = 0; a < this.lista.length; a++) {
                    this.lista[a].ejecutar(entornodeclaracion);
                }
            }
        }
        else {
            //ERROR- VARIABLE this.iterado no existe
        }
        return null;
    };
    return instruccionforof;
}());
exports.instruccionforof = instruccionforof;

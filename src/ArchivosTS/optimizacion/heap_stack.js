"use strict";
exports.__esModule = true;
var heap_stack = /** @class */ (function () {
    function heap_stack(acceso, derecho, linea) {
        this.acceso = acceso;
        this.ladoderecho = derecho;
        this.linea = linea;
    }
    heap_stack.prototype.optimizar = function () {
        var derecho = this.ladoderecho.obtenercodigo();
        var codigo = this.acceso + "=" + derecho.valor + ";\n";
        return codigo;
    };
    return heap_stack;
}());
exports.heap_stack = heap_stack;

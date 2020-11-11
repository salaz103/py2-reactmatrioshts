"use strict";
exports.__esModule = true;
var instruccionmasmenos = /** @class */ (function () {
    function instruccionmasmenos(e, linea, columna) {
        this.masmenos = e;
        this.linea = linea;
        this.columna = columna;
    }
    //ESTA CLASE ES PARA CUANDO LA LLAMADA DEL MAS MENOS SE HACE COMO UNA INSTRUCCION
    //SIRVE SOLO COMO "PROXY"
    instruccionmasmenos.prototype.traducir = function (ambito) {
        var valor_ins = this.masmenos.traducir(ambito);
        //ESTO LO HACEMOS YA QUE CUANDO EL MAS MENOS SE LLAMA COMO INSTRUCCION, SOLO SIRVE PARA ACTUALIZAR
        //EL IDENTIFICADOR, ENTONCES ES NECESARIO SACARLO DEL 
        //STORE DE TEMPORALES
        valor_ins.obtenerValor();
    };
    return instruccionmasmenos;
}());
exports.instruccionmasmenos = instruccionmasmenos;

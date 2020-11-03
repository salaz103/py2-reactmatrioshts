"use strict";
exports.__esModule = true;
var instruccionllamarfuncion = /** @class */ (function () {
    function instruccionllamarfuncion(f, linea, columna) {
        this.funcion = f;
        this.linea = linea;
        this.columna = columna;
    }
    //ESTA CLASE ES PARA CUANDO LA LLAMADA DE LA FUNCION SE HACE COMO UNA INSTRUCCION
    //SIRVE SOLO COMO "PROXY"
    instruccionllamarfuncion.prototype.traducir = function (ambito) {
        var valor_ins = this.funcion.traducir(ambito);
        //ESTO LO HACEMOS YA QUE CUANDO UNA FUNCION ES LLAMADA COMO UNA INSTRUCCION
        //PUEDE QUE EL VALOR LO UTILICEN Ó NO, ENTONCES ES NECESARIO SACARLO DEL 
        //STORE DE TEMPORALES
        valor_ins.obtenerValor();
    };
    return instruccionllamarfuncion;
}());
exports.instruccionllamarfuncion = instruccionllamarfuncion;

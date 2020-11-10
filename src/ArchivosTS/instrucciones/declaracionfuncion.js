"use strict";
exports.__esModule = true;
var entorno_1 = require("../entorno/entorno");
var tipo_1 = require("../entorno/tipo");
var app_1 = require("../../../src/app");
var ts_js_1 = require("../../actions/ts.js");
var generacion_1 = require("../helpers/generacion");
var declaracionfuncion = /** @class */ (function () {
    function declaracionfuncion(nombre, parametros, tipodato, lista, linea, columna) {
        this.nombre = nombre;
        this.parametros = parametros;
        this.tipodato = tipodato;
        this.listainstrucciones = lista;
        this.linea = linea;
        this.columna = columna;
    }
    declaracionfuncion.prototype.traducir = function (ambito) {
        var generador = generacion_1.generacion.getGenerador();
        //PRIMERO BUSCAR SI LA FUNCION YA EXISTE
        var funcion = ambito.existeFuncionReal(this.nombre);
        if (!funcion) {
            app_1.almacen.dispatch(ts_js_1.errores({
                tipo: 'SEMANTICO',
                descripcion: 'FUNCION CON NOMBRE REPETIDO: ' + this.nombre,
                ambito: ambito.nombre,
                linea: this.linea,
                columna: this.columna
            }));
        }
        else {
            //SI NO EXISTE LA FUNCION, PODEMOS INICIAR A TRADUCIRLA
            console.log("INICIA LA TRADUCCION DE LA FUNCION: " + this.nombre);
            //PENDIENTE
            //PRIMERO VALIDAR PARAMETROS
            //SEGUNDO VALIDAR TYPE SI ES UN TYPE
            //UNA VEZ PASA LAS VALIDACIONES, GUARDAMOS LA FUNCION
            ambito.agregarFuncion(this);
            //COMENZAMOS LA TRADUCCION
            var ambito_funcion_1 = new entorno_1["default"](this.nombre, tipo_1.tipo_ambito.LOCAL, ambito);
            var etiqueta_return = generador.generarEtiqueta();
            //AQUI VAMOS A GUARDAR EL "ESTADO" DE LOS TEMPORALES QUE PODAMOS TENER NO USADOS
            var storetemporales = generador.getStoreTemporales();
            //VAMOS A SETEAR AL ENTORNO LA FUNCION
            ambito_funcion_1.setearFuncion(this, etiqueta_return);
            //AHORA TOCA RECORRER LOS PARAMETROS Y AGREGARLOS AL AMBITO
            if (this.parametros != null) {
                this.parametros.forEach(function (parametro) {
                    if (parametro.tipodato == tipo_1.tipo_dato.NUMBER) {
                        ambito_funcion_1.agregarSimbolo(parametro.id, tipo_1.tipo_dato.ENTERO, ambito_funcion_1.nombre, parametro.linea, parametro.columna, false);
                    }
                    else {
                        ambito_funcion_1.agregarSimbolo(parametro.id, parametro.tipodato, ambito_funcion_1.nombre, parametro.linea, parametro.columna, false);
                    }
                });
            }
            //AHORA LIMPIAMOS EL STORE DE LOS TEMPORALES
            generador.limpiarStoreTemporales();
            generador.agregarcodigo3d(this.nombre + "(){");
            for (var i = 0; i < this.listainstrucciones.length; i++) {
                try {
                    var retorno_ins = this.listainstrucciones[i].traducir(ambito_funcion_1);
                }
                catch (error) {
                    console.log(error);
                }
            }
            generador.agregarEtiqueta(etiqueta_return);
            generador.agregarcodigo3d("return ;");
            generador.agregarcodigo3d("}");
            //RESTAURAMOS LOS TEMPORALES QUE SE GUARDARON
            generador.restaurarTemporales(storetemporales);
        }
    };
    return declaracionfuncion;
}());
exports.declaracionfuncion = declaracionfuncion;

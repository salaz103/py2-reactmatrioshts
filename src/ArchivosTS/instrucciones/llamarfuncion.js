"use strict";
exports.__esModule = true;
var entorno_1 = require("../entorno/entorno");
var simbolo_1 = require("../entorno/simbolo");
var app_1 = require("../../../src/app");
var ts_js_1 = require("../../actions/ts.js");
var llamarfuncion = /** @class */ (function () {
    function llamarfuncion(id, lista) {
        this.nombrefuncion = id;
        this.parametros = lista;
    }
    llamarfuncion.prototype.obtenerTipo = function (ambito) {
        return this.tipo;
    };
    llamarfuncion.prototype.obtenerValor = function (ambito) {
        //ESTE METODO ES DE UNA EXPRESION, ESTO ES POR QUE SIGNIFICA QUE AQUI SI HAY QUE DEVOLVER UN VALOR
        //QUIERE DECIR QUE PUEDE QUE ESTO SEA ASIGNADO A UNA VARIABLE O QUE SEA EL RESULTADO A DEVOLVER
        //DE UN RETURN
        return this.ejecutar(ambito);
    };
    llamarfuncion.prototype.ejecutar = function (ambito) {
        //CUANDO LLAME A UNA FUNCION, LO PRIMERO QUE DEBO HACER ES BUSCAR ESA FUNCION EN MI ENTORNO
        var funcion = ambito.existeFuncion(this.nombrefuncion);
        //SI LA FUNCION EXISTE, ANTES DE EJECUTARLA HAY QUE HACER VARIAS VALIDACIONES
        /*
            1. VALIDAR SI LA FUNCION ENTRANTE VIENE CON PARAMETROS O NO
            2. VALIDAR QUE LA CANTIDAD DE PARAMETROS ENTRANTES SEA IGUAL A LA QUE LA FUNCION TIENE
            3. VALIDAR QUE EL TIPO DE DATO ENTRANTE EN LOS PARAMETROS SEA SIMILAR AL TIPO DE DATO
               DE LOS PARAMETROS DE LA FUNCIÓN
        */
        if (funcion) {
            ///AQUI EL NUEVO ENTORNO NO DEBERIA DE APUNTAR AL ENTORNO PADRE INMEDIATO
            //SI NO QUE TIENE QUE APUNTAR AL AMBITO GLOBAL
            var global_1 = ambito.getEntornoGlobal();
            var tsfuncion = new entorno_1["default"](funcion.nombre, global_1);
            if (funcion.nombre.includes("_")) {
                //SI EL NOMBRE DE LA FUNCION TIENE GUION BAJO, QUIERE DECIR QUE ES UNA FUNCION HEREDADA
                //Y LA EJECUCION DE ESTA NUEVA FUNCION SE LE TIENE QUE PASAR EL ENTORNO PADRE (AMBITO)
                tsfuncion.apuntadorPadre = ambito;
                /*
                //SI ES UNA FUNCION HEREDADA
                let nombres= funcion.nombre.split("_");
                let nombrepadre= nombres[nombres.length-2];
                let funcionPadre= ambito.existeFuncion(nombrepadre);
                if(funcionPadre){
                    //SIGNIFICA QUE SI EXISTE LA FUNCION PADRE
                    //console.log("PADRE:");
                    //console.log(funcionPadre);
                    //CREAR UNA TABLA PADRE PARA EJECUTAR TODAS LAS INSTRUCCIONES
                    let tspadre= new entorno(nombrepadre,ambito);
                    funcionPadre.listainstrucciones.forEach(instruccion => {
                        instruccion.ejecutar(tspadre);
                    });
                    //console.log("PADRE YA EJECUTADO:");
                    //console.log(tspadre);
                    tsfuncion.apuntadorPadre=tspadre;
                }else{
                    //ERROR - LA FUNCION PADRE NO EXISTE
                    almacen.dispatch(errores({
                        tipo:'SEMANTICO',
                        descripcion:'FUNCION PADRE NO EXISTE',
                        ambito:ambito.nombre
                    }));
                    return null;
                }*/
            }
            if (this.parametros == undefined) {
                //SIGNIFICA QUE LA FUNCION ENTRANTE NO TIENE PARAMETROS
                //POR LO QUE LA FUNCION GUARDADA NO DEBERIA DE TENER PARAMETROS
                if (funcion.parametros == undefined) {
                    //SIGNIFICA QUE LA FUNCION TAMPOCO TRAE PARAMETROS
                    //ENTONCES PODEMOS MANDAR A EJECUTAR
                    //CREAMOS EL NUEVO AMBITO QUE APUNTA AL PADRE
                    //let tsfuncion= new entorno(funcion.nombre,ambito);
                    this.tipo = funcion.tipodato;
                    return funcion.ejecutar(tsfuncion);
                }
                else {
                    //ERROR - LA FUNCION ESPERA funcion.parametros.length parametros y se recibieron 0
                    app_1.almacen.dispatch(ts_js_1.errores({
                        tipo: 'SEMANTICO',
                        descripcion: 'FUNCION ESPERA ' + funcion.parametros.length + ' Y SE RECIBIERON 0',
                        ambito: ambito.nombre
                    }));
                }
            }
            else {
                //SIGNIFICA QUE LA FUNCION ENTRANTE SI TRAE PARAMETROS
                //AQUI ESTOY VALIDANDO QUE LA FUNCION GUARDADA TAMBIEN TENGA PARAMETROS
                if (funcion.parametros) {
                    //AHORA VALIDO QUE LOS PARAMETROS QUE ESTOY RECIBIENDO SEAN LA MISMA CANTIDAD QUE LOS QUE
                    //LA FUNCION GUARDADA TIENE
                    if (funcion.parametros.length == this.parametros.length) {
                        //AHORA HAY QUE VALIDAR QUE EL TIPO DE DATO DE LOS PARAMETROS ENTRANTES SEAN IGUAL
                        //AL TIPO DE DATO DE LOS PARAMETROS DE LA FUNCION
                        /**************   VALIDACION 3 PENDIENTE******************/
                        //let entornonuevo:simbolo[]=[];
                        var entornonuevo = new entorno_1["default"]("intermedio", ambito);
                        //SI TODO ESTA CORRECTO ENTONCES LO QUE DEBEMOS HACER ES EN UNA NUEVA TS
                        //ALMACENAR LOS PARAMETROS DE LA FUNCION GUARDADA CON EL VALOR DE LOS ENTRANTES
                        this.tipo = funcion.tipodato;
                        //let tsfuncion= new entorno(funcion.nombre,ambito);
                        for (var i = 0; i < this.parametros.length; i++) {
                            var valor = this.parametros[i].obtenerValor(ambito);
                            var simbolonuevo = new simbolo_1["default"](funcion.parametros[i].id, true, funcion.parametros[i].tipo, valor);
                            entornonuevo.agregarSimbolo(simbolonuevo);
                            //entornonuevo.push(simbolonuevo);
                        }
                        //tsfuncion.ts=entornonuevo;
                        tsfuncion.tablasimbolos = entornonuevo.tablasimbolos;
                        //AHORA QUE YA TENGO LA NUEVA TS CON SUS SIMBOLOS Y VALORES
                        //YA PUEDO MANDAR A EJECUTARLA
                        //PERO LA TENGO QUE DEVOLVER
                        return funcion.ejecutar(tsfuncion);
                    }
                    else {
                        //ERROR - LA CANTIDAD DE PARAMETROS NO COINCIDE
                    }
                }
                else {
                    //ERROR- LA FUNCION funcion.nombre no requiere parametros
                    app_1.almacen.dispatch(ts_js_1.errores({
                        tipo: 'SEMANTICO',
                        descripcion: 'LA FUNCION ' + funcion.nombre + ' NO REQUIERE PARAMETROS',
                        ambito: ambito.nombre
                    }));
                }
            }
        }
        else {
            //ERROR - LA FUNCION NO EXISTE
            app_1.almacen.dispatch(ts_js_1.errores({
                tipo: 'SEMANTICO',
                descripcion: 'FUNCION' + this.nombrefuncion + ' NO EXISTE',
                ambito: ambito.nombre
            }));
        }
        return null;
    };
    return llamarfuncion;
}());
exports.llamarfuncion = llamarfuncion;

"use strict";
exports.__esModule = true;
var entorno = /** @class */ (function () {
    function entorno(nombre, ambitoPadre) {
        this.apuntadorPadre = ambitoPadre != null ? ambitoPadre : null;
        //this.ts=[];
        //this.tablafunciones=[];
        this.nombre = nombre;
        this.tablasimbolos = new Map();
        this.tablaf = new Map();
    }
    entorno.prototype.agregarSimbolo = function (nuevoSimbolo) {
        //this.ts.push(nuevoSimbolo)
        this.tablasimbolos.set(nuevoSimbolo.getId(), nuevoSimbolo);
    };
    entorno.prototype.agregarFuncion = function (funcion) {
        //this.tablafunciones.push(funcion);
        this.tablaf.set(funcion.nombre, funcion);
    };
    entorno.prototype.asignarValor = function (id, valor, tipo) {
        /*for(let entornoactual:entorno = this; entornoactual!=null ; entornoactual=entornoactual.apuntadorPadre){
            for (let i = 0; i < entornoactual.ts.length; i++) {
                if(entornoactual.ts[i].getId()==id){
                    entornoactual.ts[i].setTipo(tipo);
                    entornoactual.ts[i].setValor(valor);
                    return;
                 }
            }
         }*/
        //PRIMERO SE RECORREN LOS ENTORNOS
        for (var entornoactual = this; entornoactual != null; entornoactual = entornoactual.apuntadorPadre) {
            var simbolo_1 = entornoactual.tablasimbolos.get(id);
            if (simbolo_1 != null) {
                simbolo_1.setTipo(tipo);
                simbolo_1.setValor(valor);
                entornoactual.tablasimbolos.set(id, simbolo_1);
            }
        }
    };
    entorno.prototype.getEntornoGlobal = function () {
        for (var e = this; e != null; e = e.apuntadorPadre) {
            if (e.apuntadorPadre == null) {
                return e;
            }
        }
    };
    entorno.prototype.existe = function (id) {
        /*
        //RECORRIENDO LOS ENTORNOS
        for (let entornoactual:entorno = this; entornoactual!=null ; entornoactual=entornoactual.apuntadorPadre) {
            console.log("RECORRIENDO AMBITOS: ");
            console.log(entornoactual);

            //RECORRIENDO LA TABLA DE SIMBOLOS DEL ENTORNO ACTUAL
            for (let i = 0; i <entornoactual.ts.length; i++) {
                if(entornoactual.ts[i].getId()==id){
                    return true;
                }
            }
        }

        //SI REGRESA FALSE ES POR QUE NO ENCONTRO EL ID EN NINGUN AMBITO
        return false;*/
        for (var entornoactual = this; entornoactual != null; entornoactual = entornoactual.apuntadorPadre) {
            var simbolo_2 = entornoactual.tablasimbolos.get(id);
            if (simbolo_2 != null) {
                return true;
            }
        }
        return false;
    };
    entorno.prototype.existeLocal = function (id) {
        /*
         //RECORRIENDO LA TABLA DE SIMBOLOS DEL ENTORNO ACTUAL
         for (let i = 0; i <this.ts.length; i++) {
             if(this.ts[i].getId()==id){
                 return true;
             }
         }*/
        var simbolo = this.tablasimbolos.get(id);
        if (simbolo != null) {
            return true;
        }
        return false;
    };
    entorno.prototype.getSimbolo = function (id) {
        /*for(let entornoactual:entorno = this; entornoactual!=null ; entornoactual=entornoactual.apuntadorPadre){
           for (let i = 0; i < entornoactual.ts.length; i++) {
               if(entornoactual.ts[i].getId()==id){
                   return entornoactual.ts[i];
                }
           }
        }*/
        for (var entornoactual = this; entornoactual != null; entornoactual = entornoactual.apuntadorPadre) {
            var simbolo_3 = entornoactual.tablasimbolos.get(id);
            if (simbolo_3 != null) {
                return simbolo_3;
            }
        }
    };
    entorno.prototype.existeFuncion = function (id) {
        /*
         //RECORRIENDO LOS ENTORNOS
         for (let entornoactual:entorno = this; entornoactual!=null ; entornoactual=entornoactual.apuntadorPadre) {
             console.log("RECORRIENDO AMBITOS PARA BUSCAR FUNCION: ");
             console.log(entornoactual);
 
             //RECORRIENDO LA TABLA DE FUNCIONES DEL ENTORNO ACTUAL
             for (let i = 0; i <entornoactual.tablafunciones.length; i++) {
                 if(entornoactual.tablafunciones[i].nombre ==id){
                     //AQUI REGRESO LA DECLARACION DE FUNCION {function(...){..}}
                     return entornoactual.tablafunciones[i];
                 }
             }
         }
 
         //SI REGRESA NULL ES POR QUE NO ENCONTRO LA FUNCION
         return null;*/
        for (var entornoactual = this; entornoactual != null; entornoactual = entornoactual.apuntadorPadre) {
            var funcion_1 = entornoactual.tablaf.get(id);
            if (funcion_1 != null) {
                return funcion_1;
            }
        }
        return null;
    };
    return entorno;
}());
exports["default"] = entorno;

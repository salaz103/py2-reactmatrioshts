"use strict";
exports.__esModule = true;
var listaerrores = /** @class */ (function () {
    function listaerrores() {
        this.listae = [];
    }
    listaerrores.obtenerLista = function () {
        if (!listaerrores.instance) {
            listaerrores.instance = new listaerrores();
        }
        return listaerrores.instance;
    };
    listaerrores.prototype.guardar = function (err) {
        this.listae.push(err);
    };
    listaerrores.prototype.limpiar = function () {
        this.listae = [];
    };
    listaerrores.prototype.estado = function () {
        return this.listae.length > 0;
    };
    listaerrores.prototype.getLista = function () {
        return this.listae;
    };
    return listaerrores;
}());
exports.listaerrores = listaerrores;

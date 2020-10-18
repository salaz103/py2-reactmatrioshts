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
var operacion_1 = require("./operacion");
var relacional = /** @class */ (function (_super) {
    __extends(relacional, _super);
    function relacional(expiz, op, expder, linea, columna) {
        var _this = _super.call(this, expiz, op, expder) || this;
        _this.linea = linea;
        _this.columna = columna;
        return _this;
    }
    relacional.prototype.traducir = function (ambito) {
        throw new Error("Method not implemented.");
    };
    return relacional;
}(operacion_1["default"]));
exports.relacional = relacional;

"use strict";
exports.__esModule = true;
var tipo_dato;
(function (tipo_dato) {
    tipo_dato["NUMBER"] = "NUMBER";
    tipo_dato["ENTERO"] = "ENTERO";
    tipo_dato["DECIMAL"] = "DECIMAL";
    tipo_dato["STRING"] = "STRING";
    tipo_dato["BOOLEAN"] = "BOOLEAN";
    tipo_dato["TYPE"] = "TYPE";
    tipo_dato["VOID"] = "VOID";
    tipo_dato["ANY"] = "ANY";
    tipo_dato["ARRAY"] = "ARRAY";
    tipo_dato["UNDEFINED"] = "UNDEFINED";
})(tipo_dato || (tipo_dato = {}));
exports.tipo_dato = tipo_dato;
var tipo_ambito;
(function (tipo_ambito) {
    tipo_ambito["GLOBAL"] = "GLOBAL";
    tipo_ambito["LOCAL"] = "LOCAL";
})(tipo_ambito || (tipo_ambito = {}));
exports.tipo_ambito = tipo_ambito;
var tipo_rol;
(function (tipo_rol) {
    tipo_rol["CLASE"] = "CLASE";
    tipo_rol["VARIABLE"] = "VARIABLE";
    tipo_rol["VARCLASE"] = "VARCLASE";
})(tipo_rol || (tipo_rol = {}));
exports.tipo_rol = tipo_rol;
var tipo_variable;
(function (tipo_variable) {
    tipo_variable["CONST"] = "CONST";
    tipo_variable["LET"] = "LET";
})(tipo_variable || (tipo_variable = {}));
exports.tipo_variable = tipo_variable;
var tipo_instruccion;
(function (tipo_instruccion) {
    tipo_instruccion["BREAK"] = "BREAK";
    tipo_instruccion["CONTINUE"] = "CONTINUE";
    tipo_instruccion["RETURN"] = "RETURN";
    tipo_instruccion["PUSH"] = "PUSH";
    tipo_instruccion["POP"] = "POP";
    tipo_instruccion["LENGTH"] = "LENGTH";
})(tipo_instruccion || (tipo_instruccion = {}));
exports.tipo_instruccion = tipo_instruccion;
var operador;
(function (operador) {
    //OPERADORES ARITMETICOS
    operador["MAS"] = "MAS";
    operador["MENOS"] = "MENOS";
    operador["POR"] = "POR";
    operador["DIVISION"] = "DIVISION";
    operador["MODULO"] = "MODULO";
    operador["EXPONENTE"] = "EXPONENTE";
    operador["INCREMENTO"] = "INCREMENTO";
    operador["DECREMENTO"] = "DECREMENTO";
    //OPERADORES RELACIONES
    operador["MAYORQUE"] = "MAYORQUE";
    operador["MENORQUE"] = "MENORQUE";
    operador["MAYORIGUALQUE"] = "MAYORIGUALQUE";
    operador["MENORIGUALQUE"] = "MENORIGUALQUE";
    operador["DIFERENTEQUE"] = "DIFERENTEQUE";
    operador["IGUALQUE"] = "IGUALQUE";
    //OPERADORES LOGICOS
    operador["NOT"] = "NOT";
    operador["AND"] = "AND";
    operador["OR"] = "OR";
})(operador || (operador = {}));
exports.operador = operador;

"use strict";
exports.__esModule = true;
var nodobase = require('../arbolBase/nodobase').nodobase;
var grafo = '';
var contador;
function AST_grafo(ast) {
    contador = 0;
    grafo = "digraph AST {\n";
    if (ast != null) {
        graficar(ast);
    }
    grafo += "\n}";
    return grafo;
}
exports.AST_grafo = AST_grafo;
function graficar(ast) {
    if (ast instanceof Object) {
        var padre_1 = contador;
        grafo += "node" + padre_1 + "[label=\"" + ast.tipo + "\"];\n";
        if (ast.hasOwnProperty("hijos")) {
            ast.hijos.forEach(function (hijo) {
                var idHijo = ++contador;
                if (hijo instanceof Object) {
                    graficar(hijo);
                }
                else {
                    grafo += "node" + idHijo + "[label=\"" + hijo + "\"];\n";
                }
                grafo += "node" + padre_1 + "->node" + idHijo + ";\n";
            });
        }
    }
}
function desanidar(ast) {
    //PRIMERO RECIBIMOS LA RAIZ DEL AST
    if (ast.tipo == 'INSTRUCCIONES') {
        var recolector_1 = '';
        ast.hijos.forEach(function (instruccion) {
            recolector_1 += desanidar(instruccion);
        });
        return recolector_1;
    }
    //*******************INSTRUCCIONES*******************************
    else if (ast.tipo == 'IMPRIMIR') {
        var recolector = '';
        var expresion = desanidar(ast.hijos[4]);
        recolector = "console.log(" + expresion + "); \n";
        return recolector;
    }
    else if (ast.tipo == 'DECLARACION_VARIABLE') {
        var recolector = '';
        var tipovariable = desanidar(ast.hijos[0]);
        var listavariables = desanidar(ast.hijos[1]);
        recolector = tipovariable + " " + listavariables;
        return recolector;
    }
    else if (ast.tipo == 'IDECLARACIONES') {
        var recolector = desanidar(ast.hijos[0]) + ";\n";
        return recolector;
    }
    else if (ast.tipo == 'ASIGNACION') {
        var recolector = '';
        var id = ast.hijos[0];
        var expresion = desanidar(ast.hijos[2]);
        recolector = id + "=" + expresion;
        return recolector;
    }
    else if (ast.tipo == 'WHILE') {
        var recolector = '';
        var expresion = desanidar(ast.hijos[2]);
        var lista = desanidar(ast.hijos[5]);
        recolector = "while(" + expresion + "){\n" + lista + "}\n";
        return recolector;
    }
    else if (ast.tipo == 'DO_WHILE') {
        var recolector = '';
        var lista = desanidar(ast.hijos[2]);
        var expresion = desanidar(ast.hijos[6]);
        recolector = "do{\n" + lista + "}while(" + expresion + ")\n";
        return recolector;
    }
    else if (ast.tipo == 'FUNCION') {
        //HAY 4 TIPOS DE DECLARACION DE FUNCION
        var recolector = '';
        var recolector2_1 = '';
        var instruccionesPadre_1 = '';
        // function id(){instrucciones}
        if (ast.hijos.length == 7) {
            var instrucciones = ast.hijos[5].hijos;
            if (vieneFuncion(instrucciones)) {
                //SI VIENE UNA FUNCION HAY QUE IMPRIMIR ESA FUNCION Y CAMBIARLE EL NOMBRE
                var nombrePadre_1 = ast.hijos[1];
                instrucciones.forEach(function (instruccion) {
                    if (instruccion.tipo == 'FUNCION') {
                        //AQUI LE CAMBIAMOS EL NOMBRE A LA FUNCION ANIDADA
                        instruccion.hijos[1] = nombrePadre_1 + "_" + instruccion.hijos[1];
                        recolector2_1 += desanidar(instruccion);
                    }
                });
                //TOCA IMPRIMIR LA FUNCION PADRE, ES DECIR LA FUNCION ACTUAL
                instrucciones.forEach(function (instruccion) {
                    if (instruccion.tipo != 'FUNCION') {
                        instruccionesPadre_1 += desanidar(instruccion);
                    }
                });
                recolector = "function " + nombrePadre_1 + "(){\n" + instruccionesPadre_1 + "}\n" + recolector2_1;
                return recolector;
            }
            else {
                var id = ast.hijos[1];
                var instrucciones_1 = desanidar(ast.hijos[5]);
                recolector = "function " + id + "(){\n" + instrucciones_1 + "}\n";
                return recolector;
            }
            //function id (parametros) {lista}
        }
        else if (ast.hijos.length == 8) {
            var instrucciones = ast.hijos[6].hijos;
            var parametros = desanidar(ast.hijos[3]);
            if (vieneFuncion(instrucciones)) {
                //SI VIENE UNA FUNCION HAY QUE IMPRIMIR ESA FUNCION Y CAMBIARLE EL NOMBRE
                var nombrePadre_2 = ast.hijos[1];
                instrucciones.forEach(function (instruccion) {
                    if (instruccion.tipo == 'FUNCION') {
                        //AQUI LE CAMBIAMOS EL NOMBRE A LA FUNCION ANIDADA
                        instruccion.hijos[1] = nombrePadre_2 + "_" + instruccion.hijos[1];
                        recolector2_1 += desanidar(instruccion);
                    }
                });
                //TOCA IMPRIMIR LA FUNCION PADRE, ES DECIR LA FUNCION ACTUAL
                instrucciones.forEach(function (instruccion) {
                    if (instruccion.tipo != 'FUNCION') {
                        instruccionesPadre_1 += desanidar(instruccion);
                    }
                });
                recolector = "function " + nombrePadre_2 + "(" + parametros + "){\n" + instruccionesPadre_1 + "}\n" + recolector2_1;
                return recolector;
            }
            else {
                var id = ast.hijos[1];
                var instrucciones_2 = desanidar(ast.hijos[6]);
                recolector = "function " + id + "(" + parametros + "){\n" + instrucciones_2 + "}\n";
                return recolector;
            }
            //function id ( ) : tipodato {lista}
        }
        else if (ast.hijos.length == 9) {
            var instrucciones = ast.hijos[7].hijos;
            var tipodato = desanidar(ast.hijos[5]);
            if (vieneFuncion(instrucciones)) {
                //SI VIENE UNA FUNCION HAY QUE IMPRIMIR ESA FUNCION Y CAMBIARLE EL NOMBRE
                var nombrePadre_3 = ast.hijos[1];
                instrucciones.forEach(function (instruccion) {
                    if (instruccion.tipo == 'FUNCION') {
                        //AQUI LE CAMBIAMOS EL NOMBRE A LA FUNCION ANIDADA
                        instruccion.hijos[1] = nombrePadre_3 + "_" + instruccion.hijos[1];
                        recolector2_1 += desanidar(instruccion);
                    }
                });
                //TOCA IMPRIMIR LA FUNCION PADRE, ES DECIR LA FUNCION ACTUAL
                instrucciones.forEach(function (instruccion) {
                    if (instruccion.tipo != 'FUNCION') {
                        instruccionesPadre_1 += desanidar(instruccion);
                    }
                });
                recolector = "function " + nombrePadre_3 + "():" + tipodato + "{\n" + instruccionesPadre_1 + "}\n" + recolector2_1;
                return recolector;
            }
            else {
                var id = ast.hijos[1];
                var instrucciones_3 = desanidar(ast.hijos[7]);
                recolector = "function " + id + "():" + tipodato + "{\n" + instrucciones_3 + "}\n";
                return recolector;
            }
            //function id (parametros) : tipodato {lista}
        }
        else if (ast.hijos.length == 10) {
            var instrucciones = ast.hijos[8].hijos;
            var parametros = desanidar(ast.hijos[3]);
            var tipodato = desanidar(ast.hijos[6]);
            if (vieneFuncion(instrucciones)) {
                //SI VIENE UNA FUNCION HAY QUE IMPRIMIR ESA FUNCION Y CAMBIARLE EL NOMBRE
                var nombrePadre_4 = ast.hijos[1];
                instrucciones.forEach(function (instruccion) {
                    if (instruccion.tipo == 'FUNCION') {
                        //AQUI LE CAMBIAMOS EL NOMBRE A LA FUNCION ANIDADA
                        instruccion.hijos[1] = nombrePadre_4 + "_" + instruccion.hijos[1];
                        recolector2_1 += desanidar(instruccion);
                    }
                });
                //TOCA IMPRIMIR LA FUNCION PADRE, ES DECIR LA FUNCION ACTUAL
                instrucciones.forEach(function (instruccion) {
                    if (instruccion.tipo != 'FUNCION') {
                        instruccionesPadre_1 += desanidar(instruccion);
                    }
                });
                recolector = "function " + nombrePadre_4 + "(" + parametros + "):" + tipodato + "{\n" + instruccionesPadre_1 + "}\n" + recolector2_1;
                return recolector;
            }
            else {
                var id = ast.hijos[1];
                var instrucciones_4 = desanidar(ast.hijos[8]);
                recolector = "function " + id + "(" + parametros + "):" + tipodato + "{\n" + instrucciones_4 + "}\n";
                return recolector;
            }
        }
    }
    else if (ast.tipo == 'RETURN') {
        var recolector = '';
        if (ast.hijos.length == 2) {
            recolector = "return ;";
        }
        else if (ast.hijos.length == 3) {
            var expresion = desanidar(ast.hijos[1]);
            recolector = "return " + expresion + ";\n";
        }
        return recolector;
    }
    else if (ast.tipo == 'IF_SIMPLE') {
        var recolector = '';
        var expresion = desanidar(ast.hijos[2]);
        var lista = desanidar(ast.hijos[5]);
        recolector = "if (" + expresion + "){ \n          " + lista + " }\n";
        return recolector;
    }
    else if (ast.tipo == 'IF_ELSE') {
        var recolector = '';
        var expresion = desanidar(ast.hijos[2]);
        var lista = desanidar(ast.hijos[5]);
        var instruccionelse = desanidar(ast.hijos[7]);
        recolector = "if (" + expresion + "){ \n        " + lista + "}" + instruccionelse;
        return recolector;
    }
    else if (ast.tipo == 'ELSE_IF') {
        var recolector = '';
        var instruccionif = desanidar(ast.hijos[1]);
        recolector = "else " + instruccionif;
        return recolector;
    }
    else if (ast.tipo == 'ELSE') {
        var recolector = '';
        var lista = desanidar(ast.hijos[2]);
        recolector = "else { \n        " + lista + "}";
        return recolector;
    }
    else if (ast.tipo == 'IMAS_MAS') {
        var recolector = desanidar(ast.hijos[0]) + ";\n";
        return recolector;
    }
    else if (ast.tipo == 'MAS_MAS') {
        var recolector = ast.hijos[0] + "++";
        return recolector;
    }
    else if (ast.tipo == 'MENOS_MENOS') {
        var recolector = ast.hijos[0] + "--";
        return recolector;
    }
    else if (ast.tipo == 'FOR') {
        var recolector = '';
        var declaraciones = desanidar(ast.hijos[2]);
        var expresion = desanidar(ast.hijos[4]);
        var masmenos = desanidar(ast.hijos[6]);
        var lista = desanidar(ast.hijos[9]);
        recolector = "for(" + declaraciones + ";" + expresion + ";" + masmenos + "){\n       " + lista + "} \n   ";
        return recolector;
    }
    else if (ast.tipo == 'FOR_OF') {
        var recolector = '';
        var tipovariable = desanidar(ast.hijos[2]);
        var lista = desanidar(ast.hijos[8]);
        var iterador = ast.hijos[3];
        var iterado = ast.hijos[5];
        recolector = "for (" + tipovariable + " " + iterador + " of " + iterado + " ){\n" + lista + "} \n";
        return recolector;
    }
    else if (ast.tipo == 'SWITCH') {
        var recolector = '';
        var expresion = desanidar(ast.hijos[2]);
        var casos = desanidar(ast.hijos[5]);
        recolector = 'switch(' + expresion + '){\n' + casos + '}\n';
        return recolector;
    }
    else if (ast.tipo == 'BREAK') {
        var recolector = 'break; \n';
        return recolector;
    }
    else if (ast.tipo == 'CONTINUE') {
        var recolector = 'continue; \n';
        return recolector;
    }
    else if (ast.tipo == 'GRAFICAR') {
        var recolector = 'graficar_ts();\n';
        return recolector;
    }
    else if (ast.tipo == 'LLAMADA_FUNCION1') {
        var recolector = '';
        var id = ast.hijos[0];
        recolector = id + "()";
        return recolector;
    }
    else if (ast.tipo == 'LLAMADA_FUNCION2') {
        var recolector = '';
        var id = ast.hijos[0];
        var lista = desanidar(ast.hijos[2]);
        recolector = id + "(" + lista + ")";
        return recolector;
    }
    else if (ast.tipo == 'LFUNCION') {
        var recolector = '';
        var funcion = desanidar(ast.hijos[0]);
        recolector = funcion + ";\n";
        return recolector;
    }
    else if (ast.tipo == 'NATIVA') {
        var recolector = '';
        var nativa = desanidar(ast.hijos[0]);
        recolector = nativa + ";\n";
        return recolector;
    }
    //****************************EXPRESIONES***********************/
    else if (ast.tipo == 'NEGATIVO') {
        var recolector = '';
        var expresion = desanidar(ast.hijos[1]);
        recolector = '-' + expresion;
        return recolector;
    }
    else if (ast.tipo == 'MAS') {
        var recolector = '';
        var operizq = desanidar(ast.hijos[0]);
        var operder = desanidar(ast.hijos[2]);
        recolector = operizq + "+" + operder;
        return recolector;
    }
    else if (ast.tipo == 'MENOS') {
        var recolector = '';
        var operizq = desanidar(ast.hijos[0]);
        var operder = desanidar(ast.hijos[2]);
        recolector = operizq + "-" + operder;
        return recolector;
    }
    else if (ast.tipo == 'POR') {
        var recolector = '';
        var operizq = desanidar(ast.hijos[0]);
        var operder = desanidar(ast.hijos[2]);
        recolector = operizq + "*" + operder;
        return recolector;
    }
    else if (ast.tipo == 'DIVISION') {
        var recolector = '';
        var operizq = desanidar(ast.hijos[0]);
        var operder = desanidar(ast.hijos[2]);
        recolector = operizq + "/" + operder;
        return recolector;
    }
    else if (ast.tipo == 'MODULO') {
        var recolector = '';
        var operizq = desanidar(ast.hijos[0]);
        var operder = desanidar(ast.hijos[2]);
        recolector = operizq + "%" + operder;
        return recolector;
    }
    else if (ast.tipo == 'EXPONENTE') {
        var recolector = '';
        var operizq = desanidar(ast.hijos[0]);
        var operder = desanidar(ast.hijos[2]);
        recolector = operizq + "**" + operder;
        return recolector;
    }
    else if (ast.tipo == 'MAYORQUE') {
        var recolector = '';
        var operizq = desanidar(ast.hijos[0]);
        var operder = desanidar(ast.hijos[2]);
        recolector = operizq + ">" + operder;
        return recolector;
    }
    else if (ast.tipo == 'MENORQUE') {
        var recolector = '';
        var operizq = desanidar(ast.hijos[0]);
        var operder = desanidar(ast.hijos[2]);
        recolector = operizq + "<" + operder;
        return recolector;
    }
    else if (ast.tipo == 'MAYORIGUALQUE') {
        var recolector = '';
        var operizq = desanidar(ast.hijos[0]);
        var operder = desanidar(ast.hijos[2]);
        recolector = operizq + ">=" + operder;
        return recolector;
    }
    else if (ast.tipo == 'MENORIGUALQUE') {
        var recolector = '';
        var operizq = desanidar(ast.hijos[0]);
        var operder = desanidar(ast.hijos[2]);
        recolector = operizq + "<=" + operder;
        return recolector;
    }
    else if (ast.tipo == 'IGUALQUE') {
        var recolector = '';
        var operizq = desanidar(ast.hijos[0]);
        var operder = desanidar(ast.hijos[2]);
        recolector = operizq + "==" + operder;
        return recolector;
    }
    else if (ast.tipo == 'DIFERENTEQUE') {
        var recolector = '';
        var operizq = desanidar(ast.hijos[0]);
        var operder = desanidar(ast.hijos[2]);
        recolector = operizq + "!=" + operder;
        return recolector;
    }
    else if (ast.tipo == 'AND') {
        var recolector = '';
        var operizq = desanidar(ast.hijos[0]);
        var operder = desanidar(ast.hijos[2]);
        recolector = operizq + "&&" + operder;
        return recolector;
    }
    else if (ast.tipo == 'OR') {
        var recolector = '';
        var operizq = desanidar(ast.hijos[0]);
        var operder = desanidar(ast.hijos[2]);
        recolector = operizq + "||" + operder;
        return recolector;
    }
    else if (ast.tipo == 'NOT') {
        var recolector = '';
        var operando = desanidar(ast.hijos[1]);
        recolector = "!" + operando;
        return recolector;
    }
    else if (ast.tipo == 'PAREXPRESION') {
        var recolector = '';
        var expresion = desanidar(ast.hijos[1]);
        recolector = "(" + expresion + ")";
        return recolector;
    }
    else if (ast.tipo == 'TERNARIO') {
        var recolector = '';
        var condicion = desanidar(ast.hijos[0]);
        var expt = desanidar(ast.hijos[2]);
        var expf = desanidar(ast.hijos[4]);
        recolector = condicion + "?" + expt + ":" + expf;
        return recolector;
    }
    // ****************LISTAS - NODOS INTERMEDIOS*********************
    else if (ast.tipo == 'LISTA_CASOS') {
        var recolector_2 = '';
        if (ast.hijos.length == 1) {
            //SI LA LISTA SOLO TRAE UN HIJO
            //ENTONCES NO LE AGREGAMOS COMAS
            ast.hijos.forEach(function (variable) {
                recolector_2 += desanidar(variable) + "\n";
            });
        }
        else {
            //SI LA LISTA DE CASOS TRAE MAS DE UN HIJO
            //SIGNIFICA QUE LA LISTA VIENE SEPARADA POR SALTOS DE LINEA
            var contador_1 = 0;
            var hijos_1 = ast.hijos.length;
            ast.hijos.forEach(function (variable) {
                contador_1++;
                if (contador_1 == hijos_1) {
                    recolector_2 += desanidar(variable) + "\n";
                }
                else {
                    recolector_2 += desanidar(variable) + "\n";
                }
            });
        }
        return recolector_2;
    }
    else if (ast.tipo == 'LISTA_VARIABLES') {
        var recolector_3 = '';
        if (ast.hijos.length == 1) {
            //SI LA LISTA SOLO TRAE UN HIJO
            //ENTONCES NO LE AGREGAMOS COMAS
            ast.hijos.forEach(function (variable) {
                recolector_3 += desanidar(variable);
            });
        }
        else {
            //SI LA LISTA DE VARIABLES TRAE MAS DE UN HIJO
            //SIGNIFICA QUE LA LISTA VIENE SEPARADA POR COMAS
            var contador_2 = 0;
            var hijos_2 = ast.hijos.length;
            ast.hijos.forEach(function (variable) {
                contador_2++;
                if (contador_2 == hijos_2) {
                    recolector_3 += desanidar(variable);
                }
                else {
                    recolector_3 += desanidar(variable) + ",";
                }
            });
        }
        return recolector_3;
    }
    else if (ast.tipo == 'LISTA_PARAMETROS') {
        var recolector_4 = '';
        if (ast.hijos.length == 1) {
            //SI LA LISTA SOLO TRAE UN HIJO
            //ENTONCES NO LE AGREGAMOS COMAS
            ast.hijos.forEach(function (variable) {
                recolector_4 += desanidar(variable);
            });
        }
        else {
            //SI LA LISTA DE PARAMETROS TRAE MAS DE UN HIJO
            //SIGNIFICA QUE LA LISTA VIENE SEPARADA POR COMAS
            var contador_3 = 0;
            var hijos_3 = ast.hijos.length;
            ast.hijos.forEach(function (variable) {
                contador_3++;
                if (contador_3 == hijos_3) {
                    recolector_4 += desanidar(variable);
                }
                else {
                    recolector_4 += desanidar(variable) + ",";
                }
            });
        }
        return recolector_4;
    }
    else if (ast.tipo == 'LISTA_EXPRESIONES') {
        var recolector_5 = '';
        if (ast.hijos.length == 1) {
            //SI LA LISTA SOLO TRAE UN HIJO
            //ENTONCES NO LE AGREGAMOS COMAS
            ast.hijos.forEach(function (variable) {
                recolector_5 += desanidar(variable);
            });
        }
        else {
            //SI LA LISTA DE VARIABLES TRAE MAS DE UN HIJO
            //SIGNIFICA QUE LA LISTA VIENE SEPARADA POR COMAS
            var contador_4 = 0;
            var hijos_4 = ast.hijos.length;
            ast.hijos.forEach(function (variable) {
                contador_4++;
                if (contador_4 == hijos_4) {
                    recolector_5 += desanidar(variable);
                }
                else {
                    recolector_5 += desanidar(variable) + ",";
                }
            });
        }
        return recolector_5;
    }
    else if (ast.tipo == 'VARIABLE_FULL') {
        var recolector = '';
        var id = ast.hijos[0];
        var tipodato = desanidar(ast.hijos[2]);
        var expresion = desanidar(ast.hijos[4]);
        recolector = id + ":" + tipodato + "=" + expresion;
        return recolector;
    }
    else if (ast.tipo == 'VARIABLE_CON_EXPRESION') {
        var recolector = '';
        var id = ast.hijos[0];
        var expresion = desanidar(ast.hijos[2]);
        recolector = id + "=" + expresion;
        return recolector;
    }
    else if (ast.tipo == 'VARIABLE_SIN_EXPRESION') {
        var recolector = '';
        var id = ast.hijos[0];
        var tipodato = desanidar(ast.hijos[2]);
        recolector = id + ":" + tipodato;
        return recolector;
    }
    else if (ast.tipo == 'VARIABLE_ID') {
        var recolector = '';
        var id = ast.hijos[0];
        recolector = id;
        return recolector;
    }
    else if (ast.tipo == 'PARAMETRO') {
        var recolector = '';
        var id = ast.hijos[0];
        var tipodato = desanidar(ast.hijos[2]);
        recolector = id + ":" + tipodato;
        return recolector;
    }
    else if (ast.tipo == 'CASE') {
        var recolector = '';
        var expresion = desanidar(ast.hijos[1]);
        var lista = desanidar(ast.hijos[3]);
        recolector = 'case ' + expresion + ":\n" + lista;
        return recolector;
    }
    else if (ast.tipo == 'CASE_DEFAULT') {
        var recolector = '';
        var lista = desanidar(ast.hijos[2]);
        recolector = 'default:\n   ' + lista;
        return recolector;
    }
    else if (ast.tipo == 'ARREGLO_COMPLETO1') {
        var recolector = '';
        var id = ast.hijos[0];
        var tipodato = desanidar(ast.hijos[2]);
        var lista = desanidar(ast.hijos[5]);
        recolector = id + ":" + tipodato + " = [" + lista + "]";
        return recolector;
    }
    else if (ast.tipo == 'ARREGLO_COMPLETO2') {
        var recolector = '';
        var id = ast.hijos[0];
        var tipodato = desanidar(ast.hijos[2]);
        recolector = id + ":" + tipodato + " = [ ]";
        return recolector;
    }
    else if (ast.tipo == 'ARREGLO') {
        var recolector = '';
        var id = ast.hijos[0];
        var lista = desanidar(ast.hijos[3]);
        recolector = id + "= [" + lista + "]";
        return recolector;
    }
    else if (ast.tipo == 'ARREGLO2') {
        var recolector = '';
        var id = ast.hijos[0];
        recolector = id + "= [ ]";
        return recolector;
    }
    else if (ast.tipo == 'PUSH') {
        var recolector = '';
        var id = ast.hijos[0];
        var lista = desanidar(ast.hijos[4]);
        recolector = id + ".push(" + lista + ")";
        return recolector;
    }
    else if (ast.tipo == 'POP') {
        var recolector = '';
        var id = ast.hijos[0];
        recolector = id + ".pop()";
        return recolector;
    }
    else if (ast.tipo == 'LENGTH') {
        var recolector = '';
        var id = ast.hijos[0];
        recolector = id + ".length";
        return recolector;
    }
    //**************NODOS HOJA, SUS HIJOS YA NO TRAEN MAS HIJOS************************
    else if (ast.tipo == 'COMILLA_DOBLE') {
        var valor = "\"" + ast.hijos[0] + "\"";
        return valor;
    }
    else if (ast.tipo == 'COMILLA_SIMPLE') {
        var valor = "'" + ast.hijos[0] + "'";
        return valor;
    }
    else if (ast.tipo == 'IDENTIFICADOR') {
        var valor = ast.hijos[0];
        return valor;
    }
    else if (ast.tipo == 'NUMERO') {
        var valor = ast.hijos[0];
        return valor;
    }
    else if (ast.tipo == 'LET') {
        var valor = ast.hijos[0];
        return valor;
    }
    else if (ast.tipo == 'CONST') {
        var valor = ast.hijos[0];
        return valor;
    }
    else if (ast.tipo == 'STRING') {
        var valor = ast.hijos[0];
        return valor;
    }
    else if (ast.tipo == 'STRING[]') {
        var valor = ast.hijos[0] + "[]";
        return valor;
    }
    else if (ast.tipo == 'NUMBER') {
        var valor = ast.hijos[0];
        return valor;
    }
    else if (ast.tipo == 'NUMBER[]') {
        var valor = ast.hijos[0] + "[]";
        return valor;
    }
    else if (ast.tipo == 'BOOLEAN') {
        var valor = ast.hijos[0];
        return valor;
    }
    else if (ast.tipo == 'BOOLEAN[]') {
        var valor = ast.hijos[0] + "[]";
        return valor;
    }
    else if (ast.tipo == 'VOID') {
        var valor = ast.hijos[0];
        return valor;
    }
    else if (ast.tipo == 'TRUE') {
        var valor = ast.hijos[0];
        return valor;
    }
    else if (ast.tipo == 'FALSE') {
        var valor = ast.hijos[0];
        return valor;
    }
    return '';
}
exports.desanidar = desanidar;
function vieneFuncion(instrucciones) {
    for (var i = 0; i < instrucciones.length; i++) {
        if (instrucciones[i].tipo == 'FUNCION') {
            //SI ES UNA FUNCION REGRESAMOS TRUE
            return true;
        }
    }
    //SI REGRESAMOS FALSE ES POR QUE NO VIENEN FUNCIONES EN LAS INSTRUCCIONES
    return false;
}

"use strict";
exports.__esModule = true;
var generacion_1 = require("./generacion");
function generarFuncionesNativas() {
    var generador = generacion_1.generacion.getGenerador();
    generador.agregarComentarios("INICIO FUNCIONES NATIVAS");
    //FUNCION POTENCIA
    generador.agregarcodigo3d("potencia(){");
    var t0 = generador.generarTemporal();
    var t2 = generador.generarTemporal();
    var t3 = generador.generarTemporal();
    var t4 = generador.generarTemporal();
    generador.sacarTemporal(t0);
    generador.sacarTemporal(t2);
    generador.sacarTemporal(t3);
    generador.sacarTemporal(t4);
    generador.agregarExpresion(t0, "1", "", "");
    generador.agregarExpresion(t2, "0", "", "");
    generador.getValorStack(t3, "p+1");
    generador.getValorStack(t4, "p+2");
    var etiquetaInicio = generador.generarEtiqueta();
    generador.agregarEtiqueta(etiquetaInicio);
    var etiquetav = generador.generarEtiqueta();
    var etiquetaf = generador.generarEtiqueta();
    generador.agregarIf(t0, "<", t4, etiquetav);
    generador.agregarGoTo(etiquetaf);
    generador.agregarEtiqueta(etiquetav);
    var ev1if = generador.generarEtiqueta();
    var ev2if = generador.generarEtiqueta();
    var esalida = generador.generarEtiqueta();
    generador.agregarIf(t2, "<", t3, ev1if);
    generador.agregarGoTo(ev2if);
    generador.agregarEtiqueta(ev1if);
    generador.agregarExpresion(t2, t3, "*", t3);
    generador.agregarGoTo(esalida);
    generador.agregarEtiqueta(ev2if);
    generador.agregarExpresion(t2, t2, "*", t3);
    generador.agregarEtiqueta(esalida);
    generador.agregarExpresion(t0, t0, "+", "1");
    generador.agregarGoTo(etiquetaInicio);
    generador.agregarEtiqueta(etiquetaf);
    generador.stack("p", t2);
    generador.agregarcodigo3d("return ;");
    generador.agregarcodigo3d("}");
    ////////////////////////////NATIVA IMPRIMIR_STRING///////////////////////////////////////////////
    generador.agregarcodigo3d("console(){");
    var theap = generador.generarTemporal();
    var tvalorheap = generador.generarTemporal();
    generador.sacarTemporal(theap);
    generador.sacarTemporal(tvalorheap);
    var inicio_lectura = generador.generarEtiqueta();
    var etq_if_falsa = generador.generarEtiqueta();
    generador.getValorStack(theap, "p");
    generador.agregarEtiqueta(inicio_lectura);
    generador.getValorHeap(tvalorheap, theap);
    generador.agregarIf(tvalorheap, "==", "-1", etq_if_falsa);
    generador.printchar(tvalorheap);
    generador.agregarExpresion(theap, theap, "+", "1");
    generador.agregarGoTo(inicio_lectura);
    generador.agregarEtiqueta(etq_if_falsa);
    //IMPRIMIMOS UN SALTO DE LINEA
    generador.printchar("10");
    generador.agregarcodigo3d("return ;");
    generador.agregarcodigo3d("}");
    ////////////////////////////////////// CONCATENACION STRING_ENTERO//////////////////////////////////
    generador.agregarcodigo3d("union_string_entero(){");
    var temporal_inicio_nueva_cadena = generador.generarTemporal();
    var contador_numeros = generador.generarTemporal();
    var temp_p = generador.generarTemporal();
    var temp_stack = generador.generarTemporal();
    var temp_valor_heap = generador.generarTemporal();
    var temp_decimales = generador.generarTemporal();
    var etq_inicio_guardado = generador.generarEtiqueta();
    generador.sacarTemporal(temporal_inicio_nueva_cadena);
    generador.sacarTemporal(contador_numeros);
    generador.sacarTemporal(temp_p);
    generador.sacarTemporal(temp_stack);
    generador.sacarTemporal(temp_valor_heap);
    generador.sacarTemporal(temp_decimales);
    generador.agregarExpresion(temporal_inicio_nueva_cadena, "h", "", "");
    generador.agregarExpresion(contador_numeros, "0", "", "");
    generador.agregarExpresion(temp_p, "p", "+", "1");
    generador.getValorStack(temp_stack, temp_p);
    //INICIA EL GUARDADO DE LA CADENA
    generador.agregarEtiqueta(etq_inicio_guardado);
    generador.getValorHeap(temp_valor_heap, temp_stack);
    var etq_fin = generador.generarEtiqueta();
    generador.agregarIf(temp_valor_heap, "==", "-1", etq_fin);
    generador.heap("h", temp_valor_heap);
    generador.siguienteHeap();
    generador.agregarExpresion(temp_stack, temp_stack, "+", "1");
    generador.agregarGoTo(etq_inicio_guardado);
    generador.agregarEtiqueta(etq_fin);
    //TERMINAMOS EL GUARDADO DE LA CADENA
    //INICIA EL RECORRIDO PARA EL ENTERO
    generador.agregarExpresion(temp_p, "p", "+", "2");
    generador.getValorStack(temp_stack, temp_p);
    generador.agregarExpresion(temp_p, "0", "", "");
    var salto_1 = generador.generarEtiqueta();
    generador.agregarIf(temp_stack, "!=", "0", salto_1);
    generador.agregarExpresion(contador_numeros, contador_numeros, "+", "1");
    generador.agregarEtiqueta(salto_1);
    //INICIA LA VERIFICACION SI EL NUMERO ES NEGATIVO
    var salto_2 = generador.generarEtiqueta();
    generador.agregarIf(temp_stack, ">=", "0", salto_2);
    generador.heap("h", "45");
    generador.siguienteHeap();
    //CAMBIAMOS EL VALOR DE NEGATIVO A POSITIVO
    generador.agregarExpresion(temp_stack, "-1", "*", temp_stack);
    generador.agregarEtiqueta(salto_2);
    //AQUI INICIA EL CAMBIO DE LUGAR PARA LOS NUMEROS
    var salto_3 = generador.generarEtiqueta();
    generador.agregarIf(temp_stack, "<=", "0", salto_3);
    generador.agregarExpresion(temp_p, temp_p, "*", "10");
    generador.agregarcodigo3d(temp_valor_heap + "= fmod(" + temp_stack + ",10);");
    generador.agregarExpresion(temp_p, temp_p, "+", temp_valor_heap);
    generador.agregarExpresion(temp_stack, temp_stack, "/", "10");
    generador.agregarcodigo3d(temp_decimales + "= fmod(" + temp_stack + ",1);");
    generador.agregarExpresion(temp_stack, temp_stack, "-", temp_decimales);
    generador.agregarExpresion(contador_numeros, contador_numeros, "+", "1");
    generador.agregarGoTo(salto_2);
    generador.agregarEtiqueta(salto_3);
    //AQUI YA TENEMOS EL NUMERO EN TMP_P Y PODEMOS AGREGARLO A LA CADENA
    var salto_4 = generador.generarEtiqueta();
    generador.agregarIf(contador_numeros, "==", "0", salto_4);
    generador.agregarcodigo3d(temp_stack + "= fmod(" + temp_p + ",10);");
    generador.agregarExpresion(temp_p, temp_p, "/", "10");
    generador.agregarcodigo3d(temp_decimales + "= fmod(" + temp_p + ",1);");
    generador.agregarExpresion(temp_p, temp_p, "-", temp_decimales);
    generador.agregarExpresion(contador_numeros, contador_numeros, "-", "1");
    //SUMAMOS 48 AL NUMERO PARA QUE SEA EL ASCII
    generador.agregarExpresion(temp_valor_heap, temp_stack, "+", "48");
    generador.heap("h", temp_valor_heap);
    generador.siguienteHeap();
    generador.agregarGoTo(salto_3);
    generador.agregarEtiqueta(salto_4);
    generador.heap("h", "-1");
    generador.siguienteHeap();
    generador.stack("p", temporal_inicio_nueva_cadena);
    generador.agregarcodigo3d("return ;");
    generador.agregarcodigo3d("}");
    generador.agregarComentarios("FIN FUNCIONES NATIVAS");
}
exports.generarFuncionesNativas = generarFuncionesNativas;

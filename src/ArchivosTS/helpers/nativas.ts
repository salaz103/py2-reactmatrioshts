import { generacion } from "./generacion";

export function generarFuncionesNativas() {
    const generador = generacion.getGenerador();

    generador.agregarComentarios("INICIO FUNCIONES NATIVAS");

    /////////////////////////////////////////////////////////////FUNCION POTENCIA//////////////////////////////////////////////////

    generador.agregarcodigo3d("potencia(){");
    let t0 = generador.generarTemporal();
    let t2 = generador.generarTemporal();
    let t3 = generador.generarTemporal();
    let t4 = generador.generarTemporal();
    let tmpparap= generador.generarTemporal();
    generador.sacarTemporal(t0);
    generador.sacarTemporal(t2);
    generador.sacarTemporal(t3);
    generador.sacarTemporal(t4);
    generador.sacarTemporal(tmpparap);
    generador.agregarExpresion(t0, "1", "", "");
    generador.agregarExpresion(t2, "0", "", "");
    generador.agregarExpresion(tmpparap,"p","+","1");
    generador.getValorStack(t3, tmpparap);
    generador.agregarExpresion(tmpparap,tmpparap,"+","1");
    generador.getValorStack(t4, tmpparap);
    let etiquetaInicio = generador.generarEtiqueta();
    generador.agregarEtiqueta(etiquetaInicio);

    let etiquetav = generador.generarEtiqueta();
    let etiquetaf = generador.generarEtiqueta();
    generador.agregarIf(t0, "<", t4, etiquetav);
    generador.agregarGoTo(etiquetaf);
    generador.agregarEtiqueta(etiquetav);

    let ev1if = generador.generarEtiqueta();
    let ev2if = generador.generarEtiqueta();
    let esalida = generador.generarEtiqueta();
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


    ////////////////////////////NATIVA IMPRIMIR_STRING////////////////////////////////////////////////////////////////

    generador.agregarcodigo3d("console(){");
    let theap = generador.generarTemporal();
    let tvalorheap = generador.generarTemporal();
    generador.sacarTemporal(theap);
    generador.sacarTemporal(tvalorheap);
    let inicio_lectura = generador.generarEtiqueta();
    let etq_if_falsa = generador.generarEtiqueta();
    generador.getValorStack(theap, "p");
    generador.agregarEtiqueta(inicio_lectura);
    generador.getValorHeap(tvalorheap, theap);
    generador.agregarIf(tvalorheap, "==", "-1", etq_if_falsa);
    generador.printchar(tvalorheap);
    generador.agregarExpresion(theap, theap, "+", "1");
    generador.agregarGoTo(inicio_lectura);
    generador.agregarEtiqueta(etq_if_falsa);
    //IMPRIMIMOS UN SALTO DE LINEA
    generador.agregarcodigo3d("return ;");
    generador.agregarcodigo3d("}");

    ////////////////////////////////////// CONCATENACION STRING_ENTERO//////////////////////////////////////////////////////

    generador.agregarcodigo3d("union_string_entero(){");
    let temporal_inicio_nueva_cadena = generador.generarTemporal();
    let contador_numeros = generador.generarTemporal();
    let temp_p = generador.generarTemporal();
    let temp_stack = generador.generarTemporal();
    let temp_valor_heap = generador.generarTemporal();
    let temp_decimales = generador.generarTemporal();
    let etq_inicio_guardado = generador.generarEtiqueta();

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
    let etq_fin = generador.generarEtiqueta();
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
    let salto_1 = generador.generarEtiqueta();
    generador.agregarIf(temp_stack, "!=", "0", salto_1);
    generador.agregarExpresion(contador_numeros, contador_numeros, "+", "1");
    generador.agregarEtiqueta(salto_1);
    //INICIA LA VERIFICACION SI EL NUMERO ES NEGATIVO
    let salto_2 = generador.generarEtiqueta();
    generador.agregarIf(temp_stack, ">=", "0", salto_2);
    generador.heap("h", "45");
    generador.siguienteHeap();
    //CAMBIAMOS EL VALOR DE NEGATIVO A POSITIVO
    generador.agregarExpresion(temp_stack, "-1", "*", temp_stack);
    generador.agregarEtiqueta(salto_2);
    //AQUI INICIA EL CAMBIO DE LUGAR PARA LOS NUMEROS
    let salto_3 = generador.generarEtiqueta();
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
    let salto_4 = generador.generarEtiqueta();
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

    ////////////////////////////////////// CONCATENACION ENTERO_STRING/////////////////////////////////////////////////////

    generador.agregarcodigo3d("union_entero_string(){");
    generador.agregarExpresion(temporal_inicio_nueva_cadena, "h", "", "");
    generador.agregarExpresion(contador_numeros, "0", "", "");
    generador.agregarExpresion(temp_p, "p", "+", "1");
    generador.getValorStack(temp_stack, temp_p);
    generador.agregarExpresion(temp_p, "0", "", "");

    let salto_1_1 = generador.generarEtiqueta();
    generador.agregarIf(temp_stack, "!=", "0", salto_1_1);
    generador.agregarExpresion(contador_numeros, contador_numeros, "+", "1");
    generador.agregarEtiqueta(salto_1_1);
    //INICIA LA VERIFICACION SI EL NUMERO ES NEGATIVO
    let salto_2_2 = generador.generarEtiqueta();
    generador.agregarIf(temp_stack, ">=", "0", salto_2_2);
    generador.heap("h", "45");
    generador.siguienteHeap();
    //CAMBIAMOS EL VALOR DE NEGATIVO A POSITIVO
    generador.agregarExpresion(temp_stack, "-1", "*", temp_stack);
    generador.agregarEtiqueta(salto_2_2);
    //AQUI INICIA EL CAMBIO DE LUGAR PARA LOS NUMEROS
    let salto_3_3 = generador.generarEtiqueta();
    generador.agregarIf(temp_stack, "<=", "0", salto_3_3);
    generador.agregarExpresion(temp_p, temp_p, "*", "10");
    generador.agregarcodigo3d(temp_valor_heap + "= fmod(" + temp_stack + ",10);");
    generador.agregarExpresion(temp_p, temp_p, "+", temp_valor_heap);
    generador.agregarExpresion(temp_stack, temp_stack, "/", "10");
    generador.agregarcodigo3d(temp_decimales + "= fmod(" + temp_stack + ",1);");
    generador.agregarExpresion(temp_stack, temp_stack, "-", temp_decimales);
    generador.agregarExpresion(contador_numeros, contador_numeros, "+", "1");
    generador.agregarGoTo(salto_2_2);
    generador.agregarEtiqueta(salto_3_3);
    //AQUI YA TENEMOS EL NUMERO EN TMP_P Y PODEMOS AGREGARLO A LA CADENA
    let salto_4_4 = generador.generarEtiqueta();
    generador.agregarIf(contador_numeros, "==", "0", salto_4_4);
    generador.agregarcodigo3d(temp_stack + "= fmod(" + temp_p + ",10);");
    generador.agregarExpresion(temp_p, temp_p, "/", "10");
    generador.agregarcodigo3d(temp_decimales + "= fmod(" + temp_p + ",1);");
    generador.agregarExpresion(temp_p, temp_p, "-", temp_decimales);
    generador.agregarExpresion(contador_numeros, contador_numeros, "-", "1");
    //SUMAMOS 48 AL NUMERO PARA QUE SEA EL ASCII
    generador.agregarExpresion(temp_valor_heap, temp_stack, "+", "48");
    generador.heap("h", temp_valor_heap);
    generador.siguienteHeap();
    generador.agregarGoTo(salto_3_3);
    generador.agregarEtiqueta(salto_4_4);
    //INICIA EL GUARDADO DE LA CADENA
    generador.agregarExpresion(temp_p, "p", "+", "2");
    generador.getValorStack(temp_stack, temp_p);
    //INICIA EL GUARDADO DE LA CADENA
    let etq_inicio_guardado_1 = generador.generarEtiqueta()
    generador.agregarEtiqueta(etq_inicio_guardado_1);
    generador.getValorHeap(temp_valor_heap, temp_stack);
    let etq_fin_1 = generador.generarEtiqueta();
    generador.agregarIf(temp_valor_heap, "==", "-1", etq_fin_1);
    generador.heap("h", temp_valor_heap);
    generador.siguienteHeap();
    generador.agregarExpresion(temp_stack, temp_stack, "+", "1");
    generador.agregarGoTo(etq_inicio_guardado_1);
    generador.agregarEtiqueta(etq_fin_1);
    //TERMINA EL GUARDADO DE LA CADENA, SOLO PONEMOS EL -1 AL FINAL
    generador.heap("h", "-1");
    generador.siguienteHeap();
    generador.stack("p", temporal_inicio_nueva_cadena);
    generador.agregarcodigo3d("return ;");
    generador.agregarcodigo3d("}");


    ///////////////////////////////////////////////////STRING + STRING //////////////////////////////////////////////////////////

    let puntero_p = generador.generarTemporal();
    let nueva_cadena = generador.generarTemporal();
    let v_stack = generador.generarTemporal();
    let v_heap = generador.generarTemporal();
    generador.sacarTemporal(puntero_p);
    generador.sacarTemporal(nueva_cadena);
    generador.sacarTemporal(v_stack);
    generador.sacarTemporal(v_heap);

    generador.agregarcodigo3d("union_string_string(){");
    generador.agregarExpresion(nueva_cadena, "h", "", "");
    generador.agregarExpresion(puntero_p, "p", "+", "1");
    generador.getValorStack(v_stack, puntero_p);
    //COMIENZA EL GUARDADO DE LA PRIMERA CADENA
    let etq_inicio = generador.generarEtiqueta();
    generador.agregarEtiqueta(etq_inicio);
    generador.getValorHeap(v_heap, v_stack);
    let salida_cadena1 = generador.generarEtiqueta();
    generador.agregarIf(v_heap, "==", "-1", salida_cadena1);
    generador.heap("h", v_heap);
    generador.siguienteHeap();
    generador.agregarExpresion(v_stack, v_stack, "+", "1");
    generador.agregarGoTo(etq_inicio);
    generador.agregarEtiqueta(salida_cadena1);
    //COMIENZA EL GUARDADO DE LA SEGUNA CADENA
    generador.agregarExpresion(puntero_p, "p", "+", "2");
    generador.getValorStack(v_stack, puntero_p);
    let etq_inicio2 = generador.generarEtiqueta();
    generador.agregarEtiqueta(etq_inicio2);
    generador.getValorHeap(v_heap, v_stack);
    let salida_cadena2 = generador.generarEtiqueta();
    generador.agregarIf(v_heap, "==", "-1", salida_cadena2);
    generador.heap("h", v_heap);
    generador.siguienteHeap();
    generador.agregarExpresion(v_stack, v_stack, "+", "1");
    generador.agregarGoTo(etq_inicio2);
    generador.agregarEtiqueta(salida_cadena2);
    generador.heap("h", "-1");
    generador.siguienteHeap();
    generador.stack("p", nueva_cadena);
    generador.agregarcodigo3d("return ;");
    generador.agregarcodigo3d("}");


    /////////////////////////////////////////////////////////LENGTH_CADENA////////////////////////////////////////////////

    let t_p = generador.generarTemporal();
    let t_s = generador.generarTemporal();
    let t_h = generador.generarTemporal();
    generador.sacarTemporal(t_p);
    generador.sacarTemporal(t_s);
    generador.sacarTemporal(t_h);
    generador.agregarcodigo3d("largo_cadena(){");
    generador.agregarExpresion(t_p, "p", "+", "1");
    generador.getValorStack(t_s, t_p);
    generador.agregarExpresion(t_p, "0", "", "");
    let etq_inicio_largo = generador.generarEtiqueta();
    generador.agregarEtiqueta(etq_inicio_largo);
    generador.getValorHeap(t_h, t_s);
    let etq_salida_largo = generador.generarEtiqueta();
    generador.agregarIf(t_h, "==", "-1", etq_salida_largo);
    generador.agregarExpresion(t_p, t_p, "+", "1");
    generador.agregarExpresion(t_s, t_s, "+", "1");
    generador.agregarGoTo(etq_inicio_largo);
    generador.agregarEtiqueta(etq_salida_largo);
    generador.stack("p", t_p);
    generador.agregarcodigo3d("return ;");
    generador.agregarcodigo3d("}");

    ////////////////////////////////////////////////////////////CARACTER_CADENA///////////////////////////////////////////////////////

    let tp1 = generador.generarTemporal();
    let tp2 = generador.generarTemporal();
    let tp3 = generador.generarTemporal();
    let tp4 = generador.generarTemporal();
    generador.sacarTemporal(tp1);
    generador.sacarTemporal(tp2);
    generador.sacarTemporal(tp3);
    generador.sacarTemporal(tp4);
    generador.agregarcodigo3d("caracter_cadena(){");
    generador.agregarExpresion(tp1, "p", "+", "1");
    generador.getValorStack(tp2, tp1); //PARAMETRO 1 - CADENA
    generador.agregarExpresion(tp3, "h", "", "");
    generador.agregarExpresion(tp1, tp1, "+", "1");
    generador.getValorStack(tp4, tp1); //PARAMETRO 2 - INDICE
    generador.agregarExpresion(tp1, tp2, "+", tp4);

    generador.getValorHeap(tp4, tp1);
    generador.heap("h", tp4);
    generador.siguienteHeap();
    generador.heap("h", "-1");
    generador.siguienteHeap();
    generador.stack("p", tp3);
    generador.agregarcodigo3d("return ;");
    generador.agregarcodigo3d("}");


    /////////////////////////////////////////////CONCAT_STRING//////////////////////////////////////////////////////////////////

    let tregreso = generador.generarTemporal();
    let tparametro = generador.generarTemporal();
    let tstack = generador.generarTemporal();
    let tlector = generador.generarTemporal();
    generador.sacarTemporal(tregreso);
    generador.sacarTemporal(tparametro);
    generador.sacarTemporal(tstack);
    generador.sacarTemporal(tlector);

    generador.agregarcodigo3d("concatenacion(){");
    generador.agregarExpresion(tregreso, "h", "", "");
    generador.agregarExpresion(tparametro, "p", "+", "1");
    generador.getValorStack(tstack, tparametro);
    let label_inicio = generador.generarEtiqueta();
    generador.agregarEtiqueta(label_inicio);
    generador.getValorHeap(tlector, tstack);
    let label_salida1 = generador.generarEtiqueta();
    generador.agregarIf(tlector, "==", "-1", label_salida1);
    generador.heap("h", tlector);
    generador.siguienteHeap();
    generador.agregarExpresion(tstack, tstack, "+", "1");
    generador.agregarGoTo(label_inicio);
    generador.agregarEtiqueta(label_salida1);
    //COMENZAMOS A AGREGAR LA SEGUNDA CADENA
    generador.agregarExpresion(tparametro, tparametro, "+", "1");
    generador.getValorStack(tstack, tparametro);
    let label_inicio2 = generador.generarEtiqueta();
    generador.agregarEtiqueta(label_inicio2);
    generador.getValorHeap(tlector, tstack);
    let label_salida2 = generador.generarEtiqueta();
    generador.agregarIf(tlector, "==", "-1", label_salida2);
    generador.heap("h", tlector);
    generador.siguienteHeap();
    generador.agregarExpresion(tstack, tstack, "+", "1");
    generador.agregarGoTo(label_inicio2);
    generador.agregarEtiqueta(label_salida2);
    //YA TERMINAMOS DE AGREGAR LAS 2 CADENAS, SOLO FALTA EL FIN DE CADENA
    generador.heap("h", "-1");
    generador.siguienteHeap();
    generador.stack("p", tregreso);
    generador.agregarcodigo3d("return ;");
    generador.agregarcodigo3d("}");


    ///////////////////////////////////////////////TO_LOWERCASE////////////////////////////////////////////////////////

    let tmpinicio = generador.generarTemporal();
    let tp = generador.generarTemporal();
    let ts = generador.generarTemporal();
    let th = generador.generarTemporal();
    generador.sacarTemporal(tmpinicio);
    generador.sacarTemporal(tp);
    generador.sacarTemporal(ts);
    generador.sacarTemporal(th);
    generador.agregarcodigo3d("minusculas(){");
    generador.agregarExpresion(tmpinicio, "h", "", "");
    generador.agregarExpresion(tp, "p", "+", "1");
    generador.getValorStack(ts, tp);
    generador.agregarExpresion(tp, "0", "", "");
    let label0 = generador.generarEtiqueta();
    generador.agregarEtiqueta(label0);
    generador.getValorHeap(th, ts);
    let etiqueta_salidafinal = generador.generarEtiqueta();
    let etiqueta_intermedia = generador.generarEtiqueta();
    generador.agregarIf(th, "==", "-1", etiqueta_salidafinal);
    generador.agregarIf(th, "<", "65", etiqueta_intermedia);
    generador.agregarIf(th, ">", "90", etiqueta_intermedia);
    generador.agregarExpresion(tp, th, "+", "32");
    generador.heap("h", tp);
    generador.siguienteHeap();
    generador.agregarExpresion(ts, ts, "+", "1");
    generador.agregarGoTo(label0);
    generador.agregarEtiqueta(etiqueta_intermedia);
    generador.heap("h", th);
    generador.siguienteHeap();
    generador.agregarExpresion(ts, ts, "+", "1");
    generador.agregarGoTo(label0);
    generador.agregarEtiqueta(etiqueta_salidafinal);
    generador.heap("h", "-1");
    generador.siguienteHeap();
    generador.stack("p", tmpinicio);
    generador.agregarcodigo3d("return ;");
    generador.agregarcodigo3d("}");


    //////////////////////////////////////////TO_UPPERCASE///////////////////////////////////////////////////////////////

    generador.agregarcodigo3d("mayusculas(){");
    generador.agregarExpresion(tmpinicio, "h", "", "");
    generador.agregarExpresion(tp, "p", "+", "1");
    generador.getValorStack(ts, tp);
    generador.agregarExpresion(tp, "0", "", "");
    let label1 = generador.generarEtiqueta();
    generador.agregarEtiqueta(label1);
    generador.getValorHeap(th, ts);
    let etiqueta_salidafinal1 = generador.generarEtiqueta();
    let etiqueta_intermedia1 = generador.generarEtiqueta();
    generador.agregarIf(th, "==", "-1", etiqueta_salidafinal1);
    generador.agregarIf(th, "<", "97", etiqueta_intermedia1);
    generador.agregarIf(th, ">", "122", etiqueta_intermedia1);
    generador.agregarExpresion(tp, th, "-", "32");
    generador.heap("h", tp);
    generador.siguienteHeap();
    generador.agregarExpresion(ts, ts, "+", "1");
    generador.agregarGoTo(label1);
    generador.agregarEtiqueta(etiqueta_intermedia1);
    generador.heap("h", th);
    generador.siguienteHeap();
    generador.agregarExpresion(ts, ts, "+", "1");
    generador.agregarGoTo(label1);
    generador.agregarEtiqueta(etiqueta_salidafinal1);
    generador.heap("h", "-1");
    generador.siguienteHeap();
    generador.stack("p", tmpinicio);
    generador.agregarcodigo3d("return ;");
    generador.agregarcodigo3d("}");


    ////////////////////////////////////CONCATENACION BOOLEAN_STRING////////////////////////////////////////////
    let tmp_cero= generador.generarTemporal();
    let tmp_uno= generador.generarTemporal();
    let tmp_dos= generador.generarTemporal();
    generador.sacarTemporal(tmp_cero);
    generador.sacarTemporal(tmp_uno);
    generador.sacarTemporal(tmp_dos);
    let etiqueta_inicio_asignacion_cadena= generador.generarEtiqueta();
    generador.agregarcodigo3d("concat_boolean_string(){");
    generador.agregarExpresion(tmp_dos,"h","","");
    generador.agregarExpresion(tmp_cero,"p","+","1");
    generador.getValorStack(tmp_uno,tmp_cero);
    let etiqueta_falso= generador.generarEtiqueta();
    generador.agregarIf(tmp_uno,"==","0",etiqueta_falso);
    generador.heap("h","116");
    generador.siguienteHeap();
    generador.heap("h","114");
    generador.siguienteHeap();
    generador.heap("h","117");
    generador.siguienteHeap();
    generador.heap("h","101");
    generador.siguienteHeap();
    generador.agregarGoTo(etiqueta_inicio_asignacion_cadena);
    generador.agregarEtiqueta(etiqueta_falso);
    generador.heap("h","102");
    generador.siguienteHeap();
    generador.heap("h","97");
    generador.siguienteHeap();
    generador.heap("h","108");
    generador.siguienteHeap();
    generador.heap("h","115");
    generador.siguienteHeap();
    generador.heap("h","101");
    generador.siguienteHeap();
    generador.agregarEtiqueta(etiqueta_inicio_asignacion_cadena);
    generador.agregarExpresion(tmp_cero,tmp_cero,"+","1");
    generador.getValorStack(tmp_uno,tmp_cero);
    let etiqueta_inicio_cadena= generador.generarEtiqueta();
    generador.agregarEtiqueta(etiqueta_inicio_cadena);
    generador.getValorHeap(tmp_cero,tmp_uno);
    let etiqueta_salida= generador.generarEtiqueta();
    generador.agregarIf(tmp_cero,"==","-1",etiqueta_salida);
    generador.heap("h",tmp_cero);
    generador.siguienteHeap();
    generador.agregarExpresion(tmp_uno,tmp_uno,"+","1");
    generador.agregarGoTo(etiqueta_inicio_cadena);
    generador.agregarEtiqueta(etiqueta_salida);
    generador.heap("h","-1");
    generador.siguienteHeap();
    generador.stack("p", tmp_dos);
    generador.agregarcodigo3d("return ;");
    generador.agregarcodigo3d("}");


//////////////////////////////////////////////////CONCATENACION STRING_BOOLEAN///////////////////////////////////

    let tmp_tres= generador.generarTemporal();
    generador.sacarTemporal(tmp_tres);
    generador.agregarcodigo3d("concat_string_boolean(){");
    generador.agregarExpresion(tmp_cero,"p","+","1");
    generador.getValorStack(tmp_uno,tmp_cero);
    generador.agregarExpresion(tmp_dos,"h","","");
    let label_inicio_cadena= generador.generarEtiqueta();
    generador.agregarEtiqueta(label_inicio_cadena);
    generador.getValorHeap(tmp_tres,tmp_uno);
    let label_fin_cadena= generador.generarEtiqueta();
    generador.agregarIf(tmp_tres,"==","-1",label_fin_cadena);
    generador.heap("h",tmp_tres);
    generador.siguienteHeap();
    generador.agregarExpresion(tmp_uno,tmp_uno,"+","1");
    generador.agregarGoTo(label_inicio_cadena);
    generador.agregarEtiqueta(label_fin_cadena);
    
    let etiqueta_fin_boolean= generador.generarEtiqueta();
    generador.agregarExpresion(tmp_cero,tmp_cero,"+","1");
    generador.getValorStack(tmp_uno,tmp_cero);
    let etiqueta_falso2= generador.generarEtiqueta();
    generador.agregarIf(tmp_uno,"==","0",etiqueta_falso2);
    generador.heap("h","116");
    generador.siguienteHeap();
    generador.heap("h","114");
    generador.siguienteHeap();
    generador.heap("h","117");
    generador.siguienteHeap();
    generador.heap("h","101");
    generador.siguienteHeap();
    generador.agregarGoTo(etiqueta_fin_boolean);
    generador.agregarEtiqueta(etiqueta_falso2);
    generador.heap("h","102");
    generador.siguienteHeap();
    generador.heap("h","97");
    generador.siguienteHeap();
    generador.heap("h","108");
    generador.siguienteHeap();
    generador.heap("h","115");
    generador.siguienteHeap();
    generador.heap("h","101");
    generador.siguienteHeap();
    generador.agregarEtiqueta(etiqueta_fin_boolean);
    generador.heap("h","-1");
    generador.siguienteHeap();
    generador.stack("p", tmp_dos);
    generador.agregarcodigo3d("return ;");
    generador.agregarcodigo3d("}");

////////////////////////////////////////////////IGUALDAD DE STRINGS/////////////////////////////
    let temporalparap= generador.generarTemporal();
    let acceso1= generador.generarTemporal();
    let acceso2= generador.generarTemporal();
    let lector1= generador.generarTemporal();
    let lector2= generador.generarTemporal();
    let valorigualdad= generador.generarTemporal();
    generador.sacarTemporal(temporalparap);
    generador.sacarTemporal(acceso1);
    generador.sacarTemporal(acceso2);
    generador.sacarTemporal(lector1);
    generador.sacarTemporal(lector2);
    generador.sacarTemporal(valorigualdad);
    generador.agregarcodigo3d("igualacion_strings(){");
    generador.agregarExpresion(valorigualdad,"1","","");
    generador.agregarExpresion(temporalparap,"p","+","1");
    generador.getValorStack(acceso1,temporalparap);
    generador.agregarExpresion(temporalparap,temporalparap,"+","1");
    generador.getValorStack(acceso2,temporalparap);
    let etiqueta_lectura= generador.generarEtiqueta();
    generador.agregarEtiqueta(etiqueta_lectura);
    generador.getValorHeap(lector1,acceso1);
    generador.getValorHeap(lector2,acceso2);
    let etiquetatrueif_1= generador.generarEtiqueta();
    let etiquetafalse_ambosif= generador.generarEtiqueta();
    generador.agregarIf(lector1,"==","-1",etiquetatrueif_1);
    generador.agregarGoTo(etiquetafalse_ambosif);
    generador.agregarEtiqueta(etiquetatrueif_1);
    let etiquetasalida= generador.generarEtiqueta();
    generador.agregarIf(lector2,"==","-1",etiquetasalida);
    generador.agregarGoTo(etiquetafalse_ambosif);
    generador.agregarEtiqueta(etiquetafalse_ambosif);
    let etiqueta_cambio_valor= generador.generarEtiqueta();
    generador.agregarIf(lector1,"!=",lector2,etiqueta_cambio_valor);
    generador.agregarExpresion(acceso1,acceso1,"+","1");
    generador.agregarExpresion(acceso2,acceso2,"+","1");
    generador.agregarGoTo(etiqueta_lectura);
    generador.agregarEtiqueta(etiqueta_cambio_valor);
    generador.agregarExpresion(valorigualdad,"0","","");
    generador.agregarEtiqueta(etiquetasalida);
    generador.stack("p", valorigualdad);
    generador.agregarcodigo3d("return ;");
    generador.agregarcodigo3d("}");


    generador.agregarComentarios("FIN FUNCIONES NATIVAS");



}

import { generacion } from "./generacion";

export function generarFuncionesNativas() {
    const generador= generacion.getGenerador();

    generador.agregarComentarios("INICIO FUNCIONES NATIVAS");

    /////////////////////////////////////////////////////////////FUNCION POTENCIA//////////////////////////////////////////////////
    
    generador.agregarcodigo3d("potencia(){");
    let t0= generador.generarTemporal();
    let t2= generador.generarTemporal();
    let t3= generador.generarTemporal();
    let t4= generador.generarTemporal();
    generador.sacarTemporal(t0);
    generador.sacarTemporal(t2);
    generador.sacarTemporal(t3);
    generador.sacarTemporal(t4);
    generador.agregarExpresion(t0,"1","","");
    generador.agregarExpresion(t2,"0","","");
    generador.getValorStack(t3,"p+1");
    generador.getValorStack(t4,"p+2");
    let etiquetaInicio= generador.generarEtiqueta();
    generador.agregarEtiqueta(etiquetaInicio);

    let etiquetav= generador.generarEtiqueta();
    let etiquetaf= generador.generarEtiqueta();
    generador.agregarIf(t0,"<",t4,etiquetav);
    generador.agregarGoTo(etiquetaf);
    generador.agregarEtiqueta(etiquetav);

    let ev1if= generador.generarEtiqueta();
    let ev2if= generador.generarEtiqueta();
    let esalida= generador.generarEtiqueta();
    generador.agregarIf(t2,"<",t3,ev1if);
    generador.agregarGoTo(ev2if);
    generador.agregarEtiqueta(ev1if);
    generador.agregarExpresion(t2,t3,"*",t3);
    generador.agregarGoTo(esalida);
    generador.agregarEtiqueta(ev2if);
    generador.agregarExpresion(t2,t2,"*",t3);
    generador.agregarEtiqueta(esalida);
    generador.agregarExpresion(t0,t0,"+","1");
    generador.agregarGoTo(etiquetaInicio);
    generador.agregarEtiqueta(etiquetaf);
    generador.stack("p",t2);
    generador.agregarcodigo3d("return ;");
    generador.agregarcodigo3d("}");


    ////////////////////////////NATIVA IMPRIMIR_STRING////////////////////////////////////////////////////////////////

    generador.agregarcodigo3d("console(){");
    let theap= generador.generarTemporal();
    let tvalorheap= generador.generarTemporal();
    generador.sacarTemporal(theap);
    generador.sacarTemporal(tvalorheap);
    let inicio_lectura= generador.generarEtiqueta();
    let etq_if_falsa= generador.generarEtiqueta();
    generador.getValorStack(theap,"p");
    generador.agregarEtiqueta(inicio_lectura);
    generador.getValorHeap(tvalorheap,theap);
    generador.agregarIf(tvalorheap,"==","-1",etq_if_falsa);
    generador.printchar(tvalorheap);
    generador.agregarExpresion(theap,theap,"+","1");
    generador.agregarGoTo(inicio_lectura);
    generador.agregarEtiqueta(etq_if_falsa);
    //IMPRIMIMOS UN SALTO DE LINEA
    generador.printchar("10");
    generador.agregarcodigo3d("return ;");
    generador.agregarcodigo3d("}");

    ////////////////////////////////////// CONCATENACION STRING_ENTERO//////////////////////////////////////////////////////

    generador.agregarcodigo3d("union_string_entero(){");
    let temporal_inicio_nueva_cadena= generador.generarTemporal();
    let contador_numeros= generador.generarTemporal();
    let temp_p= generador.generarTemporal();
    let temp_stack= generador.generarTemporal();
    let temp_valor_heap= generador.generarTemporal();
    let temp_decimales= generador.generarTemporal();
    let etq_inicio_guardado= generador.generarEtiqueta();

    generador.sacarTemporal(temporal_inicio_nueva_cadena);
    generador.sacarTemporal(contador_numeros);
    generador.sacarTemporal(temp_p);
    generador.sacarTemporal(temp_stack);
    generador.sacarTemporal(temp_valor_heap);
    generador.sacarTemporal(temp_decimales);

    generador.agregarExpresion(temporal_inicio_nueva_cadena,"h","","");
    generador.agregarExpresion(contador_numeros,"0","","");
    generador.agregarExpresion(temp_p,"p","+","1");
    generador.getValorStack(temp_stack,temp_p);
    //INICIA EL GUARDADO DE LA CADENA
    generador.agregarEtiqueta(etq_inicio_guardado);
    generador.getValorHeap(temp_valor_heap,temp_stack);
    let etq_fin= generador.generarEtiqueta();
    generador.agregarIf(temp_valor_heap,"==","-1",etq_fin);
    generador.heap("h",temp_valor_heap);
    generador.siguienteHeap();
    generador.agregarExpresion(temp_stack,temp_stack,"+","1");
    generador.agregarGoTo(etq_inicio_guardado);
    generador.agregarEtiqueta(etq_fin);
    //TERMINAMOS EL GUARDADO DE LA CADENA
    //INICIA EL RECORRIDO PARA EL ENTERO
    generador.agregarExpresion(temp_p,"p","+","2");
    generador.getValorStack(temp_stack,temp_p);
    generador.agregarExpresion(temp_p,"0","","");
    let salto_1= generador.generarEtiqueta();
    generador.agregarIf(temp_stack,"!=","0",salto_1);
    generador.agregarExpresion(contador_numeros,contador_numeros,"+","1");
    generador.agregarEtiqueta(salto_1);
    //INICIA LA VERIFICACION SI EL NUMERO ES NEGATIVO
    let salto_2= generador.generarEtiqueta();
    generador.agregarIf(temp_stack,">=","0",salto_2);
    generador.heap("h","45");
    generador.siguienteHeap();
    //CAMBIAMOS EL VALOR DE NEGATIVO A POSITIVO
    generador.agregarExpresion(temp_stack,"-1","*",temp_stack);
    generador.agregarEtiqueta(salto_2);
    //AQUI INICIA EL CAMBIO DE LUGAR PARA LOS NUMEROS
    let salto_3= generador.generarEtiqueta();
    generador.agregarIf(temp_stack,"<=","0",salto_3);
    generador.agregarExpresion(temp_p,temp_p,"*","10");
    generador.agregarcodigo3d(temp_valor_heap+"= fmod("+temp_stack+",10);");
    generador.agregarExpresion(temp_p,temp_p,"+",temp_valor_heap);
    generador.agregarExpresion(temp_stack,temp_stack,"/","10");
    generador.agregarcodigo3d(temp_decimales+"= fmod("+temp_stack+",1);");
    generador.agregarExpresion(temp_stack,temp_stack,"-",temp_decimales);
    generador.agregarExpresion(contador_numeros,contador_numeros,"+","1");
    generador.agregarGoTo(salto_2);
    generador.agregarEtiqueta(salto_3);
    //AQUI YA TENEMOS EL NUMERO EN TMP_P Y PODEMOS AGREGARLO A LA CADENA
    let salto_4= generador.generarEtiqueta();
    generador.agregarIf(contador_numeros,"==","0",salto_4);
    generador.agregarcodigo3d(temp_stack+"= fmod("+temp_p+",10);");
    generador.agregarExpresion(temp_p,temp_p,"/","10");
    generador.agregarcodigo3d(temp_decimales+"= fmod("+temp_p+",1);");
    generador.agregarExpresion(temp_p,temp_p,"-",temp_decimales);
    generador.agregarExpresion(contador_numeros,contador_numeros,"-","1");
    //SUMAMOS 48 AL NUMERO PARA QUE SEA EL ASCII
    generador.agregarExpresion(temp_valor_heap,temp_stack,"+","48");
    generador.heap("h",temp_valor_heap);
    generador.siguienteHeap();
    generador.agregarGoTo(salto_3);
    generador.agregarEtiqueta(salto_4);
    generador.heap("h","-1");
    generador.siguienteHeap();
    generador.stack("p",temporal_inicio_nueva_cadena);
    generador.agregarcodigo3d("return ;");
    generador.agregarcodigo3d("}");

////////////////////////////////////// CONCATENACION ENTERO_STRING/////////////////////////////////////////////////////

    generador.agregarcodigo3d("union_entero_string(){");
    generador.agregarExpresion(temporal_inicio_nueva_cadena,"h","","");
    generador.agregarExpresion(contador_numeros,"0","","");
    generador.agregarExpresion(temp_p,"p","+","1");
    generador.getValorStack(temp_stack,temp_p);
    generador.agregarExpresion(temp_p,"0","","");

    let salto_1_1= generador.generarEtiqueta();
    generador.agregarIf(temp_stack,"!=","0",salto_1_1);
    generador.agregarExpresion(contador_numeros,contador_numeros,"+","1");
    generador.agregarEtiqueta(salto_1_1);
    //INICIA LA VERIFICACION SI EL NUMERO ES NEGATIVO
    let salto_2_2= generador.generarEtiqueta();
    generador.agregarIf(temp_stack,">=","0",salto_2_2);
    generador.heap("h","45");
    generador.siguienteHeap();
    //CAMBIAMOS EL VALOR DE NEGATIVO A POSITIVO
    generador.agregarExpresion(temp_stack,"-1","*",temp_stack);
    generador.agregarEtiqueta(salto_2_2);
    //AQUI INICIA EL CAMBIO DE LUGAR PARA LOS NUMEROS
    let salto_3_3= generador.generarEtiqueta();
    generador.agregarIf(temp_stack,"<=","0",salto_3_3);
    generador.agregarExpresion(temp_p,temp_p,"*","10");
    generador.agregarcodigo3d(temp_valor_heap+"= fmod("+temp_stack+",10);");
    generador.agregarExpresion(temp_p,temp_p,"+",temp_valor_heap);
    generador.agregarExpresion(temp_stack,temp_stack,"/","10");
    generador.agregarcodigo3d(temp_decimales+"= fmod("+temp_stack+",1);");
    generador.agregarExpresion(temp_stack,temp_stack,"-",temp_decimales);
    generador.agregarExpresion(contador_numeros,contador_numeros,"+","1");
    generador.agregarGoTo(salto_2_2);
    generador.agregarEtiqueta(salto_3_3);
    //AQUI YA TENEMOS EL NUMERO EN TMP_P Y PODEMOS AGREGARLO A LA CADENA
    let salto_4_4= generador.generarEtiqueta();
    generador.agregarIf(contador_numeros,"==","0",salto_4_4);
    generador.agregarcodigo3d(temp_stack+"= fmod("+temp_p+",10);");
    generador.agregarExpresion(temp_p,temp_p,"/","10");
    generador.agregarcodigo3d(temp_decimales+"= fmod("+temp_p+",1);");
    generador.agregarExpresion(temp_p,temp_p,"-",temp_decimales);
    generador.agregarExpresion(contador_numeros,contador_numeros,"-","1");
    //SUMAMOS 48 AL NUMERO PARA QUE SEA EL ASCII
    generador.agregarExpresion(temp_valor_heap,temp_stack,"+","48");
    generador.heap("h",temp_valor_heap);
    generador.siguienteHeap();
    generador.agregarGoTo(salto_3_3);
    generador.agregarEtiqueta(salto_4_4);
    //INICIA EL GUARDADO DE LA CADENA
    generador.agregarExpresion(temp_p,"p","+","2");
    generador.getValorStack(temp_stack,temp_p);
    //INICIA EL GUARDADO DE LA CADENA
    let etq_inicio_guardado_1=generador.generarEtiqueta()
    generador.agregarEtiqueta(etq_inicio_guardado_1);
    generador.getValorHeap(temp_valor_heap,temp_stack);
    let etq_fin_1= generador.generarEtiqueta();
    generador.agregarIf(temp_valor_heap,"==","-1",etq_fin_1);
    generador.heap("h",temp_valor_heap);
    generador.siguienteHeap();
    generador.agregarExpresion(temp_stack,temp_stack,"+","1");
    generador.agregarGoTo(etq_inicio_guardado_1);
    generador.agregarEtiqueta(etq_fin_1);
    //TERMINA EL GUARDADO DE LA CADENA, SOLO PONEMOS EL -1 AL FINAL
    generador.heap("h","-1");
    generador.siguienteHeap();
    generador.stack("p",temporal_inicio_nueva_cadena);
    generador.agregarcodigo3d("return ;");
    generador.agregarcodigo3d("}");


///////////////////////////////////////////////////STRING + STRING //////////////////////////////////////////////////////////

    let puntero_p= generador.generarTemporal();
    let nueva_cadena= generador.generarTemporal();
    let v_stack= generador.generarTemporal();
    let v_heap= generador.generarTemporal();
    generador.sacarTemporal(puntero_p);
    generador.sacarTemporal(nueva_cadena);
    generador.sacarTemporal(v_stack);
    generador.sacarTemporal(v_heap);

    generador.agregarcodigo3d("union_string_string(){");
    generador.agregarExpresion(nueva_cadena,"h","","");
    generador.agregarExpresion(puntero_p,"p","+","1");
    generador.getValorStack(v_stack,puntero_p);
    //COMIENZA EL GUARDADO DE LA PRIMERA CADENA
    let etq_inicio= generador.generarEtiqueta();
    generador.agregarEtiqueta(etq_inicio);
    generador.getValorHeap(v_heap,v_stack);
    let salida_cadena1= generador.generarEtiqueta();
    generador.agregarIf(v_heap,"==","-1",salida_cadena1);
    generador.heap("h",v_heap);
    generador.siguienteHeap();
    generador.agregarExpresion(v_stack,v_stack,"+","1");
    generador.agregarGoTo(etq_inicio);
    generador.agregarEtiqueta(salida_cadena1);
    //COMIENZA EL GUARDADO DE LA SEGUNA CADENA
    generador.agregarExpresion(puntero_p,"p","+","2");
    generador.getValorStack(v_stack,puntero_p);
    let etq_inicio2= generador.generarEtiqueta();
    generador.agregarEtiqueta(etq_inicio2);
    generador.getValorHeap(v_heap,v_stack);
    let salida_cadena2= generador.generarEtiqueta();
    generador.agregarIf(v_heap,"==","-1",salida_cadena2);
    generador.heap("h",v_heap);
    generador.siguienteHeap();
    generador.agregarExpresion(v_stack,v_stack,"+","1");
    generador.agregarGoTo(etq_inicio2);
    generador.agregarEtiqueta(salida_cadena2);
    generador.heap("h","-1");
    generador.siguienteHeap();
    generador.stack("p",nueva_cadena);
    generador.agregarcodigo3d("return ;");
    generador.agregarcodigo3d("}");


/////////////////////////////////////////////////////////LENGTH_CADENA////////////////////////////////////////////////

    let t_p= generador.generarTemporal();
    let t_s= generador.generarTemporal();
    let t_h= generador.generarTemporal();
    generador.sacarTemporal(t_p);
    generador.sacarTemporal(t_s);
    generador.sacarTemporal(t_h);
    generador.agregarcodigo3d("largo_cadena(){");
    generador.agregarExpresion(t_p,"p","+","1");
    generador.getValorStack(t_s,t_p);
    generador.agregarExpresion(t_p,"0","","");
    let etq_inicio_largo= generador.generarEtiqueta();
    generador.agregarEtiqueta(etq_inicio_largo);
    generador.getValorHeap(t_h,t_s);
    let etq_salida_largo= generador.generarEtiqueta();
    generador.agregarIf(t_h,"==","-1",etq_salida_largo);
    generador.agregarExpresion(t_p,t_p,"+","1");
    generador.agregarExpresion(t_s,t_s,"+","1");
    generador.agregarGoTo(etq_inicio_largo);
    generador.agregarEtiqueta(etq_salida_largo);
    generador.stack("p",t_p);
    generador.agregarcodigo3d("return ;");
    generador.agregarcodigo3d("}");

////////////////////////////////////////////////////////////CARACTER_CADENA///////////////////////////////////////////////////////

    let tp1= generador.generarTemporal();
    let tp2= generador.generarTemporal();
    let tp3= generador.generarTemporal();
    let tp4= generador.generarTemporal();
    generador.sacarTemporal(tp1);
    generador.sacarTemporal(tp2);
    generador.sacarTemporal(tp3);
    generador.sacarTemporal(tp4);
    generador.agregarcodigo3d("caracter_cadena(){");
    generador.agregarExpresion(tp1,"p","+","1");
    generador.getValorStack(tp2,tp1); //PARAMETRO 1 - CADENA
    generador.agregarExpresion(tp3,"h","","");
    generador.agregarExpresion(tp1,tp1,"+","1");
    generador.getValorStack(tp4,tp1); //PARAMETRO 2 - INDICE
    generador.agregarExpresion(tp1,tp2,"+",tp4);

    generador.getValorHeap(tp4,tp1);
    generador.heap("h",tp4);
    generador.siguienteHeap();
    generador.heap("h","-1");
    generador.siguienteHeap();
    generador.stack("p",tp3);
    generador.agregarcodigo3d("return ;");
    generador.agregarcodigo3d("}");





    generador.agregarComentarios("FIN FUNCIONES NATIVAS");



}

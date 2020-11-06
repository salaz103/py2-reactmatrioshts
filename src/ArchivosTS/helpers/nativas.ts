import { generacion } from "./generacion";

export function generarFuncionesNativas() {
    const generador= generacion.getGenerador();

    generador.agregarComentarios("INICIO FUNCIONES NATIVAS");

    //FUNCION POTENCIA
    
    generador.agregarcodigo3d("potencia(){")
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

    
    generador.agregarComentarios("FIN FUNCIONES NATIVAS");
}

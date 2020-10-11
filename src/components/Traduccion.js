import React from 'react';
import AceEditor from 'react-ace';
import Action from './Action';
import Traducir from '../analizadores/matrioshts';
import {connect} from 'react-redux';
import {agregarCodigo} from '../actions/ts';
import "ace-builds/src-noconflict/mode-typescript";
import "ace-builds/src-noconflict/theme-tomorrow_night_blue";
import "ace-builds/src-noconflict/ext-language_tools";
import nodobase from '../arbolBase/nodobase';


class Traduccion extends React.Component {
  state = {
    valor: " ",
    codigofinal:"",
  };

  onChange= (newvalue)=>{
    this.setState(()=>({
        valor:newvalue
    }))
  };

  busquedaInstrucciones=(hijos)=>{
    for (let i = 0; i < hijos.length; i++) {
      if(hijos[i].tipo){
        if(hijos[i].tipo=='INSTRUCCIONES'){
          return hijos[i].hijos  //AQUI ESTAMOS REGRESANDO UN ARREGLO DE OBJETOS [{},{}]
        }
      }
    }
  };

  busquedaFunciones=(instrucciones)=>{
    //ESTAMOS RECIBIENDO UN ARREGLO DE OBJETOS - [{},{}] SERIAN LAS INSTRUCCIONES DE UNA FUNCION
    for (let i = 0; i < instrucciones.length; i++) {
      if(instrucciones[i].tipo=='FUNCION'){
        //SI ES UNA FUNCION REGRESAMOS TRUE
        return true;
      }
    }
    //SI REGRESAMOS FALSE ES POR QUE NO VIENEN FUNCIONES EN LAS INSTRUCCIONES
    return false;
  }


  lecturaFunciones=(nodoPadre)=>{
    //AQUI ESTOY RECIBIENDO UN NODO {FUNCION,HIJOS,POS}
    const hijos= nodoPadre.hijos;
    let recolector='';
    for (let i = 0; i < hijos.length; i++) {
      if(hijos[i].tipo){
        //SI TRAE TIPO QUIERE DECIR QUE TRAE HIJOS
       let intermedio= this.lecturaFunciones(hijos[i]);
       recolector += intermedio;
      }else{
        //QUIERE DECIR QUE SON LOS HIJOS NATOS DE LA FUNCION QUE ESTAMOS LEYENDO
        //console.log(hijos[i]);
        recolector += hijos[i];
      }
    }

    return recolector;
  }

  lecturaPadre=(nodoPadre)=>{
    //AQUI ESTOY RECIBIENDO UN NODO {TIPO,HIJOS,POS}
    const hijos= nodoPadre.hijos;
    for (let i = 0; i < hijos.length; i++) {
      if (hijos[i].tipo) {
        ///SI LOS HIJOS TRAEN UN TIPO, QUIERE DECIR QUE TRAEN HIJOS
        if(hijos[i].tipo=='INSTRUCCIONES'){
          //SI LO QUE ESTOY LEYENDO SON LAS INSTRUCCIONES, AQUI ES DONDE MANDO A LEER TODO MENOS LAS FUNCIONES
          this.lecturaPadre(hijos[i]);
        }else if(hijos[i].tipo!='FUNCION'){
          //SI LA INSTRUCCION QUE ESTOY LEYENDO ES DIFERENTE A FUNCION ENTONCES LA LEO
          this.lecturaPadre(hijos[i]);
        }
      }else{
        console.log(hijos[i]);
      }
    }
  }

  cambioDeNombre=(nombrePadre,nodoFuncion)=>{
    const nuevoNombre= nombrePadre+"_"+nodoFuncion.hijos[1];
    nodoFuncion.hijos[1]= nuevoNombre;
    return nodoFuncion;
  }

  inicioBusqueda=(nodoPadre)=>{ //ESTE NODO PADRE ES UN OBJETO {TIPO,HIJOS,POS}
    //console.log(nodoPadre.hijos);
    let recolector='';
    const instruccionesActuales= this.busquedaInstrucciones(nodoPadre.hijos); //AQUI ESTAMOS ENVIANDO UN ARREGLO [$1,$2]
    //AHORA YA TENEMOS EL ARREGLO DE OBJETOS, QUE SON LAS INSTRUCCIONES [{},{}]
    //TENEMOS QUE VERIFICAR SI EN ESTAS INSTRUCCIONES VIENE UNA FUNCION
    const vieneFuncion= this.busquedaFunciones(instruccionesActuales);
    if(vieneFuncion){
      //SI VIENE UNA FUNCION ENTONCES TENEMOS QUE IMPRIMIR ANTES ESA FUNCION Y CAMBIAR SU NOMBRE
      //TENDRIA QUE RECORRER LAS INSTRUCCIONES POR QUE PUEDE QUE VENGA MAS DE UNA FUNCION
      const nombrePadre= nodoPadre.hijos[1];
      
      for (let i = 0; i < instruccionesActuales.length; i++) {
        if(instruccionesActuales[i].tipo=='FUNCION'){
            const nuevoNodoFuncion= this.cambioDeNombre(nombrePadre,instruccionesActuales[i]);
            this.inicioBusqueda(nuevoNodoFuncion);
        }
      } 
      //YA TERMINE DE RECOLECTAR TODAS LAS FUNCIONES AHORA ME TOCA RECORRER LA FUNCION PADRE PERO
      //EN SUS INSTRUCCIONES DEBO RECORRER TODO A EXCEPCION DE LAS FUNCIONES
      this.lecturaPadre(nodoPadre);
      
    }else{
      //SI NO VIENE FUNCION, PODEMOS IMPRIMIR ESTA FUNCION DE FORMA NORMAL
      //LO QUE VOY A ENVIAR AQUI ES UN OBJETO {FUNCION,HIJOS,POS}
      //ESTA LECTURA SIGNIFICA QUE EN LAS INSTRUCCIONES NO VIENEN FUNCIONES, ES EL CASO MINIMO
      //nodoPadre.hijos[1]="nuevoNombre";
      recolector= this.lecturaFunciones(nodoPadre);
    }
    
    return recolector;
  }
  

//FUNCION QUE SOLO DESANIDA EL CODIGO
 desanidar=(instrucciones)=>{
//AQUI ESTOY RECIBIENDO UN ARREGLO DE INSTRUCCIONES [{},{},{}]
  //console.log("ENTRANDO A DESANIDAR, RECOLECTOR: "+recolector);
  let recolector= '';
  for (let a = 0; a < instrucciones.length; a++) {
    //LEEMOS LAS INSTRUCCIONES
    if(instrucciones[a].tipo){
      //SI LA INSTRUCCION TRAE TIPO ES POR QUE TRAE HIJOS
      //TENEMOS QUE LEER LOS HIJOS
      //PERO ANTES DE LEER LOS HIJOS TENEMOS QUE VER SI ES UNA FUNCION
      if(instrucciones[a].tipo!='FUNCION'){
        let intermedio= this.desanidar(instrucciones[a].hijos);
        recolector= recolector+intermedio;
      }else{
        //SIGNIFICA QUE ENCONTRAMOS UNA FUNCION
        //console.log(instrucciones[a]);
        let intermedio2=this.inicioBusqueda(instrucciones[a]);
        recolector += intermedio2;
      }
      
    }else{
      //SI LO QUE RECIBI NO TRAE TIPO, ES POR QUE SON LOS HIJOS DE ALGUIEN
      //ENTONCES SOLO LEO A SUS HIJOS
      recolector= recolector+ instrucciones[a];
    }

  }
  return recolector;
  //AL TERMINAR DE RECOLECTAR Y DESANIDAR LAS FUNCIONES SE TIENE QUE MANDAR EL CODIGO AL ESTADO

 }


  traducir=()=>{
      //console.log(this.state.valor);
      let ast;
      ast = Traducir.parse(this.state.valor);
      //this.props.agregarCodigo(this.state.valor);
      //console.log("Recorriendo el arbol:");
      
      let recolector= this.desanidar(ast.hijos,recolector);
      //this.setState(this.state.valor);
      console.log(recolector);
  }

  ejecutar=()=>{
      console.log('Presiono el boton de ejecutar');
  }

  render() {

    return (
      <div>
        <div className='container'>
        <AceEditor
            onChange={this.onChange}
            width='750px'
            height='400px'
            mode="typescript"
            theme="tomorrow_night_blue"
            name="editor"
            fontSize='20px'
        />
        <div className='inline-buttons'>
        <Action
            action={this.traducir}
            nombre='Traducir'
        />
        <Action
            action={this.ejecutar}
            nombre= 'Ejecutar'
        />
        </div>
        </div>
      </div>
    );
  }
}


export default connect(null,{agregarCodigo})(Traduccion)



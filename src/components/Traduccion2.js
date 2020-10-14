import React from 'react';
import AceEditor from 'react-ace';
import Action from './Action';
import Traducir from '../analizadores/matrioshts';
import Ejecutar from '../analizadores/ejecutar';
import {connect} from 'react-redux';
import {agregarCodigo,guardartextotraduccion} from '../actions/ts';
import Consola from './Consola';
import "ace-builds/src-noconflict/mode-typescript";
import "ace-builds/src-noconflict/theme-tomorrow_night_blue";
import "ace-builds/src-noconflict/ext-language_tools";
import {desanidar,AST_grafo} from '../ArchivosTS/Desanidar';
import {entorno} from '../ArchivosTS/desanidamiento/entorno';
import {listaerrores} from '../ArchivosTS/entorno/listaerrores';

class Traduccion2 extends React.Component {
  state = {
    valorEditor1: " ",
    codigoDesanidado:"",
    textot:''
  };

  onChange= (newvalue)=>{
    this.setState(()=>({
      valorEditor1:newvalue
    }))
  };

  ingresoManual= (newvalue)=>{
    this.setState(()=>({
      codigoDesanidado:newvalue
    }))
  };

  onChange2= (codigo)=>{
    this.setState(()=>({
      codigoDesanidado:codigo
    }))
  };


  traducir=()=>{
      let ast;
      let graphviz;
      ast = Traducir.parse(this.state.valorEditor1);
      let valor= this.state.valorEditor1;
      console.log(ast);
      
      
      let ambito= new entorno();
      let codigofinal=desanidar(ast,ambito);
      graphviz= AST_grafo(ast);
      console.log(codigofinal);
      this.onChange2(codigofinal);
      this.props.agregarCodigo(graphviz);
  }

  ejecutar=()=>{

    listaerrores.obtenerLista().limpiar();
    let ast=null;
    ast= Ejecutar.parse(this.state.codigoDesanidado);
    console.log(ast);
    let lista= listaerrores.obtenerLista();
    console.log(lista);
  }



  render() {

    return (
      <div>
        <div className='container'>

        <div className='container-inline2'>
          <h1>Entrada traduccion</h1>
          <h1>Salida traduccion</h1>
        </div>

        <div className='container-inline'>
        <AceEditor
            onChange={this.onChange}
            width='1900px'
            height='400px'
            mode="typescript"
            theme="tomorrow_night_blue"
            name="editor1"
            //value= {this.state.textot}
            fontSize='20px'
        />

        <AceEditor
            onChange={this.ingresoManual}
            width='1900px'
            height='400px'
            mode="typescript"
            theme="tomorrow_night_blue"
            name="editor"
            value={this.state.codigoDesanidado}
            fontSize='20px'
        />
        </div>
      

        <div className='inline-buttons'>
        <Action
            action={this.traducir}
            nombre='Traducir'
        />
        <Action
            action={this.ejecutar}
            nombre= 'Ejecutar'
        />

       <Consola/>

        </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state =>{
  return{
    textot: state.storecodigo.textot
  }
}



export default connect(mapStateToProps,{agregarCodigo})(Traduccion2)

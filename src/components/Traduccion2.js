import React from 'react';
import AceEditor from 'react-ace';
import Action from './Action';
import Traducir from '../analizadores/matrioshts';
import Ejecutar from '../analizadores/ejecutar';
import {connect} from 'react-redux';
import {agregarCodigo,guardartextotraduccion} from '../actions/ts';
import Consola from './Consola';
import "ace-builds/src-noconflict/mode-typescript";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-tomorrow_night_blue";
import "ace-builds/src-noconflict/ext-language_tools";
import {desanidar,AST_grafo} from '../ArchivosTS/Desanidar';
import {entorno} from '../ArchivosTS/desanidamiento/entorno';
import {listaerrores} from '../ArchivosTS/entorno/listaerrores';
import inicioTraduccion from '../ArchivosTS/Traducir';
import {codigo3dfinal} from '../ArchivosTS/helpers/helpers';

class Traduccion2 extends React.Component {
  state = {
    valorEditor1: " ",
    codigoDesanidado:"",
    valorEditor3D: " ",
    textot:'',
    encabezado:'',
    codigo3d:''
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

  ingresoManual2= (newvalue)=>{
    this.setState(()=>({
      valorEditor3D:newvalue
    }))
  };

  onChange2= (codigo)=>{
    this.setState(()=>({
      codigoDesanidado:codigo
    }))
  };

  setearC3D= (codigo)=>{
    this.setState(()=>({
      valorEditor3D:codigo
    }))
  };


  desanidar=()=>{
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

  traducir=()=>{

    //listaerrores.obtenerLista().limpiar();
    let ast=null;
    ast= Ejecutar.parse(this.state.codigoDesanidado);
    //AQUI COMIENZA LA TRADUCCIÓN
    inicioTraduccion(ast);
    //UNA VEZ TERMINA LA TRADUCCION, EN LA STORE YA ESTA EL C3D
    //SOLO HAY QUE SETEAR EL CODIGO, PARA ESO USAREMOS UNA FUNCION HELPER
    let c3d= codigo3dfinal();
    //console.log(c3d);

    this.setearC3D(c3d);

    /*let lista= listaerrores.obtenerLista();
    console.log(lista);*/
  }

  optimizar=()=>{

  }



  render() {

    return (
      <div>
        <div className='container'>

        <div className='container-inline2'>
          <h1>Entrada C-Alto nivel</h1>
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

      
        </div>

        <div className='container-inline2'>
          <h1>Salida Desanidada</h1>
          <h1>Salida C3D</h1>
        </div>

        <div className='container-inline'>

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


        <AceEditor
            onChange={this.ingresoManual2}
            width='1900px'
            height='400px'
            mode="c_cpp"
            theme="tomorrow_night_blue"
            name="editor1"
            value= {this.state.valorEditor3D}
            fontSize='20px'
        />

        
        </div>

        <div className='inline-buttons'>
        <Action
            action={this.desanidar}
            nombre='Desanidar'
        />
        <Action
            action={this.traducir}
            nombre= 'TraducirC3D'
        />
        <Action
            action={this.optimizar}
            nombre= 'Optimizar'
        />

        </div>

        
        
        <Consola/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state =>{
  return{
    textot: state.storecodigo.textot,
    encabezado: state.storecodigo.encabezado
  }
}



export default connect(mapStateToProps,{agregarCodigo})(Traduccion2)

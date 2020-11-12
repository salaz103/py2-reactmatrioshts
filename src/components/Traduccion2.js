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
import {codigo3dfinal,limpiarTodo,agregarErrores_L_S} from '../ArchivosTS/helpers/helpers';

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
      /*let ast;
      let graphviz;
      ast = Traducir.parse(this.state.codigoDesanidado);
      //let valor= this.state.valorEditor1;
      //console.log(ast);
      
      
      //let ambito= new entorno();
      //let codigofinal=desanidar(ast,ambito);
      graphviz= AST_grafo(ast);
      //console.log(codigofinal);
      //this.onChange2(codigofinal);
      this.props.agregarCodigo(graphviz);*/
  }

  traducir=()=>{

    //PRIMERO EL AST
      /*let ast1;
      let graphviz;
      ast1 = Traducir.parse(this.state.codigoDesanidado);
      graphviz= AST_grafo(ast1);
      this.props.agregarCodigo(graphviz);*/

    //CODIGO 3D
    listaerrores.obtenerLista().limpiar();
    let ast=null;
    ast= Ejecutar.parse(this.state.codigoDesanidado);
    //AQUI COMIENZA LA TRADUCCIÓN
    //console.log(ast);
    //ANTES DE COMENZAR LA TRADUCCION, VAMOS A LIMPIAR TODO
    limpiarTodo();
    inicioTraduccion(ast);
    //UNA VEZ TERMINA LA TRADUCCION, EN LA SINGLETON YA ESTA EL C3D
    //SOLO HAY QUE SETEAR EL CODIGO, PARA ESO USAREMOS UNA FUNCION HELPER
    let c3d= codigo3dfinal();
    //console.log(c3d);

    this.setearC3D(c3d);

    //SETEAR ERRORES LEXICOS Y SINTACTICOS
    agregarErrores_L_S();
  }

  optimizar=()=>{

  }



  render() {

    return (
      <div>
        <div className='container'>

       

        <div className='container-inline2'>
          <h1>Entrada- Alto Nivel</h1>
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

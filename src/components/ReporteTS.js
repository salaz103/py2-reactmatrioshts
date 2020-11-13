import React from 'react';
import {connect} from 'react-redux';




const ReporteTS= (props)=>(
    <div>
        <div className='container-inline2'>
          <h1>TS DESPUES DE TRADUCIR A C3D</h1>
        </div>

       <table>
         <tbody>
        <tr>
        <th>Nombre</th>
        <th>Tipo</th>
        <th>Ambito</th>
        <th>Tipo Variable</th>
        <th>Dimensiones</th>
        <th>Parametros</th>
        <th>Fila</th>
        <th>Columna</th>
        </tr>
        {/*console.log(props.funcionesfinales)*/}
         {renderTableData(props.simbolosfinales)}
         { funciones(props.funcionesfinales) }
        </tbody>
       </table>


    </div>
    
    
);




function renderTableData(ts) {

    if(ts){
        return ts.map((simbolo, index) => (
               <tr key={index}>
                  <td>{simbolo.nombre}</td>
                  <td>{simbolo.tipodato}</td>
                  <td>{simbolo.ambito}</td>
                  <td>{simbolo.reasignable?"LET":"CONST"}</td>
                  <td>{simbolo.dimensiones?simbolo.dimensiones:0}</td>
                  <td>{"N/A"}</td>
                  <td>{simbolo.fila}</td>
                  <td>{simbolo.columna}</td>
               </tr>
        ))
    }
    
 }


 function funciones(tf) {
  if(tf){
      return tf.map((funcion, index) => (
             <tr key={index}>
                <td>{funcion.nombre}</td>
                <td>{funcion.tipodato}</td>
                <td>{"Global"}</td>
                <td>{"Funcion"}</td>
                <td>{"N/A"}</td>
                <td> {funcion.parametros!=null?funcion.parametros.length:"0"}</td>
                <td>{funcion.linea}</td>
                <td>{funcion.columna}</td>
             </tr>
      ))
  }
  
}


const mapStatetoProps= (state)=>{
    return{
      simbolosfinales: state.storecodigo.simbolosfinales,
      funcionesfinales: state.storecodigo.funcionesfinales,
      simbolos:  state.storecodigo.simbolos
    };
};

const ListadoConectadoCodigo= connect(mapStatetoProps)(ReporteTS);

export default ListadoConectadoCodigo;
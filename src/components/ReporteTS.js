import React from 'react';
import {connect} from 'react-redux';




const ReporteTS= (props)=>(
    <div>
        <div className='container-inline2'>
          <h1>TS DESPUES DE EJECUCIÓN</h1>
        </div>

       <table>
         <tbody>
        <tr>
        <th>Nombre</th>
        <th>Tipo</th>
        <th>Valor</th>
        <th>Tipo Variable</th>
        </tr>
        {/*console.log(props.funcionesfinales)*/}
         {renderTableData(props.simbolosfinales)}
         { funciones(props.funcionesfinales) }
        </tbody>
       </table>


       <div className='container-inline2'>
       <h1>TS INSTRUCCION graficar_ts</h1>
      </div>
       
      {
        /*console.log("SIMBOLOS DE LA STORE"),
        console.log(props.simbolos)*/
        props.simbolos.map((arreglosim, index) => (
        <div key={index}>
        <table  >
        <tbody>
        <tr>
        <th>Nombre</th>
        <th>Tipo</th>
        <th>Ambito</th>
        <th>Valor</th>
        <th>Tipo Variable</th>
        </tr>
        {graficar_ts(arreglosim)}
        </tbody>
        </table>
        <br></br>
        <br></br>
        <br></br>
        </div>
      ))
      }
        

    </div>
    
    
);


function graficar_ts(arreglosim){
    
    if(arreglosim){
      //console.log(arreglosim);
         return arreglosim.map((simbolo,index)=>(

                <tr key={index}>
                <td>{simbolo.nombre}</td>
                <td>{simbolo.tipo}</td>
                <td>{simbolo.ambito}</td>
                <td>{Array.isArray(simbolo.valor)? JSON.stringify(simbolo.valor):simbolo.valor.valueOf()}</td>
                <td>{simbolo.reasignable?"LET":"CONST"}</td>
                </tr>
         ))
        
    }

}

function renderTableData(ts) {

    if(ts){
        return ts.map((simbolo, index) => (
               <tr key={index}>
                  <td>{simbolo.id}</td>
                  <td>{simbolo.tipovalor}</td>
                  <td>{Array.isArray(simbolo.valor)? JSON.stringify(simbolo.valor):simbolo.valor.valueOf()}</td>
                  <td>{simbolo.reasignable?"LET":"CONST"}</td>
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
                <td>Parametros: {funcion.parametros!=null?funcion.parametros.length:"0"}</td>
                <td>Funcion</td>
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
import React from 'react';
import {connect} from 'react-redux';


const ReporteOptimizaciones= (props)=>(
    <div>
        <div className='container-inline2'>
          <h1>REPORTE DE CODIGO OPTIMIZADO</h1>
        </div>

       <table>
         <tbody>
        <tr>
        <th>Tipo</th>
        <th>Regla Aplicada</th>
        <th>Código eliminado</th>
        <th>Código agregado</th>
        <th>Fila</th>
        </tr>
         {
           console.log(props.optimizaciones),
           renderTableData(props.optimizaciones)
         }
        </tbody>
       </table>        

    </div>
);




function renderTableData(optimizaciones) {

    
    if(optimizaciones){
        return optimizaciones.map((optimizacion, index) => (
               <tr key={index}>
                  <td>{optimizacion.tipo}</td>
                  <td>{optimizacion.regla}</td>
                  <td>{optimizacion.codigoanterior}</td>
                  <td>{optimizacion.codigonuevo}</td>
                  <td>{optimizacion.fila}</td>
               </tr>
        ))
    }
    
 }


const mapStatetoProps= (state)=>{
    return{
      optimizaciones:  state.storecodigo.optimizaciones
    };
};

const ListadoConectadoCodigo= connect(mapStatetoProps)(ReporteOptimizaciones);

export default ListadoConectadoCodigo;
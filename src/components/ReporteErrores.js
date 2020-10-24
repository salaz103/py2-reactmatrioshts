import React from 'react';
import {connect} from 'react-redux';


const ReporteErrores= (props)=>(
    <div>
        <div className='container-inline2'>
          <h1>REPORTE DE ERRORES EN COMPILACIÓN</h1>
        </div>

       <table>
         <tbody>
        <tr>
        <th>Tipo</th>
        <th>Descripción</th>
        <th>Ambito</th>
        <th>Línea</th>
        <th>Columna</th>
        </tr>
         {
           console.log(props.errores),
           renderTableData(props.errores)
         }
        </tbody>
       </table>        

    </div>
);




function renderTableData(errores) {

    
    if(errores){
        return errores.map((error_e, index) => (
               <tr key={index}>
                  <td>{error_e.tipo}</td>
                  <td>{error_e.descripcion}</td>
                  <td>{error_e.ambito}</td>
                  <td>{error_e.linea}</td>
                  <td>{error_e.columna}</td>
               </tr>
        ))
    }
    
 }


const mapStatetoProps= (state)=>{
    return{
      errores:  state.storecodigo.errores
    };
};

const ListadoConectadoCodigo= connect(mapStatetoProps)(ReporteErrores);

export default ListadoConectadoCodigo;
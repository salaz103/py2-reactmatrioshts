import React from 'react';
import {connect} from 'react-redux';
import {Graphviz} from 'graphviz-react';

const ReporteAST= (props)=>(
    <div>
        <Graphviz 
        dot={props.codigografo.codigografo}
        options={{zoom:true, height:700, width:1500}}
        />
    </div>
);

const mapStatetoProps= (state)=>{
    return{
      codigografo: state.storecodigo,
    };
};

const ListadoConectadoCodigo= connect(mapStatetoProps)(ReporteAST);

export default ListadoConectadoCodigo;
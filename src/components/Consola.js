import React from 'react';
import AceEditor from 'react-ace';
import {connect} from 'react-redux';
import 'ace-builds/src-noconflict/ace';
import "ace-builds/src-noconflict/mode-plain_text";
import "ace-builds/src-noconflict/theme-twilight";


const Consola= (props)=>(
    <AceEditor
            width='1000px'
            height='180px'
            mode= 'plain_text'
            readOnly= {true}
            theme="twilight"
            name="editor"
            value={props.codigoconsola.codigoconsola}
            fontSize='20px'
        />
);

const mapStatetoProps= (state)=>{
    return{
      codigoconsola: state.storecodigo,
    };
};

const ListadoConectadoCodigo= connect(mapStatetoProps)(Consola);

export default ListadoConectadoCodigo;
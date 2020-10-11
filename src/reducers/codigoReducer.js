const codigoReducerDefaultState={
    codigografo:'digraph G{}',
    codigoconsola:'',
    textot:'',
    simbolosfinales:[],
    funcionesfinales:[],
    simbolos:[],
    errores:[],
    s:'date'
};

const reducerGeneral=(state=codigoReducerDefaultState,action)=>{
    switch(action.type){
        case 'CODIGO_EJECUCION':
            return {
                ...state,
                codigografo:action.codigografo
            }
        case 'TEXTO_TRADUCCION':
            return {
                ...state,
                textot:action.textot
            }
        case 'CONSOLA':
            return{
                ...state,
                codigoconsola: state.codigoconsola+ action.codigoconsola
            }
        case 'LIMPIAR_CONSOLA':
            return{
                ...state,
                codigoconsola: '',
                simbolos: [],
                errores: []
            }
        case 'ENTORNOFINAL':
            return{
                ...state,
                simbolosfinales: action.simbolosfinales,
                funcionesfinales: action.funcionesfinales
            }
        case 'ENTORNOACTUAL':
            return{
                ...state,
                simbolos: [... state.simbolos,action.simbolosactuales]
            }
        case 'ERROR':
            return{
                ...state,
                errores: state.errores.concat(action.error_e)
            }
        default:
            return state;
    }
};

export default reducerGeneral;
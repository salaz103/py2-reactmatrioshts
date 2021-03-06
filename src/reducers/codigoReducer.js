const codigoReducerDefaultState={
    codigografo:'digraph G{}',
    codigoconsola:'',
    textot:'',
    simbolosfinales:[],
    funcionesfinales:[],
    simbolos:[],
    errores:[],
    optimizaciones:[],
    encabezado:'#include <stdio.h> \n double heap[16384]; \n double stack[16394]; \n double p;\n double h;\n',
    temporales:'',
    etiquetas:'',
    codigo3d:'',
    contadortemporales:-1,
    contadoretiquetas:-1,
    heap:0,
    stack:0,
    //tempstorage:new Set(String),
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
        case 'CODIGO3D':
            return{
                ...state,
                codigo3d: state.codigo3d.concat(action.codigo3d)
            }
        case 'AUMENTARTEMP':
            return{
                ...state,
                contadortemporales: state.contadortemporales + 1
            }
        case 'AUMENTARETIQUETAS':
            return{
                ...state,
                contadoretiquetas: state.contadoretiquetas + 1
            }
        case 'AUMENTARHEAP':
            return{
                ...state,
                heap: state.heap + 1
            }
        case 'AUMENTARSTACK':
            return{
                ...state,
                stack: state.stack + 1
            }
        case 'LIMPIAR_CONSOLA':
            return{
                ...state,
                codigoconsola: '',
                simbolos: [],
                errores: []
            }
        case 'LIMPIAR_OPTIMIZACIONES':
            return{
                ...state,
                optimizaciones: []
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
        case 'OPTIMIZACION':
            return{
                ...state,
                optimizaciones: state.optimizaciones.concat(action.optimizacion)
            }
        default:
            return state;
    }
};

export default reducerGeneral;
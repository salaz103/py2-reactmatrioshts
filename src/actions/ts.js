export const agregarCodigo=(codigografo='')=>({
    type:'CODIGO_EJECUCION',
    codigografo
});

export const guardartextotraduccion=(textot='')=>({
    type:'TEXTO_TRADUCCION',
    textot
});

//********************ACCIONES PARA CREACION C3D********************************************/

export const aumentartemporales=()=>({
    type:'AUMENTARTEMP'
}); 

export const aumentaretiquetas=()=>({
    type:'AUMENTARETIQUETAS'
}); 

export const aumentarheap=()=>({
    type:'AUMENTARHEAP'
}); 

export const aumentarstack=()=>({
    type:'AUMENTARSTACK'
}); 

export const agregarcodigo3d=(codigo3d='')=>({
    type:'CODIGO3D',
    codigo3d
});

//********************************************************************************************* */

export const codigoconsola=(codigoconsola='')=>({
    type:'CONSOLA',
    codigoconsola
});

export const limpiarconsola=()=>({
    type:'LIMPIAR_CONSOLA',
});

export const limpiarOptimizaciones=()=>({
    type:'LIMPIAR_OPTIMIZACIONES',
});

export const tsfinal=(simbolosfinales,funcionesfinales)=>({
    type:'ENTORNOFINAL',
    simbolosfinales,
    funcionesfinales
});

export const reportets=(simbolosactuales)=>({
    type:'ENTORNOACTUAL',
    simbolosactuales
});

export const errores=(error_e)=>({
    type:'ERROR',
    error_e
});

export const optimizaciones=(optimizacion)=>({
    type:'OPTIMIZACION',
    optimizacion
});
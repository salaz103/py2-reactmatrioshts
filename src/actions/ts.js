export const agregarCodigo=(codigografo='')=>({
    type:'CODIGO_EJECUCION',
    codigografo
});

export const guardartextotraduccion=(textot='')=>({
    type:'TEXTO_TRADUCCION',
    textot
});

export const agregarcodigo3d=(codigo3d='')=>({
    type:'CODIGO3D',
    codigo3d
});

export const codigoconsola=(codigoconsola='')=>({
    type:'CONSOLA',
    codigoconsola
});

export const limpiarconsola=()=>({
    type:'LIMPIAR_CONSOLA',
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
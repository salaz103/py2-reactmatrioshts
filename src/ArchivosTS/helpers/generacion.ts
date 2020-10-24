export class generacion{
    private static generador: generacion;
    private setTemporales : Set<string>;
    private temporales:number;
    private etiquetas : number;
    private codigo : string[];



    private constructor(){
        this.temporales = 0;
        this.etiquetas = 0;
        this.setTemporales = new Set();
        this.codigo = new Array();
    }

    public static getGenerador(){
        return this.generador || (this.generador = new this());
    }

    public limpiarTodo(){
        this.setTemporales= new Set();
        this.temporales=0;
        this.etiquetas=0;
        this.codigo=new Array();
    }


    public getCodigoFinal():string{
        
        //EL CODIGO FINAL ESTA COMPUESTO
        /*
         1. ENCABEZADO
         2. LISTA TEMPORALES
         3. FUNCIONES NATIVAS
         4. FUNCIONES "NORMALES" Ó TYPES
         5. void main(){  
            CODIGO 3D
            return ;    
            }
         */

        let encabezado= "#include <stdio.h> \n#include <math.h> \ndouble heap[16384]; \ndouble stack[16394]; \ndouble p; \ndouble h;\n";
        let listatemporales= "double ";
        for (let i = 0; i <=this.temporales; i++) {
            if(i==this.temporales){
                listatemporales+= "t"+i+"; \n"
            }else{
                listatemporales+= "t"+i+","
            }
        }
        
        let c3d= this.codigo.join('\n');

        let codigofinal= encabezado + listatemporales + c3d;
        return codigofinal;
    }

    //***********************METODOS PARA TEMPORALES Y ETIQUETAS  ***************** */
    public generarTemporal() : string{
        const temporal = 't' + this.temporales++;
        this.setTemporales.add(temporal);
        return temporal;
    }

    public generarEtiqueta() : string{
        return 'L' + this.etiquetas++;
    }

    public sacarTemporal(temporal:string){
        let temp= this.setTemporales.has(temporal);
        if(temp){
            this.setTemporales.delete(temporal);
        }
    }

    public agregarEtiqueta(etiqueta:string){
        
    }

    //*****************METODOS PARA AGREGAR CODIGO 3D*************************/
    public agregarcodigo3d(codigo:string){
        this.codigo.push(codigo);
    }

    public agregarExpresion(variable:string, valorizquierdo:any, operador:string, valorderecho:any){
        this.codigo.push(variable+"="+valorizquierdo+operador+valorderecho+";");
    }

    public stack(pos:any,valor:any){
        this.codigo.push("stack[(int)"+pos+"]="+valor+";");
    }


    //*******************METODOS PARA EL MANEJO DEL HEAP Y STACK**************/
    public siguienteHeap(){
        this.codigo.push('h=h+1;');
    }




}
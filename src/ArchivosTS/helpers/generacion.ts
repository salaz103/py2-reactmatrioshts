import entorno from "../entorno/entorno";

export class generacion{
    private static generador: generacion;
    private setTemporales : Set<string>;
    private temporales: number;
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

    public agregarTemporal(temporal:string){
        if(!this.setTemporales.has(temporal)){
            this.setTemporales.add(temporal);
        }
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

   public getStoreTemporales(){
       return this.setTemporales;
   }

   public limpiarStoreTemporales(){
       this.setTemporales.clear();
   }

   public restaurarTemporales(storeTemporales: Set<string>){
       this.setTemporales= storeTemporales;
   }

   public guardarTemporales(ambito:entorno):number{
       if(this.setTemporales.size>0){
        //SI EL STORE DE TEMPORALES ES MAYOR A 0, ENTONCES VAMOS A GUARDAR ESOS TEMPORALES
        console.log("ENTRE AL GUARDADO DE TEMPORALES: ")
        console.log("TEMPORALES EN LA STORE");
        console.log(this.setTemporales);

       }


       let tam_temporal= ambito.tamaño;
       ambito.tamaño= tam_temporal+this.setTemporales.size;
       return tam_temporal;
   }

   public recuperarTemporales(ambito:entorno,posinicio:number){
        if(this.setTemporales.size>0){
        console.log("ENTRE AL RECUPERADO DE TEMPORALES: ")
        console.log("TEMPORALES EN LA STORE");
        console.log(this.setTemporales);
        }
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

    public heap(pos:any,valor){
        this.codigo.push("heap[(int)"+pos+"]="+valor+";");
    }

    public getValorStack(tmp_guardar:string,pos_stack:string){
        this.codigo.push(tmp_guardar+"="+"stack[(int)"+pos_stack+"];");
    }

    public printf(formato:string,casteo:string, valor:any){
        this.codigo.push("printf(\"%"+formato+"\\"+"n"+"\",("+casteo+")"+valor+");");
    }

    public agregarIf(valorizquierdo:any,operador:string,valorderecho:any, etiquetaVerdadera:string){
        this.codigo.push("if("+valorizquierdo+operador+valorderecho+") goto "+etiquetaVerdadera+";");
    }

    public agregarGoTo(etiqueta:string){
        this.codigo.push("goto "+etiqueta+";");
    }

    public agregarEtiqueta(etiqueta:string){
        this.codigo.push(etiqueta+":");

    }

  
    public agregarComentarios(comentario:string){
        this.codigo.push("/*"+comentario+"*/");
    }

    

    //*******************METODOS PARA EL MANEJO DEL HEAP Y STACK**************/
    public siguienteHeap(){
        this.codigo.push('h=h+1;');
    }

    public moverAmbito(espacios:number){
        this.codigo.push("p = p + "+espacios+";");
    }

    public regresarAmbito(espacios:number){
        this.codigo.push("p = p - "+espacios+";");
    }


}
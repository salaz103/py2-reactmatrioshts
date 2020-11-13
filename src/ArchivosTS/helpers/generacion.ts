import entorno from "../entorno/entorno";

export class generacion{
    private static generador: generacion;
    private setTemporales : Set<string>;
    private temporales: number;
    private etiquetas : number;
    public codigo : string[];
    private codigoMain:string[];
    private codigoFuncionesUsuario:string[];
    private codigoFuncionesNativas:string[];




    private constructor(){
        this.temporales = 0;
        this.etiquetas = 0;
        this.setTemporales = new Set();
        this.codigo = new Array();
    }

    public setearMain(){
        this.codigoMain= this.codigo;
        this.codigo= new Array();
    }

    public setearFuncionesUsuario(){
        this.codigoFuncionesUsuario= this.codigo;
        this.codigo= new Array();
    }

    public setearFuncionesNativas(){
        this.codigoFuncionesNativas= this.codigo;
        this.codigo= new Array();
    }

    public static getGenerador(){
        return this.generador || (this.generador = new this());
    }

   

    public getCodigo(){
        return this.codigo;
    }

    public getCodigoParaOptimizar():string{
        let codigo1= this.codigoFuncionesNativas.join('\n');
        let codigo2= this.codigoFuncionesUsuario.join('\n');
        let codigo3= this.codigoMain.join('\n');
        let fin:string= codigo1+'\n'+codigo2+'\n'+codigo3;
        return fin;
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

        let encabezado= "#include <stdio.h> \n#include <math.h> \ndouble heap[132000]; \ndouble stack[132000]; \ndouble p; \ndouble h;\n";
        let listatemporales= "double ";
        for (let i = 0; i <=this.temporales; i++) {
            if(i==this.temporales){
                listatemporales+= "t"+i+"; \n"
            }else{
                listatemporales+= "t"+i+","
            }
        }
        
        let nativas= this.codigoFuncionesNativas.join('\n');
        let usuario= this.codigoFuncionesUsuario.join('\n');
        let voidMain= this.codigoMain.join('\n');
        //let c3d= this.codigo.join('\n');

        let codigofinal= encabezado + listatemporales + nativas +'\n' +usuario+'\n' +voidMain;
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
        //INICIA EL GUARDADO DE TEMPORALES
        //SI EL STORE DE TEMPORALES ES MAYOR A 0, ENTONCES VAMOS A GUARDAR ESOS TEMPORALES
        /*console.log("ENTRE AL GUARDADO DE TEMPORALES: ")
        console.log("TEMPORALES EN LA STORE");
        console.log(this.setTemporales);*/
        const temp_guardado= this.generarTemporal();
        this.sacarTemporal(temp_guardado);
        let contador=0;

        this.agregarComentarios("INICIO- GUARDADO DE TEMPORALES");
        this.agregarExpresion(temp_guardado,"p","+",ambito.tamaño);
        this.setTemporales.forEach((temporal) => {
            contador++;
            this.stack(temp_guardado,temporal);
            if(contador!=this.setTemporales.size){
                this.agregarExpresion(temp_guardado,temp_guardado,"+","1");
            }
        });
        this.agregarComentarios("FIN- GUARDADO DE TEMPORALES");
        //AHORA HAY QUE CAMBIARLE EL TAMAÑO AL AMBITO ACTUAL 
        let tamaño_anterior= ambito.tamaño;
        ambito.tamaño= tamaño_anterior+this.setTemporales.size;
        return tamaño_anterior;

       }


       let tam_temporal= ambito.tamaño;
       ambito.tamaño= tam_temporal+this.setTemporales.size;
       return tam_temporal;
   }

   public recuperarTemporales(ambito:entorno,posinicio:number){
        if(this.setTemporales.size>0){
            //INICIA EL RECUPERADO DE TEMPORALES
        /*console.log("ENTRE AL RECUPERADO DE TEMPORALES: ")
        console.log("TEMPORALES EN LA STORE");
        console.log(this.setTemporales);*/
        
        const tmp= this.generarTemporal();
        this.sacarTemporal(tmp);
        let contador=0;

        this.agregarComentarios("INICIO - RECUPERACION TEMPORALES");
        this.agregarExpresion(tmp,"p","+",posinicio);
        this.setTemporales.forEach((temporal) => {
            contador++;
            this.getValorStack(temporal,tmp);
            if(contador!= this.setTemporales.size){
                this.agregarExpresion(tmp,tmp,"+","1");
            }
        });
        this.agregarComentarios("FIN - RECUPERACION TEMPORALES");
        //AQUI ES NECESARIO VOLVER A CAMBIAR EL SIZE DEL AMBIENTE POR QUE YA SE ASIGNARON LOS VALORES GUARDADOS
        ambito.tamaño=posinicio;
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

    public getValorHeap(tmp_guardar:string,pos_stack:string){
        this.codigo.push(tmp_guardar+"="+"heap[(int)"+pos_stack+"];");
    }


    public printf(formato:string,casteo:string, valor:any){
        this.codigo.push("printf(\"%"+formato+"\",("+casteo+")"+valor+");");
    }

    public printchar(valor:any){
        this.codigo.push("printf(\"%c\",(char)"+valor+");");
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

    public imprimirTrue(){
        this.printchar('t'.charCodeAt(0));
        this.printchar('r'.charCodeAt(0));
        this.printchar('u'.charCodeAt(0));
        this.printchar('e'.charCodeAt(0));
    }


    public imprimirFalse(){
        this.printchar('f'.charCodeAt(0));
        this.printchar('a'.charCodeAt(0));
        this.printchar('l'.charCodeAt(0));
        this.printchar('s'.charCodeAt(0));
        this.printchar('e'.charCodeAt(0));
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
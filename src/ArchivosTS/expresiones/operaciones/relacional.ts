import entorno from "../../entorno/entorno";
import { operador, tipo_dato } from "../../entorno/tipo";
import { generacion } from "../../helpers/generacion";
import expresion from "../expresion";
import { traduccionexp } from "../traduccionexp";
import operacion from "./operacion";
import {almacen} from '../../../../src/app';
import {errores} from '../../../actions/ts.js';

export class relacional extends operacion implements expresion{

    tipodato:tipo_dato;
    linea:number;
    columna:number;

    constructor(expiz:expresion,op:operador,expder:expresion,linea:number,columna:number){
        super(expiz,op,expder);
        this.linea=linea;
        this.columna=columna;
    }

    traducir(ambito: entorno) {
        const generador= generacion.getGenerador();
        const retornoizquierdo= this.expresionizquierda.traducir(ambito);
        const retornoderecho= this.expresionderecha.traducir(ambito);


//**********************************MAYOR QUE********************************************** */
        if(this.tipooperador==operador.MAYORQUE){
            
            if((retornoizquierdo.tipodato==tipo_dato.ENTERO || retornoizquierdo.tipodato==tipo_dato.DECIMAL)
             &&(retornoderecho.tipodato==tipo_dato.ENTERO || retornoderecho.tipodato==tipo_dato.DECIMAL)){
                
                let etiquetatrue= generador.generarEtiqueta();
                let etiquetafalse= generador.generarEtiqueta();
                generador.agregarIf(retornoizquierdo.obtenerValor(),">",retornoderecho.obtenerValor(),etiquetatrue);
                generador.agregarGoTo(etiquetafalse);
                const valorretorno= new traduccionexp("",false,tipo_dato.BOOLEAN,true);
                valorretorno.etiquetastrue= etiquetatrue;
                valorretorno.etiquetasfalse= etiquetafalse;
                return valorretorno;

            }else{
                almacen.dispatch(errores({
                    tipo:'SEMANTICO',
                    descripcion:'OPERADOR > NECESITA OPERANDOS NUMBER, SE RECIBIERON:' +retornoizquierdo.tipodato+" y "+retornoderecho.tipodato,
                    ambito:ambito.nombre,
                    linea:this.linea,
                    columna:this.columna
                }));
            }


            



//**********************************MAYOR O IGUAL QUE********************************************** */
        }else if(this.tipooperador==operador.MAYORIGUALQUE){
            
            if((retornoizquierdo.tipodato==tipo_dato.ENTERO || retornoizquierdo.tipodato==tipo_dato.DECIMAL)
             &&(retornoderecho.tipodato==tipo_dato.ENTERO || retornoderecho.tipodato==tipo_dato.DECIMAL)){
                
                let etiquetatrue= generador.generarEtiqueta();
                let etiquetafalse= generador.generarEtiqueta();
                generador.agregarIf(retornoizquierdo.obtenerValor(),">=",retornoderecho.obtenerValor(),etiquetatrue);
                generador.agregarGoTo(etiquetafalse);
                const valorretorno= new traduccionexp("",false,tipo_dato.BOOLEAN,true);
                valorretorno.etiquetastrue= etiquetatrue;
                valorretorno.etiquetasfalse= etiquetafalse;
                return valorretorno;

            }else{
                almacen.dispatch(errores({
                    tipo:'SEMANTICO',
                    descripcion:'OPERADOR >= NECESITA OPERANDOS NUMBER, SE RECIBIERON:' +retornoizquierdo.tipodato+" y "+retornoderecho.tipodato,
                    ambito:ambito.nombre,
                    linea:this.linea,
                    columna:this.columna
                }));
            }



//**********************************MENOR QUE**************************************************** */            
        }else if(this.tipooperador==operador.MENORQUE){

            if((retornoizquierdo.tipodato==tipo_dato.ENTERO || retornoizquierdo.tipodato==tipo_dato.DECIMAL)
             &&(retornoderecho.tipodato==tipo_dato.ENTERO || retornoderecho.tipodato==tipo_dato.DECIMAL)){
                
                let etiquetatrue= generador.generarEtiqueta();
                let etiquetafalse= generador.generarEtiqueta();
                generador.agregarIf(retornoizquierdo.obtenerValor(),"<",retornoderecho.obtenerValor(),etiquetatrue);
                generador.agregarGoTo(etiquetafalse);
                const valorretorno= new traduccionexp("",false,tipo_dato.BOOLEAN,true);
                valorretorno.etiquetastrue= etiquetatrue;
                valorretorno.etiquetasfalse= etiquetafalse;
                return valorretorno;

            }else{
                almacen.dispatch(errores({
                    tipo:'SEMANTICO',
                    descripcion:'OPERADOR < NECESITA OPERANDOS NUMBER, SE RECIBIERON:' +retornoizquierdo.tipodato+" y "+retornoderecho.tipodato,
                    ambito:ambito.nombre,
                    linea:this.linea,
                    columna:this.columna
                }));
            }



//**********************************MENOR O IGUAL QUE******************************************** */
        }else if(this.tipooperador==operador.MENORIGUALQUE){

            if((retornoizquierdo.tipodato==tipo_dato.ENTERO || retornoizquierdo.tipodato==tipo_dato.DECIMAL)
             &&(retornoderecho.tipodato==tipo_dato.ENTERO || retornoderecho.tipodato==tipo_dato.DECIMAL)){
                
                let etiquetatrue= generador.generarEtiqueta();
                let etiquetafalse= generador.generarEtiqueta();
                generador.agregarIf(retornoizquierdo.obtenerValor(),"<=",retornoderecho.obtenerValor(),etiquetatrue);
                generador.agregarGoTo(etiquetafalse);
                const valorretorno= new traduccionexp("",false,tipo_dato.BOOLEAN,true);
                valorretorno.etiquetastrue= etiquetatrue;
                valorretorno.etiquetasfalse= etiquetafalse;
                return valorretorno;

            }else{
                almacen.dispatch(errores({
                    tipo:'SEMANTICO',
                    descripcion:'OPERADOR <= NECESITA OPERANDOS NUMBER, SE RECIBIERON:' +retornoizquierdo.tipodato+" y "+retornoderecho.tipodato,
                    ambito:ambito.nombre,
                    linea:this.linea,
                    columna:this.columna
                }));
            }



//**********************************DIFERENTE QUE************************************************ */
        }else if(this.tipooperador==operador.DIFERENTEQUE){




//**********************************IGUAL QUE*************************************************** */
        }else if(this.tipooperador==operador.IGUALQUE){

        }

        return null;
    }

}
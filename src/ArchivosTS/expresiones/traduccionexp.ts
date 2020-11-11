import simbolo from "../entorno/simbolo";
import { tipo_dato } from "../entorno/tipo";
import {generacion} from "../helpers/generacion";


export class traduccionexp{
    
    valor:string;
    tipodato:tipo_dato;
    tiene_etiquetas:boolean;
    es_temporal:boolean;
    etiquetastrue:string;
    etiquetasfalse:string;
    sim:simbolo;

    constructor(val:string,temp:boolean,tipodato:tipo_dato,etiquetas:boolean,sim?:simbolo){
        this.valor=val;
        this.es_temporal= temp;
        this.tipodato=tipodato;
        this.tiene_etiquetas=etiquetas;
        this.etiquetastrue= '';
        this.etiquetasfalse= '';
        this.sim=sim;
    }

    public obtenerValor(){
        generacion.getGenerador().sacarTemporal(this.valor);
        return this.valor;
    }


}
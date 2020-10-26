import { tipo_dato } from "../entorno/tipo";
import {generacion} from "../helpers/generacion";


export class traduccionexp{
    
    valor:string;
    tipodato:tipo_dato;
    tiene_etiquetas:boolean;
    es_temporal:boolean;
    etiquetastrue:string;
    etiquetasfalse:string;


    constructor(val:string,temp:boolean,tipodato:tipo_dato,etiquetas:boolean){
        this.valor=val;
        this.es_temporal= temp;
        this.tipodato=tipodato;
        this.tiene_etiquetas=etiquetas;
        this.etiquetastrue= '';
        this.etiquetasfalse= '';
    }

    public obtenerValor(){
        generacion.getGenerador().sacarTemporal(this.valor);
        return this.valor;
    }


}
import {error} from './error';

export class listaerrores{
    listae:error[];
    private static instance: listaerrores;


    constructor(){
        this.listae=[];
    }

    public static obtenerLista(): listaerrores{
        if(!listaerrores.instance){
            listaerrores.instance= new listaerrores();
        }
        return listaerrores.instance;
    }

    public guardar(err:error):void{
        this.listae.push(err);
    }

    public limpiar():void{
        this.listae=[];
    }

    public estado(): boolean{
        return this.listae.length>0;
    }

    public getLista():error[]{
        return this.listae;
    }

}
import {tipo_valor, tipo_variable} from './tipo';

export class simbolo{

    tipovalor:tipo_valor;
    id:string;
    valor:object;
    reasignable:boolean;

    constructor(id_e:string,reasignable:boolean,tipo_e?:tipo_valor,valor?:object){
        this.id=id_e;
        this.tipovalor=tipo_e;
        this.valor=valor;
        this.reasignable=reasignable;
    }

    
    getId(){
        return this.id;
    }

    getTipo(){
        return this.tipovalor;
    }

    setTipo(tipo:tipo_valor){
        this.tipovalor= tipo;
    }

    getValor(){
        return this.valor;
    }

    setValor(valor_e:object){
        this.valor= valor_e;
    }

    getReasignable(){
        return this.reasignable;
    }

}

export default simbolo;
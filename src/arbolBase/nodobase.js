const nodobase = {

    nuevonodo: function(tipo,hijos,posicion){
        return{
            tipo:tipo,
            hijos:hijos,
            posicion:posicion
        }
    }
}

module.exports.nodobase= nodobase;
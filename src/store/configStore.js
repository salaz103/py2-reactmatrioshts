import {createStore, combineReducers} from 'redux';
import reducerGeneral from '../reducers/codigoReducer';

export default ()=>{
    const store=createStore(
        combineReducers({
            storecodigo:reducerGeneral
        })
    );

    return store;
};


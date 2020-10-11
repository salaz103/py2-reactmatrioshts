import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import AppRouter from './routers/AppRouter';
import configStore from './store/configStore';
import 'normalize.css/normalize.css';
import './styles/styles.scss';

const almacen= configStore();

// console.log(almacen.getState());
// almacen.dispatch(agregarCodigo('prueba'));
// console.log(almacen.getState());

const jsx= (
    <Provider store={almacen}>
        <AppRouter/>
    </Provider>
);
ReactDOM.render(jsx,document.getElementById('app'));


export {almacen};
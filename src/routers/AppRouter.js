import React from 'react';
import {BrowserRouter, Route, Switch, Link, NavLink} from 'react-router-dom';
import Traduccion2 from '../components/Traduccion2';
import ReporteAST from '../components/ReporteAST';
import ReporteTS from '../components/ReporteTS';
import ReporteErrores from '../components/ReporteErrores';
import Header from '../components/Header';


const AppRouter=()=>(
    <BrowserRouter basename="/ReactMatrioshts">
    <div>
    <Header title='ReactMatrioshTS- 201213181'></Header>
      <Switch>
      <Route path="/" component={Traduccion2} exact={true}/>
      <Route path="/ast" component={ReporteAST}/>
      <Route path="/ts" component={ReporteTS}/>
      <Route path="/errores" component={ReporteErrores}/>
      </Switch>  
    </div>
    </BrowserRouter>
);

export default AppRouter;
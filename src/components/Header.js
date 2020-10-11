import React from 'react';
import {NavLink} from 'react-router-dom';


const Header = (props) => (
  <div className="header">
      <h1 className="header__title">{props.title}</h1>
      {props.subtitle && <h2 className="header__subtitle">{props.subtitle}</h2>}
      <button><NavLink to="/" activeClassName="is-active" exact={true}>Traduccion</NavLink></button>
      <button><NavLink to="/ast" activeClassName="is-active" >AST</NavLink></button>
      <button><NavLink to="/ts" activeClassName="is-active" >Reporte TS</NavLink></button>
      <button><NavLink to="/errores" activeClassName="is-active" >Reporte errores</NavLink></button>
  </div>
  
);

Header.defaultProps = {
  title: 'Matrioshts'
};

export default Header;

import React from 'react';

const Action = (props) => (
  <div>
    <button
      className="action-buttons"
      onClick={props.action}
    >
      {props.nombre}
      </button>
  </div>
);

export default Action;

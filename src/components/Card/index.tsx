import React from 'react';
import './index.scss';

const Card = (props) => {
  return (
    <div className="card">
      {props.children}
    </div>
  );
}

export default Card;

import React, { CSSProperties } from 'react';

import './index.scss';

declare interface IButton {
  type: 'button'|'submit'|'reset';
  onClick?: () => void;
  title: string;
  className?: string;
  style?: CSSProperties;
}

const Button = (props: IButton) => {
  const { type, className, onClick, title, style } = props;

  return (
    <button type={type} className={`button ${className}`} onClick={onClick} style={style}>{title}</button>
  );
};

export default Button;

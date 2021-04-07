import React from 'react';
import './index.scss';

declare interface IGridContainer {
  rows?: number;
  children: any;
  gridGap?: number;
  className?: string;
  style?: React.CSSProperties;
}

const GridContainer = (props: IGridContainer) => {
  const { rows = 1, children, gridGap = 30, className = '', style = {} } = props;

  return (
    <div
      className={`grid-container grid-container--rows--${rows} ${className}`}
      style={{ ...style, gridGap }}
    >
      {children}
    </div>
  );
};

export default GridContainer;

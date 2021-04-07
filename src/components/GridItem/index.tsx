import React from 'react';
import { isUndefined } from '../../utils/isValidVariable';

import './index.scss';

declare interface IGridItem {
  children: any;
  colSpan: number;
  rowSpan?: number;
  className?: string;
  style?: React.CSSProperties;
}

const GridItem = (props: IGridItem) => {
  const {
    children,
    colSpan,
    rowSpan,
    className = '',
    style = {}
  } = props;

  const colSpanClassName = `grid-item__col--${colSpan}`;

  const rowSpanStyle: React.CSSProperties = isUndefined(rowSpan) ? {} : { gridRow: `span ${rowSpan}` };

  return (
    <div
      className={`grid-item ${colSpanClassName} ${className}`}
      style={{
        ...rowSpanStyle,
        ...style
      }}
    >
      {children}
    </div>
  );
};

export default GridItem;

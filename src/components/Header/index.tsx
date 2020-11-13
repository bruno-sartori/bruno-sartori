import React from 'react';
import './index.scss';

declare interface IHeaderComponentProps {}

declare interface IHeaderProps extends IHeaderComponentProps { }

const Header: React.FC<IHeaderProps> = (props) => {
  return (
    <header className="header">
      teste
    </header>
  );
}

export default Header;

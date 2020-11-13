import React from 'react';
import './index.scss';

declare interface INavbarComponentProps {
  teste: string
}

declare interface INavbarProps extends INavbarComponentProps { }

const Navbar: React.FC<INavbarProps> = (props) => {
  return (
    <footer className="footer">
      teste
    </footer>
  );
}

export default Navbar;

import React from 'react';
import Logo from '@images/logo.jpg';
import './index.scss';

declare interface INavbarComponentProps {

}

declare interface INavbarProps extends INavbarComponentProps {

}

const Navbar: React.FC<INavbarProps> = (props: INavbarProps) => {

  return (
    <nav className="navbar">
      <figure className="navbar__logo">
        <img width={70} height={40} src={Logo} />
      </figure>
    </nav>
  );
};

export default Navbar;

import React from 'react';
import './index.scss';

declare interface IFooterComponentProps {
  teste: string
}

declare interface IFooterProps extends IFooterComponentProps { }

const Footer: React.FC<IFooterProps> = (props) => {
  return (
    <footer className="footer">
      teste
    </footer>
  );
}

export default Footer;

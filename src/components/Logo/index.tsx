import React from 'react';
import './index.scss';

declare interface ILogoComponentProps {}

declare interface ILogoProps extends ILogoComponentProps { }

const Logo: React.FC<ILogoProps> = props => {
  const title = ['Bruno', 'Sartori'];
  const subtitle = 'freelance front-end & back-end developer';

  return (
    <section className="logo">
      <h1 className="logo__title">
        <span className="logo__title--primary">{title[0]}</span>
        &nbsp;
        <span className="logo__title--secondary">{title[1]}</span>
      </h1>
      <span className="logo__subtitle">{subtitle}</span>
    </section>
  );
}

export default Logo;

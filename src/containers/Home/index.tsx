import React from 'react';
import './index.scss';

declare interface IHomeContainerComponentProps { }

declare interface IHomeContainerProps extends IHomeContainerComponentProps { }

const HomeContainer: React.FC<IHomeContainerProps> = (props) => {
  return (
    <section className="home-container">
      {props.children}
    </section>
  );
}
export default HomeContainer;

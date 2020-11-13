import React from 'react';
import './index.scss';

declare interface ISobreContainerComponentProps { }

declare interface ISobreContainerProps extends ISobreContainerComponentProps { }

const SobreContainer: React.FC<ISobreContainerProps> = (props) => {
  return (
    <section className="sobre-container">
      {props.children}
    </section>
  );
}
export default SobreContainer;

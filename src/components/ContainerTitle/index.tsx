import React from 'react';
import './index.scss';

declare interface IContainerTitleComponentProps {
  title: string;
  subtitle: string;
}

declare interface IContainerTitleProps extends IContainerTitleComponentProps { }

const ContainerTitle: React.FC<IContainerTitleProps> = (props) => {
  const { title, subtitle } = props;

  return (
    <div className="container-title">
      <h1 className="container-title__title">{title}</h1>
      <h2 className="container-title__subtitle">{subtitle}</h2>
    </div>
  );
}

export default ContainerTitle;

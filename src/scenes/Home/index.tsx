import React, { Component } from 'react';
import HomeContainer from '@/containers/Home';
import SobreContainer from '@/containers/Sobre';
import Logo from '@/components/Logo';
import Header from '@/components/Header';
import ContainerTitle from '@/components/ContainerTitle';

declare interface IHomeSceneComponentProps {}

declare interface IHomeSceneProps extends IHomeSceneComponentProps {}

class HomeScene extends Component<IHomeSceneProps> {

  public render() {
    return (
      <section className="home">
        <HomeContainer>
          <Header />
          <Logo />
        </HomeContainer>
        <SobreContainer>
          <ContainerTitle
            title="Sobre Mim"
            subtitle="Conheça o desenvolvedor web que você está contratando."
          />
        </SobreContainer>
      </section>
    )
  }
}

export default HomeScene;

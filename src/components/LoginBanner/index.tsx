import React from 'react';
import LoginBannerLogo from '@images/psychologist.png';
import NekomataLogo from '@images/nekomata.png';

import './index.scss';
import Image from '@components/Image';

const LoginBanner = () => {
  return (
    <div className="login-banner">
      <h1 className="login-banner__title">
        <Image src={NekomataLogo} width={20} height={15} alt="Nekomata Logo" />&nbsp;&nbsp;Nekomata Labs
      </h1>
      <figure className="login-banner__image">
        <a style={{ display: 'none' }} href='https://pngtree.com/so/psychological-disorder'>psychological disorder png from pngtree.com</a>
        <img src={LoginBannerLogo} width={300} height={300} />
      </figure>
      <p className="login-banner__copyright">
        Copyright &copy; 2021. Nekomata Labs. All rights reserved.
      </p>
    </div>
  );
};

export default LoginBanner;

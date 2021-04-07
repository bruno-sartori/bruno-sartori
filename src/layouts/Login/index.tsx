import React from 'react';
import './index.scss';

const LoginLayout = (props: any) => {
  return (
    <div className="login-layout">
      {props.children}
    </div>
  );
};

export default LoginLayout;

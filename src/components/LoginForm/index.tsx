import React from 'react';
import { Field } from 'redux-form';

// Components
import Card from '@components/Card';

// Styles
import './index.scss';
import TextField from '@components/TextField';
import Button from '@components/Button';

declare interface ILoginForm {
  onSubmit: (e: any) => void;
}

const LoginForm = (props: ILoginForm) => {
  const { onSubmit } = props;

  return (
    <div className="login-form">
      <Card>
        <form onSubmit={onSubmit}>
          <Field
            className="login-form__input"
            label="Usuario"
            name='userName'
            component={TextField}
            type="text"
          />

          <Field
            className="login-form__input"
            label="Senha"
            name='password'
            component={TextField}
            type="password"
          />

          <Button type="submit" title="Sign In" />

        </form>
      </Card>
    </div>
  );
};

export default LoginForm;

import React from 'react';
import { connect } from 'react-redux';
import { withCookies, ReactCookieProps, Cookies } from 'react-cookie';
import { withRouter } from 'next/router';
import { WithRouterProps } from 'next/dist/client/with-router';
import { formValueSelector, InjectedFormProps, getFormSyncErrors, reduxForm } from 'redux-form';

// Components
import LoginBanner from '@components/LoginBanner';
import LoginForm from '@components/LoginForm';
import GridContainer from '@components/GridContainer';
import GridItem from '@components/GridItem';

// Selectors
import { loginSelector } from '@store/selectors/login';

// Actions
import { clearLogin, loginAction } from '@store/actions/login';

// Utils
import { validateLoginForm } from '@utils/formValidation';

// Styles
import './index.scss';

declare interface ILoginFormProps {
  loginFormFields: ILoginFormFields; 
} 
declare interface IInjectedProps extends InjectedFormProps<ILoginFormFields, ILoginFormProps> { }
declare interface ILoginContainerComponentProps extends WithRouterProps, ReactCookieProps, IInjectedProps, ILoginFormProps { }
declare interface ILoginContainerStateProps {
  isLoggedIn: boolean;
  loginState: any;
  formErrors: any;
}
declare interface ILoginContainerDispatchProps {
  logIn: (loginFormFields: ILoginFormFields, cookies: Cookies, callback: any) => void;
  clearSignIn: () => void;
}
declare interface ILoginContainerProps extends ILoginContainerComponentProps, ILoginContainerStateProps, ILoginContainerDispatchProps {}

const FORM_NAME = 'login';

const LoginContainer = (props: ILoginContainerProps) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    const { logIn, router, loginFormFields, cookies } = props;
    
    logIn(loginFormFields, cookies, (error: any) => {
      if (error) {
        console.error(error); // TODO: change to logger
      } else {
        router.push('/');
      }
    });
  };

  return (
    <section className="login-container">
      <GridContainer rows={1} gridGap={0}>
        <GridItem colSpan={6} className="login-container__left-section">
          <LoginBanner />
        </GridItem>
        <GridItem colSpan={6} className="login-container__right-section">
          <LoginForm 
            onSubmit={handleSubmit}
          />
        </GridItem>
      </GridContainer>
    </section>
  );
};


const mapStateToProps = (state: any, ownProps: any) => {
  const loginFormFields = formValueSelector(FORM_NAME)(state, 'userName', 'password');
  const formErrors = getFormSyncErrors(FORM_NAME)(state);
  const loginState = loginSelector(state);
  
  return ({
    formErrors,
    loginFormFields,
    loginState,
  });
};

const mapDispatchToProps = (dispatch: any) => {
  return ({
    logIn: (loginFormFields: ILoginFormFields, cookies: Cookies, callback: any) => {
      dispatch(clearLogin());
      dispatch(loginAction(loginFormFields, cookies, callback));
    },
    clearLogin: () => {
      dispatch(clearLogin());
    },
  });
};

export default reduxForm<ILoginFormFields>({
  form: FORM_NAME,
  validate: validateLoginForm,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})(connect(mapStateToProps, mapDispatchToProps)(withRouter<ILoginContainerProps>(withCookies(LoginContainer))));


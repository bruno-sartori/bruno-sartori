import { WithRouterProps } from 'next/dist/client/with-router';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import { withCookies, ReactCookieProps } from 'react-cookie';
import { loginSelector } from '@store/selectors/login';
import { isServerSide } from '@utils/isServerSide';

declare interface IAuthenticatedComponentProps extends ReactCookieProps, WithRouterProps {
  children: any;
}

declare interface IAuthenticatedStateProps {
  loginState: ILoginState;
}

declare interface IAuthenticatedProps extends IAuthenticatedComponentProps, IAuthenticatedStateProps { }

const Authenticated = (props: IAuthenticatedProps) => {
  const { children, loginState: { isLoggedIn, authToken }, router, cookies } = props;
  const hasAuth = () => (cookies && cookies.get('authToken'));

  if (isServerSide() || hasAuth()) {
    return children;
  } else {
    router.push('/login');
    return null;
  }
}


const mapStateToProps = (state: any, ownProps: any) => {
  const loginState = loginSelector(state);

  return ({
    loginState,
  });
};

export default withRouter<IAuthenticatedComponentProps>(connect(mapStateToProps)(withCookies(Authenticated)));

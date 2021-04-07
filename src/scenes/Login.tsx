import LoginLayout from '@layouts/Login';
import LoginContainer from '@containers/Login';

const HomeScene = (props: any) => {
  return (
    <LoginLayout>
      <LoginContainer />
    </LoginLayout>
  );
};

export default HomeScene;

import Authenticated from '@containers/Authenticated';
import { getUserInfoAction } from '@store/actions/user';
import HomeScene from '../scenes/Home';

const HomePage = (props: any) => {
  return (
    <Authenticated>
      <HomeScene />
    </Authenticated>
  );
};

HomePage.getInitialProps = async (ctx) => {
  const { store: { dispatch } } = ctx;
  await dispatch(getUserInfoAction());
}

export default HomePage;

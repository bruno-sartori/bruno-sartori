import withRedux from 'next-redux-wrapper';
import { compose } from 'redux';
import { Provider } from 'react-redux';

// Store
import initializeStore from '@store/store';

import '../styles/globals.scss';

function NekomataApp({ Component, pageProps, store }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}


 NekomataApp.getInitialProps = async (appCtx: any) => {
  const { Component, ctx } = appCtx;

  const pageProps = Component.getInitialProps
    ? await Component.getInitialProps(ctx)
    : {};

  return {
    pageProps
  };
}

const enhance = compose(
  withRedux(initializeStore)
);

export default enhance(NekomataApp);

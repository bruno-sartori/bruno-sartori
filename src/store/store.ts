import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { identity } from 'lodash';

// Reducers
import reducer from './reducers';

const createStoreWithMiddleware = applyMiddleware(
  thunk
);

const store = (initialState: any = {}, { isServer }) => {
  let toCompose = [createStoreWithMiddleware];

  if (process.env.NODE_ENV === 'development') {
    const devTools = (!isServer && window.__REDUX_DEVTOOLS_EXTENSION__)
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : identity;

    toCompose.push(devTools);
  }

  return createStore(reducer, initialState, compose(...toCompose));
};

export default store;

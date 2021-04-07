import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

// Reducers
import loginReducer from './login';
import userReducer from './user';

const reducers = combineReducers({
  form: formReducer,  
  login: loginReducer,
  user: userReducer,
});

export default reducers;

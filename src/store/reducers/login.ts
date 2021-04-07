// Constants
import {
  CLEAR_LOGIN,
  LOGIN_FAILURE,
  LOGIN_REQUESTING,
  LOGIN_SUCCESS,
} from '@actions/login';

const INITIAL_STATE: ILoginState = {
  error: null,
  initialized: false,
  isRequesting: false,
  isLoggedIn: false,
  authToken: null,
};

const loginReducer = (state: ILoginState = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        error: null,
        initialized: true,
        isRequesting: false,
        isLoggedIn: true,
        authToken: action.payload.token
      };

    case LOGIN_REQUESTING:
      return {
        ...state,
        isRequesting: true,
      };

    case LOGIN_FAILURE:
      return {
        ...state,
        error: action.error,
        isRequesting: false,
        isLoggedIn: false,
        authToken: null,
      };

    case CLEAR_LOGIN:
      return INITIAL_STATE;

    default:
      return state;
  }
};

export default loginReducer;

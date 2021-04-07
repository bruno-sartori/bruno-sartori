// Services
import { getUserInfo } from '@services/user';
import { authTokenSelector } from '@store/selectors/login';

// Constants
export const USER_INFO_REQUESTING = 'USER_INFO_REQUESTING';
export const USER_INFO_SUCCESS = 'USER_INFO_SUCCESS';
export const USER_INFO_FAILURE = 'USER_INFO_FAILURE';
export const CLEAR_USER_INFO = 'CLEAR_USER_INFO';

const getUserInfoSuccess = (payload) => ({
  type: USER_INFO_SUCCESS,
  payload
});

const getUserInfoFailure = (payload) => ({
  type: USER_INFO_FAILURE,
  payload
});

const getUserInfoRequesting = () => ({
  type: USER_INFO_REQUESTING
});

export function clearUserInfo() {
  return {
    type: CLEAR_USER_INFO
  }
};

export function getUserInfoAction() {
  return async (dispatch: any, getState: () => any) => {
    try {
      await dispatch(getUserInfoRequesting());
      const response = await getUserInfo(authTokenSelector(await getState()));
      await dispatch(getUserInfoSuccess(response));
    } catch (error) {
      await dispatch(getUserInfoFailure(error));
    }
  };
}

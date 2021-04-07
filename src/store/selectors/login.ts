export const loginSelector = (state: any) => state.login;

export const authTokenSelector = (state: any) => loginSelector(state).response.token;

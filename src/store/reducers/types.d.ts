declare interface ILoginState {
  error: any,
  initialized: boolean,
  isRequesting: boolean,
  isLoggedIn: boolean,
  authToken: string | null,
}

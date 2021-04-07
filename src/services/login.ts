import Request from '@utils/request';

export async function signIn(loginFormFields: ILoginFormFields) {
  const url = `/login`;
  const response = await Request.post(url, loginFormFields) as ILoginResult;

  return response.data;
}

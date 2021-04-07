import Request from '@utils/request';

export async function getUserInfo(authToken: string) {
  const url = `/login`;
  console.log('=--=-=-=-=-=-=-=-=-=-')
  const response = await Request.get(url, undefined, authToken) as ILoginResult;

  return response.data;
}

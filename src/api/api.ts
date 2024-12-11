import { Options } from '@hey-api/client-fetch';

import { client, getApiRequest, getApiRequestById, getApiUser, postApiAuth } from './generated/services.gen';
import { GetApiRequestResponse, GetApiUserResponse, HelpRequestData } from './generated/types.gen';

class Api {
  private readonly url: string;
  private isAuth: boolean | undefined;
  constructor(url: string) {
    this.url = url;
    this.isAuth = false;
  }
  init() {
    client.setConfig({
      baseUrl: this.url,
      throwOnError: true,
    });
    client.interceptors.response.use(async (response, _) => {
      if (!response.ok) {
        throw response.status;
      }
      return response;
    });
  }
  async auth({ login, password }: { login: string; password: string }) {
    try {
      const response = await postApiAuth({ body: { login, password } });
      this.isAuth = response.data?.auth;
      return response.data?.token;
    } catch (code) {
      console.log(code);
      if (code === 500) console.log('Сервер');
      else if (code === 400) console.log('Неверный логин/пароль');
      else console.log('Что-то еще');
      throw Error;
    }
  }
  getUserFavourites() {}
  addToFavourites() {}
  async getUserInfo(token: string) {
    try {
      const response = await getApiUser({
        headers: { Authorization: `Bearer ${token}` },
      } as Options<{ headers: Record<string, string> }>);
      const data = response.data as GetApiUserResponse;
      return data;
    } catch (code) {
      console.log(code);

      if (code === 500) console.log('Сервер');
      throw code;
    }
  }
  removeFromFavourites() {}
  contributeToRequest() {}
  async getRequestDetails(id: string, token: string) {
    try {
      const response = await getApiRequestById({ headers: { Authorization: `Bearer ${token}` }, path: { id } });
      const data = response.data as HelpRequestData;
      return data;
    } catch (code) {
      console.log(code);
      if (code === 500) console.log('Сервер');
      throw Error;
    }
  }
  async getRequests(token: string) {
    try {
      const response = await getApiRequest({
        headers: { Authorization: `Bearer ${token}` },
      } as Options<{ headers: Record<string, string> }>);
      const data = response.data as GetApiRequestResponse;
      return data;
    } catch (code) {
      console.log(code);
      if (code === 500) console.log('Сервер');
      throw Error;
    }
  }
  errorHandling() {}
}
export const api = new Api('http://localhost:4040');
api.init();

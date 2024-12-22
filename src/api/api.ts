import { Options } from '@hey-api/client-fetch';

import {
  client,
  deleteApiUserFavouritesByRequestId,
  getApiRequest,
  getApiRequestById,
  getApiUser,
  getApiUserFavourites,
  postApiAuth,
  postApiRequestByIdContribution,
  postApiUserFavourites,
} from './generated/services.gen';
import {
  GetApiRequestResponse,
  GetApiUserFavouritesResponse,
  GetApiUserResponse,
  HelpRequestData,
} from './generated/types.gen';

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
  async getUserFavourites(token: string) {
    try {
      const response = await getApiUserFavourites({
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = response.data as GetApiUserFavouritesResponse;
      return data;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
  async addToFavourites(id: string, token: string) {
    try {
      const response = await postApiUserFavourites({
        headers: { Authorization: `Bearer ${token}` },
        body: { requestId: id },
      });
      console.log(response);
    } catch (code) {
      if (code === 500) console.log('Сервер');
      throw code;
    }
  }
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
  async removeFromFavourites(id: string, token: string) {
    if (!token) return;
    try {
      const response = await deleteApiUserFavouritesByRequestId({
        headers: { Authorization: `Bearer ${token}` },
        path: { requestId: id },
      });
    } catch (code) {
      console.log(code);
      if (code === 500) console.log('Сервер');
      throw code;
    }
  }
  async contributeToRequest(id: string, token: string) {
    try {
      const response = await postApiRequestByIdContribution({
        headers: { Authorization: `Bearer ${token}` },
        path: { id },
      });
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  }
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

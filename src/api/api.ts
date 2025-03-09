import type { Options } from '@hey-api/client-fetch';

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
import type {
  GetApiRequestResponse,
  GetApiUserFavouritesResponse,
  GetApiUserResponse,
  HelpRequestData,
} from './generated/types.gen';

class Api {
  private readonly url: string;

  constructor(url: string) {
    this.url = url;
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
      return response.data?.token;
    } catch (e) {
      throw e;
    }
  }
  async getUserFavourites(token: string) {
    try {
      const response = await getApiUserFavourites({
        headers: { Authorization: `Bearer ${token}` },
      } as Options<{ headers: Record<string, string> }>);
      const data = response.data as GetApiUserFavouritesResponse;
      return data;
    } catch (e) {
      throw e;
    }
  }
  async addToFavourites(id: string, token: string) {
    try {
      await postApiUserFavourites({
        headers: { Authorization: `Bearer ${token}` },
        body: { requestId: id },
      });
    } catch (e) {
      throw e;
    }
  }
  async getUserInfo(token: string) {
    try {
      const response = await getApiUser({
        headers: { Authorization: `Bearer ${token}` },
      } as Options<{ headers: Record<string, string> }>);
      const data = response.data as GetApiUserResponse;
      return data;
    } catch (e) {
      throw e;
    }
  }
  async removeFromFavourites(id: string, token: string) {
    if (!token) return;
    try {
      await deleteApiUserFavouritesByRequestId({
        headers: { Authorization: `Bearer ${token}` },
        path: { requestId: id },
      });
    } catch (e) {
      throw e;
    }
  }
  async contributeToRequest(id: string, token: string) {
    try {
      await postApiRequestByIdContribution({
        headers: { Authorization: `Bearer ${token}` },
        path: { id },
      });
    } catch (e) {
      throw e;
    }
  }
  async getRequestDetails(id: string, token: string) {
    try {
      const response = await getApiRequestById({ headers: { Authorization: `Bearer ${token}` }, path: { id } });
      const data = response.data as HelpRequestData;
      return data;
    } catch (e) {
      throw e;
    }
  }
  async getRequests(token: string) {
    try {
      const response = await getApiRequest({
        headers: { Authorization: `Bearer ${token}` },
      } as Options<{ headers: Record<string, string> }>);
      const data = response.data as GetApiRequestResponse;
      return data;
    } catch (e) {
      throw e;
    }
  }
}
export const api = new Api('http://localhost:4040');
api.init();

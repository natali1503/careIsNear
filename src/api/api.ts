import { client, postApiAuth } from "./generated/services.gen";

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
      if (code === 500) console.log("Сервер");
      else if (code === 400) console.log("Неверный логин/пароль");
      else console.log("Что-то еще");
      throw Error;
    }
  }
  getUserFavourites() {}
  addToFavourites() {}
  getUserInfo() {}
  removeFromFavourites() {}
  contributeToRequest() {}
  getRequestDetails() {}
  getRequests() {}
  errorHandling() {}
}
export const api = new Api("http://localhost:4040");
api.init();

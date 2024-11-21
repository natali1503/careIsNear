import { client, postApiAuth } from "./generated/services.gen";

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
  }
  async auth({ login, password }: { login: string; password: string }) {
    try {
      await postApiAuth({ body: { login, password } });
    } catch (e) {
      console.log(650965709865709576);
    }
  }
  getUserFavourites() {}
  addToFavourites() {}
  getUserInfo() {}
  removeFromFavourites() {}
  contributeToRequest() {}
  getRequestDetails() {}
  getRequests() {}
}
export const api = new Api("http://localhost:4040");
api.init();

import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import Login from "../../src/components/Login.vue";
import { api } from "../../src/api/api";

describe("Login", () => {
  beforeEach(() => {
    // Создаём новое хранилище перед каждым тестом
    const pinia = createPinia();
    setActivePinia(pinia);
    jest.clearAllMocks();
    localStorage.clear();
  });

  it("Наличие формы авторизации", () => {
    const wrapper = mount(Login);
    expect(wrapper.find("input[placeholder='Логин']").exists()).toBe(true);
    expect(wrapper.find("input[placeholder='Пароль']").exists()).toBe(true);
    expect(wrapper.find("button").text()).toBe("Войти");
  });
  it("Обновление полей формы", async () => {
    const wrapper = mount(Login);
    const loginInput = wrapper.find("input[placeholder='Логин']");
    const passwordInput = wrapper.find("input[placeholder='Пароль']");
    await loginInput.setValue("testLogin");
    await passwordInput.setValue("testPassword");

    expect((loginInput.element as HTMLInputElement).value).toBe("testLogin");
    expect((passwordInput.element as HTMLInputElement).value).toBe("testPassword");
  });
  // it("Проверка вызова функции входа ", async () => {});

  it("Должен сохранять токен в localStorage при авторизации", async () => {
    //given
    api.auth = jest.fn().mockResolvedValueOnce("wegwegwe");
    const wrapper = mount(Login);
    const loginInput = wrapper.find("input[placeholder='Логин']");
    const passwordInput = wrapper.find("input[placeholder='Пароль']");

    //when
    await loginInput.setValue("testLogin");
    await passwordInput.setValue("testPassword");
    await wrapper.find("button").trigger("click");

    //then
    expect(api.auth).toHaveBeenCalledTimes(1);
    expect(api.auth).toHaveBeenCalledWith({
      login: "testLogin",
      password: "testPassword",
    });
    expect(localStorage.getItem("tokenAuth")).toBe("wegwegwe");
  });
});

import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import Login from "../../src/components/Login.vue";
import { temp as tempTest } from "../../src/components/temp";

describe("Login", () => {
  beforeEach(() => {
    // Создаём новое хранилище перед каждым тестом
    const pinia = createPinia();
    setActivePinia(pinia);
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

  it("должен вызывать функцию temp при клике на кнопку", async () => {});
});

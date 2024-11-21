import { mount } from "@vue/test-utils";
import Login from "../../src/components/Login.vue";

describe("Login", () => {
  it("", () => {
    const wrapper = mount(Login);
    expect(wrapper.find("input[placeholder='Логин']").exists()).toBe(true);
    expect(wrapper.find("input[placeholder='Пароль']").exists()).toBe(true);
    expect(wrapper.find("button").text()).toBe("Войти");
  });
});

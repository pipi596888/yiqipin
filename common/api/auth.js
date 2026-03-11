import { request } from "./request";
import { mockLogin } from "./mock";
import { useAuthStore } from "../store/index";
import env from "../config/env";

const USE_MOCK = env.FEATURE_FLAGS.useMockAuth;

export function login(payload) {
  if (USE_MOCK) {
    return mockLogin(payload).then((res) => {
      const authStore = useAuthStore()
      authStore.setToken(res.token)
      authStore.setUser(res.user)
      return res
    });
  }
  return request({
    url: "/api/login",
    method: "POST",
    data: payload
  }).then((res) => {
    const authStore = useAuthStore()
    authStore.setToken(res.token)
    authStore.setUser(res.user)
    return res
  });
}

export function logout() {
  if (USE_MOCK) {
    return Promise.resolve({ success: true });
  }
  return request({
    url: "/api/logout",
    method: "POST"
  }).finally(() => {
    const authStore = useAuthStore()
    authStore.clearAuth()
  });
}

export function register(payload) {
  if (USE_MOCK) {
    return Promise.resolve({
      token: "mock-token-" + Date.now(),
      user: {
        id: Date.now(),
        username: payload.username,
        phone: payload.phone,
        avatar: "/static/logo.png"
      }
    });
  }
  return request({
    url: "/api/register",
    method: "POST",
    data: payload
  });
}

export function sendSmsCode(phone) {
  if (USE_MOCK) {
    return Promise.resolve({ success: true, code: "123456" });
  }
  return request({
    url: "/api/sms/send",
    method: "POST",
    data: { phone }
  });
}

export function resetPassword(payload) {
  if (USE_MOCK) {
    return Promise.resolve({ success: true });
  }
  return request({
    url: "/api/password/reset",
    method: "POST",
    data: payload
  });
}

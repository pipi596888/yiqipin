import env from "../config/env";
import { useAuthStore } from "../store/index";

function toQueryString(params = {}) {
  const keys = Object.keys(params);
  if (!keys.length) return "";
  const query = keys
    .filter((k) => params[k] !== undefined && params[k] !== null && params[k] !== "")
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
    .join("&");
  return query ? `?${query}` : "";
}

export function request({ url, method = "GET", data = {}, header = {} }) {
  const authStore = useAuthStore()
  const token = authStore.getToken()
  const fullUrl =
    method.toUpperCase() === "GET"
      ? `${env.API_BASE_URL}${url}${toQueryString(data)}`
      : `${env.API_BASE_URL}${url}`;

  return new Promise((resolve, reject) => {
    uni.request({
      url: fullUrl,
      method,
      data: method.toUpperCase() === "GET" ? {} : data,
      header: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...header
      },
      success: (res) => {
        if (res.statusCode === 401) {
          authStore.clearAuth()
          uni.showToast({ title: "登录已过期，请重新登录", icon: "none" });
          setTimeout(() => {
            uni.navigateTo({ url: "/pages/login/login" });
          }, 300);
          reject(new Error("UNAUTHORIZED"));
          return;
        }
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data);
          return;
        }
        reject(new Error(res.data?.message || "请求失败"));
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
}

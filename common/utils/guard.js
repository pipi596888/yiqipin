import { isLoggedIn } from "../store/auth";

export function requireLogin(redirectUrl) {
  if (isLoggedIn()) {
    return true;
  }
  uni.showToast({
    title: "Please login first",
    icon: "none"
  });
  setTimeout(() => {
    uni.navigateTo({
      url: `/pages/login/login?redirect=${encodeURIComponent(redirectUrl || "")}`
    });
  }, 250);
  return false;
}

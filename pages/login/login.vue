<template>
  <view class="page">
    <view class="title">登录</view>

    <view class="form">
      <input class="input" v-model.trim="form.username" placeholder="用户名/手机号/邮箱" />
      <input class="input" v-model.trim="form.password" placeholder="密码" password />
      <button type="primary" :loading="loading" @click="handleLogin">登录</button>
      <view class="links">
        <text @click="goRegister">注册账号</text>
        <text @click="goReset">忘记密码</text>
      </view>
    </view>
  </view>
</template>

<script>
import { login } from "../../common/api/auth";
import { useAuthStore } from "../../common/store/index";

export default {
  data() {
    return {
      loading: false,
      redirect: "",
      form: {
        username: "",
        password: ""
      }
    };
  },
  onLoad(query) {
    this.redirect = query.redirect || "";
  },
  methods: {
    async handleLogin() {
      if (!this.form.username || !this.form.password) {
        uni.showToast({ title: "请输入账号和密码", icon: "none" });
        return;
      }
      this.loading = true;
      try {
        const res = await login(this.form);
        const authStore = useAuthStore()
        authStore.setToken(res.token)
        authStore.setUser(res.user)
        uni.showToast({ title: "登录成功", icon: "success" });
        setTimeout(() => {
          if (this.redirect) {
            uni.redirectTo({ url: decodeURIComponent(this.redirect) });
          } else {
            uni.reLaunch({ url: "/pages/index/index" });
          }
        }, 300);
      } catch (error) {
        uni.showToast({ title: error.message || "登录失败", icon: "none" });
      } finally {
        this.loading = false;
      }
    },
    goRegister() {
      uni.showToast({ title: "注册功能开发中", icon: "none" });
    },
    goReset() {
      uni.showToast({ title: "找回密码功能开发中", icon: "none" });
    }
  }
};
</script>

<style>
.page {
  padding: 32rpx;
}

.title {
  font-size: 40rpx;
  font-weight: 700;
  margin-top: 60rpx;
  margin-bottom: 40rpx;
}

.form {
  background: #fff;
  border-radius: 16rpx;
  padding: 24rpx;
}

.input {
  height: 88rpx;
  border: 1px solid #eee;
  border-radius: 10rpx;
  padding: 0 20rpx;
  margin-bottom: 20rpx;
}

.links {
  display: flex;
  justify-content: space-between;
  margin-top: 24rpx;
  color: #1677ff;
  font-size: 28rpx;
}
</style>

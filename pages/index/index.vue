<template>
  <view class="page">
    <view class="title">一元拍商城</view>
    <view class="desc">精选好物 一元起拍</view>

    <view class="nav-grid">
      <view class="nav-item" @click="go('/pages/product/list')">
        <text class="nav-icon">🛍️</text>
        <text class="nav-label">商品列表</text>
      </view>
      <view class="nav-item" @click="go('/pages/cart/index')">
        <text class="nav-icon">🛒</text>
        <text class="nav-label">购物车</text>
      </view>
      <view class="nav-item" @click="go('/pages/user/orders')">
        <text class="nav-icon">📦</text>
        <text class="nav-label">我的订单</text>
      </view>
      <view class="nav-item" @click="go('/pages/user/index')">
        <text class="nav-icon">👤</text>
        <text class="nav-label">个人中心</text>
      </view>
    </view>

    <view class="section">
      <view class="section-title">快捷入口</view>
      <view class="link-list">
        <view class="link-item" @click="go('/pages/chat/index')">
          <text>在线客服</text>
          <text class="arrow">›</text>
        </view>
        <view class="link-item" @click="go('/pages/growth/index')">
          <text>营销活动</text>
          <text class="arrow">›</text>
        </view>
        <view class="link-item" @click="go('/pages/recommendation/index')">
          <text>为你推荐</text>
          <text class="arrow">›</text>
        </view>
        <view class="link-item" @click="go('/pages/analytics/index')">
          <text>数据统计</text>
          <text class="arrow">›</text>
        </view>
      </view>
    </view>

    <view class="section">
      <view class="section-title">账号</view>
      <button class="btn" @click="handleAuth">{{ loginButtonText }}</button>
    </view>
  </view>
</template>

<script>
import { useAuthStore } from "../../common/store/index";

export default {
  data() {
    return {
      loggedIn: false
    };
  },
  computed: {
    loginButtonText() {
      return this.loggedIn ? "退出登录" : "登录 / 注册";
    }
  },
  onShow() {
    const authStore = useAuthStore()
    this.loggedIn = authStore.isLoggedIn;
  },
  methods: {
    go(url) {
      uni.navigateTo({ url });
    },
    handleAuth() {
      const authStore = useAuthStore()
      if (this.loggedIn) {
        uni.showModal({
          title: '提示',
          content: '确定要退出登录吗？',
          success: (res) => {
            if (res.confirm) {
              authStore.clearAuth()
              this.loggedIn = false;
              uni.showToast({ title: '已退出登录', icon: 'none' });
            }
          }
        });
      } else {
        uni.navigateTo({ url: '/pages/login/login' });
      }
    }
  }
};
</script>

<style>
.page {
  padding: 32rpx;
  min-height: 100vh;
  background: #f5f5f5;
}

.title {
  font-size: 48rpx;
  font-weight: 700;
  margin-top: 40rpx;
  color: #333;
}

.desc {
  color: #666;
  font-size: 28rpx;
  margin-top: 10rpx;
}

.nav-grid {
  display: flex;
  justify-content: space-around;
  margin-top: 40rpx;
  padding: 30rpx;
  background: #fff;
  border-radius: 16rpx;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.nav-icon {
  font-size: 48rpx;
}

.nav-label {
  margin-top: 10rpx;
  font-size: 24rpx;
  color: #333;
}

.section {
  margin-top: 30rpx;
  background: #fff;
  border-radius: 16rpx;
  padding: 24rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: 600;
  margin-bottom: 20rpx;
}

.link-list {
  border-top: 1px solid #eee;
}

.link-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24rpx 0;
  border-bottom: 1px solid #f5f5f5;
  font-size: 28rpx;
}

.link-item:last-child {
  border-bottom: none;
}

.arrow {
  color: #999;
  font-size: 32rpx;
}

.btn {
  margin-top: 10rpx;
}
</style>

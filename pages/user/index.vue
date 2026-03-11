<template>
  <view class="page">
    <view class="user-header" v-if="profile">
      <image class="avatar" :src="profile.avatar || '/static/logo.png'" mode="aspectFill" />
      <view class="user-info">
        <view class="username">{{ profile.username }}</view>
        <view class="phone">{{ profile.phone || '未绑定手机' }}</view>
      </view>
    </view>

    <view class="stats-row" v-if="profile">
      <view class="stat-item">
        <text class="num">{{ profile.balance || 0 }}</text>
        <text class="label">余额</text>
      </view>
      <view class="stat-item">
        <text class="num">{{ profile.points || 0 }}</text>
        <text class="label">积分</text>
      </view>
    </view>

    <view class="card menu-list">
      <view class="menu-item" @click="go('/pages/user/orders')">
        <text class="menu-icon">📦</text>
        <text class="menu-text">我的订单</text>
        <text class="arrow">›</text>
      </view>
      <view class="menu-item" @click="go('/pages/user/address')">
        <text class="menu-icon">📍</text>
        <text class="menu-text">收货地址</text>
        <text class="arrow">›</text>
      </view>
      <view class="menu-item" @click="go('/pages/chat/index')">
        <text class="menu-icon">💬</text>
        <text class="menu-text">联系客服</text>
        <text class="arrow">›</text>
      </view>
    </view>

    <view class="card menu-list">
      <view class="menu-item" @click="go('/pages/growth/index')">
        <text class="menu-icon">🎁</text>
        <text class="menu-text">营销活动</text>
        <text class="arrow">›</text>
      </view>
      <view class="menu-item" @click="go('/pages/recommendation/index')">
        <text class="menu-icon">✨</text>
        <text class="menu-text">为你推荐</text>
        <text class="arrow">›</text>
      </view>
    </view>

    <button class="logout-btn" @click="handleLogout" v-if="isLoggedIn">退出登录</button>
  </view>
</template>

<script>
import { useAuthStore } from "../../common/store/index";
import { getUserProfile } from "../../common/api/user";

export default {
  data() {
    return {
      profile: null,
      isLoggedIn: false
    };
  },
  onShow() {
    const authStore = useAuthStore()
    this.isLoggedIn = authStore.isLoggedIn
    if (this.isLoggedIn) {
      this.loadProfile();
    }
  },
  methods: {
    async loadProfile() {
      try {
        uni.showLoading({ title: '加载中...' });
        this.profile = await getUserProfile();
        uni.hideLoading();
      } catch (error) {
        uni.hideLoading();
        uni.showToast({ title: error.message || "加载失败", icon: "none" });
      }
    },
    go(url) {
      if (!this.isLoggedIn) {
        uni.showModal({
          title: '提示',
          content: '请先登录',
          confirmText: '去登录',
          success: (res) => {
            if (res.confirm) {
              uni.navigateTo({ url: '/pages/login/login' });
            }
          }
        });
        return;
      }
      uni.navigateTo({ url });
    },
    handleLogout() {
      uni.showModal({
        title: '提示',
        content: '确定要退出登录吗？',
        success: (res) => {
          if (res.confirm) {
            const authStore = useAuthStore()
            authStore.clearAuth()
            this.isLoggedIn = false
            this.profile = null
            uni.showToast({ title: '已退出登录', icon: 'none' });
          }
        }
      });
    }
  }
};
</script>

<style>
.page {
  min-height: 100vh;
  background: #f5f5f5;
  padding-bottom: 40rpx;
}

.user-header {
  display: flex;
  align-items: center;
  padding: 40rpx 32rpx;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
}

.avatar {
  width: 120rpx;
  height: 120rpx;
  border-radius: 60rpx;
  background: #fff;
}

.user-info {
  margin-left: 24rpx;
}

.username {
  font-size: 36rpx;
  font-weight: 700;
}

.phone {
  margin-top: 10rpx;
  font-size: 26rpx;
  opacity: 0.9;
}

.stats-row {
  display: flex;
  background: #fff;
  padding: 30rpx 0;
  margin-bottom: 20rpx;
}

.stat-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.num {
  font-size: 36rpx;
  font-weight: 700;
  color: #333;
}

.label {
  margin-top: 8rpx;
  font-size: 24rpx;
  color: #999;
}

.card {
  background: #fff;
  margin: 0 20rpx 20rpx;
  border-radius: 14rpx;
  overflow: hidden;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 28rpx 24rpx;
  border-bottom: 1px solid #f5f5f5;
}

.menu-item:last-child {
  border-bottom: none;
}

.menu-icon {
  font-size: 36rpx;
}

.menu-text {
  flex: 1;
  margin-left: 20rpx;
  font-size: 30rpx;
  color: #333;
}

.arrow {
  color: #ccc;
  font-size: 32rpx;
}

.logout-btn {
  margin: 40rpx 20rpx 0;
  background: #fff;
  color: #ff4d4f;
  border-radius: 14rpx;
}
</style>

<template>
  <view class="page" v-if="product">
    <swiper class="swiper" indicator-dots autoplay circular>
      <swiper-item v-for="(img, idx) in product.images" :key="idx">
        <image class="banner" :src="img" mode="aspectFill" />
      </swiper-item>
    </swiper>

    <view class="panel">
      <view class="name">{{ product.name }}</view>
      <view class="price-row">
        <text class="price">{{ formatPrice(product.price) }}</text>
        <text class="sales">已售 {{ product.sales || 0 }}</text>
      </view>
      <view class="stock">库存: {{ product.stock }}</view>
      <view class="rating" v-if="product.rating">评分: {{ product.rating }} ⭐</view>
    </view>

    <view class="panel">
      <view class="section-title">商品详情</view>
      <view class="desc">{{ product.desc || '暂无详细描述' }}</view>
    </view>

    <view class="action-bar">
      <view class="action-btn service" @click="contactService">
        <text class="icon">💬</text>
        <text>客服</text>
      </view>
      <view class="action-btn cart" @click="add">
        <text class="icon">🛒</text>
        <text>加入购物车</text>
      </view>
      <view class="action-btn buy" @click="buyNow">
        <text>立即购买</text>
      </view>
    </view>
  </view>
</template>

<script>
import { getProductDetail } from "../../common/api/product";
import { addToCart } from "../../common/store/cart";
import { useAuthStore } from "../../common/store/index";

export default {
  data() {
    return {
      product: null,
      id: ""
    };
  },
  onLoad(query) {
    this.id = query.id || "";
    this.fetchDetail();
  },
  methods: {
    formatPrice(price) {
      return `¥${Number(price).toFixed(2)}`;
    },
    async fetchDetail() {
      if (!this.id) {
        uni.showToast({ title: "无效的商品参数", icon: "none" });
        return;
      }
      try {
        uni.showLoading({ title: "加载中..." });
        this.product = await getProductDetail(this.id);
        uni.hideLoading();
      } catch (error) {
        uni.hideLoading();
        uni.showToast({ title: error.message || "加载失败", icon: "none" });
      }
    },
    checkLogin() {
      const authStore = useAuthStore()
      if (!authStore.isLoggedIn) {
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
        return false;
      }
      return true;
    },
    add() {
      if (!this.checkLogin()) return;
      addToCart(this.product, 1);
      uni.showToast({ title: "已加入购物车", icon: "success" });
    },
    buyNow() {
      if (!this.checkLogin()) return;
      addToCart(this.product, 1);
      uni.navigateTo({ url: "/pages/order/confirm" });
    },
    contactService() {
      uni.navigateTo({ url: "/pages/chat/index" });
    }
  }
};
</script>

<style>
.page {
  padding-bottom: 140rpx;
  background: #f5f5f5;
}

.swiper {
  height: 600rpx;
}

.banner {
  width: 100%;
  height: 100%;
}

.panel {
  background: #fff;
  margin: 20rpx;
  border-radius: 16rpx;
  padding: 24rpx;
}

.name {
  font-size: 34rpx;
  font-weight: 700;
}

.price-row {
  display: flex;
  align-items: baseline;
  margin-top: 16rpx;
}

.price {
  color: #ff4d4f;
  font-size: 40rpx;
  font-weight: 700;
}

.sales {
  margin-left: 20rpx;
  color: #999;
  font-size: 24rpx;
}

.stock, .rating {
  margin-top: 12rpx;
  color: #666;
  font-size: 26rpx;
}

.section-title {
  font-size: 30rpx;
  font-weight: 600;
  margin-bottom: 16rpx;
}

.desc {
  color: #666;
  line-height: 1.6;
  font-size: 28rpx;
}

.action-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  padding: 16rpx;
  display: flex;
  align-items: center;
  gap: 16rpx;
  box-shadow: 0 -2rpx 10rpx rgba(0,0,0,0.05);
}

.action-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80rpx;
  border-radius: 40rpx;
  font-size: 26rpx;
}

.action-btn .icon {
  font-size: 32rpx;
}

.service {
  width: 100rpx;
  background: #f5f5f5;
  color: #666;
}

.cart {
  flex: 1;
  background: #ffa500;
  color: #fff;
}

.buy {
  flex: 1;
  background: #ff4d4f;
  color: #fff;
}
</style>

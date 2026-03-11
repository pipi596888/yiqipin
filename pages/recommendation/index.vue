<template>
  <view class="page">
    <view class="block">
      <view class="title">Hot Products</view>
      <view v-for="item in data.hot" :key="`hot-${item.product_id}`" class="item" @click="goDetail(item.product_id)">
        <view>
          <text>{{ item.name }}</text>
          <text class="sub">Score: {{ item.score }}</text>
        </view>
        <view class="action-wrap">
          <text class="price">${{ Number(item.price || 0).toFixed(2) }}</text>
          <button size="mini" @click.stop="quickAdd(item)">Add</button>
        </view>
      </view>
    </view>

    <view class="block">
      <view class="title">Guess You Like</view>
      <view v-for="item in data.guess" :key="`guess-${item.product_id}`" class="item" @click="goDetail(item.product_id)">
        <view>
          <text>{{ item.name }}</text>
          <text class="sub">Score: {{ item.score }}</text>
        </view>
        <view class="action-wrap">
          <text class="price">${{ Number(item.price || 0).toFixed(2) }}</text>
          <button size="mini" @click.stop="quickAdd(item)">Add</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { getRecommendations } from "../../common/api/growth";
import { addToCart } from "../../common/store/cart";
import { requireLogin } from "../../common/utils/guard";

export default {
  data() {
    return {
      data: {
        hot: [],
        guess: []
      }
    };
  },
  onShow() {
    this.loadData();
  },
  methods: {
    async loadData() {
      try {
        this.data = await getRecommendations();
      } catch (error) {
        uni.showToast({ title: error.message || "Load recommendations failed", icon: "none" });
      }
    },
    goDetail(productId) {
      uni.navigateTo({ url: `/pages/product/detail?id=${productId}` });
    },
    quickAdd(item) {
      if (!requireLogin("/pages/recommendation/index")) return;
      addToCart(
        {
          product_id: item.product_id,
          name: item.name,
          price: Number(item.price || 0),
          image: item.image || "/static/logo.png"
        },
        1
      );
      uni.showToast({ title: "Added", icon: "none" });
    }
  }
};
</script>

<style>
.page {
  padding: 24rpx;
}

.block {
  background: #fff;
  border-radius: 12rpx;
  padding: 18rpx;
  margin-bottom: 16rpx;
}

.title {
  font-size: 30rpx;
  font-weight: 700;
  margin-bottom: 12rpx;
}

.item {
  display: flex;
  justify-content: space-between;
  padding: 12rpx 0;
  border-bottom: 1px solid #f1f1f1;
}

.item:last-child {
  border-bottom: none;
}

.sub {
  display: block;
  color: #666;
  margin-top: 4rpx;
  font-size: 22rpx;
}

.action-wrap {
  display: flex;
  align-items: center;
  gap: 8rpx;
}

.price {
  color: #ff4d4f;
  font-weight: 700;
}
</style>

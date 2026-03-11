<template>
  <view class="page">
    <view v-if="!items.length" class="empty">Cart is empty</view>

    <view v-for="item in items" :key="item.product_id" class="card">
      <image class="thumb" :src="item.image" mode="aspectFill" />
      <view class="meta">
        <view class="name">{{ item.name }}</view>
        <view class="price">{{ formatPrice(item.price) }}</view>
        <view class="qty-row">
          <button size="mini" @click="minus(item)">-</button>
          <text class="qty">{{ item.quantity }}</text>
          <button size="mini" @click="plus(item)">+</button>
          <text class="remove" @click="remove(item.product_id)">Delete</text>
        </view>
      </view>
    </view>

    <view class="bottom" v-if="items.length">
      <text>Total: {{ formatPrice(total) }}</text>
      <button type="primary" @click="checkout">Checkout</button>
    </view>
  </view>
</template>

<script>
import { getCartItems, updateCartQuantity, removeCartItem, calcCartTotal } from "../../common/store/cart";
import { requireLogin } from "../../common/utils/guard";

export default {
  data() {
    return {
      items: []
    };
  },
  computed: {
    total() {
      return calcCartTotal(this.items);
    }
  },
  onShow() {
    if (!requireLogin("/pages/cart/index")) return;
    this.refresh();
  },
  methods: {
    formatPrice(price) {
      return `$${Number(price).toFixed(2)}`;
    },
    refresh() {
      this.items = getCartItems();
    },
    minus(item) {
      updateCartQuantity(item.product_id, item.quantity - 1);
      this.refresh();
    },
    plus(item) {
      updateCartQuantity(item.product_id, item.quantity + 1);
      this.refresh();
    },
    remove(productId) {
      removeCartItem(productId);
      this.refresh();
    },
    checkout() {
      uni.navigateTo({ url: "/pages/order/confirm" });
    }
  }
};
</script>

<style>
.page {
  padding: 24rpx;
  padding-bottom: 160rpx;
}

.empty {
  text-align: center;
  color: #888;
  margin-top: 140rpx;
}

.card {
  display: flex;
  background: #fff;
  border-radius: 14rpx;
  padding: 16rpx;
  margin-bottom: 16rpx;
}

.thumb {
  width: 140rpx;
  height: 140rpx;
  border-radius: 8rpx;
}

.meta {
  flex: 1;
  margin-left: 16rpx;
}

.name {
  font-size: 30rpx;
  font-weight: 600;
}

.price {
  color: #ff4d4f;
  margin-top: 10rpx;
}

.qty-row {
  margin-top: 16rpx;
  display: flex;
  align-items: center;
}

.qty {
  margin: 0 16rpx;
}

.remove {
  margin-left: auto;
  color: #1677ff;
}

.bottom {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  height: 110rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24rpx;
  box-sizing: border-box;
}
</style>

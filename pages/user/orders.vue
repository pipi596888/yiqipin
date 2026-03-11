<template>
  <view class="page">
    <view v-if="!orders.length" class="empty">No order records</view>

    <view v-for="item in orders" :key="item.order_id" class="card">
      <view class="row">
        <text class="label">Order ID</text>
        <text>{{ item.order_id }}</text>
      </view>
      <view class="row">
        <text class="label">Status</text>
        <text>{{ item.status }}</text>
      </view>
      <view class="row">
        <text class="label">Total</text>
        <text>${{ Number(item.total_price).toFixed(2) }}</text>
      </view>
      <view class="row">
        <text class="label">Created At</text>
        <text>{{ item.create_time }}</text>
      </view>
    </view>
  </view>
</template>

<script>
import { requireLogin } from "../../common/utils/guard";
import { getUserOrders } from "../../common/api/user";

export default {
  data() {
    return {
      orders: []
    };
  },
  onShow() {
    if (!requireLogin("/pages/user/orders")) return;
    this.loadOrders();
  },
  methods: {
    async loadOrders() {
      try {
        this.orders = await getUserOrders();
      } catch (error) {
        uni.showToast({ title: error.message || "Load orders failed", icon: "none" });
      }
    }
  }
};
</script>

<style>
.page {
  padding: 24rpx;
}

.empty {
  text-align: center;
  margin-top: 140rpx;
  color: #888;
}

.card {
  background: #fff;
  border-radius: 14rpx;
  padding: 20rpx;
  margin-bottom: 16rpx;
}

.row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10rpx;
}

.label {
  color: #666;
}
</style>

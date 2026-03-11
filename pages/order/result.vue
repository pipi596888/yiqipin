<template>
  <view class="page">
    <view class="status">{{ status === "success" ? "Payment Success" : "Pending Payment" }}</view>
    <view class="order">Order ID: {{ orderId }}</view>

    <view class="btn-group">
      <button type="primary" @click="goProducts">Continue Shopping</button>
      <button @click="goHome">Back Home</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      orderId: "",
      status: "pending"
    };
  },
  onLoad(query) {
    this.orderId = query.orderId || "-";
    this.status = query.status || "pending";
  },
  methods: {
    goProducts() {
      uni.redirectTo({ url: "/pages/product/list" });
    },
    goHome() {
      uni.reLaunch({ url: "/pages/index/index" });
    }
  }
};
</script>

<style>
.page {
  padding: 40rpx;
  text-align: center;
}

.status {
  margin-top: 100rpx;
  font-size: 42rpx;
  font-weight: 700;
}

.order {
  margin-top: 30rpx;
  color: #666;
}

.btn-group {
  margin-top: 50rpx;
}

.btn-group button {
  margin-top: 20rpx;
}
</style>

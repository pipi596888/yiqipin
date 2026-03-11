<template>
  <view class="page">
    <view v-if="!addresses.length" class="empty">No address records</view>

    <view v-for="item in addresses" :key="item.id" class="card">
      <view class="receiver">{{ item.receiver }} {{ item.phone }}</view>
      <view class="detail">{{ item.detail }}</view>
    </view>
  </view>
</template>

<script>
import { requireLogin } from "../../common/utils/guard";
import { getUserAddresses } from "../../common/api/user";

export default {
  data() {
    return {
      addresses: []
    };
  },
  onShow() {
    if (!requireLogin("/pages/user/address")) return;
    this.loadAddress();
  },
  methods: {
    async loadAddress() {
      try {
        this.addresses = await getUserAddresses();
      } catch (error) {
        uni.showToast({ title: error.message || "Load address failed", icon: "none" });
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

.receiver {
  font-weight: 700;
}

.detail {
  margin-top: 8rpx;
  color: #666;
}
</style>

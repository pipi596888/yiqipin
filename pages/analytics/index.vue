<template>
  <view class="page">
    <view class="kpi-grid">
      <view class="kpi-card">
        <view class="kpi-title">Sales Today</view>
        <view class="kpi-value">${{ Number(data.sales_today).toFixed(2) }}</view>
        <view class="kpi-sub">vs yesterday: {{ salesGrowth }}%</view>
      </view>
      <view class="kpi-card">
        <view class="kpi-title">Orders Today</view>
        <view class="kpi-value">{{ data.order_count_today }}</view>
        <view class="kpi-sub">vs yesterday: {{ orderGrowth }}%</view>
      </view>
      <view class="kpi-card">
        <view class="kpi-title">New Users</view>
        <view class="kpi-value">{{ data.user_growth_today }}</view>
        <view class="kpi-sub">vs yesterday: {{ userGrowth }}%</view>
      </view>
    </view>

    <view class="panel">
      <view class="panel-title">Top Products</view>
      <view class="top-item" v-for="(item, idx) in data.top_products" :key="item.name">
        <view class="left">
          <text>{{ idx + 1 }}. {{ item.name }}</text>
          <view class="bar-wrap">
            <view class="bar" :style="{ width: soldPercent(item.sold) + '%' }"></view>
          </view>
        </view>
        <text>{{ item.sold }}</text>
      </view>
    </view>
  </view>
</template>

<script>
import { getAnalytics } from "../../common/api/growth";
import { analyticsGrowthRate } from "../../common/utils/growth";

export default {
  data() {
    return {
      data: {
        sales_today: 0,
        sales_yesterday: 0,
        order_count_today: 0,
        order_count_yesterday: 0,
        user_growth_today: 0,
        user_growth_yesterday: 0,
        top_products: []
      }
    };
  },
  computed: {
    salesGrowth() {
      return analyticsGrowthRate(this.data.sales_today, this.data.sales_yesterday);
    },
    orderGrowth() {
      return analyticsGrowthRate(this.data.order_count_today, this.data.order_count_yesterday);
    },
    userGrowth() {
      return analyticsGrowthRate(this.data.user_growth_today, this.data.user_growth_yesterday);
    },
    maxSold() {
      const list = this.data.top_products;
      if (!list.length) return 1;
      return Math.max(...list.map((it) => Number(it.sold) || 0), 1);
    }
  },
  onShow() {
    this.loadData();
  },
  methods: {
    soldPercent(value) {
      return Number((((Number(value) || 0) / this.maxSold) * 100).toFixed(2));
    },
    async loadData() {
      try {
        this.data = await getAnalytics();
      } catch (error) {
        uni.showToast({ title: error.message || "Load analytics failed", icon: "none" });
      }
    }
  }
};
</script>

<style>
.page {
  padding: 24rpx;
}

.kpi-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12rpx;
}

.kpi-card {
  background: #fff;
  border-radius: 12rpx;
  padding: 16rpx;
}

.kpi-title {
  color: #666;
  font-size: 24rpx;
}

.kpi-value {
  margin-top: 10rpx;
  font-size: 34rpx;
  font-weight: 700;
}

.kpi-sub {
  margin-top: 8rpx;
  color: #2f6fde;
  font-size: 22rpx;
}

.panel {
  background: #fff;
  border-radius: 12rpx;
  padding: 18rpx;
  margin-top: 16rpx;
}

.panel-title {
  font-size: 30rpx;
  font-weight: 700;
  margin-bottom: 10rpx;
}

.top-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12rpx;
  padding: 12rpx 0;
  border-bottom: 1px solid #f1f1f1;
}

.top-item:last-child {
  border-bottom: none;
}

.left {
  flex: 1;
}

.bar-wrap {
  margin-top: 8rpx;
  height: 10rpx;
  background: #eef2f7;
  border-radius: 999rpx;
  overflow: hidden;
}

.bar {
  height: 100%;
  background: #1677ff;
}
</style>

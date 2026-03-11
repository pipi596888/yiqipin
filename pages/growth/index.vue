<template>
  <view class="page">
    <view class="title">Campaign Center</view>
    <view class="sub">Phase 3 marketing placeholders with filters.</view>

    <view class="tabs">
      <text class="tab" :class="{ active: activeStatus === 'all' }" @click="setStatus('all')">All</text>
      <text class="tab" :class="{ active: activeStatus === 'active' }" @click="setStatus('active')">Active</text>
      <text class="tab" :class="{ active: activeStatus === 'scheduled' }" @click="setStatus('scheduled')">Scheduled</text>
      <text class="tab" :class="{ active: activeStatus === 'inactive' }" @click="setStatus('inactive')">Inactive</text>
    </view>

    <view class="summary" v-if="summaryKeys.length">
      <text v-for="key in summaryKeys" :key="key" class="badge">{{ key }}: {{ summary[key] }}</text>
    </view>

    <view v-for="item in displayCampaigns" :key="item.id" class="card">
      <view class="row">
        <text class="name">{{ item.name }}</text>
        <text class="status">{{ item.status }}</text>
      </view>
      <view class="meta">Type: {{ item.type }}</view>
      <view class="meta">Discount: {{ item.discount }}</view>
    </view>

    <view v-if="!displayCampaigns.length" class="empty">No campaigns in this status.</view>
  </view>
</template>

<script>
import { requireLogin } from "../../common/utils/guard";
import { getCampaigns } from "../../common/api/growth";
import { campaignTypeSummary, filterCampaigns } from "../../common/utils/growth";

export default {
  data() {
    return {
      campaigns: [],
      activeStatus: "all"
    };
  },
  computed: {
    displayCampaigns() {
      return filterCampaigns(this.campaigns, this.activeStatus);
    },
    summary() {
      return campaignTypeSummary(this.displayCampaigns);
    },
    summaryKeys() {
      return Object.keys(this.summary);
    }
  },
  onShow() {
    if (!requireLogin("/pages/growth/index")) return;
    this.loadData();
  },
  methods: {
    setStatus(status) {
      this.activeStatus = status;
    },
    async loadData() {
      try {
        this.campaigns = await getCampaigns();
      } catch (error) {
        uni.showToast({ title: error.message || "Load campaigns failed", icon: "none" });
      }
    }
  }
};
</script>

<style>
.page {
  padding: 24rpx;
}

.title {
  font-size: 36rpx;
  font-weight: 700;
}

.sub {
  margin-top: 8rpx;
  color: #666;
  margin-bottom: 20rpx;
}

.tabs {
  display: flex;
  gap: 12rpx;
  margin-bottom: 16rpx;
}

.tab {
  padding: 8rpx 14rpx;
  border-radius: 999rpx;
  background: #f2f4f7;
  color: #666;
}

.tab.active {
  background: #1677ff;
  color: #fff;
}

.summary {
  margin-bottom: 12rpx;
}

.badge {
  display: inline-block;
  margin-right: 10rpx;
  margin-bottom: 8rpx;
  padding: 6rpx 10rpx;
  border-radius: 10rpx;
  background: #eef5ff;
  color: #2f6fde;
}

.card {
  background: #fff;
  border-radius: 12rpx;
  padding: 18rpx;
  margin-bottom: 14rpx;
}

.row {
  display: flex;
  justify-content: space-between;
}

.name {
  font-weight: 700;
}

.status {
  color: #1677ff;
}

.meta {
  margin-top: 8rpx;
  color: #666;
}

.empty {
  text-align: center;
  color: #888;
  margin-top: 80rpx;
}
</style>

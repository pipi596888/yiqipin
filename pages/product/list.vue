<template>
  <view class="page">
    <view class="search-wrap">
      <input class="search" v-model.trim="keyword" placeholder="搜索商品" />
      <button size="mini" @click="applySearch">搜索</button>
    </view>

    <view class="sort-row">
      <text class="sort-item" :class="{ active: sortBy === 'sales' }" @click="changeSort('sales')">销量</text>
      <text class="sort-item" :class="{ active: sortBy === 'price' }" @click="changeSort('price')">价格</text>
      <text class="sort-item" :class="{ active: sortBy === 'rating' }" @click="changeSort('rating')">评分</text>
    </view>

    <view v-if="loading" class="state">加载中...</view>
    <view v-else-if="!filteredList.length" class="state">暂无商品</view>

    <view v-for="item in filteredList" :key="item.product_id" class="card" @click="goDetail(item.product_id)">
      <image class="thumb" :src="item.image" mode="aspectFill" />
      <view class="meta">
        <view class="name">{{ item.name }}</view>
        <view class="price">{{ formatPrice(item.price) }}</view>
        <view class="extra">销量 {{ item.sales }} | 评分 {{ item.rating }}</view>
      </view>
    </view>
  </view>
</template>

<script>
import { getProductList } from "../../common/api/product";

export default {
  data() {
    return {
      loading: false,
      keyword: "",
      sortBy: "sales",
      list: [],
      filteredList: []
    };
  },
  onLoad() {
    this.fetchList();
  },
  onPullDownRefresh() {
    this.fetchList().finally(() => {
      uni.stopPullDownRefresh();
    });
  },
  methods: {
    formatPrice(price) {
      return `¥${Number(price).toFixed(2)}`;
    },
    async fetchList() {
      this.loading = true;
      try {
        const res = await getProductList();
        this.list = res.list || [];
        this.rebuildList();
      } catch (error) {
        uni.showToast({ title: error.message || "加载失败", icon: "none" });
      } finally {
        this.loading = false;
      }
    },
    applySearch() {
      this.rebuildList();
    },
    changeSort(sortBy) {
      this.sortBy = sortBy;
      this.rebuildList();
    },
    rebuildList() {
      const keyword = this.keyword.toLowerCase();
      let data = this.list.filter((item) => !keyword || item.name.toLowerCase().includes(keyword));
      data = data.sort((a, b) => Number(b[this.sortBy]) - Number(a[this.sortBy]));
      this.filteredList = data;
    },
    goDetail(id) {
      uni.navigateTo({
        url: `/pages/product/detail?id=${id}`
      });
    }
  }
};
</script>

<style>
.page {
  padding: 24rpx;
  min-height: 100vh;
  background: #f5f5f5;
}

.search-wrap {
  display: flex;
  gap: 12rpx;
}

.search {
  flex: 1;
  background: #fff;
  border-radius: 10rpx;
  height: 72rpx;
  padding: 0 20rpx;
}

.sort-row {
  margin-top: 20rpx;
  margin-bottom: 20rpx;
}

.sort-item {
  display: inline-block;
  margin-right: 30rpx;
  color: #666;
  font-size: 28rpx;
}

.sort-item.active {
  color: #1677ff;
  font-weight: 600;
}

.state {
  text-align: center;
  color: #888;
  margin-top: 80rpx;
}

.card {
  display: flex;
  background: #fff;
  border-radius: 14rpx;
  padding: 16rpx;
  margin-bottom: 16rpx;
}

.thumb {
  width: 150rpx;
  height: 150rpx;
  border-radius: 10rpx;
  background: #f5f5f5;
}

.meta {
  flex: 1;
  margin-left: 16rpx;
}

.name {
  font-size: 30rpx;
  font-weight: 600;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.price {
  margin-top: 14rpx;
  font-size: 32rpx;
  color: #ff4d4f;
  font-weight: 700;
}

.extra {
  color: #888;
  margin-top: 10rpx;
  font-size: 24rpx;
}
</style>

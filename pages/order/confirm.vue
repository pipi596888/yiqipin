<template>
  <view class="page">
    <view class="block">
      <view class="title">Order Items</view>
      <view v-if="!items.length" class="empty">Cart is empty</view>
      <view v-for="item in items" :key="item.product_id" class="row">
        <text>{{ item.name }} x {{ item.quantity }}</text>
        <text>{{ formatPrice(item.price * item.quantity) }}</text>
      </view>
    </view>

    <view class="block">
      <view class="title">Payment Method</view>
      <radio-group @change="onPayTypeChange">
        <label class="pay-item"><radio value="alipay" :checked="payType === 'alipay'" />Alipay</label>
        <label class="pay-item"><radio value="wechat" :checked="payType === 'wechat'" />WeChat</label>
      </radio-group>
    </view>

    <view class="bottom">
      <text>Total: {{ formatPrice(total) }}</text>
      <button type="primary" :loading="submitting" @click="submitOrder">Submit & Pay</button>
    </view>
  </view>
</template>

<script>
import { getCartItems, calcCartTotal, clearCart } from "../../common/store/cart";
import { createOrder, payOrder } from "../../common/api/order";
import { requireLogin } from "../../common/utils/guard";

export default {
  data() {
    return {
      items: [],
      submitting: false,
      payType: "alipay"
    };
  },
  computed: {
    total() {
      return calcCartTotal(this.items);
    }
  },
  onShow() {
    if (!requireLogin("/pages/order/confirm")) return;
    this.items = getCartItems();
  },
  methods: {
    formatPrice(price) {
      return `$${Number(price).toFixed(2)}`;
    },
    onPayTypeChange(event) {
      this.payType = event.detail.value;
    },
    async submitOrder() {
      if (!this.items.length) {
        uni.showToast({ title: "Cart is empty", icon: "none" });
        return;
      }
      this.submitting = true;
      try {
        const order = await createOrder({
          items: this.items,
          total_price: Number(this.total.toFixed(2))
        });
        const payRes = await payOrder({
          order_id: order.order_id,
          pay_type: this.payType
        });
        if (payRes.status === "paid") {
          clearCart();
          uni.redirectTo({
            url: `/pages/order/result?orderId=${order.order_id}&status=success`
          });
        } else {
          uni.redirectTo({
            url: `/pages/order/result?orderId=${order.order_id}&status=pending`
          });
        }
      } catch (error) {
        uni.showToast({ title: error.message || "Order failed", icon: "none" });
      } finally {
        this.submitting = false;
      }
    }
  }
};
</script>

<style>
.page {
  padding: 24rpx;
  padding-bottom: 160rpx;
}

.block {
  background: #fff;
  border-radius: 14rpx;
  padding: 20rpx;
  margin-bottom: 20rpx;
}

.title {
  font-size: 30rpx;
  font-weight: 600;
  margin-bottom: 16rpx;
}

.row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12rpx;
}

.empty {
  color: #888;
}

.pay-item {
  display: block;
  margin-bottom: 12rpx;
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

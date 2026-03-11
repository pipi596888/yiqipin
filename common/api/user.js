import { request } from "./request";
import env from "../config/env";

const USE_MOCK = env.FEATURE_FLAGS.useMockUser;

const mockProfile = {
  id: 1,
  username: "demo_user",
  phone: "13800000000",
  email: "demo@example.com",
  avatar: "/static/logo.png",
  balance: 1000,
  points: 500
};

const mockAddresses = [
  {
    id: 1,
    receiver: "张三",
    phone: "13800000000",
    province: "上海市",
    city: "上海市",
    district: "浦东新区",
    detail: "科技路123号",
    is_default: true
  },
  {
    id: 2,
    receiver: "李四",
    phone: "13900000000",
    province: "北京市",
    city: "北京市",
    district: "朝阳区",
    detail: "建国路456号",
    is_default: false
  }
];

const mockOrders = [
  {
    order_id: "MOCK10001",
    total_price: 199,
    status: "paid",
    create_time: "2026-03-11 09:00:00",
    items: [
      { name: "Wireless Earbuds", price: 199, quantity: 1, image: "/static/logo.png" }
    ]
  },
  {
    order_id: "MOCK10002",
    total_price: 329,
    status: "pending",
    create_time: "2026-03-11 10:00:00",
    items: [
      { name: "Mechanical Keyboard", price: 329, quantity: 1, image: "/static/logo.png" }
    ]
  },
  {
    order_id: "MOCK10003",
    total_price: 149,
    status: "shipped",
    create_time: "2026-03-10 14:00:00",
    items: [
      { name: "Fitness Band", price: 149, quantity: 1, image: "/static/logo.png" }
    ]
  }
];

export function getUserProfile() {
  if (USE_MOCK) return Promise.resolve(mockProfile);
  return request({ url: "/api/user/profile", method: "GET" });
}

export function updateUserProfile(data) {
  if (USE_MOCK) return Promise.resolve({ success: true });
  return request({ url: "/api/user/profile", method: "PUT", data });
}

export function getUserAddresses() {
  if (USE_MOCK) return Promise.resolve({ list: mockAddresses });
  return request({ url: "/api/user/address", method: "GET" });
}

export function addAddress(data) {
  if (USE_MOCK) {
    return Promise.resolve({ success: true, id: Date.now() });
  }
  return request({ url: "/api/user/address", method: "POST", data });
}

export function updateAddress(id, data) {
  if (USE_MOCK) return Promise.resolve({ success: true });
  return request({ url: `/api/user/address/${id}`, method: "PUT", data });
}

export function deleteAddress(id) {
  if (USE_MOCK) return Promise.resolve({ success: true });
  return request({ url: `/api/user/address/${id}`, method: "DELETE" });
}

export function setDefaultAddress(id) {
  if (USE_MOCK) return Promise.resolve({ success: true });
  return request({ url: `/api/user/address/${id}/default`, method: "PUT" });
}

export function getUserOrders(params = {}) {
  if (USE_MOCK) {
    let list = mockOrders;
    if (params.status) {
      list = mockOrders.filter(o => o.status === params.status);
    }
    return Promise.resolve({ list });
  }
  return request({ url: "/api/order/list", method: "GET", data: params });
}

export function getOrderDetail(orderId) {
  if (USE_MOCK) {
    const order = mockOrders.find(o => o.order_id === orderId);
    return Promise.resolve(order || mockOrders[0]);
  }
  return request({ url: `/api/order/${orderId}`, method: "GET" });
}

export function cancelOrder(orderId) {
  if (USE_MOCK) return Promise.resolve({ success: true });
  return request({ url: `/api/order/cancel?orderNo=${orderId}`, method: "POST" });
}

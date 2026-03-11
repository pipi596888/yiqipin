import { request } from "./request";
import env from "../config/env";

const USE_MOCK = env.FEATURE_FLAGS.useMockProduct;

const mockCartList = [
  {
    id: 1,
    product_id: 1001,
    name: "Wireless Earbuds",
    price: 199,
    image: "/static/logo.png",
    quantity: 1,
    stock: 120
  },
  {
    id: 2,
    product_id: 1002,
    name: "Mechanical Keyboard",
    price: 329,
    image: "/static/logo.png",
    quantity: 1,
    stock: 80
  }
];

export function getCartList() {
  if (USE_MOCK) {
    return Promise.resolve({ list: mockCartList });
  }
  return request({
    url: "/api/cart/list",
    method: "GET"
  });
}

export function addCart(payload) {
  if (USE_MOCK) {
    return Promise.resolve({ success: true, cart_id: Date.now() });
  }
  return request({
    url: "/api/cart/add",
    method: "POST",
    data: payload
  });
}

export function updateCartQuantity(cartId, quantity) {
  if (USE_MOCK) {
    return Promise.resolve({ success: true });
  }
  return request({
    url: `/api/cart/${cartId}/quantity`,
    method: "PUT",
    data: { quantity }
  });
}

export function removeFromCart(cartId) {
  if (USE_MOCK) {
    return Promise.resolve({ success: true });
  }
  return request({
    url: `/api/cart/${cartId}`,
    method: "DELETE"
  });
}

export function clearCart() {
  if (USE_MOCK) {
    return Promise.resolve({ success: true });
  }
  return request({
    url: "/api/cart/clear",
    method: "DELETE"
  });
}

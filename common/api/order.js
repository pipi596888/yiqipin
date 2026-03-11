import { request } from "./request";
import { mockCreateOrder, mockPayOrder } from "./mock";
import env from "../config/env";

const USE_MOCK = env.FEATURE_FLAGS.useMockOrder;

export function createOrder(payload) {
  if (USE_MOCK) {
    return mockCreateOrder(payload);
  }
  return request({
    url: "/api/order/create",
    method: "POST",
    data: payload
  });
}

export function payOrder(payload) {
  if (USE_MOCK) {
    return mockPayOrder(payload.order_id);
  }
  return request({
    url: "/api/order/pay",
    method: "POST",
    data: payload
  });
}

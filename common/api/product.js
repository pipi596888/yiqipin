import { request } from "./request";
import { mockProductList, mockProductDetail } from "./mock";
import env from "../config/env";

const USE_MOCK = env.FEATURE_FLAGS.useMockProduct;

export function getProductList(params = {}) {
  if (USE_MOCK) {
    return mockProductList(params);
  }
  return request({
    url: "/api/products",
    method: "GET",
    data: params
  });
}

export function getProductDetail(id) {
  if (USE_MOCK) {
    return mockProductDetail(id);
  }
  return request({
    url: `/api/product/${id}`,
    method: "GET"
  });
}

import { request } from "./request";
import env from "../config/env";
import {
  normalizeAnalyticsPayload,
  normalizeCampaignList,
  normalizeRecommendationPayload,
  unwrapApiData
} from "../utils/growth-api";

const { FEATURE_FLAGS, API_PATHS } = env;
const USE_MOCK = FEATURE_FLAGS.useMockGrowth;

const mockCampaigns = [
  { id: 1, name: "New User Coupon", type: "coupon", status: "active", discount: "10%" },
  { id: 2, name: "Flash Sale", type: "flash_sale", status: "scheduled", discount: "$20 off" },
  { id: 3, name: "Group Buy", type: "group_buy", status: "active", discount: "15%" },
  { id: 4, name: "Full Reduction", type: "full_reduction", status: "inactive", discount: "$15 off" }
];

const mockRecommendations = {
  hot: [
    { product_id: 1001, name: "Wireless Earbuds", score: 9.6, price: 199 },
    { product_id: 1002, name: "Mechanical Keyboard", score: 9.1, price: 329 }
  ],
  guess: [
    { product_id: 1003, name: "Fitness Band", score: 8.9, price: 149 },
    { product_id: 1002, name: "Mechanical Keyboard", score: 8.7, price: 329 }
  ]
};

const mockAnalytics = {
  sales_today: 12580.4,
  sales_yesterday: 11820.2,
  order_count_today: 218,
  order_count_yesterday: 204,
  user_growth_today: 36,
  user_growth_yesterday: 29,
  top_products: [
    { name: "Wireless Earbuds", sold: 85 },
    { name: "Fitness Band", sold: 72 },
    { name: "Mechanical Keyboard", sold: 61 }
  ]
};

export function getCampaigns() {
  if (USE_MOCK) return Promise.resolve(mockCampaigns);
  return request({ url: API_PATHS.growth.campaigns, method: "GET" }).then((payload) => {
    const data = unwrapApiData(payload);
    return normalizeCampaignList(data?.list ?? data ?? []);
  });
}

export async function getRecommendations() {
  if (USE_MOCK) return normalizeRecommendationPayload(mockRecommendations);
  const payload = await request({ url: API_PATHS.growth.recommendations, method: "GET" });
  return normalizeRecommendationPayload(payload);
}

export async function getAnalytics() {
  if (USE_MOCK) return normalizeAnalyticsPayload(mockAnalytics);
  const payload = await request({ url: API_PATHS.growth.analytics, method: "GET" });
  return normalizeAnalyticsPayload(payload);
}

export {
  unwrapApiData,
  normalizeCampaignList,
  normalizeRecommendationPayload,
  normalizeAnalyticsPayload
};

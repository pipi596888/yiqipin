import { normalizeAnalytics, normalizeRecommendations } from "./growth.js";

export function unwrapApiData(payload) {
  if (!payload || typeof payload !== "object") return payload;
  if ("data" in payload && ("code" in payload || "success" in payload)) {
    return payload.data;
  }
  return payload;
}

export function normalizeCampaignList(list = []) {
  if (!Array.isArray(list)) return [];
  return list.map((item, idx) => ({
    id: item.id ?? item.campaign_id ?? idx + 1,
    name: item.name ?? item.campaign_name ?? "Unnamed Campaign",
    type: item.type ?? item.campaign_type ?? "unknown",
    status: item.status ?? item.campaign_status ?? "inactive",
    discount: item.discount ?? item.discount_desc ?? item.discount_text ?? "-"
  }));
}

export function normalizeRecommendationPayload(payload) {
  const data = unwrapApiData(payload) || {};
  const normalized = normalizeRecommendations({
    hot: data.hot ?? data.hot_list ?? data.hotProducts ?? [],
    guess: data.guess ?? data.guess_list ?? data.guessYouLike ?? []
  });
  return {
    hot: normalized.hot.map((item) => ({
      product_id: item.product_id ?? item.id,
      name: item.name ?? item.title ?? "Unknown Product",
      score: Number(item.score ?? item.rank_score ?? 0),
      price: Number(item.price ?? item.sale_price ?? 0),
      image: item.image ?? item.cover ?? "/static/logo.png"
    })),
    guess: normalized.guess.map((item) => ({
      product_id: item.product_id ?? item.id,
      name: item.name ?? item.title ?? "Unknown Product",
      score: Number(item.score ?? item.rank_score ?? 0),
      price: Number(item.price ?? item.sale_price ?? 0),
      image: item.image ?? item.cover ?? "/static/logo.png"
    }))
  };
}

export function normalizeAnalyticsPayload(payload) {
  const data = unwrapApiData(payload) || {};
  return normalizeAnalytics({
    sales_today: data.sales_today ?? data.salesToday ?? data.today_sales,
    sales_yesterday: data.sales_yesterday ?? data.salesYesterday ?? data.yesterday_sales,
    order_count_today:
      data.order_count_today ?? data.orderCountToday ?? data.today_order_count,
    order_count_yesterday:
      data.order_count_yesterday ?? data.orderCountYesterday ?? data.yesterday_order_count,
    user_growth_today: data.user_growth_today ?? data.userGrowthToday ?? data.today_new_users,
    user_growth_yesterday:
      data.user_growth_yesterday ??
      data.userGrowthYesterday ??
      data.yesterday_new_users,
    top_products: data.top_products ?? data.topProducts ?? data.product_rankings ?? []
  });
}

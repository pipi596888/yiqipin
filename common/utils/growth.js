export function filterCampaigns(campaigns = [], status = "all") {
  if (status === "all") return campaigns;
  return campaigns.filter((item) => item.status === status);
}

export function campaignTypeSummary(campaigns = []) {
  return campaigns.reduce((acc, item) => {
    const type = item.type || "unknown";
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});
}

export function normalizeRecommendations(data = {}) {
  return {
    hot: Array.isArray(data.hot) ? data.hot : [],
    guess: Array.isArray(data.guess) ? data.guess : []
  };
}

export function analyticsGrowthRate(current = 0, previous = 0) {
  const c = Number(current) || 0;
  const p = Number(previous) || 0;
  if (p === 0) return c === 0 ? 0 : 100;
  return Number((((c - p) / p) * 100).toFixed(2));
}

export function normalizeAnalytics(data = {}) {
  return {
    sales_today: Number(data.sales_today) || 0,
    sales_yesterday: Number(data.sales_yesterday) || 0,
    order_count_today: Number(data.order_count_today) || 0,
    order_count_yesterday: Number(data.order_count_yesterday) || 0,
    user_growth_today: Number(data.user_growth_today) || 0,
    user_growth_yesterday: Number(data.user_growth_yesterday) || 0,
    top_products: Array.isArray(data.top_products) ? data.top_products : []
  };
}

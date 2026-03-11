import test from "node:test";
import assert from "node:assert/strict";

import {
  filterCampaigns,
  campaignTypeSummary,
  normalizeRecommendations,
  analyticsGrowthRate,
  normalizeAnalytics
} from "../common/utils/growth.js";

test("filterCampaigns should filter by status", () => {
  const list = [
    { id: 1, status: "active" },
    { id: 2, status: "scheduled" },
    { id: 3, status: "active" }
  ];
  assert.equal(filterCampaigns(list, "active").length, 2);
  assert.equal(filterCampaigns(list, "all").length, 3);
});

test("campaignTypeSummary should aggregate counts by type", () => {
  const list = [
    { id: 1, type: "coupon" },
    { id: 2, type: "coupon" },
    { id: 3, type: "flash_sale" }
  ];
  const summary = campaignTypeSummary(list);
  assert.deepEqual(summary, { coupon: 2, flash_sale: 1 });
});

test("normalizeRecommendations should always provide hot and guess arrays", () => {
  const normalized = normalizeRecommendations({ hot: [{ product_id: 1 }] });
  assert.ok(Array.isArray(normalized.hot));
  assert.ok(Array.isArray(normalized.guess));
  assert.equal(normalized.guess.length, 0);
});

test("analyticsGrowthRate should return percentage with 2 decimals", () => {
  assert.equal(analyticsGrowthRate(120, 100), 20);
  assert.equal(analyticsGrowthRate(100, 0), 100);
  assert.equal(analyticsGrowthRate(80, 100), -20);
});

test("normalizeAnalytics should provide defaults for missing fields", () => {
  const n = normalizeAnalytics({ sales_today: 100 });
  assert.equal(n.sales_today, 100);
  assert.equal(n.order_count_today, 0);
  assert.equal(Array.isArray(n.top_products), true);
});

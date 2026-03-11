import test from "node:test";
import assert from "node:assert/strict";

import {
  unwrapApiData,
  normalizeCampaignList,
  normalizeRecommendationPayload,
  normalizeAnalyticsPayload
} from "../common/utils/growth-api.js";

test("unwrapApiData should support raw payload", () => {
  const payload = { a: 1 };
  assert.deepEqual(unwrapApiData(payload), payload);
});

test("unwrapApiData should support {code,data} payload", () => {
  const payload = { code: 0, data: { list: [1] } };
  assert.deepEqual(unwrapApiData(payload), { list: [1] });
});

test("normalizeCampaignList should map backend field names", () => {
  const list = normalizeCampaignList([
    {
      campaign_id: 2,
      campaign_name: "Flash Sale",
      campaign_type: "flash_sale",
      campaign_status: "scheduled",
      discount_desc: "$20 off"
    }
  ]);
  assert.equal(list[0].id, 2);
  assert.equal(list[0].name, "Flash Sale");
  assert.equal(list[0].type, "flash_sale");
  assert.equal(list[0].status, "scheduled");
});

test("normalizeRecommendationPayload should support list aliases", () => {
  const res = normalizeRecommendationPayload({
    hot_list: [{ product_id: 1 }],
    guess_list: [{ product_id: 2 }]
  });
  assert.equal(res.hot.length, 1);
  assert.equal(res.guess.length, 1);
});

test("normalizeAnalyticsPayload should support camelCase payload", () => {
  const res = normalizeAnalyticsPayload({
    code: 0,
    data: {
      salesToday: 100,
      salesYesterday: 80,
      orderCountToday: 10,
      orderCountYesterday: 8
    }
  });
  assert.equal(res.sales_today, 100);
  assert.equal(res.sales_yesterday, 80);
  assert.equal(res.order_count_today, 10);
  assert.equal(res.order_count_yesterday, 8);
});

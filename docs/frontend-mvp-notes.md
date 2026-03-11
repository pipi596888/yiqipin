# UniApp MVP Notes

## Scope Implemented

- Login page: `pages/login/login`
- Product list page: `pages/product/list`
- Product detail page: `pages/product/detail`
- Cart page: `pages/cart/index`
- Order confirm page: `pages/order/confirm`
- Order result page: `pages/order/result`
- Entry page: `pages/index/index`
- User center: `pages/user/index`
- Address page: `pages/user/address`
- Orders page: `pages/user/orders`
- Customer service chat: `pages/chat/index`

## API Layer

- Request wrapper: `common/api/request.js`
- Auth API: `common/api/auth.js`
- Product API: `common/api/product.js`
- Order API: `common/api/order.js`
- Cart API placeholder: `common/api/cart.js`
- User API: `common/api/user.js`
- Chat client: `common/api/chat.js`

## Local State

- Auth storage: `common/store/auth.js`
- Cart storage: `common/store/cart.js`
- Login guard: `common/utils/guard.js`

## Mock Mode

Mock is enabled by default:

- `common/api/auth.js` -> `USE_MOCK = true`
- `common/api/product.js` -> `USE_MOCK = true`
- `common/api/order.js` -> `USE_MOCK = true`

When backend is ready, set those flags to `false` and keep `API_BASE_URL` in:

- `common/config/env.js`

## User Flow

1. Open `/pages/index/index`
2. Go to product list
3. Open product detail
4. Add to cart
5. Checkout
6. Submit and pay (mock)
7. See payment result

## Phase 2 Frontend Additions

1. Open `/pages/user/index`
2. Jump to orders/address pages
3. Open `/pages/chat/index`
4. Send messages with local mock reply

## Phase 3 Frontend Skeleton

- Marketing page: `pages/growth/index`
- Recommendation page: `pages/recommendation/index`
- Analytics page: `pages/analytics/index`
- Growth APIs (mock): `common/api/growth.js`

These are placeholders for phase 3 backend integration and feature flags.

## Phase 3 Enhanced (Current)

- Marketing page supports status tabs and campaign type summary.
- Recommendation page supports quick add to cart and detail navigation.
- Analytics page supports growth-rate KPIs and top-product progress bars.
- Growth normalization utilities: `common/utils/growth.js`

## Local Test

Added lightweight Node tests for growth-domain pure functions:

- Test file: `tests/growth-utils.test.js`
- Test file: `tests/growth-api.test.js`
- Command: `npm test`

## Real Backend Switch (Phase 4)

- Config file: `common/config/env.js`
- Flag: `FEATURE_FLAGS.useMockGrowth`
  - `true`: use local mock data
  - `false`: call Spring Boot APIs
- Endpoints:
  - `API_PATHS.growth.campaigns`
  - `API_PATHS.growth.recommendations`
  - `API_PATHS.growth.analytics`

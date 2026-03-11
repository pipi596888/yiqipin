# Mall System Master Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver a production-ready e-commerce system with UniApp mall app, Spring Boot backend, and Admin portal, shipping MVP first and then customer service/RBAC/marketing increments.

**Architecture:** Use domain-driven modular backend (`auth`, `catalog`, `cart`, `order`, `payment`, `chat`, `rbac`) behind unified REST/WebSocket APIs. Build `mall-uniapp` and `mall-admin-web` as separate clients consuming the same backend contracts. Use MySQL + Redis + MinIO and enforce observability, idempotency, and security from MVP.

**Tech Stack:** UniApp (Vue3), Spring Boot 3.x, MySQL 8, Redis 7, MinIO, WebSocket/STOMP (or Netty), Vue3 + Ant Design Vue (Admin), Docker Compose, GitHub Actions/Jenkins.

---

## Chunk 1: Program Setup and Baseline Architecture

### Task 1: Repository and Service Topology Baseline

**Files:**
- Create: `docs/architecture/repo-structure.md`
- Create: `docs/architecture/service-context-map.md`
- Create: `docs/architecture/environment-matrix.md`
- Modify: `README.md` (if exists; otherwise create)
- Test: `N/A (documentation task)`

- [ ] **Step 1: Define target repo layout**

```text
mall-system/
  mall-api/
  mall-uniapp/
  mall-admin-web/
  mall-infra/
  docs/
```

- [ ] **Step 2: Write context map for bounded domains**

```text
Auth -> issues tokens and identity context
Catalog -> products/categories/availability
Cart -> transient user-selected line items
Order -> order lifecycle and status transitions
Payment -> payment order and callback reconciliation
Chat -> customer service sessions/messages
RBAC -> user-role-permission mapping for admin
```

- [ ] **Step 3: Capture env matrix (`dev/staging/prod`)**

Run: `Create markdown table with DB/Redis/OSS endpoints and secrets policy`
Expected: clear deploy differences and secret ownership.

- [ ] **Step 4: Commit**

```bash
git add docs/architecture README.md
git commit -m "chore: define mall system repo and domain topology"
```

### Task 2: Local Infrastructure and Bootstrapping

**Files:**
- Create: `mall-infra/docker-compose.yml`
- Create: `mall-infra/.env.example`
- Create: `mall-infra/scripts/init-mysql.sql`
- Create: `mall-infra/scripts/init-minio.sh`
- Test: `mall-infra/scripts/smoke.ps1`

- [ ] **Step 1: Write failing infra smoke checks**

```powershell
# smoke.ps1
# Assert mysql, redis, minio containers are healthy; fail if any not running.
```

- [ ] **Step 2: Run smoke checks to verify failure before infra exists**

Run: `powershell -File mall-infra/scripts/smoke.ps1`
Expected: FAIL due to missing containers.

- [ ] **Step 3: Implement minimal compose stack**

```yaml
services:
  mysql:
  redis:
  minio:
```

- [ ] **Step 4: Re-run smoke checks**

Run: `docker compose -f mall-infra/docker-compose.yml up -d && powershell -File mall-infra/scripts/smoke.ps1`
Expected: PASS for all required services.

- [ ] **Step 5: Commit**

```bash
git add mall-infra
git commit -m "chore: add local infra stack with health smoke checks"
```

## Chunk 2: MVP Delivery (Phase 1)

### Task 3: Backend MVP Vertical Slice (Auth + Catalog + Cart + Order + Payment Callback)

**Files:**
- Create: `mall-api/pom.xml` (or root Gradle files)
- Create: `mall-api/src/main/java/.../auth/*`
- Create: `mall-api/src/main/java/.../catalog/*`
- Create: `mall-api/src/main/java/.../cart/*`
- Create: `mall-api/src/main/java/.../order/*`
- Create: `mall-api/src/main/java/.../payment/*`
- Create: `mall-api/src/main/resources/db/migration/V1__baseline.sql`
- Create: `mall-api/src/test/java/.../integration/CheckoutFlowIT.java`
- Test: `mall-api/src/test/java/...`

- [ ] **Step 1: Write failing integration test for checkout happy path**

```java
// register/login -> list products -> add cart -> create order -> simulate paid callback -> assert order=paid
```

- [ ] **Step 2: Run integration test and verify fail**

Run: `cd mall-api && mvn -Dtest=CheckoutFlowIT test`
Expected: FAIL (endpoints/entities not implemented).

- [ ] **Step 3: Implement minimal domain entities and repositories**

```text
users, products, categories, cart, orders, order_items, payments
```

- [ ] **Step 4: Implement controllers and service orchestration**

```text
POST /api/login
GET /api/products
GET /api/product/{id}
POST /api/cart/add
POST /api/order/create
POST /api/order/pay
POST /api/payment/callback (internal/provider callback)
```

- [ ] **Step 5: Re-run integration and module tests**

Run: `cd mall-api && mvn test`
Expected: PASS with checkout flow green.

- [ ] **Step 6: Commit**

```bash
git add mall-api
git commit -m "feat(api): implement mvp checkout vertical slice"
```

### Task 4: UniApp MVP (Login + Product List/Detail + Cart + Order Submit + Pay Redirect)

**Files:**
- Create: `mall-uniapp/pages/login/login.vue`
- Create: `mall-uniapp/pages/product/list.vue`
- Create: `mall-uniapp/pages/product/detail.vue`
- Create: `mall-uniapp/pages/cart/index.vue`
- Create: `mall-uniapp/pages/order/confirm.vue`
- Create: `mall-uniapp/pages/order/result.vue`
- Create: `mall-uniapp/common/api/*.js`
- Modify: `mall-uniapp/pages.json`
- Test: `mall-uniapp/tests/e2e/checkout.spec.ts` (if Playwright/Uni testing harness selected)

- [ ] **Step 1: Write failing e2e flow for user purchase**

```text
login -> browse list -> view detail -> add cart -> create order -> pay -> success result page
```

- [ ] **Step 2: Run e2e to verify failure**

Run: `cd mall-uniapp && npm run test:e2e -- checkout`
Expected: FAIL due to missing pages/actions.

- [ ] **Step 3: Implement API client and route guards**

```js
request interceptor injects token; 401 triggers re-login
```

- [ ] **Step 4: Implement pages with optimistic loading/error states**

Run: `manual smoke in H5 and one target mini-program runtime`
Expected: all core pages usable and navigable.

- [ ] **Step 5: Re-run e2e and lint**

Run: `cd mall-uniapp && npm run lint && npm run test:e2e -- checkout`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add mall-uniapp
git commit -m "feat(uniapp): deliver mvp purchase flow pages"
```

### Task 5: Admin MVP (Product CRUD + Shelf Status + Inventory/Price Update)

**Files:**
- Create: `mall-admin-web/src/pages/products/List.vue`
- Create: `mall-admin-web/src/pages/products/Edit.vue`
- Create: `mall-admin-web/src/api/products.ts`
- Create: `mall-admin-web/src/router/modules/products.ts`
- Test: `mall-admin-web/tests/e2e/product-management.spec.ts`

- [ ] **Step 1: Write failing admin e2e case**

```text
admin login -> create product -> edit price/stock -> toggle on-shelf -> verify list reflects updates
```

- [ ] **Step 2: Run e2e to verify failure**

Run: `cd mall-admin-web && npm run test:e2e -- product-management`
Expected: FAIL.

- [ ] **Step 3: Implement product list/form pages and API bindings**

Run: `cd mall-admin-web && npm run dev`
Expected: product management UI functional against API.

- [ ] **Step 4: Re-run unit/e2e tests**

Run: `cd mall-admin-web && npm run test && npm run test:e2e -- product-management`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add mall-admin-web
git commit -m "feat(admin): add mvp product management"
```

## Chunk 3: Phase 2 (Customer Service + User Center + Full RBAC)

### Task 6: User Center Domain Completion

**Files:**
- Create: `mall-api/src/main/java/.../usercenter/*`
- Create: `mall-uniapp/pages/user/index.vue`
- Create: `mall-uniapp/pages/user/address.vue`
- Create: `mall-uniapp/pages/after-sale/list.vue`
- Test: `mall-api/src/test/java/.../UserCenterIT.java`

- [ ] **Step 1: Write failing integration tests for profile/address/order-history**
- [ ] **Step 2: Implement backend APIs and DB migrations**
- [ ] **Step 3: Implement UniApp user center pages**
- [ ] **Step 4: Run integration + UI tests**

Run: `cd mall-api && mvn test && cd ../mall-uniapp && npm run test:e2e -- user-center`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add mall-api mall-uniapp
git commit -m "feat: deliver phase2 user center"
```

### Task 7: Customer Service Realtime Chat

**Files:**
- Create: `mall-api/src/main/java/.../chat/ws/*`
- Create: `mall-api/src/main/java/.../chat/service/*`
- Create: `mall-api/src/main/resources/db/migration/V2__chat.sql`
- Create: `mall-uniapp/pages/chat/index.vue`
- Create: `mall-admin-web/src/pages/service/ChatDesk.vue`
- Test: `mall-api/src/test/java/.../ChatWebSocketIT.java`

- [ ] **Step 1: Write failing websocket integration tests**
- [ ] **Step 2: Implement session routing, message persistence, and unread counters**
- [ ] **Step 3: Implement user and agent chat UIs**
- [ ] **Step 4: Run websocket tests + concurrent manual test (multi-agent)**

Run: `cd mall-api && mvn -Dtest=ChatWebSocketIT test`
Expected: PASS and stable under reconnect.

- [ ] **Step 5: Commit**

```bash
git add mall-api mall-uniapp mall-admin-web
git commit -m "feat(chat): implement realtime customer service"
```

### Task 8: Full RBAC in Admin

**Files:**
- Create: `mall-api/src/main/java/.../rbac/*`
- Create: `mall-admin-web/src/pages/system/roles/*.vue`
- Create: `mall-admin-web/src/directives/permission.ts`
- Test: `mall-api/src/test/java/.../RbacIT.java`

- [ ] **Step 1: Write failing authorization tests (role-permission-resource)**
- [ ] **Step 2: Implement roles/permissions/user-role relations and policy checks**
- [ ] **Step 3: Implement role assignment and permission-aware route/menu rendering**
- [ ] **Step 4: Verify forbidden paths return 403 and UI is hidden/disabled correctly**

Run: `cd mall-api && mvn -Dtest=RbacIT test && cd ../mall-admin-web && npm run test`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add mall-api mall-admin-web
git commit -m "feat(rbac): complete role-based access control"
```

## Chunk 4: Phase 3 (Growth), Quality Gates, and Release Operations

### Task 9: Growth Capabilities (Coupon/Promotion/Flash Sale/Recommendations)

**Files:**
- Create: `mall-api/src/main/java/.../marketing/*`
- Create: `mall-api/src/main/java/.../recommendation/*`
- Create: `mall-admin-web/src/pages/marketing/*`
- Create: `docs/product/feature-flags.md`
- Test: `mall-api/src/test/java/.../PromotionPricingIT.java`

- [ ] **Step 1: Write failing pricing engine tests for coupon + full reduction stacking rules**
- [ ] **Step 2: Implement promotion engine with feature flags**
- [ ] **Step 3: Add admin config panels for campaign operations**
- [ ] **Step 4: Add recommendation endpoints (`hot`, `guess-you-like`) and fallback strategies**
- [ ] **Step 5: Run regression on checkout pricing + recommendation responses**

Run: `cd mall-api && mvn test`
Expected: PASS with deterministic pricing snapshots.

- [ ] **Step 6: Commit**

```bash
git add mall-api mall-admin-web docs/product
git commit -m "feat(growth): add marketing and recommendation foundations"
```

### Task 10: Non-Functional Hardening (Security/Observability/Performance)

**Files:**
- Create: `mall-api/src/main/java/.../security/*`
- Create: `mall-api/src/main/java/.../observability/*`
- Create: `mall-infra/monitoring/prometheus.yml`
- Create: `mall-infra/monitoring/grafana-dashboards/*.json`
- Create: `docs/runbooks/incident-response.md`
- Test: `mall-api/src/test/java/.../SecurityRegressionIT.java`

- [ ] **Step 1: Write failing security regression tests (rate limit, auth bypass, injection payloads)**
- [ ] **Step 2: Implement guards (validation, WAF-like filters, anti-replay/idempotency keys)**
- [ ] **Step 3: Add metrics/tracing/log correlation IDs and alert thresholds**
- [ ] **Step 4: Execute baseline load tests for list/search/cart/checkout/chat**

Run: `k6 run tests/perf/mvp-checkout.js`
Expected: meet target SLOs (define in `docs/sre/slo.md`).

- [ ] **Step 5: Commit**

```bash
git add mall-api mall-infra docs
git commit -m "chore: add security and observability hardening"
```

### Task 11: CI/CD, Release Train, and Acceptance Gates

**Files:**
- Create: `.github/workflows/api-ci.yml` (or Jenkinsfile equivalent)
- Create: `.github/workflows/uniapp-ci.yml`
- Create: `.github/workflows/admin-ci.yml`
- Create: `docs/release/milestones.md`
- Create: `docs/release/go-live-checklist.md`
- Test: `pipeline dry-run + staging deploy checklist`

- [ ] **Step 1: Define quality gates**

```text
lint pass + unit pass + integration pass + e2e pass + security scan no high severity
```

- [ ] **Step 2: Implement automated build/test/deploy pipelines**
- [ ] **Step 3: Define milestone acceptance criteria**

```text
MVP GA: full purchase closed loop
Phase2 GA: customer service + RBAC complete
Phase3 GA: growth modules behind feature flags
```

- [ ] **Step 4: Run staging release rehearsal**

Run: `tag build -> deploy staging -> smoke -> rollback drill`
Expected: successful rollback within target RTO.

- [ ] **Step 5: Commit**

```bash
git add .github docs/release
git commit -m "chore(release): establish ci cd and go-live gates"
```

---

## Cross-Cutting Rules (Apply to All Tasks)

- TDD mandatory: tests first, verify fail, minimal implementation, verify pass.
- Keep pull requests small and vertical; avoid mixed concerns.
- Use API contract versioning and backward compatibility checks.
- Any payment/order status update must be idempotent and auditable.
- All production secrets must come from secure secret manager, never git.

## Milestone Calendar (Suggested)

- Week 1: Chunk 1 complete.
- Week 2-6: Chunk 2 complete (MVP release candidate).
- Week 7-10: Chunk 3 complete.
- Week 11+: Chunk 4 rollout incrementally via feature flags.

## Done Criteria

- MVP: user can complete end-to-end purchase; admin can manage products.
- Phase 2: user center + realtime customer service + full RBAC live.
- Phase 3: growth features and analytics available with safe rollouts.
- NFR: agreed SLO/SLA met, security baseline passed, operational runbooks validated.

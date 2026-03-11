# 一期buy后台管理系统 - 功能规划

> **版本**: V1.0
> **日期**: 2026-03-11

---

## 1. 系统概述

后台管理系统（mall-admin-web）用于管理电商平台的商品、订单、用户等核心数据。系统采用 Vue 3 + Ant Design Vue 构建，提供直观的管理界面。

## 2. 技术选型

| 技术 | 说明 |
|------|------|
| 框架 | Vue 3 + Composition API |
| UI 组件库 | Ant Design Vue 4.x |
| 状态管理 | Pinia |
| 路由 | Vue Router 4.x |
| HTTP 客户端 | Axios |
| 构建工具 | Vite |

## 3. 功能模块

### 3.1 登录模块

#### 页面：管理员登录 (/login)

| 功能 | 说明 |
|------|------|
| 账号密码登录 | 输入用户名和密码 |
| 验证码 | 图形验证码（可选）|
| Token 存储 | 登录成功存储 JWT Token |
| 路由守卫 | 未登录自动跳转登录页 |

### 3.2 首页/仪表盘 (/dashboard)

| 功能 | 说明 |
|------|------|
| 数据概览 | 关键指标卡片（订单数、用户数、销售额、商品数）|
| 快捷入口 | 快速跳转到常用功能 |

### 3.3 商品管理

#### 页面：商品列表 (/product/list)

| 功能 | 说明 |
|------|------|
| 商品表格 | 展示商品列表（名称、价格、库存、状态、创建时间）|
| 分页 | 每页 10/20/50 条 |
| 搜索 | 按商品名称模糊搜索 |
| 筛选 | 按状态（全部/上架/下架）筛选 |
| 操作 | 上架/下架、编辑、删除 |

#### 页面：商品新增/编辑 (/product/add, /product/edit/:id)

| 功能 | 说明 |
|------|------|
| 基本信息 | 商品名称、商品分类 |
| 价格库存 | 销售价格、原价、库存数量 |
| 商品图片 | 主图上传、轮播图上传 |
| 商品详情 | 商品描述（富文本）|
| 状态设置 | 上架/下架 |
| 表单验证 | 必填项校验 |

#### 页面：商品分类管理 (/category/list)

| 功能 | 说明 |
|------|------|
| 分类树 | 展示二级分类结构 |
| 新增分类 | 添加一级/二级分类 |
| 编辑分类 | 修改分类名称 |
| 删除分类 | 删除分类（需确认）|
| 排序 | 调整分类顺序 |

### 3.4 订单管理（P1）

#### 页面：订单列表 (/order/list)

| 功能 | 说明 |
|------|------|
| 订单表格 | 展示订单列表（订单号、用户、金额、状态、时间）|
| 分页 | 每页 10/20/50 条 |
| 搜索 | 按订单号搜索 |
| 筛选 | 按状态筛选（待支付/已支付/已发货/已完成/已取消）|
| 查看详情 | 跳转订单详情 |

#### 页面：订单详情 (/order/detail/:id)

| 功能 | 说明 |
|------|------|
| 订单信息 | 订单号、状态、创建时间、支付时间 |
| 收货信息 | 收货人、联系电话、收货地址 |
| 商品信息 | 商品名称、图片、数量、单价 |
| 操作 | 修改订单状态、发货 |

### 3.5 用户管理（P1）

#### 页面：用户列表 (/user/list)

| 功能 | 说明 |
|------|------|
| 用户表格 | 展示用户列表（昵称、手机号、注册时间、订单数）|
| 分页 | 每页 10/20/50 条 |
| 搜索 | 按昵称/手机号搜索 |
| 查看详情 | 跳转用户详情 |

#### 页面：用户详情 (/user/detail/:id)

| 功能 | 说明 |
|------|------|
| 用户信息 | 昵称、手机号、头像、注册时间 |
| 订单记录 | 该用户的订单列表 |
| 地址管理 | 收货地址列表 |

### 3.6 系统设置（P2）

#### 页面：管理员管理 (/admin/list)

| 功能 | 说明 |
|------|------|
| 管理员列表 | 展示所有管理员 |
| 新增管理员 | 添加新管理员 |
| 编辑管理员 | 修改管理员信息 |
| 删除管理员 | 删除管理员账号 |

#### 页面：角色权限 (/role/list)

| 功能 | 说明 |
|------|------|
| 角色列表 | 展示所有角色 |
| 权限配置 | 配置角色权限 |

---

## 4. 页面结构

```
/login                  - 登录页
├── /dashboard          - 首页（仪表盘）
├── /product
│   ├── /list           - 商品列表
│   ├── /add            - 新增商品
│   └── /edit/:id       - 编辑商品
├── /category
│   └── /list           - 分类管理
├── /order              - 订单管理（P1）
│   ├── /list           - 订单列表
│   └── /detail/:id    - 订单详情
├── /user               - 用户管理（P1）
│   ├── /list           - 用户列表
│   └── /detail/:id    - 用户详情
└── /system             - 系统设置（P2）
    ├── /admin          - 管理员管理
    └── /role           - 角色权限
```

## 5. 组件设计

### 5.1 通用组件

| 组件 | 说明 |
|------|------|
| TablePager | 通用表格+分页组件 |
| SearchBar | 通用搜索栏 |
| StatusTag | 状态标签（待支付/已支付等）|
| ImageUploader | 图片上传组件 |
| CategorySelect | 分类选择器 |

### 5.2 页面布局

- **侧边栏导航**: 左侧固定宽度 200px，显示菜单
- **顶部栏**: 显示当前页面标题、当前管理员、退出按钮
- **内容区**: 右侧主要内容区域，支持滚动

## 6. API 对接

### 6.1 请求封装

```javascript
// request.js
import axios from 'axios'
import { useAuthStore } from '@/store/auth'

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000
})

// 请求拦截器：注入 Token
request.interceptors.request.use(config => {
  const authStore = useAuthStore()
  if (authStore.token) {
    config.headers.Authorization = `Bearer ${authStore.token}`
  }
  return config
})

// 响应拦截器：处理 401 未授权
request.interceptors.response.use(
  response => response.data,
  error => {
    if (error.response?.status === 401) {
      // 跳转登录
    }
    return Promise.reject(error)
  }
)

export default request
```

### 6.2 API 模块

| 文件 | 说明 |
|------|------|
| api/auth.js | 登录、登出 |
| api/product.js | 商品 CRUD |
| api/category.js | 分类 CRUD |
| api/order.js | 订单管理 |
| api/user.js | 用户管理 |

---

## 7. 状态管理

### 7.1 Pinia Store

| Store | 说明 |
|-------|------|
| useAuthStore | 用户认证（token、用户信息）|
| useProductStore | 商品相关缓存 |
| useOrderStore | 订单相关缓存 |

### 7.1 Auth Store 设计

```javascript
// stores/auth.js
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('admin_token') || '',
    userInfo: null
  }),
  actions: {
    async login(username, password) {
      // 调用登录 API
    },
    logout() {
      this.token = ''
      this.userInfo = null
      localStorage.removeItem('admin_token')
    }
  }
})
```

---

## 8. 开发计划

### Phase 1: 基础框架（3天）

- [ ] 项目初始化（Vue 3 + Vite + Ant Design Vue）
- [ ] 路由配置和布局组件
- [ ] 登录页和鉴权逻辑
- [ ] API 封装

### Phase 2: 商品管理（4天）

- [ ] 商品列表页
- [ ] 商品新增/编辑页
- [ ] 分类管理页
- [ ] 图片上传功能

### Phase 3: 订单用户（3天）

- [ ] 订单列表页
- [ ] 订单详情页
- [ ] 用户列表页

### Phase 4: 系统设置（2天）

- [ ] 管理员管理
- [ ] 角色权限

---

## 9. 验收标准

- [ ] 管理员可以登录后台
- [ ] 可以新增、编辑、删除商品
- [ ] 可以管理商品分类
- [ ] 可以查看订单列表和详情
- [ ] 可以查看用户列表
- [ ] 页面响应流畅，交互友好

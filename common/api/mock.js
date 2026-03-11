export const mockProducts = [
  {
    product_id: 1001,
    name: "Wireless Earbuds",
    price: 199,
    stock: 120,
    sales: 985,
    rating: 4.8,
    image: "/static/logo.png",
    images: ["/static/logo.png", "/static/logo.png"],
    desc: "Noise-canceling earbuds with long battery life."
  },
  {
    product_id: 1002,
    name: "Mechanical Keyboard",
    price: 329,
    stock: 80,
    sales: 463,
    rating: 4.7,
    image: "/static/logo.png",
    images: ["/static/logo.png"],
    desc: "Compact 87-key keyboard for office and gaming."
  },
  {
    product_id: 1003,
    name: "Fitness Band",
    price: 149,
    stock: 240,
    sales: 1510,
    rating: 4.6,
    image: "/static/logo.png",
    images: ["/static/logo.png"],
    desc: "Tracks heart rate, sleep, and daily activity."
  }
];

export function mockLogin(payload) {
  if (!payload.username || !payload.password) {
    return Promise.reject(new Error("Username or password is empty"));
  }
  return Promise.resolve({
    token: "mock-token-123",
    user: {
      id: 1,
      username: payload.username,
      phone: "13800000000",
      avatar: "/static/logo.png"
    }
  });
}

export function mockProductList() {
  return Promise.resolve({
    list: mockProducts
  });
}

export function mockProductDetail(id) {
  const product = mockProducts.find((it) => String(it.product_id) === String(id));
  if (!product) {
    return Promise.reject(new Error("Product not found"));
  }
  return Promise.resolve(product);
}

export function mockCreateOrder(payload) {
  return Promise.resolve({
    order_id: `MOCK${Date.now()}`,
    total_price: payload.total_price,
    status: "pending"
  });
}

export function mockPayOrder(orderId) {
  return Promise.resolve({
    order_id: orderId,
    status: "paid"
  });
}

const CART_KEY = "mall_cart";

export function getCartItems() {
  return uni.getStorageSync(CART_KEY) || [];
}

function saveCartItems(items) {
  uni.setStorageSync(CART_KEY, items);
}

export function addToCart(product, quantity = 1) {
  const items = getCartItems();
  const index = items.findIndex((it) => it.product_id === product.product_id);
  if (index > -1) {
    items[index].quantity += quantity;
  } else {
    items.push({
      product_id: product.product_id,
      name: product.name,
      price: Number(product.price),
      image: product.image,
      quantity
    });
  }
  saveCartItems(items);
}

export function updateCartQuantity(productId, quantity) {
  const items = getCartItems().map((it) => {
    if (it.product_id === productId) {
      return { ...it, quantity: Math.max(1, quantity) };
    }
    return it;
  });
  saveCartItems(items);
}

export function removeCartItem(productId) {
  const items = getCartItems().filter((it) => it.product_id !== productId);
  saveCartItems(items);
}

export function clearCart() {
  saveCartItems([]);
}

export function calcCartTotal(items) {
  return items.reduce((sum, it) => sum + Number(it.price) * Number(it.quantity), 0);
}

// utils/cartApi.js
import axios from 'axios';

const cartApi = axios.create({
  baseURL: 'http://localhost:3002',
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

// ⭐ ADD TO CART
export async function addToCart(payload) {
  try {
    const { data } = await cartApi.post(`/api/cart/items`, payload);
    return data;
  } catch (err) {
    console.error("Add to Cart Error:", err?.response?.data || err.message);
    throw err;
  }
}

// GET /api/cart
export async function getCart() {
  try {
    const { data } = await cartApi.get('/api/cart/');
    return data;
  } catch (err) {
    // normalize server message if provided (e.g. { message: 'Cart empty' })
    if (err?.response?.data) throw err.response.data;
    throw err;
  }
}

// PATCH /api/cart/items/:productId  (update quantity)
export async function updateCartItem(productId, qty) {
  try {
  const { data } = await cartApi.put(`/api/cart/items/${productId}`, { qty: Number(qty) });
    return data;
  } catch (err) {
    if (err?.response?.data) throw err.response.data;
    throw err;
  }
}

// DELETE /api/cart/items/:productId
export async function deleteCartItem(productId) {
  try {
    const { data } = await cartApi.delete(`/api/cart/items/${productId}`);
    return data;
  } catch (err) {
    if (err?.response?.data) throw err.response.data;
    throw err;
  }
}

// DELETE /api/cart (clear)
export async function clearCart() {
  try {
    const { data } = await cartApi.delete('/api/cart');
    return data;
  } catch (err) {
    if (err?.response?.data) throw err.response.data;
    throw err;
  }
}

export default cartApi;

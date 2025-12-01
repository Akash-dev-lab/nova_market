import axios from "axios";

const sellerApi = axios.create({
  baseURL: "http://localhost:3007",
  withCredentials: true
});

// ----------------------------
//  GET SELLER PROFILE
// ----------------------------
export async function getSellerProfile() {
  try {
    const { data } = await sellerApi.get("/");
    return data;
  } catch (err) {
    console.error("Seller GET error:", err?.response?.data || err.message);
    throw err;
  }
}

// ----------------------------
//  UPDATE SELLER PROFILE
// ----------------------------
export async function updateSellerProfile(payload) {
  try {
    const { data } = await sellerApi.patch("/", payload);
    return data;
  } catch (err) {
    console.error("Seller UPDATE error:", err?.response?.data || err.message);
    throw err;
  }
}

// ----------------------------
//  GET ALL SELLER ORDERS
// ----------------------------
export async function getSellerOrders() {
  try {
    const { data } = await sellerApi.get("/orders");
    return data;
  } catch (err) {
    console.error("Seller ORDERS error:", err?.response?.data || err.message);
    throw err;
  }
}

// ----------------------------
//  GET ALL SELLER PRODUCTS
// ----------------------------
export async function getSellerProducts() {
  try {
    const { data } = await sellerApi.get("/products");
    return data;
  } catch (err) {
    console.error("Seller PRODUCTS error:", err?.response?.data || err.message);
    throw err;
  }
}

// ----------------------------
//  GET SELLER DASHBOARD METRICS
// ----------------------------
export async function getSellerDashboardMetrics() {
  try {
    const { data } = await sellerApi.get("/api/seller/dashboard/metrics");
    console.log(data)
    return data;
  } catch (err) {
    console.error("Seller DASHBOARD error:", err?.response?.data || err.message);
    throw err;
  }
}

export default sellerApi;

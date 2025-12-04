import axios from "axios";  

const sellerApi = axios.create({
  baseURL: "http://localhost:3007/api/seller/dashboard",
  withCredentials: true,
});

// --------------------------------------------------
// GET SELLER PROFILE
// --------------------------------------------------
export async function getSellerProfile() {
  try {
    const { data } = await sellerApi.get("/");
    return data;
  } catch (err) {
    console.error("Seller GET error:", err?.response?.data || err.message);
    throw err;
  }
}

// --------------------------------------------------
// UPDATE SELLER PROFILE
// --------------------------------------------------
export async function updateSellerProfile(payload) {
  try {
    const { data } = await sellerApi.patch("/", payload);
    return data;
  } catch (err) {
    console.error("Seller UPDATE error:", err?.response?.data || err.message);
    throw err;
  }
}

// --------------------------------------------------
// CREATE PRODUCT (Multipart FormData)
// --------------------------------------------------
export async function createProduct(formData) {
  try {
    const { data } = await sellerApi.post(
      "/products/create",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true
      }
    );
    return data;
  } catch (err) {
    console.error("Create Product Error:", err?.response?.data || err.message);
    throw err;
  }
}

// --------------------------------------------------
// UPDATE PRODUCT (Multipart FormData)
// --------------------------------------------------
export async function updateProduct(productId, formData) {
  try {
    const { data } = await sellerApi.put(
      `/product/${productId}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return data;
  } catch (err) {
    console.error("Update Product Error:", err?.response?.data || err.message);
    throw err;
  }
}

// --------------------------------------------------
// DELETE PRODUCT
// --------------------------------------------------
export async function deleteProduct(productId) {
  try {
    const { data } = await sellerApi.delete(`/product/${productId}`);
    return data;
  } catch (err) {
    console.error("Delete Product Error:", err?.response?.data || err.message);
    throw err;
  }
}

// --------------------------------------------------
// GET ALL SELLER PRODUCTS
// --------------------------------------------------
export async function getSellerProducts() {
  try {
    const { data } = await sellerApi.get("/products");
    return data;
  } catch (err) {
    console.error("Seller PRODUCTS error:", err?.response?.data || err.message);
    throw err;
  }
}

// --------------------------------------------------
// GET ALL SELLER ORDERS
// --------------------------------------------------
export async function getSellerOrders() {
  try {
    const { data } = await sellerApi.get("/orders");
    return data;
  } catch (err) {
    console.error("Seller ORDERS error:", err?.response?.data || err.message);
    throw err;
  }
}

// --------------------------------------------------
// GET SELLER DASHBOARD METRICS
// --------------------------------------------------
export async function getSellerDashboardMetrics() {
  try {
    const { data } = await sellerApi.get("/metrics");
    return data;
  } catch (err) {
    console.error("Seller DASHBOARD error:", err?.response?.data || err.message);
    throw err;
  }
}

export default sellerApi;

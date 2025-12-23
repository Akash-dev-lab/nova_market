import axios from "axios";

// Create axios instance JUST for product service
const productsApi = axios.create({
    baseURL: "https://nova-product-service.onrender.com",
    withCredentials: false, // product service doesn't need auth cookies
});

// FETCH ALL PRODUCTS
export async function getAllProducts() {
    try {
        const { data } = await productsApi.get(`/api/products/`);
        return data;
    } catch (err) {
        console.error("Products fetch error:", err?.response?.data || err.message);
        return [];
    }
}


// -----------------------------------------------------
// ⭐ FETCH SINGLE PRODUCT BY ID
// -----------------------------------------------------
export async function getProductById(productId) {
    try {
        const { data } = await productsApi.get(`/api/products/${productId}`);
        return data;
    } catch (err) {
        console.error("Product detail fetch error:", err?.response?.data || err.message);
        return null;
    }
}
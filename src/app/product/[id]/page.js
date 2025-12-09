// app/product/[id]/page.jsx
import React from "react";
import ProductDetailClient from "../../../components/productDetail/ProductDetailClient";
import { getProductById } from "../../../utils/productsApi";

// server component for Next.js app router
export default async function ProductPage({ params }) {
   const resolvedParams = await params;
  const { id } = resolvedParams;

  let product = null;

   try {
    const res = await getProductById(id);
    product = res?.product || null;
  } catch (err) {
    console.error("Product fetch error:", err);
  }

  // If no product -> 404 could be returned, or pass null to client to show not found
  return <ProductDetailClient product={product} />;
}

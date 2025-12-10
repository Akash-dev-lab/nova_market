"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { addToCart, getCart, updateCartItem } from "../../utils/cartApi";
import { Star } from "lucide-react";

export default function ProductDetailClient({ product }) {
  const router = useRouter();

  // -----------------------------
  // UI STATES
  // -----------------------------
  const [selectedImage, setSelectedImage] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);
  const [qty, setQty] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [toast, setToast] = useState(null);

  // -----------------------------
  // CART STATE
  // -----------------------------
  const [cartItems, setCartItems] = useState([]);

  // Load cart once on mount
  useEffect(() => {
    (async () => {
      try {
        const res = await getCart();
        setCartItems(res?.cart?.items || []);
      } catch (err) {
        setCartItems([]); // no cart yet
      }
    })();
  }, []);

  // -----------------------------
  // Normalized product fields
  // -----------------------------
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-[#071014] to-[#071014]/80 text-white">
        <div className="max-w-2xl text-center">
          <h2 className="text-2xl font-bold mb-2">Product not found</h2>
          <p className="text-gray-400">The product you requested couldn't be loaded.</p>
        </div>
      </div>
    );
  }

  const images = product.Images?.map(i => i.url) ?? [];
  const displayPrice = product.price?.amount ?? 0;
  const currency = product.price?.currency ?? "INR";

  useEffect(() => {
    if (product.variants?.length) setSelectedVariant(product.variants[0]);
  }, [product]);

  // -----------------------------
  // Add To Cart Logic (Optimized)
  // -----------------------------
  const handleAddToCart = useCallback(async () => {
    try {
      // Always load fresh cart
      const latest = await getCart().catch(() => null);
      const existingItem = latest?.cart?.items?.find(
        (it) => it.productId?.toString() === product._id.toString()
      );

      // If exists → increase quantity
      if (existingItem) {
        const newQty = existingItem.quantity + qty;

        await updateCartItem(existingItem.productId, newQty);

        // Update state (no duplicates)
        setCartItems(prev =>
          prev.map(item =>
            item.productId?.toString() === product._id.toString()
              ? { ...item, quantity: newQty }
              : item
          )
        );

        setToast({ type: "success", message: `Quantity updated to ${newQty}` });
        setTimeout(() => setToast(null), 2000);
        return;
      }

      // Otherwise → add new item
      await addToCart({ productId: product._id, qty });

      setCartItems(prev => [
        ...prev,
        {
          productId: product._id,
          quantity: qty,
          price: product.price,
          title: product.title,
          images: product.Images,
        }
      ]);

      setToast({ type: "success", message: "Added to cart" });
      setTimeout(() => setToast(null), 2000);
    } catch (err) {
      console.error("Add to cart error:", err);
      setToast({ type: "error", message: "Failed to add to cart" });
      setTimeout(() => setToast(null), 2000);
    }
  }, [product, qty]);

  // -----------------------------
  // Rating
  // -----------------------------
  const rating = product.rating?.avg ?? 4.5;

  // -----------------------------
  // Animation presets
  // -----------------------------
  const fade = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 },
  };

  // -----------------------------
  // UI
  // -----------------------------
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#071214] to-[#081216] text-white pb-20">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* LEFT: IMAGES */}
          <div className="lg:col-span-7">
            <motion.div initial="initial" animate="animate" className="space-y-6">
              <div className="text-sm text-gray-400">
                <span className="cursor-pointer" onClick={() => router.push("/")}>
                  Home
                </span>{" "}
                / {product.category || "Products"} /{" "}
                <span className="text-white">{product.title}</span>
              </div>

              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">{product.title}</h1>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Thumbnail column */}
                <div className="hidden md:flex flex-col gap-3 col-span-1">
                  {images.map((src, i) => (
                    <motion.button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`w-20 h-20 rounded-lg overflow-hidden ${selectedImage === i ? "ring-2 ring-cyan-400" : "border-transparent"
                        } bg-black/10`}
                    >
                      <img src={src} className="object-cover w-full h-full" alt={product.title} />
                    </motion.button>
                  ))}
                </div>

                {/* Main image */}
                <div className="md:col-span-3 relative">
                  <motion.div
                    key={images[selectedImage]}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.25 }}
                    className="rounded-xl overflow-hidden bg-gradient-to-b from-black/30 to-black/10"
                  >
                    <img
                      src={images[selectedImage]}
                      alt={product.title}
                      className="w-full h-[420px] object-cover cursor-zoom-in"
                      onClick={() => setZoomOpen(true)}
                    />
                  </motion.div>

                  {/* image indicators */}
                  <div className="mt-3 flex gap-2 text-sm text-gray-400">
                    <span>{selectedImage + 1}/{images.length}</span>
                    <div className="mx-2">•</div>
                    <span>High resolution</span>
                  </div>
                </div>
              </div>

              {/* Description / bullets */}
              <div className="rounded-xl bg-white/3 p-5">
                <p className="text-gray-200 leading-relaxed">{product.description || product.summary || "No description provided."}</p>

                {/* highlights (if available) */}
                {product.highlights?.length ? (
                  <ul className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-300">
                    {product.highlights.map((h, idx) => (
                      <li key={idx} className="before:content-['▹'] before:text-cyan-400 before:mr-2">{h}</li>
                    ))}
                  </ul>
                ) : null}
              </div>

              {/* Specs + Reviews */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Specs */}
                <motion.div {...fade} className="rounded-xl bg-white/3 p-5">
                  <h3 className="font-semibold mb-3">Specifications</h3>
                  <dl className="grid grid-cols-2 gap-y-2 text-gray-300">
                    <div className="flex gap-3"><dt className="min-w-[110px] text-gray-400">Brand</dt><dd>{product.brand || "—"}</dd></div>
                    <div className="flex gap-3"><dt className="min-w-[110px] text-gray-400">Category</dt><dd>{product.category || "—"}</dd></div>
                    <div className="flex gap-3"><dt className="min-w-[110px] text-gray-400">Stock</dt><dd>{product.stock ?? "—"}</dd></div>
                    {/* <div className="flex gap-3"><dt className="min-w-[110px] text-gray-400">SKU</dt><dd>{product.sku || product._id}</dd></div> */}
                  </dl>
                </motion.div>

                {/* Reviews */}
                <motion.div {...fade} className="rounded-xl bg-white/3 p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold">{rating.toFixed(1)}</span>
                        <div className="flex items-center text-yellow-400">
                          <Star size={16} /> <Star size={16} /> <Star size={16} /> <Star size={16} /> <Star size={16} />
                        </div>
                      </div>
                      <div className="text-sm text-gray-400"> reviews</div>
                    </div>
                    <button className="px-3 py-1 bg-cyan-400/10 text-cyan-300 rounded-md">Read all</button>
                  </div>

                    <div className="mt-4 space-y-3">
                    {/* {(reviews.slice(0,2)).map((r, i) => ( */}
                      <div  className="p-3 bg-black/20 rounded">
                        <div className="flex items-center justify-between">
                          <strong>Anonymous</strong>
                          <div className="text-sm text-gray-400">Date</div>
                        </div>
                        <div className="text-gray-300 text-sm mt-1">text</div>
                      </div>
                    {/* ))} */}
                    {/* {reviews.length === 0 && <div className="text-gray-400 text-sm">No reviews yet</div>} */}
                  </div>
                  </motion.div>
                  </div>
                </motion.div>
              </div>

              {/* RIGHT: BUY BOX */}
              <div className="lg:col-span-5">
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="sticky top-24 bg-white/5 p-6 rounded-2xl border border-white/10"
                >
                  {/* Price */}
                  <div className="flex items-baseline justify-between">
                    <div>
                      <div className="text-gray-300 text-sm">Price</div>
                      <div className="text-3xl font-bold text-green-400">
                        ₹{displayPrice} <span className="text-sm text-gray-400">{currency}</span>
                      </div>
                    </div>
                    <div className="text-right text-sm text-gray-400">In stock: <span className="text-white">{product.stock}</span></div>
                  </div>

                  {/* Variants */}
                {product.variants?.length ? (
                  <div className="mt-4">
                    <div className="text-sm text-gray-400 mb-2">Variants</div>
                    <div className="flex flex-wrap gap-2">
                      {product.variants.map((v, i) => (
                        <button
                          key={i}
                          onClick={() => setSelectedVariant(v)}
                          className={`px-3 py-2 rounded-md border ${selectedVariant === v ? "bg-cyan-500 text-black" : "bg-white/5 text-gray-200"}`}
                        >
                          {v.name || `${v.color || v.size || v.option}`}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : null}

                  {/* Qty Selector */}
                  <div className="mt-4">
                    <p className="text-sm text-gray-400 mb-2">Quantity</p>
                    <div className="flex flex-wrap gap-3">
                      <button
                        className="px-3 py-1 bg-white/10 rounded"
                        onClick={() => setQty((q) => Math.max(1, q - 1))}
                      >
                        -
                      </button>
                      <input
                        value={qty}
                        onChange={(e) => setQty(Number(e.target.value) || 1)}
                        className="w-16 text-center bg-transparent border border-white/20 rounded px-2 py-1"
                      />
                      <button
                        className="px-3 py-1 bg-white/10 rounded"
                        onClick={() => setQty((q) => q + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Add to cart */}
                  <div className="mt-5 grid grid-cols-2 gap-3">
                  <button onClick={handleAddToCart} className="col-span-2 bg-cyan-400 cursor-pointer text-black font-semibold px-4 py-3 rounded-xl hover:scale-[1.02] transition">
                    Add to cart
                  </button>
                </div>

                {/* Small actions */}
                <div className="mt-4 flex gap-3 text-sm text-gray-400">
                  <button className="underline">Save</button>
                  <button className="underline">Share</button>
                </div>                </motion.div>
              </div>
          </div>
        </div>

        {/* Zoomed Image */}
        <AnimatePresence>
          {zoomOpen && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setZoomOpen(false)}
            >
              <motion.img
                src={images[selectedImage]}
                className="max-w-[90%] max-h-[90%] object-contain rounded"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toast */}
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className={`fixed bottom-6 right-6 rounded px-5 py-3 shadow-lg ${toast.type === "success" ? "bg-green-600" : "bg-red-600"} text-white`}
            >
              {toast.message}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      );
}

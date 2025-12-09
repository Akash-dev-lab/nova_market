// components/ProductDetailClient.jsx
"use client"
import React, { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react"; // optional; or remove if you don't have lucide
// You can remove lucide import and use inline svgs if needed.

export default function ProductDetailClient({ product }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);
  const router = useRouter();
  const [qty, setQty] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(null); // e.g. color/size object
  const [toast, setToast] = useState(null);

  // graceful fallback if product not found
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

  // normalize images array
  const images = product.Images?.length ? product.Images.map(i => i.url || i) : [product.image || product.thumbnail].filter(Boolean);

  // compute price nicely
  const displayPrice = product.price?.amount ?? (product.priceAmount ?? 0);
  const currency = product.price?.currency ?? product.priceCurrency ?? "INR";

  // sample variants: If product.variants exist, set default
  useEffect(() => {
    if (product.variants && product.variants.length) {
      setSelectedVariant(product.variants[0]);
    }
  }, [product]);

  // Add to cart (example — replace with your cart API)
  const handleAddToCart = async () => {
    try {
      // Example: call your add-to-cart API here
      // await addToCart({ productId: product._id, qty, variant: selectedVariant })

      setToast({ type: "success", message: "Added to cart" });
      setTimeout(() => setToast(null), 2500);
    } catch (err) {
      setToast({ type: "error", message: "Failed to add to cart" });
      setTimeout(() => setToast(null), 2500);
    }
  };

  // Reviews & rating basic
  const rating = product.rating?.avg ?? product.averageRating ?? 4.4;
  const reviews = product.reviews ?? [];

  // small helpers for animation
  const fade = { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: 8 } };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#071214] to-[#081216] text-white pb-20">
      {/* Container */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left: Gallery & info */}
          <div className="lg:col-span-7">
            <motion.div initial="initial" animate="animate" className="space-y-6">
              {/* Breadcrumb + Title */}
              <div className="text-sm text-gray-400"><div className="cursor-pointer" onClick={() => router.push(`/`)}>Home </div> / {product.category || "Products"} / <span className="text-white">{product.title}</span></div>

              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">{product.title}</h1>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Thumbnails column */}
                <div className="hidden md:flex flex-col gap-3 col-span-1">
                  {images.map((src, i) => (
                    <motion.button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`w-20 h-20 rounded-lg overflow-hidden border ${selectedImage === i ? "ring-2 ring-cyan-400" : "border-transparent"} bg-black/10`}
                      whileTap={{ scale: 0.98 }}
                    >
                      <img src={src} className="w-full h-full object-cover" alt={product.title} />
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
                      <div className="text-sm text-gray-400">{reviews.length} reviews</div>
                    </div>
                    <button className="px-3 py-1 bg-cyan-400/10 text-cyan-300 rounded-md">Read all</button>
                  </div>

                  <div className="mt-4 space-y-3">
                    {(reviews.slice(0,2)).map((r, i) => (
                      <div key={i} className="p-3 bg-black/20 rounded">
                        <div className="flex items-center justify-between">
                          <strong>{r.author || "Anonymous"}</strong>
                          <div className="text-sm text-gray-400">{r.date || ""}</div>
                        </div>
                        <div className="text-gray-300 text-sm mt-1">{r.text}</div>
                      </div>
                    ))}
                    {reviews.length === 0 && <div className="text-gray-400 text-sm">No reviews yet</div>}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Right: Sticky Buy Box */}
          <div className="lg:col-span-5">
            <div className="sticky top-24">
              <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} className="rounded-2xl bg-white/5 p-6 border border-white/6">
                {/* Price */}
                <div className="flex items-baseline justify-between">
                  <div>
                    <div className="text-gray-400 text-sm">Price</div>
                    <div className="text-2xl font-bold text-green-400">₹{displayPrice} <span className="text-sm text-gray-400"> {currency}</span></div>
                  </div>
                  <div className="text-right text-sm text-gray-400">In stock: <span className="text-white">{product.stock ?? "—"}</span></div>
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

                {/* Qty */}
                <div className="mt-4">
                  <div className="text-sm text-gray-400 mb-2">Quantity</div>
                  <div className="flex items-center gap-3">
                    <button onClick={() => setQty(q => Math.max(1, q-1))} className="px-3 py-1 bg-white/5 rounded">-</button>
                    <input value={qty} onChange={e => setQty(Number(e.target.value) || 1)} className="w-16 text-center bg-transparent border border-white/6 rounded px-2 py-1" />
                    <button onClick={() => setQty(q => q+1)} className="px-3 py-1 bg-white/5 rounded">+</button>
                    <div className="text-sm text-gray-400 ml-auto">Total ₹{(displayPrice * qty).toFixed(0)}</div>
                  </div>
                </div>

                {/* Add to cart */}
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <button onClick={handleAddToCart} className="col-span-2 bg-cyan-400 text-black font-semibold px-4 py-3 rounded-xl hover:scale-[1.02] transition">
                    Add to cart
                  </button>
                </div>

                {/* Small actions */}
                <div className="mt-4 flex gap-3 text-sm text-gray-400">
                  <button className="underline">Save</button>
                  <button className="underline">Share</button>
                </div>
              </motion.div>
            </div>
          </div>

        </div>
      </div>

      {/* Lightbox / zoom overlay */}
      <AnimatePresence>
        {zoomOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
            onClick={() => setZoomOpen(false)}
          >
            <motion.img
              key={images[selectedImage]}
              src={images[selectedImage]}
              className="max-w-[90%] max-h-[90%] object-contain rounded"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Simple toast */}
      <AnimatePresence>
        {toast && (
          <motion.div initial={{y:20, opacity:0}} animate={{y:0, opacity:1}} exit={{y:20, opacity:0}} className={`fixed bottom-6 right-6 rounded px-5 py-3 shadow-lg ${toast.type === "success" ? "bg-green-600" : "bg-red-600"} text-white`}>
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

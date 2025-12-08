'use client'
import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar/page";
import AuthPopup from "../components/AuthPopup/AuthPopup";
import AccessBlockPopup from "../components/SellerBlockPopup/AccessBlockPopup";

import { getCurrentUser } from "../utils/authApi";
import { getAllProducts } from "../utils/productsApi";
import { getCart } from "../utils/cartApi";

import { CometCard } from "../components/ui/comet-card";   // ⭐ IMPORT COMET CARD
import styles from "./home.module.css";

export default function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [products, setProducts] = useState([]);
  const [showSellerBlock, setShowSellerBlock] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingCartProducts, setLoadingCartProducts] = useState(true);

  // ---------- Fetch User ----------
  useEffect(() => {
    async function fetchUser() {
      try {
        const userData = await getCurrentUser();
        const u = userData?.user || userData;
        setUser(u);

        if (u?.role === "seller") {
          setShowSellerBlock(true);
        }
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  // ---------- Fetch Products ----------
  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getAllProducts();
        setProducts(data?.products || []);
      } catch (err) {
        console.error("Products error:", err);
      } finally {
        setLoadingProducts(false);
      }
    }
    fetchProducts();
  }, []);

  // ---------- Fetch Cart ----------
  useEffect(() => {
    async function fetchCart() {
      try {
        const data = await getCart();
        console.log(data);
      } catch (err) {
        console.error("Cart error:", err);
      } finally {
        setLoadingCartProducts(false);
      }
    }
    fetchCart();
  }, []);

  const handleProtectedAction = () => {
    if (!user) setShowAuthPopup(true);
  };

  // ---------- BLOCK UI FOR SELLER ----------
  if (showSellerBlock) {
    return (
      <AccessBlockPopup
        title="Seller Account Logged In"
        message="This route is only for customers. Please visit your seller dashboard."
        buttonText="Go to Seller Dashboard →"
        redirectTo="/seller/dashboard"
        autoRedirect={true}
      />
    );
  }

  return (
    <div className={styles.container}>
      <Navbar />

      <main className={styles.main}>

        {/* SECTION 1 */}
        <section className={styles.section}>
          <h2 className="text-3xl text-black font-bold mb-6">Newly Launched By Sellers</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {products.map((product) => (
            <CometCard key={product._id} className="p-4 rounded-xl cursor-pointer">

              {/* IMAGE */}
              {product.Images?.[0]?.url && (
                <img
                  src={product.Images[0].url}
                  alt={product.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}

              {/* TITLE */}
              <h3 className="text-xl font-semibold mb-1">
                {product.title}
              </h3>

              {/* PRICE */}
              <p className="text-lg font-bold text-green-400">
                ₹{product.price?.amount} {product.price?.currency}
              </p>

            </CometCard>
          ))}

        </div>
        </section>

        {/* SECTION 2 */}
        <section className={styles.section}>
          <h2 className="text-3xl text-black font-bold mb-6">50% OFF on Sport Shoes</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {products.map((product) => (
            <CometCard key={product._id} className="p-4 rounded-xl cursor-pointer">

              <span className={styles.discount}>50% OFF</span>
              {product.Images?.[0]?.url && (
                <img
                  src={product.Images[0].url}
                  alt={product.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}

              {/* TITLE */}
              <h3 className="text-xl font-semibold mb-1">
                {product.title}
              </h3>

              {/* PRICE */}
              <p className="text-lg font-bold text-green-400">
                ₹{product.price?.amount} {product.price?.currency}
              </p>

            </CometCard>
          ))}

        </div>
        </section>

        {/* SECTION 3 */}
        <section className={styles.section}>
          <h2 className="text-3xl text-black font-bold mb-6">Let's Make The Combo</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {products.map((product) => (
            <CometCard key={product._id} className="p-4 rounded-xl cursor-pointer">

              {/* IMAGE */}
              {product.Images?.[0]?.url && (
                <img
                  src={product.Images[0].url}
                  alt={product.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}

              {/* TITLE */}
              <h3 className="text-xl font-semibold mb-1">
                {product.title}
              </h3>

              {/* PRICE */}
              <p className="text-lg font-bold text-green-400">
                ₹{product.price?.amount} {product.price?.currency}
              </p>

            </CometCard>
          ))}

        </div>
        </section>
      </main>

      {/* Bottom Nav */}
      <nav className={styles.bottomNav}>
        <button className={styles.navBtn}>🏠</button>
        <button className={styles.navBtn}>🛒</button>
        <button className={styles.navBtn}>🔔</button>
        <button className={styles.navBtn}>👤</button>
      </nav>

      <AuthPopup
        isOpen={showAuthPopup}
        onClose={() => setShowAuthPopup(false)}
        message="Please login to access this feature"
      />
    </div>
  );
}

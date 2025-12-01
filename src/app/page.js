'use client'
import React, { useState, useEffect } from 'react'
import Navbar from '../components/navbar/page'
import AuthPopup from '../components/AuthPopup/AuthPopup'
import { getCurrentUser } from '../utils/authApi'
import { getAllProducts } from '../utils/productsApi';
import { getCart } from '../utils/cartApi';
import styles from './home.module.css'

export default function Home() {
	const [user, setUser] = useState(null)
	const [showAuthPopup, setShowAuthPopup] = useState(false)
	const [loading, setLoading] = useState(true)
	const [products, setProducts] = useState([]);
	const [loadingProducts, setLoadingProducts] = useState(true)
	const [cartProducts, setLoadingCartProducts] = useState(true)

	// ---------- NEW: Fetch Current User ----------
	useEffect(() => {
		async function fetchUser() {
			try {
				const userData = await getCurrentUser()
				setUser(userData?.user || userData)
			} catch (err) {
				setUser(null)
			} finally {
				setLoading(false)
			}
		}
		fetchUser()
	}, [])

	// ---------- NEW: Fetch Products ----------
	useEffect(() => {
		async function fetchProducts() {
			try {
				const data = await getAllProducts()
				setProducts(data?.products || [])
			} catch (error) {
				console.error("Products error:", error)
			} finally {
				setLoadingProducts(false)
			}
		}

		fetchProducts()
	}, [])

	// ---------- NEW: Fetch Cart ----------
	useEffect(() => {
		async function fetchCart() {
			try {
				const data = await getCart()
				// setProducts(data?.products || [])
			} catch (error) {
				console.error("Cart error:", error)
			} finally {
				setLoadingCartProducts(false)
			}
		}

		fetchCart()
	}, [])


	// ------------------------------------------

	const handleProtectedAction = () => {
		if (!user) setShowAuthPopup(true)
	}

	return (
		<div className={styles.container}>
			<Navbar />

			<main className={styles.main}>
				<section className={styles.section}>
					<h2 className={styles.sectionTitle}>Newly Launched By Sellers</h2>
					<div className={styles.productGrid}>
						{!loadingProducts && products.length === 0 ? (
							<p className='text-red-500'>
							Till products are not uploaded by Seller...
						</p>
						) : (
							products.map(product => (
								<div key={product.id} className={styles.productCard}>
									<div className={styles.productImage}></div>
									<h3 className={styles.productName}>{product.name}</h3>
									<p className={styles.productPrice}>${product.price}</p>
								</div>
							))
						)}
					</div>
				</section>

				<section className={styles.section}>
					<h2 className={styles.sectionTitle}>50% OFF on Sport Shoes</h2>

						{/* EMPTY STATE */}
					{!loadingProducts && products.length === 0 && (
						<p className='text-red-500'>
							Till products are not uploaded by Seller...
						</p>
					)}

					<div className={styles.productGrid}>
						{products.map(product => (
							<div key={product.id} className={styles.productCard}>
								<div className={styles.productImage}>
									<span className={styles.discount}>50% OFF</span>
								</div>
								<h3 className={styles.productName}>{product.name}</h3>
								<div className={styles.priceContainer}>
									<p className={styles.productPrice}>{product.price}</p>
									{/* <p className={styles.originalPrice}>{product.originalPrice}</p> */}
								</div>
							</div>
						))}
					</div>
				</section>

				<section className={styles.section}>
					<h2 className={styles.sectionTitle}>Let's make the combo</h2>

						{/* EMPTY STATE */}
					{!loadingProducts && products.length === 0 && (
						<p className='text-red-500'>
							Till products are not uploaded by Seller...
						</p>
					)}

					<div className={styles.productGrid}>
						{products.map(product => (
							<div key={product.id} className={styles.productCard}>
								<div className={styles.productImage}></div>
								<h3 className={styles.productName}>{product.name}</h3>
								<p className={styles.productPrice}>{product.price}</p>
							</div>
						))}
					</div>
				</section>
			</main>

			<nav className={styles.bottomNav}>
				<button className={styles.navBtn} onClick={handleProtectedAction}>🏠</button>
				<button className={styles.navBtn} onClick={handleProtectedAction}>🛒</button>
				<button className={styles.navBtn} onClick={handleProtectedAction}>🔔</button>
				<button className={styles.navBtn} onClick={handleProtectedAction}>👤</button>
			</nav>

			<AuthPopup
				isOpen={showAuthPopup}
				onClose={() => setShowAuthPopup(false)}
				message="Please login to access this feature"
			/>
		</div>
	)
}

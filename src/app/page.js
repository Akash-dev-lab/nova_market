'use client'
import React from 'react'
import Navbar from '../components/navbar/page'
import styles from './home.module.css'

export default function Home() {
	const products = {
		newlyLaunched: [
			{ id: 1, name: 'Product 1', price: '$29.99' },
			{ id: 2, name: 'Product 2', price: '$39.99' },
			{ id: 3, name: 'Product 3', price: '$49.99' },
			{ id: 4, name: 'Product 4', price: '$59.99' },
		],
		sportShoes: [
			{ id: 5, name: 'Sport Shoe 1', price: '$59.99', originalPrice: '$119.99' },
			{ id: 6, name: 'Sport Shoe 2', price: '$69.99', originalPrice: '$139.99' },
			{ id: 7, name: 'Sport Shoe 3', price: '$79.99', originalPrice: '$159.99' },
			{ id: 8, name: 'Sport Shoe 4', price: '$89.99', originalPrice: '$179.99' },
		],
		combo: [
			{ id: 9, name: 'Combo Pack 1', price: '$89.99' },
			{ id: 10, name: 'Combo Pack 2', price: '$99.99' },
			{ id: 11, name: 'Combo Pack 3', price: '$109.99' },
			{ id: 12, name: 'Combo Pack 4', price: '$119.99' },
		],
	}

	return (
		<div className={styles.container}>
			<Navbar />

			<main className={styles.main}>
				<section className={styles.section}>
					<h2 className={styles.sectionTitle}>Newly Launched By Sellers</h2>
					<div className={styles.productGrid}>
						{products.newlyLaunched.map(product => (
							<div key={product.id} className={styles.productCard}>
								<div className={styles.productImage}></div>
								<h3 className={styles.productName}>{product.name}</h3>
								<p className={styles.productPrice}>{product.price}</p>
							</div>
						))}
					</div>
				</section>

				<section className={styles.section}>
					<h2 className={styles.sectionTitle}>50% OFF on Sport Shoes</h2>
					<div className={styles.productGrid}>
						{products.sportShoes.map(product => (
							<div key={product.id} className={styles.productCard}>
								<div className={styles.productImage}>
									<span className={styles.discount}>50% OFF</span>
								</div>
								<h3 className={styles.productName}>{product.name}</h3>
								<div className={styles.priceContainer}>
									<p className={styles.productPrice}>{product.price}</p>
									<p className={styles.originalPrice}>{product.originalPrice}</p>
								</div>
							</div>
						))}
					</div>
				</section>

				<section className={styles.section}>
					<h2 className={styles.sectionTitle}>Let's make the combo</h2>
					<div className={styles.productGrid}>
						{products.combo.map(product => (
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
				<button className={styles.navBtn}>🏠</button>
				<button className={styles.navBtn}>🛒</button>
				<button className={styles.navBtn}>🔔</button>
				<button className={styles.navBtn}>👤</button>
			</nav>
		</div>
	)
}

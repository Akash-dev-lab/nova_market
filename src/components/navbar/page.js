'use client'
import { useState } from 'react'
import styles from './navbar.module.css'

export default function Navbar() {
	const [searchQuery, setSearchQuery] = useState('')

	return (
		<header className={styles.header}>
			<div className={styles.headerContent}>
				<div className={styles.logo}>
					<div className={styles.logoCircle}></div>
					<span className={styles.logoText}>Nova Market</span>
				</div>

				<div className={styles.searchBar}>
					<input 
						type="text" 
						placeholder="Search products..." 
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className={styles.searchInput}
					/>
					<button className={styles.searchBtn}>🔍</button>
				</div>

				<div className={styles.headerIcons}>
					<button className={styles.iconBtn} title="Notifications">🔔</button>
					<button className={styles.iconBtn} title="Cart">🛒</button>
					<button className={styles.iconBtn} title="Profile">👤</button>
				</div>
			</div>
		</header>
	)
}

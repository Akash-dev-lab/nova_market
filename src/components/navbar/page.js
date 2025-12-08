'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getCurrentUser, logout } from '../../utils/authApi'
import AuthPopup from '../AuthPopup/AuthPopup'   // <-- added
import styles from './navbar.module.css'
import Loader from './logo'
import { Search, Bell, ShoppingCart } from "lucide-react";

export default function Navbar() {
	const router = useRouter()
	const [searchQuery, setSearchQuery] = useState('')
	const [user, setUser] = useState(null)
	const [showDropdown, setShowDropdown] = useState(false)
	const [loading, setLoading] = useState(true)
	const [focused, setFocused] = useState(false);

	const [showAuthPopup, setShowAuthPopup] = useState(false)

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

	async function handleLogout() {
		try {
			await logout()
			setUser(null)
			setShowDropdown(false)
			router.push('/')
		} catch (err) {
			console.log("Logout failed:", err)
		}
	}

	const handleProtectedClick = (path) => {
		if (!user) {
			setShowAuthPopup(true)
			return
		}
		router.push(path)
	}

	const handleProfileClick = () => {
		if (!user) {
			setShowAuthPopup(true)
			return
		}
		setShowDropdown(!showDropdown)
	}

	const getUserInitial = () => {
		if (user?.username?.firstName) {
			return user.username.firstName.charAt(0).toUpperCase()
		}
		return '?'
	}

	const getUserName = () => {
		if (user?.username?.firstName && user?.username?.lastName) {
			return `${user.username.firstName} ${user.username.lastName}`
		}
		return 'User'
	}

	return (
		<>
			<header className={styles.header}>
				<div className={styles.headerContent}>
					<div className={styles.logo}>
						<div><Loader /></div>
						<span className={styles.logoText}>Nova Market</span>
					</div>

					{/* SEARCH BAR */}
					<div className="relative w-[45%]">
						<div
							className={`
            flex items-center px-4 py-3 w-full rounded-full bg-white/10 backdrop-blur-lg
            border transition-all duration-300
            ${focused ? "border-cyan-400 shadow-[0_0_15px_rgba(0,255,255,0.4)]" : "border-white/20"}
          `}
						>
							<Search className="text-cyan-300 mr-3" />
							<input
								type="text"
								placeholder="Search products..."
								onFocus={() => setFocused(true)}
								onBlur={() => setFocused(false)}
								className="w-full bg-transparent outline-none text-white placeholder-gray-300"
							/>
						</div>

						{/* ANIMATED GRADIENT BORDER LINE (A) */}
						<div className={`
          absolute inset-0 rounded-full pointer-events-none opacity-70
          transition-all duration-500
          ${focused ? "animate-gradient-border" : ""}
        `}></div>

						{/* MOVING SHINE EFFECT (C) */}
						{focused && (
							<span className="absolute inset-0 rounded-full shine-animation pointer-events-none"></span>
						)}
					</div>

					<div className={styles.headerIcons}>

						{/* 🔔 NOTIFICATIONS */}
						<button
							className={styles.iconBtn}
							title="Notifications"
							onClick={() => handleProtectedClick('/notifications')}
						>
							<Bell className="w-5 h-5" />
						</button>

						{/* 🛒 CART */}
						<button
							className={styles.iconBtn}
							title="Cart"
							onClick={() => handleProtectedClick('/cart')}
						>
							<ShoppingCart className="w-5 h-5" />
						</button>

						<div className={styles.profileContainer}>
							<button
								className={styles.profileBtn}
								onClick={handleProfileClick}
								title="Profile"
							>
								{loading ? (
									<span className={styles.avatar}>•</span>
								) : user ? (
									<span className={styles.avatar}>{getUserInitial()}</span>
								) : (
									<span className={styles.notLoggedIn}>👤</span>
								)}
							</button>

							{showDropdown && user && (
								<div className={styles.dropdown}>
									<div className={styles.dropdownHeader}>
										<div className={styles.userInfo}>
											<p className={styles.userName}>{getUserName()}</p>
											<p className={styles.userEmail}>{user.email}</p>
										</div>
									</div>

									<div className={styles.dropdownMenu}>
										<button className={styles.menuItem} onClick={() => router.push('/orders')}>
											📦 Orders
										</button>
										<button className={styles.menuItem} onClick={() => router.push('/manage-address')}>
											📍 Manage Address
										</button>
										<button className={styles.menuItem} onClick={() => router.push('/account-settings')}>
											⚙️ Account Settings
										</button>
									</div>

									<div className={styles.dropdownFooter}>
										<button className={styles.logoutBtn} onClick={handleLogout}>
											🚪 Logout
										</button>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</header>

			{/* AUTH POPUP */}
			<AuthPopup
				isOpen={showAuthPopup}
				onClose={() => setShowAuthPopup(false)}
				message="Please login to access this feature"
			/>
		</>
	)
}

'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './authPopup.module.css'

export default function AuthPopup({ isOpen, onClose, message = 'Please login to continue' }) {
	const router = useRouter()
	const [isClosing, setIsClosing] = useState(false)

	const handleClose = () => {
		setIsClosing(true)
		setTimeout(() => {
			onClose()
			setIsClosing(false)
		}, 200)
	}

	const handleLogin = () => {
		router.push('/auth/login')
		handleClose()
	}

	if (!isOpen) return null

	return (
		<div className={`${styles.overlay} ${isClosing ? styles.closing : ''}`}>
			<div className={`${styles.popup} ${isClosing ? styles.popupClosing : ''}`}>
				<button className={styles.closeBtn} onClick={handleClose}>✕</button>
				
				<div className={styles.popupContent}>
					<div className={styles.icon}>🔐</div>
					<h2 className={styles.title}>Authorization Required</h2>
					<p className={styles.message}>{message}</p>
				</div>

				<div className={styles.actions}>
					<button className={styles.secondaryBtn} onClick={handleClose}>
						Continue Shopping
					</button>
					<button className={styles.primaryBtn} onClick={handleLogin}>
						Login Now
					</button>
				</div>
			</div>
		</div>
	)
}

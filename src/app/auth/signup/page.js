'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { register } from '../../../utils/authApi'
import styles from '../signup.module.css'


export default function Signup() {
	const router = useRouter()
	const [form, setForm] = useState({ firstname: '', lastname: '', email: '', password: '', role: 'user' })
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')


	async function handleSubmit(e) {
		e.preventDefault()
		setLoading(true)
		setError('')
		try {
			const data = await register(form)
			// Redirect to login
			if (form.role === 'seller') {
				router.push('/seller/dashboard')
			} else {
				router.push('/')
			}
		} catch (err) {
			setError(err?.response?.data?.message || err.message || 'Signup failed')
		} finally { setLoading(false) }
	}


	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<div className={styles.formContainer}>
					<div className={styles.header}>
						<h1 className={styles.title}>Create Account</h1>
						<p className={styles.subtitle}>Join our marketplace and start shopping or selling</p>
					</div>


					<form onSubmit={handleSubmit} className={styles.form}>
						<div className={styles.formGroup}>
							<label className={styles.label}>First Name</label>
							<input
								type="text"
								value={form.firstname}
								onChange={e => setForm({ ...form, firstname: e.target.value })}
								placeholder="Enter your first name"
								required
								className={styles.input}
							/>
						</div>


						<div className={styles.formGroup}>
							<label className={styles.label}>Last Name</label>
							<input
								type="text"
								value={form.lastname}
								onChange={e => setForm({ ...form, lastname: e.target.value })}
								placeholder="Enter your last name"
								required
								className={styles.input}
							/>
						</div>


						<div className={styles.formGroup}>
							<label className={styles.label}>Email Address</label>
							<input
								type="email"
								value={form.email}
								onChange={e => setForm({ ...form, email: e.target.value })}
								placeholder="Enter your email"
								required
								className={styles.input}
							/>
						</div>


						<div className={styles.formGroup}>
							<label className={styles.label}>Password</label>
							<input
								type="password"
								value={form.password}
								onChange={e => setForm({ ...form, password: e.target.value })}
								placeholder="Create a strong password"
								required
								className={styles.input}
							/>
						</div>


						<div className={styles.formGroup}>
							<label className={styles.label}>Join As</label>
							<select
								value={form.role}
								onChange={e => setForm({ ...form, role: e.target.value })}
								className={styles.select}
							>
								<option value="user">Buyer</option>
								<option value="seller">Seller</option>
							</select>
						</div>


						{error && <div className={styles.error}>{error}</div>}


						<button
							type="submit"
							disabled={loading}
							className={styles.submitBtn}
						>
							{loading ? (
								<>
									<span className={styles.spinner}></span>
									Creating Account...
								</>
							) : 'Create Account'}
						</button>
					</form>


					<div className={styles.footer}>
						<p>Already have an account? <a href="/auth/login" className={styles.link}>Login here</a></p>
					</div>
				</div>


				<div className={styles.imageContainer}>
					<div className={styles.imageContent}>
						<h2>Welcome to Nova Market</h2>
						<p>Your trusted platform for buying and selling quality products</p>
						<div className={styles.features}>
							<div className={styles.feature}>
								<span>✓</span> Secure Transactions
							</div>
							<div className={styles.feature}>
								<span>✓</span> Fast Shipping
							</div>
							<div className={styles.feature}>
								<span>✓</span> 24/7 Support
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
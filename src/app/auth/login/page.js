'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { login } from '../../../utils/authApi'
import styles from '../login.module.css'


export default function Login(){
	const router = useRouter()
	const [form, setForm] = useState({ email:'', password:'' })
	const [err, setErr] = useState('')
	const [loading, setLoading] = useState(false)


	async function handleSubmit(e){
		e.preventDefault()
		setErr('')
		setLoading(true)
		try{
			const data = await login(form)
			console.log(data)
			
			// Backend handles token in httpOnly cookie
			if (data?.user?.role === "seller") {
				router.push('/seller/dashboard')
			} else {
				router.push('/')
			}
		}catch(e){ setErr(e?.response?.data?.message || e.message || 'Login failed') }
		finally{ setLoading(false) }
	}


	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<div className={styles.imageContainer}>
					<div className={styles.imageContent}>
						<h2>Welcome Back</h2>
						<p>Login to your account and continue shopping or managing your store</p>
						<div className={styles.features}>
							<div className={styles.feature}>
								<span>✓</span> Secure Login
							</div>
							<div className={styles.feature}>
								<span>✓</span> Fast Access
							</div>
							<div className={styles.feature}>
								<span>✓</span> Account Protection
							</div>
						</div>
					</div>
				</div>

				<div className={styles.formContainer}>
					<div className={styles.header}>
						<h1 className={styles.title}>Login</h1>
						<p className={styles.subtitle}>Sign in to your Nova Market account</p>
					</div>

					<form onSubmit={handleSubmit} className={styles.form}>
						<div className={styles.formGroup}>
							<label className={styles.label}>Email Address</label>
							<input 
								type="email" 
								value={form.email} 
								onChange={e=>setForm({...form, email:e.target.value})} 
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
								onChange={e=>setForm({...form, password:e.target.value})} 
								placeholder="Enter your password"
								required 
								className={styles.input}
							/>
						</div>

						{err && <div className={styles.error}>{err}</div>}

						<button 
							type="submit" 
							disabled={loading}
							className={styles.submitBtn}
						>
							{loading ? (
								<>
									<span className={styles.spinner}></span>
									Logging in...
								</>
							) : 'Login'}
						</button>
					</form>

					<div className={styles.footer}>
						<p>Don't have an account? <a href="/auth/signup" className={styles.link}>Sign up here</a></p>
					</div>
				</div>
			</div>
		</div>
	)
}
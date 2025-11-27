'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { register } from '../../utils/authApi'


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
router.push('/auth/login')
} catch (err) {
setError(err?.response?.data?.message || err.message || 'Signup failed')
} finally { setLoading(false) }
}


return (
<div className="container">
<h2>Signup</h2>
<form onSubmit={handleSubmit}>
<label>First name</label>
<input value={form.firstname} onChange={e=>setForm({...form, firstname:e.target.value})} required />


<label>Last name</label>
<input value={form.lastname} onChange={e=>setForm({...form, lastname:e.target.value})} required />


<label>Email</label>
<input type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} required />


<label>Password</label>
<input type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} required />


<label>Role</label>
<select value={form.role} onChange={e=>setForm({...form, role:e.target.value})}>
<option value="user">User</option>
<option value="seller">Seller</option>
</select>


<div style={{marginTop:12}}>
<button type="submit" disabled={loading}>{loading ? 'Signing...' : 'Signup'}</button>
</div>


{error && <p style={{color:'red'}}>{error}</p>}
</form>


<p style={{marginTop:12}}>Already have an account? <a href="/auth/login">Login</a></p>
</div>
)
}
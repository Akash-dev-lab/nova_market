'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { login } from '../../utils/authApi'


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
<div className="container">
<h2>Login</h2>
<form onSubmit={handleSubmit}>

<label>Email</label>
<input type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} required />


<label>Password</label>
<input type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} required />


<div style={{marginTop:12}}>
<button type="submit" disabled={loading}>{loading ? 'Logging...' : 'Login'}</button>
</div>


{err && <p style={{color:'red'}}>{err}</p>}
</form>


<p style={{marginTop:12}}>Don't have an account? <a href="/auth/signup">Signup</a></p>
</div>
)
}
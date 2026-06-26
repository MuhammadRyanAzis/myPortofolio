import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { motion } from 'framer-motion'
import '../App.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Enforce user requirements: Ryan's email
    if (email !== 'ryanazis24@gmail.com') {
      setError('Akses ditolak. Hanya akun admin utama yang diperbolehkan.')
      setLoading(false)
      return
    }

    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate('/secret-admin/dashboard')
    } catch (err) {
      console.error(err)
      setError('Login gagal. Periksa kembali email dan kata sandi Anda.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <div className="bg-gradients"></div>
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel" 
        style={{ padding: '40px', width: '100%', maxWidth: '400px', zIndex: 2 }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>
          Admin <span className="text-gradient">Portal</span>
        </h2>
        {error && (
          <div style={{ color: '#ef4444', background: 'rgba(239,68,68,0.05)', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '0.9rem', border: '1px solid rgba(239,68,68,0.1)' }}>
            {error}
          </div>
        )}
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Email</label>
            <input 
              type="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid rgba(15, 23, 42, 0.1)',
                background: 'rgba(15, 23, 42, 0.02)',
                color: 'var(--text-primary)',
                outline: 'none',
              }}
            />
          </div>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Password</label>
            <input 
              type="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid rgba(15, 23, 42, 0.1)',
                background: 'rgba(15, 23, 42, 0.02)',
                color: 'var(--text-primary)',
                outline: 'none',
              }}
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="btn btn-primary" 
            style={{ width: '100%', padding: '12px', fontSize: '1rem' }}
          >
            {loading ? 'Masuk...' : 'Login'}
          </button>
        </form>
      </motion.div>
    </div>
  )
}

export default Login

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useGoogleLogin } from '@react-oauth/google'
import './Login.css'

export default function Login() {
  const navigate = useNavigate()
  const { login, signup, googleLogin, loading, error, setError } = useAuth()

  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [success, setSuccess] = useState(false)

  const update = (key, val) => setForm(function(f) { return { ...f, [key]: val } })

  async function handleSubmit() {
    setError('')

    if (!form.email || !form.password) { setError('Email and password are required.'); return }

    if (mode === 'signup') {
      if (!form.name)                     { setError('Please enter your name.'); return }
      if (form.password.length < 6)       { setError('Password must be at least 6 characters.'); return }
      if (form.password !== form.confirm) { setError('Passwords do not match.'); return }
    }

    let ok = false

    if (mode === 'login') {
      ok = await login(form.email, form.password)
    } else {
      ok = await signup(form.name, form.email, form.password)
    }

    if (ok) {
      setSuccess(true)
      setTimeout(function() { navigate('/') }, 1200)
    }
  }

  const googleAuth = useGoogleLogin({
    onSuccess: async function(tokenResponse) {
      try {
        const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: 'Bearer ' + tokenResponse.access_token }
        })
        const profile = await res.json()
        const ok = await googleLogin(profile.name, profile.email, profile.sub, profile.picture)
        if (ok) {
          setSuccess(true)
          setTimeout(function() { navigate('/') }, 1200)
        }
      } catch {
        setError('Google login failed. Please try again.')
      }
    },
    onError: function() { setError('Google login was cancelled.') }
  })

  return (
    <div className="lp">
      <div className="lp__bg">
        <div className="lp__blob lp__blob--1" />
        <div className="lp__blob lp__blob--2" />
        <div className="lp__blob lp__blob--3" />
        <div className="lp__grid" />
      </div>

      <button className="lp__back" onClick={function() { navigate(-1) }}>Back</button>

      <div className={success ? 'lp__card lp__card--success' : 'lp__card'}>
        <img src="/logoo.png" alt="Citizen AI" className="lp__logo" />

        {success ? (
          <div className="lp__success">
            <div className="lp__success-icon">&#10003;</div>
            <h2 className="lp__success-title">Welcome!</h2>
            <p className="lp__success-sub">Redirecting you now...</p>
          </div>
        ) : (
          <div>
            <div className="lp__tabs">
              <button
                className={mode === 'login' ? 'lp__tab lp__tab--active' : 'lp__tab'}
                onClick={function() { setMode('login'); setError('') }}
              >
                Login
              </button>
              <button
                className={mode === 'signup' ? 'lp__tab lp__tab--active' : 'lp__tab'}
                onClick={function() { setMode('signup'); setError('') }}
              >
                Sign Up
              </button>
            </div>

            <h1 className="lp__title">
              {mode === 'login' ? 'Welcome back' : 'Join Citizen AI'}
            </h1>
            <p className="lp__sub">
              {mode === 'login'
                ? 'Login to discover schemes tailored for you.'
                : 'Sign up free and find benefits you deserve.'}
            </p>

            {mode === 'signup' && (
              <div className="lp__field">
                <label className="lp__label">Full Name</label>
                <input
                  className="lp__input"
                  type="text"
                  placeholder="e.g. Ravi Kumar"
                  value={form.name}
                  onChange={function(e) { update('name', e.target.value) }}
                />
              </div>
            )}

            <div className="lp__field">
              <label className="lp__label">Email Address</label>
              <input
                className="lp__input"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={function(e) { update('email', e.target.value) }}
              />
            </div>

            <div className="lp__field">
              <label className="lp__label">Password</label>
              <input
                className="lp__input"
                type="password"
                placeholder="Enter password"
                value={form.password}
                onChange={function(e) { update('password', e.target.value) }}
                onKeyDown={function(e) { if (e.key === 'Enter') handleSubmit() }}
              />
            </div>

            {mode === 'signup' && (
              <div className="lp__field">
                <label className="lp__label">Confirm Password</label>
                <input
                  className="lp__input"
                  type="password"
                  placeholder="Re-enter password"
                  value={form.confirm}
                  onChange={function(e) { update('confirm', e.target.value) }}
                />
              </div>
            )}

            {error ? <div className="lp__error">{error}</div> : null}

            <button
              className={loading ? 'lp__btn lp__btn--loading' : 'lp__btn'}
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading
                ? <span className="lp__spinner" />
                : mode === 'login' ? 'Login to Citizen AI' : 'Create Account'}
            </button>

            <div className="lp__divider"><span>or</span></div>

            <button className="lp__google-btn" onClick={function() { googleAuth() }}>
              Sign in with Google
            </button>

            <p className="lp__note">No spam. No fees. Your data stays private.</p>
          </div>
        )}
      </div>
    </div>
  )
}
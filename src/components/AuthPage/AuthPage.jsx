
import { useState } from 'react'
import {
  ArrowRight,
  Boxes,
  CircleHelp,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import './AuthPage.css'

const DEMO_EMAIL = 'demo@kephas.com'
const DEMO_ACCOUNT_KEY = 'kephas-stockflow-demo-account'

function AuthPage({ onAuthenticated }) {
  const [mode, setMode] = useState('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  function changeMode(nextMode) {
    setMode(nextMode)
    setMessage('')
    setError('')
    setShowPassword(false)
    setConfirmPassword('')
  }

  function signIn(nextEmail = email, nextName = name) {
    const cleanEmail = nextEmail.trim().toLowerCase()
    const fallbackName = cleanEmail
      .split('@')[0]
      .replace(/[._-]/g, ' ')
      .replace(/\b\w/g, (character) => character.toUpperCase())

    const userName = nextName.trim() || fallbackName || 'Demo Operator'

    // Demo-only authentication. Replace with a verified API response
    // before using this component with real accounts.
    onAuthenticated?.({
      name: userName,
      email: cleanEmail,
    })
  }

  function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setMessage('')

    if (mode === 'forgot') {
      const cleanEmail = email.trim().toLowerCase()

      setMessage(
        `Password recovery is not connected yet. No email was sent to ${cleanEmail}.`
      )
      return
    }

    if (mode === 'register') {
      const cleanName = name.trim()
      const cleanEmail = email.trim().toLowerCase()

      if (!cleanName) {
        setError('Please enter your full name.')
        return
      }

      if (password.length < 8) {
        setError('Use a password with at least 8 characters.')
        return
      }

      if (password !== confirmPassword) {
        setError('Passwords do not match.')
        return
      }

      // Store profile details only, never the password.
      // This is local demo persistence, not secure account creation.
      try {
        localStorage.setItem(
          DEMO_ACCOUNT_KEY,
          JSON.stringify({
            name: cleanName,
            email: cleanEmail,
          })
        )
      } catch {
        setError(
          'Browser storage is unavailable. You can still explore the demo.'
        )
        return
      }

      signIn(cleanEmail, cleanName)
      return
    }

    // The current frontend demo does not verify login credentials.
    // Connect this flow to the backend authentication API before production.
    if (!password.trim()) {
      setError('Please enter your password.')
      return
    }

    signIn()
  }

  function continueAsDemo() {
    setError('')
    setMessage('')
    signIn(DEMO_EMAIL, 'Demo Operator')
  }

  const heading =
    mode === 'register'
      ? 'Create your workspace'
      : mode === 'forgot'
        ? 'Reset your password'
        : 'Welcome back'

  const submitLabel =
    mode === 'register'
      ? 'Create demo account'
      : mode === 'forgot'
        ? 'Reset password'
        : 'Sign in to StockFlow'

  return (
    <main className="auth-page">
      <section className="auth-story" aria-label="About KEPHAS StockFlow">
        <div className="auth-brand">
          <span className="auth-brand__mark" aria-hidden="true">
            KS
          </span>
          <span>
            <strong>KEPHAS</strong>
            <small>STOCKFLOW</small>
          </span>
        </div>

        <div className="auth-story__content">
          <p className="auth-kicker">
            <span aria-hidden="true" />
            INVENTORY, IN GOOD ORDER
          </p>

          <h1>
            Materials move.
            <br />
            <em>Your business moves with them.</em>
          </h1>

          <p className="auth-story__description">
            A calmer command center for the people keeping construction
            supplied, on schedule, and ready for what comes next.
          </p>

          <div className="auth-feature-list">
            <div>
              <Boxes size={17} aria-hidden="true" />
              <span>Stock visibility across your operation</span>
            </div>
            <div>
              <ShieldCheck size={17} aria-hidden="true" />
              <span>Clear controls for every workflow</span>
            </div>
            <div>
              <Sparkles size={17} aria-hidden="true" />
              <span>Inventory intelligence when connected</span>
            </div>
          </div>
        </div>

        <div className="auth-motion" aria-hidden="true">
          <div className="auth-motion__track">
            <span className="auth-motion__route" />
            <span className="auth-motion__package auth-motion__package--one">
              <Boxes size={17} />
            </span>
            <span className="auth-motion__package auth-motion__package--two">
              <Boxes size={17} />
            </span>
            <span className="auth-motion__package auth-motion__package--three">
              <Boxes size={17} />
            </span>
            <span className="auth-motion__signal" />
          </div>
          <div className="auth-motion__labels">
            <span>WAREHOUSE</span>
            <span>IN TRANSIT</span>
            <span>JOB SITE</span>
          </div>
        </div>

        <div className="auth-story__footer">
          <span>KEPHAS STOCKFLOW</span>
          <span>DEMO ENVIRONMENT</span>
        </div>
      </section>

      <section className="auth-panel" aria-labelledby="auth-heading">
        <div className="auth-panel__top">
          <span>WORKSPACE ACCESS</span>
          <span className="auth-demo-tag">DEMO</span>
        </div>

        <div className="auth-form-wrap">
          <div className="auth-mobile-brand">
            <span className="auth-brand__mark" aria-hidden="true">
              KS
            </span>
            <strong>KEPHAS STOCKFLOW</strong>
          </div>

          <div className="auth-motion auth-motion--mobile" aria-hidden="true">
            <div className="auth-motion__track">
              <span className="auth-motion__route" />
              <span className="auth-motion__package auth-motion__package--one">
                <Boxes size={17} />
              </span>
              <span className="auth-motion__package auth-motion__package--two">
                <Boxes size={17} />
              </span>
              <span className="auth-motion__package auth-motion__package--three">
                <Boxes size={17} />
              </span>
              <span className="auth-motion__signal" />
            </div>
            <div className="auth-motion__labels">
              <span>WAREHOUSE</span>
              <span>IN TRANSIT</span>
              <span>JOB SITE</span>
            </div>
          </div>

          <p className="auth-kicker auth-kicker--dark">
            {mode === 'forgot'
              ? 'ACCOUNT RECOVERY'
              : 'YOUR OPERATIONS, IN SYNC'}
          </p>

          <h2 id="auth-heading">{heading}</h2>

          <p className="auth-subtitle">
            {mode === 'login'
              ? 'Sign in to explore your inventory workspace.'
              : mode === 'register'
                ? 'Create a local demo profile to explore StockFlow.'
                : 'Enter your email to preview the recovery process.'}
          </p>

          {mode === 'login' && (
            <div
              className="auth-mode-switch"
              role="group"
              aria-label="Account access mode"
            >
              <button
                type="button"
                className="is-selected"
                aria-pressed="true"
                onClick={() => changeMode('login')}
              >
                Sign in
              </button>
              <button
                type="button"
                aria-pressed="false"
                onClick={() => changeMode('register')}
              >
                Create account
              </button>
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit}>
            {mode === 'register' && (
              <label className="auth-field">
                <span>Full name</span>
                <span className="auth-input">
                  <input
                    type="text"
                    autoComplete="name"
                    required
                    maxLength={100}
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="e.g. Adebayo Okafor"
                  />
                </span>
              </label>
            )}

            <label className="auth-field">
              <span>Email address</span>
              <span className="auth-input">
                <Mail size={17} aria-hidden="true" />
                <input
                  type="email"
                  autoComplete="email"
                  required
                  maxLength={254}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@company.com"
                />
              </span>
            </label>

            {mode !== 'forgot' && (
              <label className="auth-field">
                <span>Password</span>
                <span className="auth-input">
                  <LockKeyhole size={17} aria-hidden="true" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    autoComplete={
                      mode === 'register'
                        ? 'new-password'
                        : 'current-password'
                    }
                    required
                    minLength={mode === 'register' ? 8 : 1}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="auth-password-toggle"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    aria-pressed={showPassword}
                    onClick={() => setShowPassword((visible) => !visible)}
                  >
                    {showPassword ? (
                      <EyeOff size={17} aria-hidden="true" />
                    ) : (
                      <Eye size={17} aria-hidden="true" />
                    )}
                  </button>
                </span>
              </label>
            )}

            {mode === 'register' && (
              <label className="auth-field">
                <span>Confirm password</span>
                <span className="auth-input">
                  <LockKeyhole size={17} aria-hidden="true" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    required
                    minLength={8}
                    value={confirmPassword}
                    onChange={(event) =>
                      setConfirmPassword(event.target.value)
                    }
                    placeholder="Re-enter your password"
                  />
                </span>
              </label>
            )}

            {error && (
              <p className="auth-feedback auth-feedback--error" role="alert">
                {error}
              </p>
            )}

            {message && (
              <p className="auth-feedback auth-feedback--success" role="status">
                {message}
              </p>
            )}

            <button
              className="auth-submit"
              type="submit"
            >
              {submitLabel}
              <ArrowRight size={17} aria-hidden="true" />
            </button>
          </form>

          {mode === 'login' && (
            <div className="auth-under-form">
              <button
                type="button"
                className="auth-text-button"
                onClick={() => changeMode('forgot')}
              >
                Forgot password?
              </button>
              <span>Local demo access</span>
            </div>
          )}

          {mode === 'forgot' && (
            <button
              type="button"
              className="auth-back-link"
              onClick={() => changeMode('login')}
            >
              Back to sign in
            </button>
          )}

          {mode === 'register' && (
            <p className="auth-switch-copy">
              Already have a profile?{' '}
              <button
                type="button"
                className="auth-text-button"
                onClick={() => changeMode('login')}
              >
                Sign in
              </button>
            </p>
          )}

          {mode === 'login' && (
            <div className="auth-demo-box">
              <div className="auth-demo-box__icon">
                <CircleHelp size={17} aria-hidden="true" />
              </div>
              <div>
                <strong>Just looking around?</strong>
                <p>
                  Explore the local demo without creating an account.
                  Sign-in verification is not connected yet.
                </p>
                <button type="button" onClick={continueAsDemo}>
                  Continue as demo user
                  <ArrowRight size={14} aria-hidden="true" />
                </button>
              </div>
            </div>
          )}
        </div>

        <footer className="auth-panel__footer">
          <span>Private demo workspace</span>
          <span>© KEPHAS StockFlow</span>
        </footer>
      </section>
    </main>
  )
}

export default AuthPage

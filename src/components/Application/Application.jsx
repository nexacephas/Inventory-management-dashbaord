import { useEffect, useState } from 'react'
import { BrowserRouter, useLocation } from 'react-router-dom'
import AppLayout from '../AppLayout/AppLayout.jsx'
import AuthPage from '../AuthPage/AuthPage.jsx'
import WelcomeIntro from '../WelcomeIntro/WelcomeIntro.jsx'

const SESSION_KEY = 'kephas-stockflow-demo-user'
const THEME_KEY = 'kephas-stockflow-theme'

function readTheme() {
  let theme = 'dark'

  try {
    if (localStorage.getItem(THEME_KEY) === 'light') theme = 'light'
  } catch {
    // Keep dark mode available when browser storage is blocked.
  }

  document.documentElement.dataset.theme = theme
  return theme
}

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])

  return null
}

function readSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY))
  } catch {
    return null
  }
}

function Application() {
  const [user, setUser] = useState(readSession)
  const [showIntro, setShowIntro] = useState(false)
  const [theme, setTheme] = useState(readTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem(THEME_KEY, theme)
    } catch {
      // The current theme still applies for this session.
    }
  }, [theme])

  useEffect(() => {
    if (!user || !showIntro) return undefined

    const introTimeout = window.setTimeout(() => setShowIntro(false), 5000)
    return () => window.clearTimeout(introTimeout)
  }, [showIntro, user])

  function handleAuthenticated(nextUser) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(nextUser))
    setUser(nextUser)
    setShowIntro(true)
  }

  function handleLogout() {
    localStorage.removeItem(SESSION_KEY)
    setUser(null)
    setShowIntro(false)
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="application-root">
        {!user ? (
          <AuthPage onAuthenticated={handleAuthenticated} />
        ) : showIntro ? (
          <WelcomeIntro user={user} onContinue={() => setShowIntro(false)} />
        ) : (
          <AppLayout
            user={user}
            theme={theme}
            onToggleTheme={() => setTheme((currentTheme) => currentTheme === 'dark' ? 'light' : 'dark')}
            onLogout={handleLogout}
          />
        )}
      </div>
    </BrowserRouter>
  )
}

export default Application
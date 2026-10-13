
import { useEffect, useRef, useState } from 'react'
import {
  Bell,
  BriefcaseBusiness,
  ChevronDown,
  CircleDollarSign,
  LayoutDashboard,
  LogOut,
  Moon,
  Menu,
  MessageSquareText,
  Package,
  Search,
  Settings,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Sun,
  Truck,
  UserRound,
  Warehouse,
  X,
} from 'lucide-react'
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom'

import './AppLayout.css'

import DashboardPage from '../../pages/DashboardPage/DashboardPage.jsx'
import InventoryPage from '../../pages/InventoryPage/InventoryPage.jsx'
import ProductsPage from '../../pages/ProductsPage/ProductsPage.jsx'
import PurchasesPage from '../../pages/PurchasesPage/PurchasesPage.jsx'
import SalesPage from '../../pages/SalesPage/SalesPage.jsx'
import SuppliersPage from '../../pages/SuppliersPage/SuppliersPage.jsx'
import CustomersPage from '../../pages/CustomersPage/CustomersPage.jsx'
import ReportsPage from '../../pages/ReportsPage/ReportsPage.jsx'
import SettingsPage from '../../pages/SettingsPage/SettingsPage.jsx'
import AIInsightsPage from '../../pages/AIInsightsPage/AIInsightsPage.jsx'
import DemandForecastPage from '../../pages/DemandForecastPage/DemandForecastPage.jsx'
import StockRiskPage from '../../pages/StockRiskPage/StockRiskPage.jsx'
import ReplenishmentPage from '../../pages/ReplenishmentPage/ReplenishmentPage.jsx'
import InventoryAnalysisPage from '../../pages/InventoryAnalysisPage/InventoryAnalysisPage.jsx'
import ProfitabilityInsightsPage from '../../pages/ProfitabilityInsightsPage/ProfitabilityInsightsPage.jsx'
import AIChatPage from '../../pages/AIChatPage/AIChatPage.jsx'

function TrendingUpIcon({ size = 16, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M3 17l6-6 4 4 8-10" />
      <path d="M14 5h7v7" />
    </svg>
  )
}

const navSections = [
  {
    title: 'Workspace',
    items: [
      { label: 'Dashboard', to: '/', icon: LayoutDashboard },
      { label: 'Inventory', to: '/inventory', icon: Warehouse },
      { label: 'Products', to: '/products', icon: Package },
      { label: 'Purchases', to: '/purchases', icon: ShoppingCart },
      { label: 'Sales', to: '/sales', icon: CircleDollarSign },
    ],
  },
  {
    title: 'Relationships',
    items: [
      { label: 'Suppliers', to: '/suppliers', icon: Truck },
      { label: 'Customers', to: '/customers', icon: UserRound },
    ],
  },
  {
    title: 'Intelligence',
    items: [
      {
        label: 'AI Overview',
        to: '/ai/overview',
        icon: Sparkles,
        accent: true,
      },
      {
        label: 'Demand Forecasts',
        to: '/ai/demand-forecasts',
        icon: TrendingUpIcon,
      },
      {
        label: 'Stockout and Overstock Risks',
        to: '/ai/stock-risks',
        icon: ShieldCheck,
      },
      {
        label: 'Intelligent Replenishment',
        to: '/ai/replenishment',
        icon: BriefcaseBusiness,
      },
      {
        label: 'Inventory Analysis',
        to: '/ai/inventory-analysis',
        icon: Warehouse,
      },
      {
        label: 'Profitability Insights',
        to: '/ai/profitability-insights',
        icon: CircleDollarSign,
      },
      {
        label: 'AI Inventory Assistant',
        to: '/ai/assistant',
        icon: MessageSquareText,
      },
    ],
  },
  {
    title: 'Management',
    items: [
      { label: 'Reports', to: '/reports', icon: BriefcaseBusiness },
      { label: 'Settings', to: '/settings', icon: Settings },
    ],
  },
]

function AppLayout({ user, theme, onToggleTheme, onLogout }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const menuButtonRef = useRef(null)
  const sidebarRef = useRef(null)
  const profileRef = useRef(null)
  const searchRef = useRef(null)

  const navigate = useNavigate()

  const displayName =
    user?.name ||
    user?.email?.split('@')[0] ||
    'StockFlow user'

  const initials =
    displayName
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0])
      .join('')
      .toUpperCase() || 'KS'

  const searchableRoutes = navSections.flatMap((section) =>
    section.items.map((item) => ({
      ...item,
      section: section.title,
    })),
  )

  const searchResults = searchQuery.trim()
    ? searchableRoutes.filter((item) =>
        item.label.toLowerCase().includes(searchQuery.trim().toLowerCase()),
      )
    : []

  useEffect(() => {
    if (!mobileOpen) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const frame = window.requestAnimationFrame(() => {
      const firstLink = sidebarRef.current?.querySelector('a')
      firstLink?.focus()
    })

    function handleEscape(event) {
      if (event.key === 'Escape') {
        setMobileOpen(false)
        menuButtonRef.current?.focus()
      }
    }

    window.addEventListener('keydown', handleEscape)

    return () => {
      window.cancelAnimationFrame(frame)
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleEscape)
    }
  }, [mobileOpen])

  useEffect(() => {
    if (!profileOpen) return undefined

    function handleOutsideClick(event) {
      if (!profileRef.current?.contains(event.target)) {
        setProfileOpen(false)
      }
    }

    function handleEscape(event) {
      if (event.key === 'Escape') {
        setProfileOpen(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [profileOpen])

  function handleNavigate(path) {
    navigate(path)
    setMobileOpen(false)
    setProfileOpen(false)
    setSearchQuery('')
  }

  function handleSearchSubmit(event) {
    event.preventDefault()

    const query = searchQuery.trim().toLowerCase()
    if (!query) return

    const exactMatch = searchableRoutes.find(
      (item) => item.label.toLowerCase() === query,
    )

    const partialMatch = searchableRoutes.find(
      (item) => item.label.toLowerCase().includes(query),
    )

    const match = exactMatch || partialMatch

    if (match) {
      handleNavigate(match.to)
    }
  }

  function handleLogout() {
    setProfileOpen(false)
    setMobileOpen(false)
    onLogout?.()
  }

  return (
    <div className="app-shell">
      <aside
        ref={sidebarRef}
        id="app-sidebar"
        className={`sidebar ${mobileOpen ? 'sidebar--open' : ''}`}
        aria-label="Main navigation"
        aria-hidden={mobileOpen ? undefined : undefined}
      >
        <div className="sidebar__header">
          <div className="brand-mark" aria-label="KEPHAS StockFlow">
            <span>KS</span>
          </div>

          <div className="brand-copy">
            <strong>KEPHAS</strong>
            <small>StockFlow</small>
          </div>

          <button
            type="button"
            className="icon-button mobile-close"
            aria-label="Close navigation"
            onClick={() => {
              setMobileOpen(false)
              menuButtonRef.current?.focus()
            }}
          >
            <X size={18} />
          </button>
        </div>

        {navSections.map((section) => (
          <nav
            key={section.title}
            className="nav-group"
            aria-label={section.title}
          >
            <p className="nav-group__title">{section.title}</p>

            {section.items.map(({ label, to, icon: Icon, accent }) => (
              <NavLink
                key={label}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  [
                    'nav-item',
                    isActive ? 'nav-item--active' : '',
                    accent ? 'nav-item--accent' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')
                }
                onClick={() => setMobileOpen(false)}
              >
                <Icon size={16} aria-hidden="true" />
                <span>{label}</span>
              </NavLink>
            ))}
          </nav>
        ))}

        <div className="sidebar__footer">
          <button
            type="button"
            className="theme-switch"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            aria-pressed={theme === 'dark'}
          >
            <span className="theme-switch__icon">
              {theme === 'dark' ? (
                <Moon size={17} />
              ) : (
                <Sun size={17} />
              )}
            </span>

            <span className="theme-switch__copy">
              <strong>
                {theme === 'dark' ? 'Dark theme' : 'Light theme'}
              </strong>
              <small>Appearance</small>
            </span>

            <span
              className={`theme-switch__control ${
                theme === 'dark' ? 'is-dark' : ''
              }`}
              aria-hidden="true"
            >
              <i />
            </span>
          </button>
        </div>
      </aside>

      {mobileOpen && (
        <button
          type="button"
          className="sidebar-backdrop"
          aria-label="Close navigation"
          onClick={() => {
            setMobileOpen(false)
            menuButtonRef.current?.focus()
          }}
        />
      )}

      <div className="content-shell">
        <header className="topbar">
          <div className="topbar__left">
            <button
              ref={menuButtonRef}
              type="button"
              className="icon-button mobile-menu"
              aria-label="Open navigation"
              aria-controls="app-sidebar"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={18} />
            </button>

            <form
              className="search-box"
              role="search"
              onSubmit={handleSearchSubmit}
            >
              <Search size={16} aria-hidden="true" />

              <input
                ref={searchRef}
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                aria-label="Search pages"
                aria-autocomplete="list"
                aria-controls="app-search-results"
                placeholder="Search pages..."
              />

              {searchQuery && (
                <button
                  type="button"
                  className="search-clear"
                  aria-label="Clear search"
                  onClick={() => {
                    setSearchQuery('')
                    searchRef.current?.focus()
                  }}
                >
                  <X size={15} />
                </button>
              )}

              {searchQuery.trim() && (
                <div
                  id="app-search-results"
                  className="search-results"
                  role="listbox"
                  aria-label="Matching pages"
                >
                  {searchResults.length > 0 ? (
                    searchResults.slice(0, 6).map((result) => {
                      const Icon = result.icon

                      return (
                        <button
                          key={result.to}
                          type="button"
                          className="search-result"
                          role="option"
                          aria-selected="false"
                          onClick={() => handleNavigate(result.to)}
                        >
                          <Icon size={16} aria-hidden="true" />

                          <span>
                            <strong>{result.label}</strong>
                            <small>{result.section}</small>
                          </span>
                        </button>
                      )
                    })
                  ) : (
                    <p className="search-empty">
                      No matching pages found.
                    </p>
                  )}
                </div>
              )}
            </form>
          </div>

          <div className="topbar__right">
            <button
              type="button"
              className="icon-button"
              aria-label="Notifications"
              title="Notifications are not connected yet"
              onClick={() => {
                // Connect this control to the notification system later.
              }}
            >
              <Bell size={17} />
            </button>

            <div
              ref={profileRef}
              className={`profile-menu ${profileOpen ? 'is-open' : ''}`}
            >
              <button
                type="button"
                className="user-menu"
                aria-label="Toggle user menu"
                aria-expanded={profileOpen}
                onClick={() => setProfileOpen((open) => !open)}
              >
                <span className="user-menu__avatar">{initials}</span>

                <span className="user-menu__meta">
                  <strong>{displayName}</strong>
                  <small>{user?.email || 'Demo workspace'}</small>
                </span>

                <ChevronDown size={16} aria-hidden="true" />
              </button>

              {profileOpen && (
                <div className="profile-menu__dropdown">
                  <div className="profile-menu__identity">
                    <strong>{displayName}</strong>
                    <small>{user?.email || 'Demo account'}</small>
                  </div>

                  <button
                    type="button"
                    className="profile-menu__item"
                    onClick={() => handleNavigate('/settings')}
                  >
                    <Settings size={15} />
                    Settings
                  </button>

                  <button
                    type="button"
                    className="profile-menu__logout"
                    onClick={handleLogout}
                  >
                    <LogOut size={15} />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="main-panel">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/inventory" element={<InventoryPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/purchases" element={<PurchasesPage />} />
            <Route path="/sales" element={<SalesPage />} />
            <Route path="/suppliers" element={<SuppliersPage />} />
            <Route path="/customers" element={<CustomersPage />} />
            <Route path="/reports" element={<ReportsPage />} />

            <Route
              path="/settings"
              element={
                <SettingsPage
                  user={user}
                  theme={theme}
                  onToggleTheme={onToggleTheme}
                  onLogout={onLogout}
                />
              }
            />

            <Route path="/ai/overview" element={<AIInsightsPage />} />
            <Route
              path="/ai/demand-forecasts"
              element={<DemandForecastPage />}
            />
            <Route path="/ai/stock-risks" element={<StockRiskPage />} />
            <Route
              path="/ai/replenishment"
              element={<ReplenishmentPage />}
            />
            <Route
              path="/ai/inventory-analysis"
              element={<InventoryAnalysisPage />}
            />
            <Route
              path="/ai/profitability-insights"
              element={<ProfitabilityInsightsPage />}
            />
            <Route path="/ai/assistant" element={<AIChatPage />} />
            <Route path="/ai/chat" element={<AIChatPage />} />

            <Route path="*" element={<DashboardPage />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default AppLayout

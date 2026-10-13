import { useState } from 'react'
import { Check, CircleOff, Database, Moon, Palette, ShieldCheck, Sun, UserRound, Workflow } from 'lucide-react'
import { Link } from 'react-router-dom'
import { aiStatus } from '../../data/aiInventory.js'
import './SettingsPage.css'

const tabs = [
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'workspace', label: 'Workspace', icon: Database },
  { id: 'connections', label: 'Connections', icon: Workflow },
]

function SettingsPage({ user, theme, onToggleTheme, onLogout }) {
  const [activeTab, setActiveTab] = useState('appearance')

  return (
    <div className="page-shell settings-page">
      <header className="page-header settings-page__header">
        <div><p className="eyebrow">PREFERENCES</p><h1>Settings</h1><p className="settings-page__subtitle">Manage this browser’s display and review workspace connection status.</p></div>
      </header>

      <div className="notice-box settings-demo-notice"><strong>Demo workspace.</strong> Settings that require an account service or backend are shown for visibility but cannot be changed here.</div>

      <div className="settings-layout">
        <nav className="settings-tabs" role="tablist" aria-label="Settings sections">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button key={id} type="button" role="tab" id={`settings-tab-${id}`} aria-selected={activeTab === id} aria-controls={`settings-panel-${id}`} className={`settings-tab ${activeTab === id ? 'settings-tab--active' : ''}`} onClick={() => setActiveTab(id)}>
              <Icon size={17} /><span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="settings-content">
          {activeTab === 'appearance' && (
            <section className="settings-panel" role="tabpanel" id="settings-panel-appearance" aria-labelledby="settings-tab-appearance">
              <div className="settings-panel__heading"><div><p className="eyebrow eyebrow--muted">DISPLAY</p><h2>Appearance</h2><p>Choose how BuildStock looks in this browser.</p></div><Palette size={19} /></div>
              <div className="settings-row">
                <div><strong>Color theme</strong><small>Saved for this browser session profile.</small></div>
                <div className="theme-choice" role="radiogroup" aria-label="Color theme">
                  <button type="button" role="radio" aria-checked={theme === 'light'} className={theme === 'light' ? 'theme-choice__active' : ''} onClick={() => theme !== 'light' && onToggleTheme()}><Sun size={16} /> Light</button>
                  <button type="button" role="radio" aria-checked={theme === 'dark'} className={theme === 'dark' ? 'theme-choice__active' : ''} onClick={() => theme !== 'dark' && onToggleTheme()}><Moon size={16} /> Dark</button>
                </div>
              </div>
              <div className="settings-row"><div><strong>Currency display</strong><small>Locale used for sample construction-material figures.</small></div><span className="settings-value">NGN · Nigerian naira</span></div>
              <div className="settings-row"><div><strong>Reduced motion</strong><small>Follows your device accessibility preference.</small></div><span className="settings-value">System preference</span></div>
            </section>
          )}

          {activeTab === 'workspace' && (
            <section className="settings-panel" role="tabpanel" id="settings-panel-workspace" aria-labelledby="settings-tab-workspace">
              <div className="settings-panel__heading"><div><p className="eyebrow eyebrow--muted">CURRENT WORKSPACE</p><h2>Workspace profile</h2><p>Local demo identity and application defaults.</p></div><Database size={19} /></div>
              <div className="settings-row"><div><strong>Workspace name</strong><small>Visible product identity</small></div><span className="settings-value">KEPHAS BuildStock</span></div>
              <div className="settings-row"><div><strong>Environment</strong><small>Data is illustrative and stored in frontend modules</small></div><span className="settings-status settings-status--demo">Demo workspace</span></div>
              <div className="settings-row"><div><strong>Signed-in profile</strong><small>{user?.email || 'Local demo profile'}</small></div><span className="settings-value">{user?.name || 'BuildStock user'}</span></div>
              <div className="settings-row"><div><strong>Data access</strong><small>Server-side inventory and customer records</small></div><span className="settings-status settings-status--offline"><CircleOff size={14} /> Not connected</span></div>
              <div className="settings-panel__footer"><UserRound size={16} /><span>This demo profile is stored locally in your browser.</span><button type="button" className="settings-signout" onClick={onLogout}>Sign out</button></div>
            </section>
          )}

          {activeTab === 'connections' && (
            <section className="settings-panel" role="tabpanel" id="settings-panel-connections" aria-labelledby="settings-tab-connections">
              <div className="settings-panel__heading"><div><p className="eyebrow eyebrow--muted">SERVICE STATUS</p><h2>Connections</h2><p>Backend services that power live records and intelligence.</p></div><Workflow size={19} /></div>
              <div className="connection-row"><span className="connection-row__icon"><Database size={17} /></span><div><strong>Inventory API</strong><small>Live catalog and stock mutations</small></div><span className="settings-status settings-status--offline"><CircleOff size={14} /> Not connected</span></div>
              <div className="connection-row"><span className="connection-row__icon"><ShieldCheck size={17} /></span><div><strong>Purchasing and sales services</strong><small>Order approvals, fulfillment, invoices, and payment posting</small></div><span className="settings-status settings-status--offline"><CircleOff size={14} /> Not connected</span></div>
              <div className="connection-row"><span className="connection-row__icon"><Palette size={17} /></span><div><strong>AI inventory service</strong><small>{aiStatus.source}</small></div><span className="settings-status settings-status--offline"><CircleOff size={14} /> Not connected</span></div>
              <div className="settings-panel__footer"><Check size={16} /><span>No live actions will be sent from this demo.</span><Link className="settings-link" to="/ai/overview">View Intelligence overview</Link></div>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}

export default SettingsPage
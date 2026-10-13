import {
  ArrowUpRight,
  CircleDollarSign,
  Package,
  ShieldAlert,
  TrendingUp,
  ShoppingCart,
  Plus,
  Activity,
} from 'lucide-react'
import './DashboardPage.css'

const metricCards = [
  {
    label: 'Inventory Value',
    value: '₦ 14.8M',
    note: 'Demo value only',
    icon: CircleDollarSign,
  },
  {
    label: 'Total Products',
    value: '428',
    note: 'Across 12 categories',
    icon: Package,
  },
  {
    label: 'Low Stock Items',
    value: '06',
    note: '2 require review',
    icon: ShieldAlert,
  },
  {
    label: 'Sales Today',
    value: '₦ 1.2M',
    note: '+12.4% vs prior day',
    icon: TrendingUp,
  },
]

const lowStockProducts = [
  { name: 'Cement 42.5R', unit: 'bags', value: '312', status: 'Critical' },
  { name: 'PVC Pipes', unit: 'pieces', value: '164', status: 'Monitor' },
  { name: 'Tiles', unit: 'boxes', value: '105', status: 'Monitor' },
]

const recentActivity = [
  { title: 'Purchase received', description: 'Apex Build Supply — 420 bags cement', time: '2 hours ago' },
  { title: 'Large sale posted', description: 'Northgate Housing Scheme — 48 bags cement', time: 'Today' },
  { title: 'Low stock alert', description: 'Reinforcement Steel nearing reorder threshold', time: 'This morning' },
]

const demandBars = [58, 72, 64, 86, 78, 92]

function DashboardPage() {
  return (
    <div className="page-shell dashboard-page">
      <header className="page-header dashboard-header">
        <div>
          <p className="eyebrow">BUILDING MATERIALS</p>
          <h1>Construction Materials Overview</h1>
        </div>
        <div className="page-header__actions">
          <button type="button" className="btn btn-secondary">
            <Activity size={16} />
            View reports
          </button>
          <button type="button" className="btn btn-primary">
            <Plus size={16} />
            Add product
          </button>
        </div>
      </header>

      <div className="dashboard-grid dashboard-grid--wide">
        <section className="panel panel--highlight">
          <div className="panel__header">
            <div>
              <p className="eyebrow eyebrow--muted">This week</p>
              <h2>Inventory momentum</h2>
            </div>
            <span className="status-badge status-badge--success">Demo data</span>
          </div>

          <div className="dashboard-hero">
            <div>
              <p className="dashboard-hero__label">Sales velocity</p>
              <h3>₦ 8.5M</h3>
              <p className="muted-text">Illustrative weekly sales performance for presentation and workflow review only.</p>
            </div>
            <div className="trend-pill">
              <ArrowUpRight size={16} />
              +14.2%
            </div>
          </div>
        </section>

        <section className="panel">
          <div className="panel__header">
            <div>
              <p className="eyebrow eyebrow--muted">AI Inventory Insights</p>
              <h2>Operations summary</h2>
            </div>
          </div>

          <ul className="insight-list">
            <li>
              <span className="dot dot--green" />
              <div>
                <strong>Cement stock is tightening</strong>
                <small>Coverage has fallen below the recommended 14-day buffer.</small>
              </div>
            </li>
            <li>
              <span className="dot dot--amber" />
              <div>
                <strong>Demand trend is rising</strong>
                <small>Steel and pipe categories show elevated seasonal usage.</small>
              </div>
            </li>
            <li>
              <span className="dot dot--neutral" />
              <div>
                <strong>AI not connected</strong>
                <small>These insights are a demo-safe preview until backend endpoints and authorization are live.</small>
              </div>
            </li>
          </ul>
        </section>
      </div>

      <div className="metrics-grid">
        {metricCards.map(({ label, value, note, icon: Icon }) => (
          <article key={label} className="metric-card">
            <div className="metric-card__icon">
              <Icon size={18} />
            </div>
            <div>
              <p>{label}</p>
              <strong>{value}</strong>
              <small>{note}</small>
            </div>
          </article>
        ))}
      </div>

      <div className="dashboard-grid dashboard-grid--split">
        <section className="panel">
          <div className="panel__header">
            <div>
              <p className="eyebrow eyebrow--muted">Demand</p>
              <h2>Sales and demand trend</h2>
            </div>
            <span className="link-button">Demo chart</span>
          </div>

          <div className="bar-chart" aria-label="Demand placeholder chart">
            {demandBars.map((value, index) => (
              <div key={index} className="bar-chart__column">
                <span className="bar-chart__bar" style={{ height: `${value}%` }} />
                <small>{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][index]}</small>
              </div>
            ))}
          </div>
        </section>

        <section className="panel">
          <div className="panel__header">
            <div>
              <p className="eyebrow eyebrow--muted">Quick actions</p>
              <h2>Workflow</h2>
            </div>
          </div>

          <div className="quick-actions">
            <button type="button" className="btn btn-primary btn-block">
              <ShoppingCart size={16} />
              Record sale
            </button>
            <button type="button" className="btn btn-secondary btn-block">
              <Plus size={16} />
              Add product
            </button>
          </div>
        </section>
      </div>

      <div className="dashboard-grid dashboard-grid--split">
        <section className="panel">
          <div className="panel__header">
            <div>
              <p className="eyebrow eyebrow--muted">Alerts</p>
              <h2>Low stock products</h2>
            </div>
          </div>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Available</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {lowStockProducts.map((item) => (
                  <tr key={item.name}>
                    <td>{item.name}</td>
                    <td>{item.value} {item.unit}</td>
                    <td>
                      <span className={`status-badge ${item.status === 'Critical' ? 'status-badge--danger' : 'status-badge--warning'}`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="panel">
          <div className="panel__header">
            <div>
              <p className="eyebrow eyebrow--muted">Activity</p>
              <h2>Recent activity</h2>
            </div>
          </div>

          <ul className="activity-list">
            {recentActivity.map((item) => (
              <li key={item.title}>
                <div className="activity-list__dot" />
                <div>
                  <strong>{item.title}</strong>
                  <small>{item.description}</small>
                </div>
                <span>{item.time}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}

export default DashboardPage

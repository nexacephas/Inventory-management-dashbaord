import { ArrowRight, CircleCheck, CircleX, Database, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import AIInsightCard from '../../components/AIInsightCard/AIInsightCard.jsx'
import { aiStatus } from '../../data/aiInventory.js'
import { intelligenceAttentionItems, intelligenceCategorySummary, intelligenceOverviewMeta, intelligenceOverviewMetrics } from '../../data/intelligenceOverview.js'
import './AIInsightsPage.css'

function AIInsightsPage() {
  return (
    <div className="page-stack ai-insights-page">
      <header className="page-header intelligence-overview-header">
        <div>
          <p className="eyebrow">INTELLIGENCE</p>
          <h1>Inventory overview</h1>
          <p className="intelligence-overview-subtitle">Operational signals derived from the current sample catalog and transactions.</p>
        </div>
        <span className={`status-banner status-banner--${aiStatus.connected ? 'connected' : 'disconnected'}`}>
          <span className="intelligence-status-indicator" />
          {aiStatus.connected ? 'AI connected' : 'AI not connected'}
        </span>
      </header>

      <div className="notice-box intelligence-overview-notice">
        <strong>Demo-data overview, not AI analysis.</strong> Metrics below are calculated from local sample records. No forecasting model or AI endpoint is connected, and no automated inventory action is being taken.
      </div>

      <div className="metrics-grid intelligence-metrics-grid">
        {intelligenceOverviewMetrics.map((metric) => (
          <AIInsightCard key={metric.title} {...metric} />
        ))}
      </div>

      <div className="intelligence-overview-grid">
        <section className="panel intelligence-category-panel" aria-labelledby="intelligence-category-title">
          <div className="panel__header">
            <div><p className="eyebrow eyebrow--muted">CATALOG SNAPSHOT</p><h2 id="intelligence-category-title">Category exposure</h2></div>
            <span className="intelligence-last-updated">Sample data · {new Date(`${intelligenceOverviewMeta.lastSampleUpdate}T00:00:00`).toLocaleDateString('en-NG', { day: 'numeric', month: 'short' })}</span>
          </div>

          <div className="intelligence-category-table-wrap">
            <table className="intelligence-category-table">
              <thead><tr><th scope="col">Category</th><th scope="col">Products</th><th scope="col">At/below reorder</th><th scope="col">Sample stock value</th></tr></thead>
              <tbody>{intelligenceCategorySummary.map((item) => <tr key={item.category}><td><strong>{item.category}</strong></td><td>{item.products}</td><td><span className={item.attentionItems ? 'intelligence-attention-count' : 'intelligence-healthy-count'}>{item.attentionItems}</span></td><td>{item.estimatedValue}</td></tr>)}</tbody>
            </table>
          </div>
          <p className="intelligence-method-note">Stock value is on-hand quantity multiplied by sample unit cost. It is not a live valuation or forecast.</p>
        </section>

        <section className="panel intelligence-service-panel" aria-labelledby="intelligence-service-title">
          <div className="panel__header"><div><p className="eyebrow eyebrow--muted">MODEL STATUS</p><h2 id="intelligence-service-title">AI service readiness</h2></div><Sparkles size={18} className="intelligence-service-icon" /></div>
          <div className="intelligence-service-status"><CircleX size={17} /><div><strong>Not connected</strong><small>{aiStatus.source}</small></div></div>
          <ul className="intelligence-readiness-list">
            <li><Database size={15} /><span>Sample inventory records loaded</span><CircleCheck size={15} className="is-ready" /></li>
            <li><Sparkles size={15} /><span>AI model endpoint</span><span className="is-pending">Not configured</span></li>
            <li><CircleCheck size={15} /><span>Automatic stock changes</span><span className="is-pending">Disabled</span></li>
          </ul>
          <p className="intelligence-service-note">Risk and replenishment pages show sample records for review only. Decisions stay with your team.</p>
        </section>
      </div>

      <section className="panel intelligence-attention-panel" aria-labelledby="intelligence-attention-title">
        <div className="panel__header">
          <div><p className="eyebrow eyebrow--muted">THRESHOLD CHECK</p><h2 id="intelligence-attention-title">Items at or below reorder point</h2><p>Direct comparison against saved sample reorder thresholds, not AI-generated risk.</p></div>
          <Link className="link-button intelligence-review-link" to="/ai/stock-risks">Review stock risks <ArrowRight size={15} /></Link>
        </div>
        {intelligenceAttentionItems.length ? (
          <div className="intelligence-attention-list">
            {intelligenceAttentionItems.map((item) => (
              <div className="intelligence-attention-row" key={item.sku}>
                <div><strong>{item.name}</strong><small>{item.sku} · {item.location}</small></div>
                <span>{item.onHand.toLocaleString()} / {item.reorderPoint.toLocaleString()} {item.unit}</span>
                <small className="intelligence-shortfall">Short by {item.shortfall.toLocaleString()} {item.unit}</small>
              </div>
            ))}
          </div>
        ) : <p className="intelligence-no-attention">No sample products are at or below their reorder threshold.</p>}
        <div className="intelligence-attention-footer">
          <span>{intelligenceAttentionItems.length} sample items require a manual threshold review.</span>
          <Link className="link-button" to="/ai/replenishment">Open replenishment review <ArrowRight size={15} /></Link>
        </div>
      </section>
    </div>
  )
}

export default AIInsightsPage

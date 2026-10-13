import AnomalyAlert from '../../components/AnomalyAlert/AnomalyAlert.jsx'
import AIInsightCard from '../../components/AIInsightCard/AIInsightCard.jsx'
import InsightExplanation from '../../components/InsightExplanation/InsightExplanation.jsx'
import { intelligenceCategorySummary, intelligenceOverviewMetrics, inventorySampleValue, stockThresholdRows } from '../../data/intelligenceOverview.js'
import './InventoryAnalysisPage.css'

function InventoryAnalysisPage() {
  const alerts = stockThresholdRows.slice(0, 4).map((item) => ({
    title: `${item.product} is below its reorder point`,
    message: `${item.currentStock} ${item.unit} on hand against a ${item.reorderPoint} ${item.unit} threshold; short by ${item.shortfall} ${item.unit}.`,
  }))

  return (
    <div className="page-stack inventory-analysis-page">
      <div className="page-banner">
        <div>
          <p className="eyebrow">INVENTORY ANALYSIS</p>
          <h1>Catalog composition</h1>
        </div>
      </div>

      <div className="notice-box">
        <strong>Calculated demo metrics, not AI analysis.</strong> Stock values and reorder flags are calculated from sample quantities, unit costs, and thresholds. The dataset has no movement history for slow-moving analysis.
      </div>

      <div className="metrics-grid">
        <AIInsightCard {...intelligenceOverviewMetrics[0]} />
        <AIInsightCard title="Sample stock valuation" value={inventorySampleValue} change="On-hand × sample unit cost" tone="neutral" note="Not a live accounting valuation" />
        <AIInsightCard {...intelligenceOverviewMetrics[1]} />
        <AIInsightCard title="Categories represented" value={intelligenceCategorySummary.length.toLocaleString()} change="Catalog breakdown" tone="neutral" note="Derived from current demo products" />
      </div>

      <div className="two-column-grid">
        <div className="card valuation-card">
          <div className="card__header">
            <div>
              <h3>Category composition</h3>
              <p>Sample products, threshold count, and on-hand value</p>
            </div>
          </div>
          <div className="valuation-total">{inventorySampleValue}</div>
          <ul className="valuation-list">
            {intelligenceCategorySummary.map((item) => (
              <li key={item.category}>
                <span>{item.category} <small>({item.products} products, {item.attentionItems} at/below threshold)</small></span>
                <strong>{item.estimatedValue}</strong>
              </li>
            ))}
          </ul>
        </div>
        <AnomalyAlert alerts={alerts} />
      </div>

      <InsightExplanation
        title="What this view can and cannot tell you"
        items={[
          'Sample stock valuation is the sum of on-hand quantity multiplied by the catalog sample unit cost.',
          'Threshold attention counts items whose sample on-hand quantity is at or below their saved reorder point.',
          'No stock movement history is available here, so turnover, days of cover, and slow-moving classifications are not calculated.',
        ]}
      />
    </div>
  )
}

export default InventoryAnalysisPage

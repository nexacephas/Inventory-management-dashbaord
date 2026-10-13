import AIInsightCard from '../../components/AIInsightCard/AIInsightCard.jsx'
import DemandTrendChart from '../../components/DemandTrendChart/DemandTrendChart.jsx'
import InsightExplanation from '../../components/InsightExplanation/InsightExplanation.jsx'
import { profitabilitySnapshot, profitabilitySummary } from '../../data/intelligenceOverview.js'
import './ProfitabilityInsightsPage.css'

function ProfitabilityInsightsPage() {
  return (
    <div className="page-stack profitability-insights-page">
      <div className="page-banner">
        <div>
          <p className="eyebrow">PROFITABILITY</p>
          <h1>Sample unit economics</h1>
        </div>
      </div>

      <div className="notice-box">
        <strong>Calculated demo estimates, not AI analysis.</strong> Values compare sample sale prices against sample catalog costs. Taxes, freight, discounts, and accounting adjustments are not included.
      </div>

      <div className="metrics-grid profitability-metrics">
        <AIInsightCard title="Sample order revenue" value={profitabilitySummary.sales} change="Non-draft, non-cancelled" tone="neutral" note="Derived from sample sales lines" />
        <AIInsightCard title="Sample cost basis" value={profitabilitySummary.costBasis} change="Catalog unit costs" tone="neutral" note="Not landed or accounting cost" />
        <AIInsightCard title="Estimated gross profit" value={profitabilitySummary.grossProfit} change="Revenue less sample cost" tone="good" note="Illustrative unit-cost comparison" />
        <AIInsightCard title="Estimated gross margin" value={profitabilitySummary.grossMargin} change="Calculated from sample lines" tone="warning" note="Not an audited margin figure" />
      </div>

      <DemandTrendChart data={profitabilitySnapshot} title="Sample revenue by material category" subtitle="Grouped from non-draft sample sales" />

      <InsightExplanation
        title="Calculation notes"
        items={[
          'Estimated gross profit is sample sale quantity × sample sale price minus quantity × catalog sample unit cost for matching SKUs.',
          'Draft and cancelled sales are excluded from the summary.',
          'No taxes, delivery costs, customer discounts, or finance adjustments are present in this demo calculation.',
        ]}
      />
    </div>
  )
}

export default ProfitabilityInsightsPage

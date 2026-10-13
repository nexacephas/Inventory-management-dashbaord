import StockoutRiskTable from '../../components/StockoutRiskTable/StockoutRiskTable.jsx'
import { stockThresholdRows } from '../../data/intelligenceOverview.js'
import './StockRiskPage.css'

function StockRiskPage() {
  return (
    <div className="page-stack stock-risk-page">
      <div className="page-banner">
        <div>
          <p className="eyebrow">STOCK THRESHOLDS</p>
          <h1>Reorder review</h1>
        </div>
      </div>

      <div className="notice-box">
        <strong>Manual review only.</strong> Rows are calculated from sample quantities and saved reorder points. No demand model, days-of-cover estimate, or purchase recommendation is active.
      </div>

      <StockoutRiskTable rows={stockThresholdRows} />
    </div>
  )
}

export default StockRiskPage

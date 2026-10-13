import ReorderRecommendationTable from '../../components/ReorderRecommendationTable/ReorderRecommendationTable.jsx'
import { stockThresholdRows } from '../../data/intelligenceOverview.js'
import './ReplenishmentPage.css'

function ReplenishmentPage() {
  return (
    <div className="page-stack replenishment-page">
      <div className="page-banner">
        <div>
          <p className="eyebrow">REPLENISHMENT</p>
          <h1>Manual reorder review</h1>
        </div>
      </div>

      <div className="notice-box">
        <strong>No AI-generated recommendations.</strong> Quantities below are the exact shortfall to each sample reorder point. Review supplier terms and demand before raising an order.
      </div>

      <ReorderRecommendationTable rows={stockThresholdRows} />
    </div>
  )
}

export default ReplenishmentPage

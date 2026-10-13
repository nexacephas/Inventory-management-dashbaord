import ForecastChart from '../../components/ForecastChart/ForecastChart.jsx'
import ForecastRange from '../../components/ForecastRange/ForecastRange.jsx'
import DemandTrendChart from '../../components/DemandTrendChart/DemandTrendChart.jsx'
import { aiDemoLabel, forecastData, profitabilityData } from '../../data/aiInventory.js'
import './DemandForecastPage.css'

function DemandForecastPage() {
  return (
    <div className="page-stack demand-forecast-page">
      <div className="page-banner">
        <div>
          <p className="eyebrow">SCENARIO PREVIEW</p>
          <h1>Illustrative demand scenarios</h1>
        </div>
      </div>

      <div className="notice-box">
        <strong>Not a live forecast.</strong> These example ranges are not generated from current sales history or an AI model. {aiDemoLabel}
      </div>

      <div className="two-column-grid">
        {forecastData.map((item) => (
          <ForecastRange key={item.product} productData={item} />
        ))}
      </div>

      <div className="two-column-grid">
        {forecastData.map((item) => (
          <ForecastChart key={`${item.product}-chart`} productData={item} />
        ))}
      </div>

      <DemandTrendChart data={profitabilityData} />
    </div>
  )
}

export default DemandForecastPage

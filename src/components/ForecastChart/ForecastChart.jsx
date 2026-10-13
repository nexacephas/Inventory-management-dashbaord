import './ForecastChart.css'

function ForecastChart({ productData }) {
  const maxValue = Math.max(...productData.historicalDemand, ...productData.forecast, ...productData.high)

  return (
    <div className="card chart-card">
      <div className="card__header">
        <div>
          <h3>Demand forecast</h3>
          <p>Illustrative demo data only</p>
        </div>
        <span className="chip chip-muted">Scenario values</span>
      </div>

      <div className="chart-bars" aria-label={`${productData.product} demand forecast`}>
        {productData.historicalDemand.map((value, index) => (
          <div className="chart-column" key={`${productData.product}-history-${index}`}>
            <div className="chart-bar chart-bar--history" style={{ height: `${(value / maxValue) * 100}%` }} />
          </div>
        ))}

        {productData.forecast.map((value, index) => (
          <div className="chart-column" key={`${productData.product}-forecast-${index}`}>
            <div className="chart-bar chart-bar--forecast" style={{ height: `${(value / maxValue) * 100}%` }} />
          </div>
        ))}
      </div>

      <div className="chart-legend">
        <span><i className="legend-swatch legend-swatch--history" /> Historical demand</span>
        <span><i className="legend-swatch legend-swatch--forecast" /> Forecast range</span>
      </div>
    </div>
  )
}

export default ForecastChart

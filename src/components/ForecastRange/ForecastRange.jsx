import './ForecastRange.css'

function ForecastRange({ productData }) {
  return (
    <div className="card range-card">
      <div className="card__header">
        <div>
          <h3>{productData.product}</h3>
          <p>{productData.unit}</p>
        </div>
        <span className="chip chip-muted">Illustrative</span>
      </div>

      <div className="range-values">
        <div>
          <small>Low</small>
          <strong>{productData.low[productData.low.length - 1]}</strong>
        </div>
        <div className="range-values__forecast">
          <small>Forecast</small>
          <strong>{productData.forecast[productData.forecast.length - 1]}</strong>
        </div>
        <div>
          <small>High</small>
          <strong>{productData.high[productData.high.length - 1]}</strong>
        </div>
      </div>

      <div className="range-warning">{productData.coverageWarning}</div>
    </div>
  )
}

export default ForecastRange

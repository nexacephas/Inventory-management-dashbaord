import './DemandTrendChart.css'

function DemandTrendChart({ data, title = 'Demand trend snapshot', subtitle = 'Illustrative monthly activity' }) {
  const maxValue = Math.max(...data.map((item) => item.sales || item.grossMargin || 0))

  return (
    <div className="card chart-card">
      <div className="card__header">
        <div>
          <h3>{title}</h3>
          <p>{subtitle}</p>
        </div>
      </div>

      <div className="mini-bars" aria-label={title}>
        {data.map((item) => (
          <div className="mini-bars__item" key={item.period || item.product || item.label}>
            <div
              className="mini-bars__bar"
              style={{ height: `${(item.sales / maxValue) * 100}%` }}
              title={`${item.period || item.product || item.label}: ${item.sales}`}
            />
            <small>{item.period || item.product || item.label}</small>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DemandTrendChart

import './AnomalyAlert.css'

function AnomalyAlert({ alerts }) {
  return (
    <div className="card alert-card">
      <div className="card__header">
        <div>
          <h3>Threshold attention</h3>
          <p>Direct checks against sample reorder points</p>
        </div>
      </div>

      <ul className="alert-list">
        {alerts.map((alert) => (
          <li key={alert.title}>
            <span className="alert-list__dot" />
            <div>
              <strong>{alert.title}</strong>
              <p>{alert.message}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AnomalyAlert

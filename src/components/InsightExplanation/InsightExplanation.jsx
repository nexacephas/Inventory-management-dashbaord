import './InsightExplanation.css'

function InsightExplanation({ title, items }) {
  return (
    <div className="card explanation-card">
      <div className="card__header">
        <div>
          <h3>{title}</h3>
          <p>Safe interpretation of available data</p>
        </div>
      </div>

      <ul className="bullet-list">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

export default InsightExplanation

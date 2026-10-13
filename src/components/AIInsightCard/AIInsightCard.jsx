import './AIInsightCard.css'

function AIInsightCard({ title, value, change, tone = 'neutral', note }) {
  return (
    <div className={`insight-card tone-${tone}`}>
      <div className="insight-card__label">{title}</div>
      <div className="insight-card__value">{value}</div>
      <div className="insight-card__change">{change}</div>
      <small>{note}</small>
    </div>
  )
}

export default AIInsightCard

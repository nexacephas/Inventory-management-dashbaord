import './InventoryHealthScore.css'

function InventoryHealthScore({ score }) {
  const safeScore = Math.min(100, Math.max(0, score || 0))

  return (
    <div className="card score-card">
      <div className="score-ring" style={{ background: `conic-gradient(#1ea97c ${safeScore * 3.6}deg, #edf2f7 0deg)` }}>
        <div className="score-ring__inner">
          <strong>{safeScore}</strong>
          <small>/100</small>
        </div>
      </div>
      <div className="score-copy">
        <h3>Inventory health</h3>
        <p>{safeScore >= 80 ? 'Healthy' : safeScore >= 65 ? 'Stable' : 'Needs attention'}</p>
      </div>
    </div>
  )
}

export default InventoryHealthScore

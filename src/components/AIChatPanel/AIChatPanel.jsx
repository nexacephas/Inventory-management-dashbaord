import { CircleOff, Sparkles } from 'lucide-react'
import './AIChatPanel.css'

function AIChatPanel({ statusText }) {
  return (
    <div className="card chat-card">
      <div className="card__header">
        <div>
          <h2>Inventory assistant</h2>
          <p>Unavailable until an authorized AI service is connected</p>
        </div>
      </div>

      <div className="chat-unavailable" role="status">
        <span className="chat-unavailable__icon"><Sparkles size={20} /></span>
        <div><strong><CircleOff size={15} /> Assistant not connected</strong><p>{statusText}</p></div>
      </div>

      <div className="chat-compose">
        <input type="text" placeholder="Connect an AI service to enable prompts" disabled />
        <button type="button" className="primary-button" disabled>Unavailable</button>
      </div>
    </div>
  )
}

export default AIChatPanel

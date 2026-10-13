import AIChatPanel from '../../components/AIChatPanel/AIChatPanel.jsx'
import { aiStatus } from '../../data/aiInventory.js'
import './AIChatPage.css'

function AIChatPage() {
  return (
    <div className="page-stack ai-chat-page">
      <div className="page-banner">
        <div>
          <p className="eyebrow">AI ASSISTANT</p>
          <h1>Connection status</h1>
        </div>
      </div>

      <div className="notice-box">
        <strong>AI service unavailable.</strong> {aiStatus.source} Prompts and responses are disabled until an authorized model endpoint is connected.
      </div>

      <AIChatPanel
        statusText={aiStatus.source}
      />
    </div>
  )
}

export default AIChatPage

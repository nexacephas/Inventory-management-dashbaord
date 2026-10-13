import './ComingSoonPage.css'

function ComingSoonPage({ title, description }) {
  return (
    <div className="page-shell coming-soon-page">
      <section className="panel panel--coming-soon">
        <p className="eyebrow">Implementation status</p>
        <h1>{title || 'Feature coming soon'}</h1>
        <p className="muted-text">
          {description ||
            'This module is planned for the next delivery phase. The frontend is ready to connect to the corresponding authenticated backend endpoints when available.'}
        </p>
        <div className="notice-box notice-box--soft">
          <strong>Note:</strong> This is a safe placeholder UI and does not perform inventory mutations or claim live AI analysis.
        </div>
      </section>
    </div>
  )
}

export default ComingSoonPage

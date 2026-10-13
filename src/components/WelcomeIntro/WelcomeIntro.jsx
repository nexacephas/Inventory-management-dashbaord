import { ArrowRight, Check, CircleGauge, PackageCheck, Sparkles } from 'lucide-react'
import './WelcomeIntro.css'

function WelcomeIntro({ user, onContinue }) {
  const firstName = user?.name?.trim().split(/\s+/)[0] || 'there'

  return (
    <main className="welcome-intro">
      <header className="welcome-intro__brand"><span className="welcome-intro__mark">KS</span><span><strong>KEPHAS</strong><small>BUILDSTOCK</small></span><span className="welcome-intro__demo">DEMO WORKSPACE</span></header>
      <section className="welcome-intro__body">
        <div className="welcome-intro__copy">
          <p className="welcome-intro__eyebrow"><Sparkles size={15} /> YOUR OPERATIONS, IN GOOD ORDER</p>
          <h1>Welcome in,<br /><em>{firstName}.</em></h1>
          <p className="welcome-intro__lead">Your materials operation has a new command center. Get oriented, then step into BuildStock.</p>
          <button type="button" className="welcome-intro__cta" onClick={onContinue}>Enter your workspace <ArrowRight size={17} /></button>
          <p className="welcome-intro__note"><Check size={14} /> Demo access is local to this browser. No backend connection is active.</p>
        </div>
        <div className="welcome-intro__art" aria-label="BuildStock workspace preview">
          <div className="intro-window">
            <div className="intro-window__top"><span /><span /><span /><small>BUILDSTOCK / OVERVIEW</small></div>
            <div className="intro-window__content">
              <div className="intro-window__heading"><span>Operations overview</span><i>THIS WEEK</i></div>
              <div className="intro-window__metrics"><div><small>INVENTORY VALUE</small><strong>₦ 14.8M</strong><span>Demo value</span></div><div><small>PRODUCTS</small><strong>428</strong><span>12 categories</span></div></div>
              <div className="intro-window__chart"><div className="intro-window__chart-label"><CircleGauge size={15} /> Sales &amp; demand</div><div className="intro-window__bars">{[35, 56, 48, 76, 62, 88, 69, 94].map((height, index) => <span key={index} style={{ height: `${height}%` }} />)}</div><div className="intro-window__chart-axis"><span>JAN</span><span>MAR</span><span>MAY</span><span>JUL</span></div></div>
              <div className="intro-window__inventory"><PackageCheck size={15} /><span>Materials ready for review</span><i>OPEN</i></div>
            </div>
          </div>
          <div className="welcome-intro__stamp"><Sparkles size={15} /><span>BUILT FOR<br />MATERIALS FLOW</span></div>
        </div>
      </section>
      <footer className="welcome-intro__footer"><span>KEPHAS BUILDSTOCK</span><span>CONTROL THE FLOW. BUILD WITH CONFIDENCE.</span></footer>
    </main>
  )
}

export default WelcomeIntro
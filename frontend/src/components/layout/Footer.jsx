import { Link } from 'react-router-dom'
import { CATEGORIES } from '../../data/schemes'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <div className="footer__logo">
            <span className="footer__logo-icon">🏛️</span>
            <span>Citizen<strong>AI</strong></span>
          </div>
          <p className="footer__tagline">
            Connecting every Indian citizen with the government benefits they deserve. Free, open, and always available.
          </p>
        </div>

        <div className="footer__links">
          <div className="footer__col">
            <h4>Categories</h4>
            {CATEGORIES.slice(0, 4).map(cat => (
              <Link key={cat.id} to={cat.path}>{cat.icon} {cat.label}</Link>
            ))}
          </div>
          <div className="footer__col">
            <h4>More</h4>
            {CATEGORIES.slice(4).map(cat => (
              <Link key={cat.id} to={cat.path}>{cat.icon} {cat.label}</Link>
            ))}
          </div>
          <div className="footer__col">
            <h4>Platform</h4>
            <Link to="/">Home</Link>
            <Link to="/eligibility-checker">Eligibility Checker</Link>
            <Link to="/about">About Us</Link>
            <a href="https://india.gov.in" target="_blank" rel="noreferrer">Official India Portal ↗</a>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <p>© {new Date().getFullYear()} Citizen AI &nbsp;·&nbsp; Built for every Indian &nbsp;·&nbsp; All scheme links redirect to official government portals</p>
      </div>
    </footer>
  )
}

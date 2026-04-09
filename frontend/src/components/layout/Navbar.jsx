import { useState } from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { useChat } from '../../context/ChatContext'
import { useAuth } from '../../context/AuthContext'
import './Navbar.css'

const NAV_LINKS = [
  { to: '/',                    label: 'Home'                },
  { to: '/eligibility-checker', label: 'Eligibility Checker' },
  { to: '/about',               label: 'About'               },
]

export default function Navbar() {
  const { openChat }               = useChat()
  const { user, logout, isLoggedIn } = useAuth()
  const [menuOpen, setMenuOpen]    = useState(false)
  const navigate  = useNavigate()
  const location  = useLocation()

  // Hide navbar on login page
  if (location.pathname === '/login') return null

  const avatarIsImg = user?.avatar?.startsWith('http')

  return (
    <header className="navbar">
      <div className="navbar__inner">

        {/* Logo */}
        <button className="navbar__logo" onClick={() => navigate('/')}>
          <img src="/logoo.png" alt="CitizenAI" className="navbar__logo-img" />
        </button>

        {/* Desktop Links */}
        <nav className="navbar__links">
          {NAV_LINKS.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `navbar__link ${isActive ? 'navbar__link--active' : ''}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Actions */}
        <div className="navbar__actions">
          {isLoggedIn ? (
            <div
              className="navbar__user"
              onClick={() => navigate('/profile')}
              style={{ cursor: 'pointer' }}
              title="View Profile"
            >
              {/* Avatar */}
              {avatarIsImg ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="navbar__user-avatar navbar__user-avatar--img"
                />
              ) : (
                <div className="navbar__user-avatar">
                  {user?.avatar || user?.name?.[0]?.toUpperCase()}
                </div>
              )}

              {/* Username */}
              <span className="navbar__user-name">{user.name}</span>

              {/* Logout */}
              <button
                className="navbar__logout-btn"
                onClick={e => {
                  e.stopPropagation()
                  logout()
                  navigate('/')
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              className="navbar__login-btn"
              onClick={() => navigate('/login')}
            >
              Login
            </button>
          )}

          {/* Hamburger */}
          <button
            className={`navbar__hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(prev => !prev)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="navbar__mobile">
          {NAV_LINKS.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `navbar__mobile-link ${isActive ? 'active' : ''}`
              }
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}

          {isLoggedIn ? (
            <>
              <button
                className="navbar__login-btn"
                onClick={() => { navigate('/profile'); setMenuOpen(false) }}
              >
                👤 My Profile
              </button>
              <button
                className="navbar__logout-btn"
                onClick={() => { logout(); navigate('/'); setMenuOpen(false) }}
              >
                Logout
              </button>
            </>
          ) : (
            <button
              className="navbar__login-btn"
              onClick={() => { navigate('/login'); setMenuOpen(false) }}
            >
              Login
            </button>
          )}
        </div>
      )}
    </header>
  )
}
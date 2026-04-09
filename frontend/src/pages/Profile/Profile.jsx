import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useApi } from '../../hooks/useAPI'
import './Profile.css'

export default function Profile() {

  const { user, logout, isLoggedIn } = useAuth()
  const { get, del, put } = useApi()
  const navigate = useNavigate()

  const [tab, setTab] = useState('saved')
  const [savedSchemes, setSavedSchemes] = useState([])
  const [chatHistory, setChatHistory] = useState([])
  const [profile, setProfile] = useState({
    age: '',
    state: '',
    occupation: '',
    income: '',
    category: ''
  })

  const [loadingSaved, setLoadingSaved] = useState(true)
  const [loadingChat, setLoadingChat] = useState(true)
  const [saveMsg, setSaveMsg] = useState('')

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login')
      return
    }

    fetchSaved()
    fetchHistory()

    if (user?.profile) setProfile(user.profile)

  }, [isLoggedIn])

  const fetchSaved = async () => {
    setLoadingSaved(true)
    try {
      const data = await get('/api/user/saved')
      if (data.success) setSavedSchemes(data.savedSchemes)
    } finally {
      setLoadingSaved(false)
    }
  }

  const fetchHistory = async () => {
    setLoadingChat(true)
    try {
      const data = await get('/api/user/history')
      if (data.success) setChatHistory(data.chatHistory)
    } finally {
      setLoadingChat(false)
    }
  }

  const handleRemove = async (schemeId) => {
    const data = await del(`/api/user/saved/${schemeId}`)
    if (data.success) setSavedSchemes(data.savedSchemes)
  }

  const handleProfileSave = async () => {
    const data = await put('/api/user/profile', profile)

    if (data.success) {
      setSaveMsg('Profile updated successfully!')
      setTimeout(() => setSaveMsg(''), 2000)
    }
  }

  const avatar = user?.avatar || user?.name?.[0]?.toUpperCase() || 'U'
  const isImgAvatar = avatar?.startsWith('http')

  return (
    <div className="profile-page">

      {/* ───── HERO CARD ───── */}

      <div className="profile-hero">

        <div className="profile-avatar">
          {isImgAvatar
            ? <img src={avatar} alt={user?.name} />
            : <span>{avatar}</span>}
        </div>

        <div className="profile-info">
          <h1 className="profile-name">{user?.name}</h1>
          <p className="profile-email">{user?.email}</p>

          {user?.isAdmin &&
            <span className="profile-admin-badge">Admin</span>}
        </div>

        <button
          className="profile-logout"
          onClick={() => { logout(); navigate('/') }}
        >
          Logout
        </button>

      </div>


      {/* ───── STATS ROW ───── */}

      <div className="profile-stats">

        <div className="stat-card">
          <h3>{savedSchemes.length}</h3>
          <p>Saved Schemes</p>
        </div>

        <div className="stat-card">
          <h3>{chatHistory.length}</h3>
          <p>AI Chats</p>
        </div>

        <div className="stat-card">
          <h3>{user?.profile?.state ? "✓" : "-"}</h3>
          <p>Profile Setup</p>
        </div>

      </div>


      {/* ───── TABS ───── */}

      <div className="profile-tabs">

        {['saved', 'history', 'settings'].map(t => (

          <button
            key={t}
            className={`profile-tab ${tab === t ? 'profile-tab--active' : ''}`}
            onClick={() => setTab(t)}
          >

            {t === 'saved' && '🔖 Saved Schemes'}
            {t === 'history' && '💬 Chat History'}
            {t === 'settings' && '⚙️ My Profile'}

          </button>

        ))}

      </div>


      {/* ───── SAVED SCHEMES ───── */}

      {tab === 'saved' && (

        <div className="profile-section">

          <h2 className="profile-section-title">
            Saved Schemes ({savedSchemes.length})
          </h2>

          {loadingSaved ? (

            <p className="profile-loading">Loading...</p>

          ) : savedSchemes.length === 0 ? (

            <div className="profile-empty">

              <p>No saved schemes yet.</p>

              <button
                className="profile-cta"
                onClick={() => navigate('/')}
              >
                Browse Schemes
              </button>

            </div>

          ) : (

            <div className="scheme-grid">

              {savedSchemes.map(s => (

                <div
  key={s.schemeId}
  className="scheme-card"
  style={{ cursor: "pointer" }}
  onClick={() =>
    navigate(`/${s.category}`, {
      state: { schemeId: s.schemeId }
    })
  }
>

                  <h3 className="profile-saved-name">
                    {s.schemeName}
                  </h3>

                  <span className="profile-saved-cat">
                    {s.category}
                  </span>

                  <span className="profile-saved-date">
                    Saved on {new Date(s.savedAt).toLocaleDateString('en-IN')}
                  </span>

                  <button
  className="profile-remove"
  onClick={(e) => {
    e.stopPropagation()
    handleRemove(s.schemeId)
  }}
>
                    Remove
                  </button>

                </div>

              ))}

            </div>

          )}

        </div>

      )}


      {/* ───── CHAT HISTORY ───── */}

      {tab === 'history' && (

        <div className="profile-section">

          <h2 className="profile-section-title">
            Recent Chat History
          </h2>

          {loadingChat ? (

            <p className="profile-loading">Loading...</p>

          ) : chatHistory.length === 0 ? (

            <div className="profile-empty">

              <p>No chat history yet.</p>

              <button
                className="profile-cta"
                onClick={() => navigate('/')}
              >
                Start Chatting
              </button>

            </div>

          ) : (

            <div className="profile-chat-list">

              {chatHistory.slice().reverse().map((msg, i) => (

                <div
                  key={i}
                  className={`profile-chat-msg profile-chat-msg--${msg.role}`}
                >

                  <span className="profile-chat-role">
                    {msg.role === 'user'
                      ? '👤 You'
                      : '🏛️ Citizen AI'}
                  </span>

                  <p className="profile-chat-content">
                    {msg.content}
                  </p>

                  <span className="profile-chat-time">
                    {new Date(msg.createdAt).toLocaleString('en-IN')}
                  </span>

                </div>

              ))}

            </div>

          )}

        </div>

      )}


      {/* ───── SETTINGS ───── */}

      {tab === 'settings' && (

        <div className="profile-section">

          <h2 className="profile-section-title">
            My Profile Details
          </h2>

          <p className="profile-section-sub">
            Fill this to get personalised scheme recommendations
          </p>

          <div className="profile-form">

            <div className="profile-field">
              <label>Age</label>

              <input
                type="number"
                placeholder="e.g. 22"
                value={profile.age}
                onChange={e =>
                  setProfile(p => ({ ...p, age: e.target.value }))
                }
              />

            </div>


            <div className="profile-field">
              <label>State</label>

              <input
                type="text"
                placeholder="e.g. Karnataka"
                value={profile.state}
                onChange={e =>
                  setProfile(p => ({ ...p, state: e.target.value }))
                }
              />

            </div>


            <div className="profile-field">
              <label>Occupation</label>

              <select
                value={profile.occupation}
                onChange={e =>
                  setProfile(p => ({ ...p, occupation: e.target.value }))
                }
              >

                <option value="">Select occupation</option>
                <option value="student">Student</option>
                <option value="farmer">Farmer</option>
                <option value="employed">Employed</option>
                <option value="selfemployed">Self Employed</option>
                <option value="unemployed">Unemployed</option>
                <option value="homemaker">Homemaker</option>
                <option value="retired">Retired</option>

              </select>

            </div>


            <div className="profile-field">

              <label>Annual Income (₹)</label>

              <input
                type="number"
                placeholder="e.g. 250000"
                value={profile.income}
                onChange={e =>
                  setProfile(p => ({ ...p, income: e.target.value }))
                }
              />

            </div>


            <div className="profile-field">

              <label>Category</label>

              <select
                value={profile.category}
                onChange={e =>
                  setProfile(p => ({ ...p, category: e.target.value }))
                }
              >

                <option value="">Select category</option>
                <option value="general">General</option>
                <option value="sc">SC</option>
                <option value="st">ST</option>
                <option value="obc">OBC</option>
                <option value="minority">Minority</option>
                <option value="ews">EWS</option>

              </select>

            </div>

          </div>

          {saveMsg &&
            <p className="profile-save-msg">{saveMsg}</p>
          }

          <button
            className="profile-save-btn"
            onClick={handleProfileSave}
          >
            Save Profile
          </button>

        </div>

      )}

    </div>
  )
}
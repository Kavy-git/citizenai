import { useState } from 'react'
import './SchemeCard.css'

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'

export default function SchemeCard({ scheme }) {
  const [saved, setSaved] = useState(false)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  const name = scheme.name
  const benefit = scheme.benefit
  const eligibility = scheme.eligibility
  const deadline = scheme.deadline
  const link = scheme.link
  const state = scheme.state
  const ministry = scheme.ministry
  const documents = scheme.documents
  const tags = scheme.tags
  const id = scheme.id

  const deadlineSoon = deadline !== 'Ongoing' && deadline !== 'Rolling' && deadline !== 'Seasonal'

  function handleSave() {
    const token = localStorage.getItem('citizen_ai_token')
    if (!token) { setMsg('Login to save!'); setTimeout(function() { setMsg('') }, 2000); return }
    if (saved) return
    setSaving(true)
    fetch(BACKEND + '/api/user/saved', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
      body: JSON.stringify({ schemeId: id || name, schemeName: name, category: (tags && tags[0]) ? tags[0] : '' })
    })
    .then(function(res) { return res.json() })
    .then(function(data) {
      if (data.success) { setSaved(true); setMsg('Saved!') } else { setMsg('Could not save') }
      setTimeout(function() { setMsg('') }, 2000)
    })
    .catch(function() { setMsg('Error saving'); setTimeout(function() { setMsg('') }, 2000) })
    .finally(function() { setSaving(false) })
  }

  const buttonClass = saved ? 'scheme-card__save scheme-card__save--saved' : 'scheme-card__save'
  const deadlineClass = deadlineSoon ? 'badge badge--orange' : 'badge badge--blue'

  return (
    <article className="scheme-card">
      <div className="scheme-card__header">
        <h3 className="scheme-card__name">{name}</h3>
        <div className="scheme-card__badges">
          <span className="badge badge--green">{benefit}</span>
          <span className={deadlineClass}>{deadline}</span>
          <span className="badge badge--purple">{state}</span>
        </div>
      </div>

      <p className="scheme-card__eligibility">
        <span className="scheme-card__check">&#10004;</span>
        <span>{eligibility}</span>
      </p>

      {ministry ? <p className="scheme-card__ministry">{ministry}</p> : null}

      {documents ? (
        <div className="scheme-card__docs">
          <span className="scheme-card__docs-label">Documents needed:</span>
          {documents.map(function(doc) { return <span key={doc} className="badge badge--subtle">{doc}</span> })}
        </div>
      ) : null}

      <div className="scheme-card__footer">
        {tags ? (
          <div className="scheme-card__tags">
            {tags.slice(0, 3).map(function(tag) { return <span key={tag} className="scheme-card__tag">#{tag}</span> })}
          </div>
        ) : null}

        <div className="scheme-card__actions">
          <button className={buttonClass} onClick={handleSave} disabled={saving || saved}>
            {saving ? '...' : saved ? 'Saved' : 'Save'}
          </button>

          {msg ? <span className="scheme-card__save-msg">{msg}</span> : null}

          <a href={link} target="_blank" rel="noopener noreferrer" className="btn btn--primary btn--sm">
            Apply Now
          </a>
        </div>
      </div>
    </article>
  )
}
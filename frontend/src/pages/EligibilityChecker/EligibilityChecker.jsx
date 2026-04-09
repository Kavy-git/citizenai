import { useState } from 'react'
import { STATES } from '../../data/schemes'
import SchemeCard from '../../components/common/SchemeCard'
import EmptyState from '../../components/common/EmptyState'
import { useChat } from '../../context/ChatContext'
import './EligibilityChecker.css'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'

const FORM_FIELDS = {
  age:    { label: 'Your Age',          type: 'number', placeholder: 'e.g. 22' },
  income: { label: 'Annual Income (₹)', type: 'number', placeholder: 'e.g. 150000' },
}

const SELECT_FIELDS = [
  {
    key: 'gender',
    label: 'Gender',
    options: [['', 'Select gender'], ['male', 'Male'], ['female', 'Female'], ['other', 'Other']],
  },
  {
    key: 'occupation',
    label: 'Occupation',
    options: [
      ['', 'Select occupation'],
      ['student',      'Student'],
      ['farmer',       'Farmer'],
      ['unemployed',   'Job Seeker'],
      ['business',     'Entrepreneur / Business Owner'],
      ['employed',     'Salaried Employee'],
      ['selfemployed', 'Self Employed'],
      ['homemaker',    'Homemaker'],
      ['retired',      'Retired'],
    ],
  },
  {
    key: 'education',
    label: 'Education',
    options: [
      ['', 'Select education'],
      ['below10', 'Below 10th'],
      ['10th',    '10th Pass'],
      ['12th',    '12th Pass'],
      ['iti',     'ITI / Diploma'],
      ['grad',    'Graduate'],
      ['pg',      'Post Graduate'],
    ],
  },
]

export default function EligibilityChecker() {
  const [form, setForm] = useState({
    age: '', income: '', gender: '', occupation: '', education: '', state: '',
  })
  const [results, setResults]   = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')
  const { openChat } = useChat()

  const update = (key, val) => setForm(f => ({ ...f, [key]: val }))

  const handleCheck = async () => {
    if (!form.age && !form.occupation && !form.gender) return
    setLoading(true)
    setError('')

    try {
      const response = await fetch(`${BACKEND_URL}/api/schemes/eligibility`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          age:        form.age,
          income:     form.income,
          gender:     form.gender,
          occupation: form.occupation,
          education:  form.education,
          state:      form.state,
        }),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to fetch schemes')
      }

      setResults(data.data)
      setSubmitted(true)
    } catch (err) {
      setError(err.message || 'Could not connect to server. Make sure backend is running.')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setForm({ age: '', income: '', gender: '', occupation: '', education: '', state: '' })
    setResults(null)
    setSubmitted(false)
    setError('')
  }

  return (
    <div className="ec page-container--narrow animate-fadeIn">
      <div className="ec__header">
        <h1 className="ec__title">🔍 Eligibility Checker</h1>
        <p className="ec__subtitle">
          Fill in your details below. We will instantly show you all government schemes you may qualify for.
        </p>
      </div>

      {!submitted ? (
        <div className="ec__form">

  <div className="ec__grid">

    {/* AGE */}
    <div className="ec__card">
      <label className="ec__label">🎂 {FORM_FIELDS.age.label}</label>
      <input
        className="ec__input"
        type={FORM_FIELDS.age.type}
        placeholder={FORM_FIELDS.age.placeholder}
        value={form.age}
        onChange={e => update('age', e.target.value)}
        min={0}
      />
    </div>

    {/* INCOME */}
    <div className="ec__card">
      <label className="ec__label">💰 {FORM_FIELDS.income.label}</label>
      <input
        className="ec__input"
        type={FORM_FIELDS.income.type}
        placeholder={FORM_FIELDS.income.placeholder}
        value={form.income}
        onChange={e => update('income', e.target.value)}
        min={0}
      />
    </div>

    {/* GENDER */}
    <div className="ec__card">
      <label className="ec__label">👤 Gender</label>
      <select
        className="ec__select"
        value={form.gender}
        onChange={e => update('gender', e.target.value)}
      >
        {SELECT_FIELDS[0].options.map(([v,l]) => (
          <option key={v} value={v}>{l}</option>
        ))}
      </select>
    </div>

    {/* OCCUPATION */}
    <div className="ec__card">
      <label className="ec__label">💼 Occupation</label>
      <select
        className="ec__select"
        value={form.occupation}
        onChange={e => update('occupation', e.target.value)}
      >
        {SELECT_FIELDS[1].options.map(([v,l]) => (
          <option key={v} value={v}>{l}</option>
        ))}
      </select>
    </div>

    {/* EDUCATION */}
    <div className="ec__card">
      <label className="ec__label">🎓 Education</label>
      <select
        className="ec__select"
        value={form.education}
        onChange={e => update('education', e.target.value)}
      >
        {SELECT_FIELDS[2].options.map(([v,l]) => (
          <option key={v} value={v}>{l}</option>
        ))}
      </select>
    </div>

    {/* STATE */}
    <div className="ec__card">
      <label className="ec__label">📍 State / UT</label>
      <select
        className="ec__select"
        value={form.state}
        onChange={e => update('state', e.target.value)}
      >
        {STATES.map(s => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
    </div>

  </div>

  {/* ERROR */}
  {error && (
    <div className="ec__error">
      ⚠️ {error}
    </div>
  )}

  <button
    className="btn btn--primary btn--lg btn--full"
    onClick={handleCheck}
    disabled={loading || (!form.age && !form.occupation && !form.gender)}
  >
    {loading ? '⏳ Checking...' : '🔍 Find My Schemes →'}
  </button>

  <p className="ec__note">
    🔒 Your data is never stored. It is only used to match schemes for you.
  </p>

</div>

      ) : (
        <div className="ec__results animate-fadeIn">
          <div className="ec__results-header">
            <div className="ec__results-count">
              <strong>{results.length}</strong>
              <span>schemes matched your profile</span>
            </div>
            <div className="ec__results-actions">
              <button className="btn btn--ghost btn--sm" onClick={handleReset}>← Edit Profile</button>
              <button className="btn btn--outline btn--sm" onClick={openChat}>Ask AI for More</button>
            </div>
          </div>

          {results.length > 0 ? (
            <div className="grid-schemes">
              {results.map(scheme => (
                <SchemeCard key={scheme.id} scheme={scheme} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No exact matches found"
              message="Try the AI chatbot for more personalised suggestions based on your unique situation."
            />
          )}

          <div className="ec__ai-tip">
            <span>💡</span>
            <p>
              For more specific schemes not listed here, chat with <strong>Citizen AI</strong> — describe
              your situation in your own words.
            </p>
            <button className="btn btn--primary btn--sm" onClick={openChat}>Chat Now</button>
          </div>
        </div>
      )}
    </div>
  )
}
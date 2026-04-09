// Helper — makes authenticated API calls with JWT token
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'

export function useApi() {
  const token = localStorage.getItem('citizen_ai_token')

  const authHeaders = {
    'Content-Type':  'application/json',
    'Authorization': `Bearer ${token}`,
  }

  const get = async (path) => {
    const res  = await fetch(`${BACKEND_URL}${path}`, { headers: authHeaders })
    return res.json()
  }

  const post = async (path, body) => {
    const res  = await fetch(`${BACKEND_URL}${path}`, {
      method:  'POST',
      headers: authHeaders,
      body:    JSON.stringify(body),
    })
    return res.json()
  }

  const put = async (path, body) => {
    const res  = await fetch(`${BACKEND_URL}${path}`, {
      method:  'PUT',
      headers: authHeaders,
      body:    JSON.stringify(body),
    })
    return res.json()
  }

  const del = async (path) => {
    const res  = await fetch(`${BACKEND_URL}${path}`, {
      method:  'DELETE',
      headers: authHeaders,
    })
    return res.json()
  }

  return { get, post, put, del }
}
import React, { useState } from 'react'

const API_BASE = '/api'

const FLOW_DESCRIPTIONS = {
  'login-user': 'Log in an existing user or create a new user workspace.',
  'delete-user': 'Delete a user and their associated workspace.',
  'set-user-credit-limit': 'Set a user\'s credit usage limit for the current billing cycle.',
}

async function apiPost(path, body) {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    const data = await res.json()
    if (!res.ok) {
      return { error: data.error || `HTTP ${res.status}` }
    }
    return data
  } catch (err) {
    return { error: err.message || 'Network error' }
  }
}

export default function UserManagement({ flowKey }) {
  return (
    <div className="user-management">
      <div className="user-card">
        <p className="flow-description">{FLOW_DESCRIPTIONS[flowKey]}</p>
      </div>

      {flowKey === 'login-user' && <LoginUserForm />}
      {flowKey === 'delete-user' && <DeleteUserForm />}
      {flowKey === 'set-user-credit-limit' && <SetCreditLimitForm />}
    </div>
  )
}

function LoginUserForm() {
  const [abstractUserId, setAbstractUserId] = useState('')
  const [planId, setPlanId] = useState('')
  const [brandName, setBrandName] = useState('')
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!abstractUserId.trim()) return
    setLoading(true)
    const payload = { abstractUserId: abstractUserId.trim() }
    if (planId.trim()) payload.planId = planId.trim()
    if (brandName.trim()) payload.brand = { brandName: brandName.trim() }
    const data = await apiPost('/login-sivi', payload)
    setResponse(data)
    setLoading(false)
  }

  return (
    <div className="user-card">
      <h3>Login / Create User</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label>Abstract User ID *</label>
          <input value={abstractUserId} onChange={(e) => setAbstractUserId(e.target.value)} placeholder="e.g. user-12345" required />
        </div>
        <div className="form-field">
          <label>Plan ID</label>
          <input value={planId} onChange={(e) => setPlanId(e.target.value)} placeholder="e.g. sp-01" />
        </div>
        <div className="form-field">
          <label>Brand Name</label>
          <input value={brandName} onChange={(e) => setBrandName(e.target.value)} placeholder="e.g. my-brand" />
        </div>
        <button type="submit" className="submit-button" disabled={loading}>{loading ? 'Loading...' : 'Login / Create User'}</button>
      </form>
      {response && (
        <pre className={response.error ? 'response-box error' : 'response-box'}>
          {JSON.stringify(response, null, 2)}
        </pre>
      )}
    </div>
  )
}

function DeleteUserForm() {
  const [abstractUserId, setAbstractUserId] = useState('')
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!abstractUserId.trim()) return
    setLoading(true)
    const data = await apiPost('/delete-sivi-user', { abstractUserId: abstractUserId.trim() })
    setResponse(data)
    setLoading(false)
  }

  return (
    <div className="user-card">
      <h3>Delete User</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label>Abstract User ID *</label>
          <input value={abstractUserId} onChange={(e) => setAbstractUserId(e.target.value)} placeholder="e.g. user-12345" required />
        </div>
        <button type="submit" className="submit-button" disabled={loading}>{loading ? 'Loading...' : 'Delete User'}</button>
      </form>
      {response && (
        <pre className={response.error ? 'response-box error' : 'response-box'}>
          {JSON.stringify(response, null, 2)}
        </pre>
      )}
    </div>
  )
}

function SetCreditLimitForm() {
  const [abstractUserId, setAbstractUserId] = useState('')
  const [creditLimit, setCreditLimit] = useState('')
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!abstractUserId.trim() || creditLimit === '') return
    setLoading(true)
    const data = await apiPost('/set-credit-limit', { abstractUserId: abstractUserId.trim(), creditLimit: Number(creditLimit) })
    setResponse(data)
    setLoading(false)
  }

  return (
    <div className="user-card">
      <h3>Set User Credit Limit</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label>Abstract User ID *</label>
          <input value={abstractUserId} onChange={(e) => setAbstractUserId(e.target.value)} placeholder="e.g. user-12345" required />
        </div>
        <div className="form-field">
          <label>Credit Limit *</label>
          <input type="number" value={creditLimit} onChange={(e) => setCreditLimit(e.target.value)} placeholder="e.g. -1 for unlimited, 100" required />
        </div>
        <button type="submit" className="submit-button" disabled={loading}>{loading ? 'Loading...' : 'Set Credit Limit'}</button>
      </form>
      {response && (
        <pre className={response.error ? 'response-box error' : 'response-box'}>
          {JSON.stringify(response, null, 2)}
        </pre>
      )}
    </div>
  )
}

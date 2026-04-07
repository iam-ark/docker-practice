import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchMessage = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/hello')
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`)
      }
      const data = await response.json()
      setMessage(data.message)
    } catch (err) {
      setError('Could not connect to backend. Is it running?')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMessage()
  }, [])

  return (
    <div className="app">
      <h1>Docker Practice App</h1>
      <p className="subtitle">Full Stack React + Spring Boot</p>

      <div className="card">
        <h2>Backend Message</h2>
        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}
        {message && <p className="message">{message}</p>}
        <button onClick={fetchMessage} disabled={loading}>
          Fetch from Backend
        </button>
      </div>
    </div>
  )
}

export default App

import { useState } from 'react'
import api from '../api/api'

export default function MessageSuggestions() {
  const [objective, setObjective] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const getSuggestions = async () => {
    const res = await api.post('/campaigns/suggest', { objective })
    setSuggestions(res.data.suggestions)
  }
  return (
    <div>
      <input value={objective} onChange={e => setObjective(e.target.value)} placeholder="Campaign Objective" />
      <button onClick={getSuggestions}>Get Suggestions</button>
      <ul>
        {suggestions.map((s, i) => <li key={i}>{s}</li>)}
      </ul>
    </div>
  )
} 
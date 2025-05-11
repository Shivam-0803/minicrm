import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/api'
import SegmentBuilder from './SegmentBuilder'

export default function CampaignCreate() {
  const { register, handleSubmit, setValue } = useForm()
  const [rules, setRules] = useState({})
  const [audience, setAudience] = useState(null)
  const [suggestions, setSuggestions] = useState([])
  const navigate = useNavigate()

  const onPreview = (r, a) => {
    setRules(r)
    setAudience(a)
  }

  const getSuggestions = async (objective) => {
    const res = await api.post('/campaigns/suggest', { objective })
    setSuggestions(res.data.suggestions)
  }

  const onSubmit = async data => {
    await api.post('/campaigns', {
      name: data.name,
      rules,
      message: data.message,
      createdBy: 'demo-user'
    })
    navigate('/history')
  }

  return (
    <div>
      <h2>Create Campaign</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="Campaign Name" {...register('name')} />
        <SegmentBuilder onPreview={onPreview} />
        <textarea placeholder="Message" {...register('message')} />
        <button type="submit">Create Campaign</button>
      </form>
      <div>
        <input placeholder="Objective for AI Suggestions" onBlur={e => getSuggestions(e.target.value)} />
        {suggestions.map((s, i) => <div key={i}>{s}</div>)}
      </div>
    </div>
  )
} 
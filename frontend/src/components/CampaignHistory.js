import { useEffect, useState } from 'react'
import api from '../api/api'

export default function CampaignHistory() {
  const [campaigns, setCampaigns] = useState([])
  useEffect(() => {
    api.get('/campaigns').then(res => setCampaigns(res.data))
  }, [])
  return (
    <div>
      <h2>Campaign History</h2>
      <ul>
        {campaigns.map(c => (
          <li key={c._id}>
            <b>{c.name}</b> | Audience: {c.audienceSize} | Sent: {c.stats?.sent || 0} | Failed: {c.stats?.failed || 0}
          </li>
        ))}
      </ul>
    </div>
  )
} 
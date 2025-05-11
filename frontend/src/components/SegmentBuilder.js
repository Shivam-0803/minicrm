import { useForm } from 'react-hook-form'
import { useState } from 'react'
import api from '../api/api'
import { TextField, Button, Box, Typography } from '@mui/material'

export default function SegmentBuilder({ onPreview }) {
  const { register, handleSubmit } = useForm()
  const [audience, setAudience] = useState(null)
  const onSubmit = async data => {
    const rules = {
      spend: data.spend ? Number(data.spend) : undefined,
      visits: data.visits ? Number(data.visits) : undefined,
      inactiveDays: data.inactiveDays ? Number(data.inactiveDays) : undefined
    }
    const res = await api.post('/campaigns/preview', { rules })
    setAudience(res.data.audienceSize)
    onPreview && onPreview(rules, res.data.audienceSize)
  }
  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
      <TextField label="Min Spend" {...register('spend')} size="small" />
      <TextField label="Max Visits" {...register('visits')} size="small" />
      <TextField label="Inactive Days" {...register('inactiveDays')} size="small" />
      <Button type="submit" variant="contained" color="primary">Preview Audience</Button>
      {audience !== null && <Typography variant="body2" color="secondary">Audience Size: {audience}</Typography>}
    </Box>
  )
}
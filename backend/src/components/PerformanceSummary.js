export default function PerformanceSummary({ campaign }) {
  if (!campaign) return null
  const { audienceSize, stats } = campaign
  return (
    <div>
      <b>Summary:</b> Your campaign reached {audienceSize} users. {stats?.sent || 0} messages were delivered. {stats?.failed || 0} failed.
    </div>
  )
} 
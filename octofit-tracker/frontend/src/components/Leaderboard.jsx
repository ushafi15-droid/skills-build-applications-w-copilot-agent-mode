import { useCallback } from 'react'
import { API_BASE_URL, readApiRecords } from '../config/api.js'
import ResourceView from './ResourceView.jsx'
import useResourceData from './useResourceData.js'

const columns = [
  { key: 'rank', label: 'Rank' },
  { key: 'user', label: 'Athlete' },
  { key: 'team', label: 'Team' },
  { key: 'points', label: 'Points' },
]

export default function Leaderboard() {
  const loadLeaderboard = useCallback(async (signal) => {
    const response = await fetch(`${API_BASE_URL}/api/leaderboard/`, { signal })
    return readApiRecords(response)
  }, [])
  const { records, isLoading, error } = useResourceData(loadLeaderboard)

  return (
    <ResourceView
      columns={columns}
      description="See how athletes and teams are doing this season."
      error={error}
      isLoading={isLoading}
      records={records}
      title="Leaderboard"
    />
  )
}

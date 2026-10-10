import { useCallback } from 'react'
import { API_BASE_URL, readApiRecords } from '../config/api.js'
import ResourceView from './ResourceView.jsx'
import useResourceData from './useResourceData.js'

const columns = [
  { key: 'activityType', label: 'Activity' },
  { key: 'user', label: 'Athlete' },
  { key: 'team', label: 'Team' },
  { key: 'duration', label: 'Duration (min)' },
  { key: 'distance', label: 'Distance (km)' },
  { key: 'completedAt', label: 'Completed' },
]

export default function Activities() {
  const loadActivities = useCallback(async (signal) => {
    const response = await fetch(`${API_BASE_URL}/api/activities/`, { signal })
    return readApiRecords(response)
  }, [])
  const { records, isLoading, error } = useResourceData(loadActivities)

  return (
    <ResourceView
      columns={columns}
      description="Recent workouts and movement logged by your teams."
      error={error}
      isLoading={isLoading}
      records={records}
      title="Activities"
    />
  )
}

import { useCallback } from 'react'
import { API_BASE_URL, readApiRecords } from '../config/api.js'
import ResourceView from './ResourceView.jsx'
import useResourceData from './useResourceData.js'

const columns = [
  { key: 'name', label: 'Workout' },
  { key: 'description', label: 'Description' },
  { key: 'category', label: 'Category' },
  { key: 'difficulty', label: 'Difficulty' },
]

export default function Workouts() {
  const loadWorkouts = useCallback(async (signal) => {
    const response = await fetch(`${API_BASE_URL}/api/workouts/`, { signal })
    return readApiRecords(response)
  }, [])
  const { records, isLoading, error } = useResourceData(loadWorkouts)

  return (
    <ResourceView
      columns={columns}
      description="Workout ideas to help you reach your goals."
      error={error}
      isLoading={isLoading}
      records={records}
      title="Workouts"
    />
  )
}

import { useCallback } from 'react'
import { API_BASE_URL, readApiRecords } from '../config/api.js'
import ResourceView from './ResourceView.jsx'
import useResourceData from './useResourceData.js'

const columns = [
  { key: 'name', label: 'Team' },
  {
    key: 'members',
    label: 'Members',
    value: (team) => (Array.isArray(team.members) ? team.members.length : 0),
  },
]

export default function Teams() {
  const loadTeams = useCallback(async (signal) => {
    const response = await fetch(`${API_BASE_URL}/api/teams/`, { signal })
    return readApiRecords(response)
  }, [])
  const { records, isLoading, error } = useResourceData(loadTeams)

  return (
    <ResourceView
      columns={columns}
      description="Teams bringing their activity goals to life."
      error={error}
      isLoading={isLoading}
      records={records}
      title="Teams"
    />
  )
}

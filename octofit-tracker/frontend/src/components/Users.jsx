import { useCallback } from 'react'
import { API_BASE_URL, readApiRecords } from '../config/api.js'
import ResourceView from './ResourceView.jsx'
import useResourceData from './useResourceData.js'

const columns = [
  { key: 'displayName', label: 'Name' },
  { key: 'username', label: 'Username' },
  { key: 'email', label: 'Email' },
]

export default function Users() {
  const loadUsers = useCallback(async (signal) => {
    const response = await fetch(`${API_BASE_URL}/api/users/`, { signal })
    return readApiRecords(response)
  }, [])
  const { records, isLoading, error } = useResourceData(loadUsers)

  return (
    <ResourceView
      columns={columns}
      description="Athletes tracking their progress with OctoFit."
      error={error}
      isLoading={isLoading}
      records={records}
      title="Users"
    />
  )
}

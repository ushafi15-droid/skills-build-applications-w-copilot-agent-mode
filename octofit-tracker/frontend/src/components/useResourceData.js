import { useEffect, useState } from 'react'

export default function useResourceData(loadResource) {
  const [state, setState] = useState({
    records: [],
    isLoading: true,
    error: null,
  })

  useEffect(() => {
    const controller = new AbortController()

    loadResource(controller.signal)
      .then((records) => {
        setState({ records, isLoading: false, error: null })
      })
      .catch((error) => {
        if (error.name !== 'AbortError') {
          setState({
            records: [],
            isLoading: false,
            error: error instanceof Error ? error.message : 'Unable to load data',
          })
        }
      })

    return () => controller.abort()
  }, [loadResource])

  return state
}

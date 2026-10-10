const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const validCodespaceName = codespaceName && /^[a-z0-9-]+$/i.test(codespaceName)

export const API_BASE_URL = import.meta.env.DEV
  ? ''
  : validCodespaceName
    ? `https://${validCodespaceName}-8000.app.github.dev`
    : 'http://localhost:8000'

export async function readApiRecords(response) {
  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`)
  }

  const payload = await response.json()
  return extractRecords(payload)
}

function extractRecords(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (payload && typeof payload === 'object') {
    for (const key of ['results', 'data', 'items']) {
      if (key in payload) {
        return extractRecords(payload[key])
      }
    }
  }

  throw new Error('API returned an unsupported resource response')
}

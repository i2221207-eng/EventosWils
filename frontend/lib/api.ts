const API_URL = 'http://localhost:4000/api'

export const apiFetch = async (
  endpoint: string,
  options: RequestInit = {}
) => {
  const token =
    typeof window !== 'undefined'
      ? localStorage.getItem('token')
      : null

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  }

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.message || 'Error en la petición')
  }

  return data
}

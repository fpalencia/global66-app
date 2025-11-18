/**
 * Utilidades para llamadas a la API
 */

/**
 * Obtiene la URL base de la API
 * - En el servidor (SSR): usa localhost
 * - En el cliente: usa el origen de la ventana
 */
export const getApiBaseUrl = (): string => {
  if (process.server) {
    return 'http://localhost:3000'
  }
  
  if (process.client && window) {
    return window.location.origin
  }
  
  return 'http://localhost:3000'
}

/**
 * Hace una petición GET a la API
 */
export const apiGet = async (endpoint: string, params?: Record<string, string>) => {
  const baseUrl = getApiBaseUrl()
  const url = new URL(`${baseUrl}${endpoint}`)
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value)
    })
  }
  
  const response = await fetch(url.toString())
  
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`)
  }
  
  return response.json()
}

/**
 * Hace una petición POST a la API
 */
export const apiPost = async (endpoint: string, data: any) => {
  const baseUrl = getApiBaseUrl()
  const url = `${baseUrl}${endpoint}`
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`)
  }
  
  return response.json()
}


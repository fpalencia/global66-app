/**
 * Utilidades para llamadas a la API
 */

/**
 * Obtiene la URL base de la API
 * - En desarrollo: usa localhost con serverMiddleware (si está disponible)
 * - En producción: usa Netlify Functions
 */
export const getApiBaseUrl = (): string => {
  // En desarrollo local
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000'
  }
  
  // En producción con Netlify Functions
  if (process.client && window) {
    return window.location.origin
  }
  
  // Fallback para SSG en producción
  return process.env.BASE_URL || 'https://appglobal66.netlify.app'
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


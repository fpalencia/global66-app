export interface RatesResponse {
  base: string
  rates: Record<string, number>
  target: string | null
  asOf: string
  success: boolean
}

export interface SubscribeRequest {
  name: string
  email: string
}

export interface SubscribeResponse {
  success: boolean
  message: string
  data: {
    name: string
    email: string
  }
}

/**
 * Interfaz de respuesta de FastForex
 */
export interface FastForexResponse {
  base: string
  result: Record<string, number>
  updated: string
  ms: number
}
import { FastForexResponse } from '@/interfaces'
/**
 * Servicio de FastForex API
 * 
 * Maneja la integración con FastForex para obtener tipos de cambio en tiempo real
 */

const FASTFOREX_API_KEY = process.env.FASTFOREX_API_KEY
const FASTFOREX_BASE_URL = process.env.FASTFOREX_BASE_URL


/**
 * Obtiene el tipo de cambio de una moneda específica desde FastForex
 * 
 * @param from - Moneda base (ej: 'USD')
 * @param to - Moneda objetivo (ej: 'EUR', 'CLP', 'PEN')
 * @returns Tipo de cambio como número
 */
export const getExchangeRate = async (from: string, to: string): Promise<number> => {
  try {
    if (!FASTFOREX_API_KEY) {
      throw new Error('FASTFOREX_API_KEY no está configurado en las variables de entorno')
    }

    const url = `${FASTFOREX_BASE_URL}/fetch-one?from=${from}&to=${to}`
    
    const response = await fetch(url, {
      headers: {
        'X-API-Key': FASTFOREX_API_KEY
      }
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`FastForex API error: ${response.status} - ${errorText}`)
    }

    const data: FastForexResponse = await response.json()
    
    if (!data.result || !data.result[to]) {
      throw new Error(`No se encontró el tipo de cambio para ${to}`)
    }

    return data.result[to]
  } catch (error) {
    console.error('[FastForex] Error al obtener tipo de cambio:', error)
    throw error
  }
}

/**
 * Obtiene múltiples tipos de cambio desde FastForex
 * 
 * @param from - Moneda base (ej: 'USD')
 * @param to - Array de monedas objetivo (ej: ['EUR', 'CLP', 'PEN'])
 * @returns Objeto con los tipos de cambio
 */
export const getMultipleExchangeRates = async (
  from: string,
  to: string[]
): Promise<Record<string, number>> => {
  try {
    if (!FASTFOREX_API_KEY) {
      throw new Error('FASTFOREX_API_KEY no está configurado en las variables de entorno')
    }

    const currencies = to.join(',')
    const url = `${FASTFOREX_BASE_URL}/fetch-multi?from=${from}&to=${currencies}`
    
    const response = await fetch(url, {
      headers: {
        'X-API-Key': FASTFOREX_API_KEY
      }
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`FastForex API error: ${response.status} - ${errorText}`)
    }

    const data: FastForexResponse = await response.json()
    
    if (!data.result) {
      throw new Error('No se encontraron tipos de cambio en la respuesta')
    }

    return data.result
  } catch (error) {
    console.error('[FastForex] Error al obtener tipos de cambio múltiples:', error)
    throw error
  }
}

/**
 * Obtiene todos los tipos de cambio disponibles desde FastForex
 * 
 * @param from - Moneda base (default: 'USD')
 * @returns Objeto con todos los tipos de cambio disponibles
 */
export const getAllExchangeRates = async (from: string = 'USD'): Promise<Record<string, number>> => {
  try {
    if (!FASTFOREX_API_KEY) {
      throw new Error('FASTFOREX_API_KEY no está configurado en las variables de entorno')
    }

    const url = `${FASTFOREX_BASE_URL}/fetch-all?from=${from}`
    
    const response = await fetch(url, {
      headers: {
        'X-API-Key': FASTFOREX_API_KEY
      }
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`FastForex API error: ${response.status} - ${errorText}`)
    }

    const data: FastForexResponse = await response.json()
    
    if (!data.result) {
      throw new Error('No se encontraron tipos de cambio en la respuesta')
    }

    return data.result
  } catch (error) {
    console.error('[FastForex] Error al obtener todos los tipos de cambio:', error)
    throw error
  }
}


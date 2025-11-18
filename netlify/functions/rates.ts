/**
 * Netlify Function: Tipos de Cambio
 * 
 * Endpoint: /.netlify/functions/rates
 * Método: GET
 * 
 * Query params:
 * - base: Moneda base (default: 'USD')
 * - target: Moneda objetivo (opcional)
 */

import { Handler, HandlerEvent, HandlerContext } from '@netlify/functions'

// Tasas de cambio mock
const MOCK_RATES: Readonly<Record<string, number>> = {
  USD: 1.0,
  CLP: 987.62,
  PEN: 3.81,
  ARS: 1025.5,
  BRL: 5.42,
  MXN: 17.15,
  COP: 4125.0,
  EUR: 0.92,
  GBP: 0.79
} as const

const SUPPORTED_CURRENCIES = Object.keys(MOCK_RATES)

// Función para normalizar monedas
const normalizeCurrency = (currency: any): string | null => {
  if (typeof currency !== 'string') return null
  return currency.toUpperCase().trim()
}

// Función para validar moneda soportada
const isSupportedCurrency = (currency: string): boolean => {
  return SUPPORTED_CURRENCIES.includes(currency)
}

export const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  // Solo permitir método GET
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: false,
        error: 'Método no permitido'
      })
    }
  }

  try {
    const queryParams = event.queryStringParameters || {}
    const base = normalizeCurrency(queryParams.base) || 'USD'
    const target = queryParams.target ? normalizeCurrency(queryParams.target) : null

    // Validar moneda base
    if (!isSupportedCurrency(base)) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          success: false,
          error: `Moneda base '${base}' no soportada`,
          supportedCurrencies: SUPPORTED_CURRENCIES
        })
      }
    }

    // Validar moneda target si se proporciona
    if (target && !isSupportedCurrency(target)) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          success: false,
          error: `Moneda objetivo '${target}' no soportada`,
          supportedCurrencies: SUPPORTED_CURRENCIES
        })
      }
    }

    const response = {
      base,
      rates: MOCK_RATES,
      target,
      asOf: new Date().toISOString(),
      success: true
    }

    console.log(`[Rates] Consulta: ${base} -> ${target || 'ALL'}`)

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify(response)
    }
  } catch (error) {
    console.error('[Rates Error]', error)
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido'
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: false,
        error: 'Error al obtener tipos de cambio',
        message: errorMessage
      })
    }
  }
}


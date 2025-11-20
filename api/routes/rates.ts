/**
 * Rutas de Tipos de Cambio
 * 
 * Endpoints relacionados con consultas de tasas de cambio
 */

import { Request, Response, Router } from 'express'
import { RatesResponse } from '../../interfaces'
import { normalizeCurrency, isSupportedCurrency } from '../../utils/format'
import { getExchangeRate, getMultipleExchangeRates, getAllExchangeRates } from '../services/fastForex'

const router = Router()

// Monedas soportadas
const SUPPORTED_CURRENCIES = [
  'USD', 'CLP', 'PEN', 'ARS', 'BRL', 'MXN', 'COP', 'EUR', 'GBP'
] as const

// Tasas de cambio mock (fallback si FastForex falla)
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

/**
 * GET /api/rates
 *
 * Obtiene los tipos de cambio actuales
 *
 * Query params:
 * - base: Moneda base (default: 'USD')
 * - target: Moneda objetivo (opcional)
 *
 * Response:
 * {
 *   base: string,
 *   rates: { [currency]: number },
 *   target: string | null,
 *   asOf: ISO timestamp,
 *   success: boolean
 * }
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const base = normalizeCurrency(req.query.base) || 'USD'
    const target = req.query.target ? normalizeCurrency(req.query.target) : null

    // Validar moneda base
    if (!SUPPORTED_CURRENCIES.includes(base as any)) {
      return res.status(400).json({
        success: false,
        error: `Moneda base '${base}' no soportada`,
        supportedCurrencies: SUPPORTED_CURRENCIES
      })
    }

    // Validar moneda target si se proporciona
    if (target && !SUPPORTED_CURRENCIES.includes(target as any)) {
      return res.status(400).json({
        success: false,
        error: `Moneda objetivo '${target}' no soportada`,
        supportedCurrencies: SUPPORTED_CURRENCIES
      })
    }

    let rates: Record<string, number> = {}
    let useFastForex = false

    try {
      // Intentar obtener datos de FastForex
      if (target) {
        // Si hay un target específico, obtener solo ese tipo de cambio
        const rate = await getExchangeRate(base, target)
        rates[target] = rate
        // Incluir la moneda base
        rates[base] = 1.0
      } else {
        // Obtener todos los tipos de cambio para las monedas soportadas
        const supportedTargets = SUPPORTED_CURRENCIES.filter(c => c !== base)
        const fastForexRates = await getMultipleExchangeRates(base, supportedTargets as string[])
        
        // Construir objeto de rates con la base incluida
        rates[base] = 1.0
        Object.assign(rates, fastForexRates)
      }
      
      useFastForex = true
      console.log(`[Rates] ✓ Datos obtenidos de FastForex: ${base} -> ${target || 'ALL'}`)
    } catch (fastForexError) {
      // Fallback a datos mock si FastForex falla
      console.warn('[Rates] FastForex no disponible, usando datos mock:', fastForexError)
      
      if (target) {
        // Calcular tipo de cambio relativo desde USD
        const baseRate = MOCK_RATES[base] || 1.0
        const targetRate = MOCK_RATES[target] || 1.0
        rates[base] = 1.0
        rates[target] = targetRate / baseRate
      } else {
        // Usar todos los rates mock, ajustados a la base
        const baseRate = MOCK_RATES[base] || 1.0
        Object.keys(MOCK_RATES).forEach(currency => {
          if (currency === base) {
            rates[currency] = 1.0
          } else {
            rates[currency] = (MOCK_RATES[currency] || 1.0) / baseRate
          }
        })
      }
    }

    const response: RatesResponse = {
      base,
      rates,
      target,
      asOf: new Date().toISOString(),
      success: true
    }

    console.log(`[Rates] Consulta completada: ${base} -> ${target || 'ALL'} (${useFastForex ? 'FastForex' : 'Mock'})`)

    return res.status(200).json(response)
  } catch (error) {
    console.error('[Rates Error]', error)
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido'
    
    return res.status(500).json({
      success: false,
      error: 'Error al obtener tipos de cambio',
      message: errorMessage
    })
  }
})

export default router


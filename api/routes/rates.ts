/**
 * Rutas de Tipos de Cambio
 * 
 * Endpoints relacionados con consultas de tasas de cambio
 */

import { Request, Response, Router } from 'express'
import { RatesResponse } from '../../interfaces'
import { normalizeCurrency, isSupportedCurrency } from '../../utils/format'

const router = Router()

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
router.get('/', (req: Request, res: Response) => {
  try {
    const base = normalizeCurrency(req.query.base) || 'USD'
    const target = req.query.target ? normalizeCurrency(req.query.target) : null

    // Validar moneda base
    if (!isSupportedCurrency(base, MOCK_RATES)) {
      return res.status(400).json({
        success: false,
        error: `Moneda base '${base}' no soportada`,
        supportedCurrencies: SUPPORTED_CURRENCIES
      })
    }

    // Validar moneda target si se proporciona
    if (target && !isSupportedCurrency(target, MOCK_RATES)) {
      return res.status(400).json({
        success: false,
        error: `Moneda objetivo '${target}' no soportada`,
        supportedCurrencies: SUPPORTED_CURRENCIES
      })
    }

    const response: RatesResponse = {
      base,
      rates: MOCK_RATES,
      target,
      asOf: new Date().toISOString(),
      success: true
    }

    console.log(`[Rates] Consulta: ${base} -> ${target || 'ALL'}`)

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


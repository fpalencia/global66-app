/**
 * Rutas de Suscripción
 * 
 * Endpoints relacionados con suscripciones de usuarios
 */

import { Request, Response, Router } from 'express'
import { SubscribeRequest, SubscribeResponse } from '../../interfaces'
import { normalizeCurrency, isSupportedCurrency, isValidEmail } from '../../utils/format'
import { saveToGoogleSheets } from '../services/googleSheets'

const router = Router()

// Tasas de cambio mock (para validación)
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
 * Formatea los datos de suscripción para el log
 */
const logSubscription = (data: { name: string; email: string; currency?: string | null }) => {
  console.log('📧 NUEVA SUSCRIPCIÓN')
  console.log(`Nombre:   ${data.name}`)
  console.log(`Email:    ${data.email}`)
  console.log(`Moneda:   ${data.currency || 'No especificada'}`)
  console.log(`Fecha:    ${new Date().toLocaleString('es-CL')}`)
  console.log('\n')
}

/**
 * POST /api/subscribe
 *
 * Registra una nueva suscripción de usuario
 *
 * Body:
 * {
 *   name: string (requerido),
 *   email: string (requerido),
 *   currency?: string (opcional)
 * }
 *
 * Response:
 * {
 *   success: boolean,
 *   message: string,
 *   data: object
 * }
 */
router.post('/', async (req: Request<{}, {}, SubscribeRequest>, res: Response) => {
  try {
    const { name, email, currency } = req.body

    // Validar campos requeridos
    if (!name?.trim() || !email?.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Campos requeridos faltantes',
        message: 'Por favor proporciona nombre y email'
      })
    }

    // Validar formato de email
    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        error: 'Email inválido',
        message: 'Por favor proporciona un email válido'
      })
    }

    // Normalizar y validar moneda si se proporciona
    const normalizedCurrency = currency ? normalizeCurrency(currency) : null
    
    if (normalizedCurrency && !isSupportedCurrency(normalizedCurrency, MOCK_RATES)) {
      return res.status(400).json({
        success: false,
        error: 'Moneda no soportada',
        message: `La moneda '${normalizedCurrency}' no es válida`,
        supportedCurrencies: SUPPORTED_CURRENCIES
      })
    }

    // Preparar datos de suscripción
    const subscriptionData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      currency: normalizedCurrency,
      subscribedAt: new Date().toISOString()
    }

    // Guardar en Google Sheets
    try {
      await saveToGoogleSheets(subscriptionData)
      console.log('[Subscribe] ✓ Datos guardados en Google Sheets')
    } catch (sheetsError) {
      // Log del error pero no falla la suscripción
      console.error('[Subscribe] ⚠️ Error al guardar en Google Sheets:', sheetsError)
      // Opcional: podrías decidir si quieres que falle la request o continuar
    }

    // Log de suscripción en consola
    logSubscription(subscriptionData)

    const response: SubscribeResponse = {
      success: true,
      message: '¡Gracias por suscribirte! Te mantendremos informado sobre los mejores tipos de cambio.',
      data: subscriptionData
    }

    return res.status(201).json(response)
  } catch (error) {
    console.error('[Subscribe Error]', error)
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido'
    
    return res.status(500).json({
      success: false,
      error: 'Error al procesar suscripción',
      message: errorMessage
    })
  }
})

export default router


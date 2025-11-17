/**
 * API de Global66 - Express Server Middleware
 *
 * Este servidor Express maneja las rutas de la API:
 * - GET /api/rates - Obtiene tipos de cambio de divisas
 * - POST /api/subscribe - Maneja suscripciones de usuarios
 * - GET /api/health - Health check endpoint
 */

import dotenv from 'dotenv'
import express, { Request, Response, NextFunction, RequestHandler } from 'express'

dotenv.config()

const app = express()

// Middleware para parsear JSON
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/**
 * Tipos para la API
 */
interface RatesResponse {
  base: string
  rates: Record<string, number>
  target: string | null
  asOf: string
  success: boolean
}

interface SubscribeRequest {
  name: string
  email: string
  currency?: string
}

interface SubscribeResponse {
  success: boolean
  message: string
  data: {
    name: string
    email: string
    currency: string | null
    subscribedAt: string
  }
}

// Middleware de logging para desarrollo
const loggingMiddleware: RequestHandler = (req, _res, next) => {
  console.log(`[API] ${req.method} ${req.path}`)
  next()
}

app.use(loggingMiddleware)

/**
 * GET /api/rates
 *
 * Obtiene los tipos de cambio actuales
 *
 * Query params:
 * - base: Moneda base (default: 'USD')
 * - target: Moneda objetivo (default: 'CLP')
 *
 * Response:
 * {
 *   base: string,
 *   rates: { [currency]: number },
 *   asOf: ISO timestamp,
 *   success: boolean
 * }
 */
app.get('/rates', (req: Request, res: Response) => {
  try {
    const { base = 'USD', target = 'CLP' } = req.query

    // Datos mock de tipos de cambio
    // En producción, esto vendría de una API externa o base de datos
    const mockRates: Record<string, number> = {
      USD: 1.0,
      CLP: 987.62,
      PEN: 3.81,
      ARS: 1025.5,
      BRL: 5.42,
      MXN: 17.15,
      COP: 4125.0,
      EUR: 0.92,
      GBP: 0.79
    }

    // Validar que la moneda base exista
    if (!mockRates[base as string]) {
      return res.status(400).json({
        success: false,
        error: `Moneda base '${base}' no soportada`,
        supportedCurrencies: Object.keys(mockRates)
      })
    }

    // Si se especifica un target, podemos priorizar esa información
    const response: RatesResponse = {
      base: base as string,
      rates: mockRates,
      target: (target as string) || null,
      asOf: new Date().toISOString(),
      success: true
    }

    // Log para desarrollo
    console.log(`[Rates] Consulta: ${base} -> ${target || 'ALL'}`)

    res.status(200).json(response)
  } catch (error: any) {
    console.error('[Rates Error]', error)
    res.status(500).json({
      success: false,
      error: 'Error al obtener tipos de cambio',
      message: error.message
    })
  }
})

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
app.post('/subscribe', async (req: Request<{}, {}, SubscribeRequest>, res: Response) => {
  try {
    const { name, email, currency } = req.body

    // Validación de campos requeridos
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        error: 'Campos requeridos faltantes',
        message: 'Por favor proporciona nombre y email'
      })
    }

    // Validación básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Email inválido',
        message: 'Por favor proporciona un email válido'
      })
    }

    // Log en consola
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('📧 NUEVA SUSCRIPCIÓN')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log(`Nombre:   ${name}`)
    console.log(`Email:    ${email}`)
    console.log(`Moneda:   ${currency || 'No especificada'}`)
    console.log(`Fecha:    ${new Date().toLocaleString('es-CL')}`)
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

    const response: SubscribeResponse = {
      success: true,
      message:
        '¡Gracias por suscribirte! Te mantendremos informado sobre los mejores tipos de cambio.',
      data: {
        name,
        email,
        currency: currency || null,
        subscribedAt: new Date().toISOString()
      }
    }

    res.status(201).json(response)
  } catch (error: any) {
    console.error('[Subscribe Error]', error)
    res.status(500).json({
      success: false,
      error: 'Error al procesar suscripción',
      message: error.message
    })
  }
})

/**
 * GET /api/health
 *
 * Health check endpoint para verificar que la API está funcionando
 */
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  })
})

/**
 * Manejador de rutas no encontradas
 */
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint no encontrado',
    message: `La ruta ${req.method} ${req.path} no existe`,
    availableEndpoints: ['GET /api/rates', 'POST /api/subscribe', 'GET /api/health']
  })
})

/**
 * Manejador de errores global
 */
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('[API Error]', err.stack)
  res.status(500).json({
    success: false,
    error: 'Error interno del servidor',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Ocurrió un error inesperado'
  })
})

export default app


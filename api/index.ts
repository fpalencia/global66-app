/**
 * API de Global66 - Express Server Middleware
 *
 * Este servidor Express maneja las rutas de la API:
 * - GET /api/rates - Obtiene tipos de cambio de divisas
 * - POST /api/subscribe - Maneja suscripciones de usuarios
 */

import dotenv from 'dotenv'
import express, { Request, Response, NextFunction, RequestHandler } from 'express'

// Importar rutas
import ratesRouter from './routes/rates'
import subscribeRouter from './routes/subscribe'

dotenv.config()

const app = express()

// ============================================================================
// MIDDLEWARE
// ============================================================================

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const loggingMiddleware: RequestHandler = (req, _res, next) => {
  console.log(`[API] ${req.method} ${req.path}`)
  next()
}

app.use(loggingMiddleware)

// ============================================================================
// RUTAS
// ============================================================================

// Montar las rutas modulares
app.use('/rates', ratesRouter)
app.use('/subscribe', subscribeRouter)

// ============================================================================
// MANEJADORES DE ERRORES
// ============================================================================

/**
 * Manejador de rutas no encontradas
 */
app.use((req: Request, res: Response) => {
  return res.status(404).json({
    success: false,
    error: 'Endpoint no encontrado',
    message: `La ruta ${req.method} ${req.path} no fue encontrada`,
    description: 'Por favor, verifica la ruta y el método de la solicitud',
    documentation: 'https://global66.com/docs',
    timestamp: new Date().toISOString(),
    availableEndpoints: [
      'GET /api/rates',
      'POST /api/subscribe'
    ]
  })
})

/**
 * Manejador de errores global
 */
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('[API Error]', err.stack)
  
  return res.status(500).json({
    success: false,
    error: 'Error interno del servidor',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Ocurrió un error inesperado'
  })
})

export default app

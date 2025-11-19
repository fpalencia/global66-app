/**
 * Rutas de Suscripción
 * 
 * Endpoints relacionados con suscripciones de usuarios
 */

import { Request, Response, Router } from 'express'
import { SubscribeRequest, SubscribeResponse } from '../../interfaces'
import { isValidEmail } from '../../utils/format'
import { saveToGoogleSheets } from '../services/googleSheets'

const router = Router()

/**
 * Formatea los datos de suscripción para el log
 */
const logSubscription = (data: { name: string; email: string }) => {
  console.log('📧 NUEVA SUSCRIPCIÓN')
  console.log(`Nombre:   ${data.name}`)
  console.log(`Email:    ${data.email}`)
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
 *   email: string (requerido)
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
    const { name, email } = req.body

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

    // Preparar datos de suscripción
    const subscriptionData = {
      name: name.trim(),
      email: email.trim().toLowerCase()
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
      message: '¡Gracias por unirte! Te avisaremos cada vez que haya un tipo de cambio conveniente para ti.',
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


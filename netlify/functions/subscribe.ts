/**
 * Netlify Function: Suscripciones
 * 
 * Endpoint: /.netlify/functions/subscribe
 * Método: POST
 * 
 * Body:
 * {
 *   name: string (requerido),
 *   email: string (requerido)
 * }
 */

import { Handler, HandlerEvent, HandlerContext } from '@netlify/functions'
import { google } from 'googleapis'

// Regex para validación de email
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Validar formato de email
const isValidEmail = (email: string): boolean => {
  return EMAIL_REGEX.test(email.trim())
}

// Formatear nombre de hoja para Google Sheets
const formatSheetName = (sheetName: string): string => {
  if (sheetName.includes(' ') || sheetName.includes('-')) {
    return `'${sheetName}'`
  }
  return sheetName
}

// Inicializar cliente de Google Sheets
const getGoogleSheetsClient = async () => {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })

    const sheets = google.sheets({ version: 'v4', auth })
    return sheets
  } catch (error) {
    console.error('[Google Sheets] Error al inicializar cliente:', error)
    throw error
  }
}

// Obtener nombre de la primera hoja
const getFirstSheetName = async (sheets: any, spreadsheetId: string): Promise<string> => {
  try {
    const spreadsheet = await sheets.spreadsheets.get({
      spreadsheetId
    })
    
    const firstSheet = spreadsheet.data.sheets?.[0]
    return firstSheet?.properties?.title || 'Sheet1'
  } catch (error) {
    console.warn('[Google Sheets] No se pudo obtener el nombre de la hoja, usando Sheet1')
    return 'Sheet1'
  }
}

// Guardar en Google Sheets
const saveToGoogleSheets = async (subscriptionData: {
  name: string
  email: string
}) => {
  const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID
  const SHEET_NAME = process.env.GOOGLE_SHEET_NAME || 'Suscripciones'

  if (!SPREADSHEET_ID) {
    throw new Error('GOOGLE_SPREADSHEET_ID no está configurado en las variables de entorno')
  }

  const sheets = await getGoogleSheetsClient()

  // Obtener el nombre real de la hoja
  let sheetName = SHEET_NAME
  
  try {
    const formattedSheetName = formatSheetName(sheetName)
    await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${formattedSheetName}!A1`,
    })
  } catch (error) {
    console.warn(`[Google Sheets] La hoja "${sheetName}" no existe, usando la primera hoja disponible`)
    sheetName = await getFirstSheetName(sheets, SPREADSHEET_ID)
  }

  const values = [
    [
      subscriptionData.name,
      subscriptionData.email
    ]
  ]

  const formattedSheetName = formatSheetName(sheetName)

  // Intentar agregar encabezados si la hoja está vacía
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${formattedSheetName}!A1:B1`,
    })

    if (!response.data.values || response.data.values.length === 0) {
      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: `${formattedSheetName}!A1:B1`,
        valueInputOption: 'RAW',
        requestBody: {
          values: [['Nombre', 'Email']]
        }
      })
    }
  } catch (error) {
    console.warn('[Google Sheets] No se pudieron agregar encabezados:', error)
  }

  // Agregar nueva fila
  const result = await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: `${formattedSheetName}!A:B`,
    valueInputOption: 'RAW',
    insertDataOption: 'INSERT_ROWS',
    requestBody: {
      values
    }
  })

  console.log(`[Google Sheets] ✓ Datos guardados: ${result.data.updates?.updatedCells} celdas actualizadas`)
  return result.data
}

export const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  // Solo permitir método POST
  if (event.httpMethod !== 'POST') {
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
    const body = JSON.parse(event.body || '{}')
    const { name, email } = body

    // Validar campos requeridos
    if (!name?.trim() || !email?.trim()) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          success: false,
          error: 'Campos requeridos faltantes',
          message: 'Por favor proporciona nombre y email'
        })
      }
    }

    // Validar formato de email
    if (!isValidEmail(email)) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          success: false,
          error: 'Email inválido',
          message: 'Por favor proporciona un email válido'
        })
      }
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
      console.error('[Subscribe] ⚠️ Error al guardar en Google Sheets:', sheetsError)
    }

    // Log de suscripción
    console.log('📧 NUEVA SUSCRIPCIÓN')
    console.log(`Nombre:   ${subscriptionData.name}`)
    console.log(`Email:    ${subscriptionData.email}`)
    console.log(`Fecha:    ${new Date().toLocaleString('es-CL')}`)

    return {
      statusCode: 201,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({
        success: true,
        message: '¡Gracias por suscribirte! Te mantendremos informado sobre los mejores tipos de cambio.',
        data: subscriptionData
      })
    }
  } catch (error) {
    console.error('[Subscribe Error]', error)
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido'
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: false,
        error: 'Error al procesar suscripción',
        message: errorMessage
      })
    }
  }
}


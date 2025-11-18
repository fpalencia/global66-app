/**
 * Servicio de Google Sheets
 * 
 * Maneja la integración con Google Spreadsheets
 */

import { google } from 'googleapis'
import { formatSheetName } from '../../utils/format'

const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID
const SHEET_NAME = process.env.GOOGLE_SHEET_NAME || 'Suscripciones'

/**
 * Inicializa el cliente de Google Sheets con autenticación
 */
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

/**
 * Obtiene el nombre de la primera hoja disponible en el spreadsheet
 */
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

/**
 * Guarda una suscripción en Google Sheets
 */
export const saveToGoogleSheets = async (subscriptionData: {
  name: string
  email: string
}) => {
  try {
    if (!SPREADSHEET_ID) {
      throw new Error('GOOGLE_SPREADSHEET_ID no está configurado en las variables de entorno')
    }

    const sheets = await getGoogleSheetsClient()

    // Obtener el nombre real de la hoja (intenta usar SHEET_NAME, si falla usa la primera hoja)
    let sheetName = SHEET_NAME
    
    try {
      // Verificar si la hoja existe
      const formattedSheetName = formatSheetName(sheetName)
      await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: `${formattedSheetName}!A1`,
      })
    } catch (error) {
      // Si la hoja no existe, usar la primera hoja disponible
      console.warn(`[Google Sheets] La hoja "${sheetName}" no existe, usando la primera hoja disponible`)
      sheetName = await getFirstSheetName(sheets, SPREADSHEET_ID)
    }

    // Preparar datos para la fila (solo nombre y email)
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

      // Si no hay datos, agregar encabezados
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
  } catch (error) {
    console.error('[Google Sheets] Error al guardar datos:', error)
    throw error
  }
}


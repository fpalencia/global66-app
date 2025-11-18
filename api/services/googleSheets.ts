/**
 * Servicio de Google Sheets
 * 
 * Maneja la integración con Google Spreadsheets
 */

import { GoogleSpreadsheet } from 'google-spreadsheet'
import { JWT } from 'google-auth-library'

const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID
const SHEET_NAME = process.env.GOOGLE_SHEET_NAME || 'Suscripciones'

/**
 * Inicializa el cliente de Google Sheets con autenticación
 */
const getGoogleSheetsClient = async () => {
  try {
    if (!SPREADSHEET_ID) {
      throw new Error('GOOGLE_SPREADSHEET_ID no está configurado')
    }

    // Crear JWT para autenticación
    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })

    const doc = new GoogleSpreadsheet(SPREADSHEET_ID, serviceAccountAuth)
    
    await doc.loadInfo()
    return doc
  } catch (error) {
    console.error('[Google Sheets] Error al inicializar cliente:', error)
    throw error
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

    const doc = await getGoogleSheetsClient()

    // Obtener la hoja por nombre o usar la primera disponible
    let sheet = doc.sheetsByTitle[SHEET_NAME]
    
    if (!sheet) {
      console.warn(`[Google Sheets] La hoja "${SHEET_NAME}" no existe, usando la primera hoja disponible`)
      sheet = doc.sheetsByIndex[0]
    }

    if (!sheet) {
      throw new Error('No se encontró ninguna hoja en el documento')
    }

    // Cargar encabezados si existen
    await sheet.loadHeaderRow()
    
    // Si no hay encabezados, crearlos
    if (!sheet.headerValues || sheet.headerValues.length === 0) {
      await sheet.setHeaderRow(['Nombre', 'Email'])
      console.log('[Google Sheets] Encabezados creados')
    }

    // Agregar nueva fila
    const result = await sheet.addRow({
      Nombre: subscriptionData.name,
      Email: subscriptionData.email
    })

    console.log(`[Google Sheets] ✓ Datos guardados: Fila ${result.rowNumber}`)
    return result
  } catch (error) {
    console.error('[Google Sheets] Error al guardar datos:', error)
    throw error
  }
}


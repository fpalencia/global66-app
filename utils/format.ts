/**
 * Utilidades de formato y validación
 */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Normaliza el código de moneda a mayúsculas
 */
export const normalizeCurrency = (currency: unknown): string => {
  return typeof currency === 'string' ? currency.toUpperCase().trim() : ''
}

/**
 * Valida si una moneda es soportada
 */
export const isSupportedCurrency = (currency: string, supportedCurrencies: Record<string, number>): boolean => {
  return currency in supportedCurrencies
}

/**
 * Valida formato de email
 */
export const isValidEmail = (email: string): boolean => {
  return EMAIL_REGEX.test(email.trim())
}

/**
 * Formatea el nombre de la hoja para Google Sheets
 * Si el nombre contiene espacios, lo envuelve en comillas simples
 */
export const formatSheetName = (sheetName: string): string => {
  // Si contiene espacios u otros caracteres especiales, envolver en comillas simples
  if (sheetName.includes(' ') || sheetName.includes('-')) {
    return `'${sheetName}'`
  }
  return sheetName
}

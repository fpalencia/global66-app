// ============================================================================
// CONSTANTES
// ============================================================================
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const MOCK_RATES = {
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

// ============================================================================
// FUNCIONES
// ============================================================================

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

/**
 * Normaliza el código de moneda a mayúsculas
 */
export const normalizeCurrency = (currency: unknown): string => {
  return typeof currency === 'string' ? currency.toUpperCase().trim() : ''
}

/**
 * Valida si una moneda es soportada
 */
export const isSupportedCurrency = (currency: string): boolean => {
  return currency in MOCK_RATES
}

/**
 * Valida formato de email
 */
export const isValidEmail = (email: string): boolean => {
  return EMAIL_REGEX.test(email.trim())
}

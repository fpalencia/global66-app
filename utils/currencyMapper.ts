/**
 * Mapeo de slugs a códigos de divisa (ISO 4217)
 * 
 * Este diccionario mapea URLs amigables a códigos de moneda
 * Ejemplo: /precio/peso-chileno → USD/CLP
 */

export const SLUG_TO_CURRENCY: Record<string, string> = {
  'peso-chileno': 'CLP',
  'sol-peruano': 'PEN',
  'dolares': 'USD',
  'peso-argentino': 'ARS',
  'real-brasileno': 'BRL',
  'peso-mexicano': 'MXN',
  'peso-colombiano': 'COP',
  'euro': 'EUR',
  'libra-esterlina': 'GBP'
}

/**
 * Obtiene el código de divisa a partir de un slug
 * @param slug - Slug de la URL
 * @returns Código de divisa o null si no existe
 */
export function getCurrencyFromSlug(slug: string): string | null {
  return SLUG_TO_CURRENCY[slug] || null
}

/**
 * Verifica si un slug es válido
 * @param slug - Slug de la URL
 * @returns true si el slug existe, false en caso contrario
 */
export function isValidSlug(slug: string): boolean {
  return slug in SLUG_TO_CURRENCY
}

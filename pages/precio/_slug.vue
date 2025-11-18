<template>
  <div>
    <!-- Hero Banner con tipo de cambio -->
    <AppHeroBanner :title="exchangeData.title" :currency-from="exchangeData.currencyFrom"
      :currency-to="exchangeData.currencyTo" :rate="exchangeData.rate" :date="exchangeData.date"
      :time="exchangeData.time" />

    <!-- Call to Action -->
    <AppCallToAction />
  </div>
</template>

<script>
import AppHeroBanner from '~/components/currency/AppHeroBanner.vue'
import AppCallToAction from '~/components/currency/AppCallToAction.vue'
import { getCurrencyFromSlug, isValidSlug } from '~/utils/currencyMapper'

export default {
  name: 'PrecioPage',
  components: {
    AppHeroBanner,
    AppCallToAction
  },

  validate({ params }) {
    // Validar que el slug exista en el diccionario
    return isValidSlug(params.slug)
  },

  async asyncData({ params, error, req }) {
    const slug = params.slug
    const currencyCode = getCurrencyFromSlug(slug)

    if (!currencyCode) {
      return error({ statusCode: 404, message: 'Divisa no encontrada' })
    }

    try {
      // Obtener tipo de cambio
      const baseUrl = process.server ? 'http://localhost:3000' : window.location.origin
      const response = await fetch(`${baseUrl}/api/rates?base=USD&target=${currencyCode}`)
 
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }
 
      const { rates = {} } = await response.json()
      const rate = rates[currencyCode] || 0
 
      // Formatear fecha usando Intl.DateTimeFormat (más moderno y mantenible)
      const now = new Date()
      
      // Formatear tasa
      const formattedRate = rate.toLocaleString('es-ES', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })
 
      // Formatear fecha: "martes 18 de noviembre"
      const dateFormatter = new Intl.DateTimeFormat('es-ES', {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
      })
      const formattedDate = dateFormatter.format(now)
      
      // Formatear hora: "17:51 UTC"
      const formattedTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')} UTC`

      // Nombres de divisas
      const currencyNames = {
        CLP: 'Peso Chileno',
        PEN: 'Sol Peruano',
        USD: 'Dólar',
        ARS: 'Peso Argentino',
        BRL: 'Real Brasileño',
        MXN: 'Peso Mexicano',
        COP: 'Peso Colombiano',
        EUR: 'Euro',
        GBP: 'Libra Esterlina'
      }

      return {
        exchangeData: {
          title: 'Valor del dólar hoy',
          currencyFrom: currencyCode,
          currencyTo: 'USD',
          rate: formattedRate,
          date: formattedDate,
          time: formattedTime
        },
        currencyName: currencyNames[currencyCode] || currencyCode,
        formattedRate,
        formattedDate,
        formattedTime
      }
    } catch (err) {
      return error({
        statusCode: 500,
        message: 'Error al obtener el tipo de cambio'
      })
    }
  },
  
  head() {
    // Obtener datos de asyncData o valores por defecto
    const slug = this.$route?.params?.slug || ''
    const currencyCode = this.exchangeData?.currencyTo || ''
    const currencyName = this.currencyName || currencyCode
    const rate = this.formattedRate || ''
    const formattedDate = this.formattedDate || 'hoy'

    // Construir URL canónica
    let baseURL = 'http://localhost:3000'
    if (process.client) {
      baseURL = `${window.location.protocol}//${window.location.host}`
    } else if (this.$config && this.$config.baseURL) {
      baseURL = this.$config.baseURL
    }
    const canonicalUrl = `${baseURL}/precio/${slug}`

    // Descripción dinámica
    const description = `Consulta el tipo de cambio del dólar (USD) a ${currencyName} (${currencyCode}). 1 USD = ${rate} ${currencyCode}. Tipo de cambio actualizado para ${formattedDate}.`

    return {
      title: `Valor del dólar hoy en ${currencyName} (${currencyCode}) - Global66`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: description
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: `Valor del dólar hoy en ${currencyName} (${currencyCode})`
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: description
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: canonicalUrl
        }
      ],
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: canonicalUrl
        },
        {
          hid: 'alternate',
          rel: 'alternate',
          hreflang: 'es-CL',
          href: canonicalUrl
        }
      ]
    }
  }
}
</script>
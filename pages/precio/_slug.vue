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
import { apiGet } from '~/utils/api'

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
      // Obtener tipo de cambio usando la utilidad compartida
      const data = await apiGet('/api/rates', { base: 'USD', target: currencyCode })
      const rates = data.rates || {}
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
    const currencyCode = this.exchangeData?.currencyFrom || ''
    const currencyName = this.currencyName || currencyCode
    const rate = this.formattedRate || ''
    const rateNumeric = parseFloat(rate.replace(',', '.')) || 0
    const formattedDate = this.formattedDate || 'hoy'

    // Construir URL canónica
    let baseURL = 'http://localhost:3000'
    if (process.client && window) {
      baseURL = window.location.origin
    } else if (this.$config && this.$config.baseURL) {
      baseURL = this.$config.baseURL
    }
    const canonicalUrl = `${baseURL}/precio/${slug}`

    // Descripción dinámica
    const description = `Consulta el tipo de cambio del dólar (USD) a ${currencyName} (${currencyCode}). 1 USD = ${rate} ${currencyCode}. Tipo de cambio actualizado para ${formattedDate}.`

    // Fecha actual en formato ISO
    const now = new Date()
    const isoDate = now.toISOString()

    // Schema.org JSON-LD
    const structuredData = [
      // Organization Schema
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Global66',
        url: baseURL,
        logo: `${baseURL}/assets/images/global-icon.svg`,
        description: 'Plataforma de servicios financieros internacionales',
        sameAs: [
          'https://www.facebook.com/global66',
          'https://www.instagram.com/global66',
          'https://www.linkedin.com/company/global66'
        ]
      },
      // WebPage Schema
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: `Valor del dólar hoy en ${currencyName} (${currencyCode})`,
        description: description,
        url: canonicalUrl,
        inLanguage: 'es-CL',
        datePublished: isoDate,
        dateModified: isoDate,
        publisher: {
          '@type': 'Organization',
          name: 'Global66',
          url: baseURL
        }
      },
      // ExchangeRateSpecification Schema
      {
        '@context': 'https://schema.org',
        '@type': 'ExchangeRateSpecification',
        currency: 'USD',
        currentExchangeRate: {
          '@type': 'UnitPriceSpecification',
          price: rateNumeric,
          priceCurrency: currencyCode
        },
        exchangeRateSpread: {
          '@type': 'MonetaryAmount',
          currency: currencyCode,
          value: rateNumeric
        }
      },
      // BreadcrumbList Schema
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Inicio',
            item: baseURL
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Precio',
            item: `${baseURL}/precio`
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: currencyName,
            item: canonicalUrl
          }
        ]
      }
    ]

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
        },
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'website'
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
      ],
      script: [
        {
          hid: 'structured-data',
          type: 'application/ld+json',
          json: structuredData
        }
      ]
    }
  }
}
</script>
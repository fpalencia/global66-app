/**
 * Configuración de Nuxt.js para Global66 App
 *
 * Este archivo configura:
 * - Modo SSR (Server-Side Rendering)
 * - Express API mediante serverMiddleware
 * - Meta tags y SEO básico
 */

module.exports = {
  // Target server para renderizado del lado del servidor (SSR)
  // Nota: 'server' es necesario para que funcione serverMiddleware (API)
  target: 'server',

  // Configuración del head global
  head: {
    title: 'Tu App para Pagar, Cobrar y Enviar Dinero | Global66 Chile',
    htmlAttrs: {
      lang: 'es-CL'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Ten el control de tu vida financiera Globalmente. Paga en todo el mundo, convierte a dólares y otras divisas y envía dinero a +70 países.'
      },
      { name: 'format-detection', content: 'telephone=no' },
      // Open Graph
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:locale', property: 'og:locale', content: 'es_cl' },
      { hid: 'og:site_name', property: 'og:site_name', content: 'Global66' },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'Tu App para Pagar, Cobrar y Enviar Dinero | Global66'
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content:
          'Ten el control de tu vida financiera Globalmente. Paga en todo el mundo, convierte a dólares y otras divisas y envía dinero a +70 países.'
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: process.env.BASE_URL || 'https://www.global66.com'
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: `${process.env.BASE_URL || 'https://www.global66.com'}/opengraph/opengraph-5.png`
      },
      // Twitter Cards
      {
        hid: 'twitter:card',
        name: 'twitter:card',
        content: 'summary_large_image'
      },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: 'Tu App para Pagar, Cobrar y Enviar Dinero | Global66'
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content:
          'Ten el control de tu vida financiera Globalmente. Paga en todo el mundo, convierte a dólares y otras divisas y envía dinero a +70 países.'
      },
      {
        hid: 'twitter:image',
        name: 'twitter:image',
        content: `${process.env.BASE_URL || 'https://www.global66.com'}/opengraph/opengraph-5.png`
      },
      {
        hid: 'twitter:domain',
        property: 'twitter:domain',
        content: 'Global66'
      },
      {
        hid: 'twitter:url',
        name: 'twitter:url',
        content: process.env.BASE_URL || 'https://www.global66.com'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/fav.png?v3' },
      {
        hid: 'canonical',
        rel: 'canonical',
        href: `${process.env.BASE_URL || 'https://www.global66.com'}/`
      },
      // Fuente Montserrat desde Google Fonts
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap'
      }
    ],
    script: [
      {
        hid: 'schema-org',
        type: 'application/ld+json',
        json: {
          '@context': 'https://schema.org',
          '@type': 'Corporation',
          name: 'Global66',
          url: process.env.BASE_URL || 'https://www.global66.com',
          logo: `${process.env.BASE_URL || 'https://www.global66.com'}/ui-kit/assets/at-logo-text-right/logo-textRight.svg`,
          sameAs: [
            'https://www.instagram.com/global_66/',
            'https://www.facebook.com/soyglobal66/',
            'https://twitter.com/SomosGlobal66/',
            'https://www.linkedin.com/company/global66/',
            'https://www.youtube.com/channel/UCnnlY4UcEaA57nE1MclkT6A'
          ]
        }
      }
    ]
  },

  // CSS global
  css: ['~/assets/css/main.css'],

  // Plugins a cargar antes de montar la app
  plugins: [],

  // Auto importar componentes
  components: true,

  // Módulos para desarrollo y build (se ejecutan antes del build)
  buildModules: ['@nuxtjs/tailwindcss', '@nuxt/typescript-build'],

  // Módulos
  modules: [],

  // Configuración de TailwindCSS
  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    configPath: 'tailwind.config.js',
    exposeConfig: false,
    injectPosition: 0,
    viewer: true
  },

  // Server Middleware para la API
  serverMiddleware: [{ path: '/api', handler: '~/api/index.ts' }],

  // Configuración del build
  build: {
    // Optimizaciones para reducir el tamaño del bundle
    extractCSS: true,
    optimization: {
      splitChunks: {
        chunks: 'all',
        automaticNameDelimiter: '.',
        name: undefined,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10
          }
        }
      }
    },
    // Transpilación solo lo necesario
    transpile: [],
    // Minimizar el bundle
    minimize: true
  },

  // Configuración del servidor de desarrollo
  server: {
    port: 3000,
    host: '0.0.0.0'
  },

  // Variables de entorno públicas
  publicRuntimeConfig: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000'
  },

  // Variables de entorno privadas (solo en servidor)
  privateRuntimeConfig: {}
}


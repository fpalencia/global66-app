/**
 * Configuración de Nuxt.js para Global66 App
 *
 * Este archivo configura:
 * - Modo SSR (Server-Side Rendering)
 * - Express API mediante serverMiddleware
 * - Meta tags y SEO básico
 */

// Cargar variables de entorno desde .env antes de usar process.env
import dotenv from 'dotenv'
dotenv.config()
module.exports = {
  // Target server para renderizado del lado del servidor (SSR)
  target: 'static',

  // Configuración del head global
  head: {
    title: 'Tu App para Pagar, Cobrar y Enviar Dinero  | Global66',
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
          'Global66 es la plataforma para enviar, recibir y cambiar dinero en Latinoamérica. Conoce el precio del dólar en tiempo real.'
      },
      { name: 'format-detection', content: 'telephone=no' },
      // Open Graph
      { property: 'og:type', content: 'website' },
      { property: 'og:locale', content: 'es_CL' },
      { property: 'og:site_name', content: 'Global66' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      // Fuente Montserrat desde Google Fonts
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap'
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
  build: {},

  // Configuración del servidor de desarrollo
  server: {
    port: 3000,
    host: '0.0.0.0'
  },

  // Variables de entorno públicas
  publicRuntimeConfig: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
  },

  // Variables de entorno privadas (solo en servidor)
  privateRuntimeConfig: {}
}


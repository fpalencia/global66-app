<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
    <div class="max-w-2xl w-full text-center">
      <!-- Icono de Error -->
      <div class="mb-8">
        <div v-if="error.statusCode === 404" class="inline-flex items-center justify-center w-32 h-32 bg-blue-100 rounded-full">
          <svg class="w-16 h-16 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div v-else class="inline-flex items-center justify-center w-32 h-32 bg-red-100 rounded-full">
          <svg class="w-16 h-16 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
      </div>

      <!-- Código de Error -->
      <h1 class="text-8xl font-bold text-gray-800 mb-4">
        {{ error.statusCode }}
      </h1>

      <!-- Título del Error -->
      <h2 class="text-3xl font-semibold text-gray-700 mb-4">
        {{ errorTitle }}
      </h2>

      <!-- Mensaje del Error -->
      <p class="text-lg text-gray-600 mb-8 max-w-md mx-auto">
        {{ errorMessage }}
      </p>

      <!-- Botones de Acción -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a  
          href="/"
          class="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Volver al Inicio
        </a>

        <button
          v-if="error.statusCode !== 404"
          @click="handleRetry"
          class="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-200 shadow-lg hover:shadow-xl border-2 border-blue-600"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Reintentar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ErrorPage',
  layout: 'default',
  
  props: {
    error: {
      type: Object,
      required: true
    }
  },
  
  computed: {
    errorTitle() {
      const titles = {
        404: '¡Oops! Página no encontrada',
        500: 'Error del servidor',
        503: 'Servicio no disponible',
        default: 'Ha ocurrido un error'
      }
      return titles[this.error.statusCode] || titles.default
    },
    
    errorMessage() {
      if (this.error.statusCode === 404) {
        return this.error.message || 'La página que buscas no existe o ha sido movida. Verifica la URL o explora nuestras opciones disponibles.'
      }
      
      if (this.error.statusCode === 500) {
        return this.error.message || 'Estamos experimentando problemas técnicos. Por favor, intenta nuevamente en unos momentos.'
      }
      
      return this.error.message || 'Algo salió mal. Por favor, intenta nuevamente más tarde.'
    },
  },
  
  methods: {
    handleRetry() {
      // Recargar la página actual
      window.location.reload()
    }
  },
  
  head() {
    return {
      title: `Error ${this.error.statusCode} - Global66`,
      meta: [
        {
          hid: 'robots',
          name: 'robots',
          content: 'noindex, nofollow'
        }
      ]
    }
  }
}
</script>

<style scoped>
/* Animación de entrada */
.min-h-screen {
  animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>


<template>
  <div>
    <!-- Hero Banner con tipo de cambio -->
    <AppHeroBanner 
      :title="exchangeData.title"
      :currency-from="exchangeData.currencyFrom"
      :currency-to="exchangeData.currencyTo"
      :rate="exchangeData.rate"
      :date="exchangeData.date"
      :time="exchangeData.time"
    />
    
    <!-- Call to Action -->
    <AppCallToAction />
  </div>
</template>

<script>
import AppHeroBanner from '~/components/currency/AppHeroBanner.vue'
import AppCallToAction from '~/components/currency/AppCallToAction.vue'
export default {
  name: 'PrecioPage',
  components: {
    AppHeroBanner,
    AppCallToAction
  },
  
  data() {
    return {
      // Data mock para simular datos dinámicos
      exchangeData: {
        title: 'Valor del dolar hoy',
        currencyFrom: 'CLP',
        currencyTo: 'USD',
        rate: '987,62',
        date: 'martes 31 de octubre',
        time: '17:51 UTC'
      }
    }
  },
  
  // Simular obtención de datos dinámicos
  mounted() {
    // Aquí podrías hacer una llamada API para obtener el tipo de cambio real
    this.fetchExchangeRate()
  },
  
  methods: {
    fetchExchangeRate() {
      // Simulación de actualización de datos
      // En producción, esto vendría de una API
      console.log('Fetching exchange rate...')
      
      // Ejemplo de actualización dinámica (mock)
      setTimeout(() => {
        const currentDate = new Date()
        const days = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado']
        const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
        
        this.exchangeData.date = `${days[currentDate.getDay()]} ${currentDate.getDate()} de ${months[currentDate.getMonth()]}`
        this.exchangeData.time = `${currentDate.getHours()}:${currentDate.getMinutes().toString().padStart(2, '0')} UTC`
        
        // Simular cambio de tasa (en producción vendría de API)
        // this.exchangeData.rate = '989,45'
      }, 2000)
    }
  }
}
</script>
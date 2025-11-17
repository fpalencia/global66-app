<template>
  <section class="bg-global-blue relative overflow-hidden pt-20 md:pt-24 lg:pt-40">
    <div class="container mx-auto px-4">
      <div class="flex flex-col lg:flex-row justify-between gap-8 lg:gap-12">
        
        <!-- Left Content - Text -->
        <div class="flex-1 text-white text-center lg:text-left z-10 flex flex-col">
          <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {{ title }}
          </h1>
          <p class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            1 {{ currencyFrom }} = {{ formattedRate }} {{ currencyTo }}
          </p>
          <p class="text-base md:text-lg opacity-90">
            {{ formattedDate }}
          </p>
        </div>

        <!-- Right Content - Flags on Stand -->
        <div class="flex-1 flex justify-center lg:justify-end items-end relative">
          <div class="relative w-full max-w-lg lg:max-w-xl">
            <!-- Flags Container -->
            <div class="relative flex items-center justify-center mb-[-40px] z-10">
              <!-- Green Arrow -->
              <img
                src="~/assets/images/arrow.svg"
                alt="exchange"
                class="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 md:w-16 z-30 top-[10px]"
                style="filter: drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.15));"
              />
              
              <!-- Chile Flag (Left) -->
              <div class="relative z-20">
                <div 
                  class="rounded-full p-4 md:p-6"
                  style="background: linear-gradient(180deg, rgba(157, 176, 255, 0.6) 0%, rgba(63, 94, 223, 0.6) 100%); backdrop-filter: blur(20px); box-shadow: 0 8px 32px rgba(31, 38, 135, 0.2);"
                >
                  <div class="rounded-full overflow-hidden w-32 h-32 md:w-40 md:h-40 border-4 border-white/30">
                    <img
                      :src="fromFlagSrc"
                      :alt="currencyFrom"
                      class="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              <!-- USA Flag (Right) - Overlapping -->
              <div class="relative z-20 -ml-6 md:-ml-8">
                <div 
                  class="rounded-full p-4 md:p-6"
                  style="background: linear-gradient(180deg, rgba(124, 223, 197, 0.5) 0%, rgba(133, 201, 229, 0.5) 100%); backdrop-filter: blur(20px); box-shadow: 0 8px 32px rgba(31, 135, 135, 0.2);"
                >
                  <div class="rounded-full overflow-hidden w-36 h-36 md:w-44 md:h-44 border-4 border-white/30">
                    <img
                      :src="toFlagSrc"
                      :alt="currencyTo"
                      class="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- Stand Base -->
            <div class="relative z-0 transform scale-110 md:scale-125 lg:scale-135 origin-bottom">
              <img
                src="~/assets/images/stand.svg"
                alt="stand"
                class="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AppHeroBanner',
  props: {
    title: {
      type: String,
      default: 'Valor del dolar hoy'
    },
    currencyFrom: {
      type: String,
      default: 'CLP'
    },
    currencyTo: {
      type: String,
      default: 'USD'
    },
    rate: {
      type: [String, Number],
      default: '987,62'
    },
    date: {
      type: String,
      default: 'martes 31 de octubre'
    },
    time: {
      type: String,
      default: '17:51 UTC'
    }
  },
  computed: {
    formattedRate() {
      return this.rate
    },
    formattedDate() {
      return `Tipo de cambio para ${this.date} a las ${this.time}`
    },
    fromFlagSrc() {
      // Mapear código de moneda a bandera
      const flagMap = {
        'USD': require('~/assets/images/united-states-of-america.svg'),
        'CLP': require('~/assets/images/chile.svg'),
        'PEN': require('~/assets/images/peru.svg')
      }
      return flagMap[this.currencyFrom] || require('~/assets/images/chile.svg')
    },
    toFlagSrc() {
      // Mapear código de moneda a bandera
      const flagMap = {
        'USD': require('~/assets/images/united-states-of-america.svg'),
        'CLP': require('~/assets/images/chile.svg'),
        'PEN': require('~/assets/images/peru.svg')
      }
      return flagMap[this.currencyTo] || require('~/assets/images/united-states-of-america.svg')
    }
  }
}
</script>

<style scoped>
/* Estilos para el componente */
</style>

<template>
  <nav id="site-navbar"
    class="fixed top-0 left-0 right-0 w-full z-[999] flex md:z-[99] xl:h-[100px] bg-global-blue transition-all duration-500 ease-out"
    :style="{
      transform: isScrolled ? 'translateY(0)' : 'translateY(-100%)'
    }">
    <div class="container mx-auto px-4 lg:px-12">
      <div class="flex h-full items-center py-3 xl:py-0">
        <!-- Logo -->
        <div>
          <NuxtLink to="/precio/peso-chileno" class="nuxt-link-active">
            <img src="~/assets/images/text-right.svg" width="124" height="24" alt="Global66" loading="lazy"
              class="mt-1 h-7 w-auto md:mt-0 md:h-8" />
          </NuxtLink>
        </div>

        <!-- Theme - PERSONAS y EMPRESAS -->
        <div class="theme ml-4 hidden h-full pl-3 xl:flex">
          <div class="navbar-theme-links flex h-full gap-4">
            <a href="/"
              class="relative flex flex-col items-center justify-center font-semibold nuxt-link-active active text-global-green personas pb-1">
              PERSONAS
            </a>
            <a href="/empresas"
              class="relative flex flex-col items-center justify-center font-semibold text-white personas px-3 pb-1">
              EMPRESAS
            </a>
          </div>
        </div>

        <!-- Links -->
        <div class="links ml-auto mr-1 hidden items-center gap-6 border-r border-[#9ba9d0] pr-7 xl:flex">
          <div class="items flex gap-6">
            <!-- Productos Dropdown -->
            <div class="relative" @mouseenter="showProductos = true" @mouseleave="showProductos = false">
              <button class="relative inline-block cursor-pointer font-semibold text-white hover:text-white-dark">
                <div class="flex gap-2">
                  Productos
                  <img src="/misc/caret-white.svg" width="10" height="8" alt="caret" class="relative top-px"
                    :class="{ 'rotate-180': showProductos }" />
                </div>
              </button>

              <!-- Dropdown Productos -->
              <transition name="fade">
                <div v-if="showProductos"
                  class="absolute left-0 mt-2 w-screen max-w-md overflow-hidden rounded-xl bg-white leading-6 shadow-xl z-[995]">
                  <div class="p-4 grid grid-cols-1">
                    <a href="#"
                      class="group relative flex items-start gap-x-6 rounded-lg px-4 py-5 hover:bg-neutral-50">
                      <div class="flex-shrink-0">
                        <img src="~/assets/images/cuenta-global.svg" width="50" height="50" alt="cuenta-global" loading="lazy" /> 
                      </div>
                      <div class="flex flex-col gap-1">
                        <span class="text-sm font-bold text-black">Cuenta Global</span>
                        <p class="text-xs font-medium text-gray-600">
                          Maneja tu dinero hasta en 8 monedas distintas y 100% online
                        </p>
                      </div>
                    </a>
                    <a href="#"
                      class="group relative flex items-start gap-x-6 rounded-lg px-4 py-5 hover:bg-neutral-50">
                      <div class="flex-shrink-0">
                        <img src="~/assets/images/tarjeta.svg" width="50" height="50" alt="tarjeta-mastercard" loading="lazy" />
                      </div>
                      <div class="flex flex-col gap-1">
                        <span class="text-sm font-bold text-black">Tarjeta Mastercard</span>
                        <p class="text-xs font-medium text-gray-600">
                          Paga en cualquier moneda con un tipo de cambio real
                        </p>
                      </div>
                    </a>
                    <a href="#"
                      class="group relative flex items-start gap-x-6 rounded-lg px-4 py-5 hover:bg-neutral-50">
                      <div class="flex-shrink-0">
                        <img src="~/assets/images/transferencias-internacionales.svg" width="50" height="50" alt="transferencias-internacionales" loading="lazy" />
                      </div>
                      <div class="flex flex-col gap-1">
                        <span class="text-sm font-bold text-black">Transferencias Internacionales</span>
                        <p class="text-xs font-medium text-gray-600">
                          Envía dinero a +70 países al mejor precio
                        </p>
                      </div>
                    </a>
                  </div>
                </div>
              </transition>
            </div>

            <!-- Beneficios Dropdown -->
            <div class="relative" @mouseenter="showBeneficios = true" @mouseleave="showBeneficios = false">
              <button class="relative inline-block cursor-pointer font-semibold text-white hover:text-white-dark">
                <div class="flex gap-2">
                  Beneficios
                  <img src="/misc/caret-white.svg" width="10" height="8" alt="caret" class="relative top-px"
                    :class="{ 'rotate-180': showBeneficios }" />
                </div>
              </button>

              <!-- Dropdown Beneficios -->
              <transition name="fade">
                <div v-if="showBeneficios"
                  class="absolute left-0 mt-2 w-screen max-w-md overflow-hidden rounded-xl bg-white leading-6 shadow-xl z-[995]">
                  <div class="p-4 grid grid-cols-1">
                    <a href="#"
                      class="group relative flex items-start gap-x-6 rounded-lg px-4 py-5 hover:bg-neutral-50">
                      <div class="flex-shrink-0">
                        <img src="~/assets/images/beneficios-globales.svg" width="50" height="50" alt="beneficios-globales" loading="lazy" />
                      </div>
                      <div class="flex flex-col gap-1">
                        <span class="text-sm font-bold text-black">Beneficios Globales</span>
                        <p class="text-xs font-medium text-gray-600">
                          Disfruta de beneficios únicos para ti
                        </p>
                      </div>
                    </a>
                    <a href="#"
                      class="group relative flex items-start gap-x-6 rounded-lg px-4 py-5 hover:bg-neutral-50">
                      <div class="flex-shrink-0">
                        <img src="~/assets/images/invita-y-gana.svg" width="50" height="50" alt="invita-y-gana" loading="lazy" />
                      </div>
                      <div class="flex flex-col gap-1">
                        <span class="text-sm font-bold text-black">Invita y Gana</span>
                        <p class="text-xs font-medium text-gray-600">
                          Gana dólares invitando amigos
                        </p>
                      </div>
                    </a>
                  </div>
                </div>
              </transition>
            </div>

            <!-- Ayuda -->
            <a href="https://ayuda.global66.com/" target="_blank"
              class="relative inline-block cursor-pointer font-semibold text-white hover:text-white-dark">
              Ayuda
            </a>
          </div>

          <!-- Country Selector -->
          <div class="country-selector hidden md:!-mr-2 xl:flex">
            <div class="relative" @click="showCountries = !showCountries" v-click-outside="closeCountries">
              <button class="flex items-center space-x-4 lg:space-x-2">
                <img :src="selectedCountry.flag" width="30" height="30" :alt="selectedCountry.name" />
                <p class="text-sm font-semibold xl:hidden text-white">{{ selectedCountry.name }}</p>
                <img src="/misc/caret-white.svg" width="10" height="8" alt="caret" loading="lazy"
                  class="relative top-px" :class="{ 'rotate-180': showCountries }" />
              </button>

              <!-- Dropdown Countries -->
              <transition name="fade">
                <div v-if="showCountries"
                  class="absolute right-0 mt-2 bg-white rounded-lg shadow-xl py-2 z-[995] min-w-[200px]">
                  <NuxtLink 
                    v-for="country in countries" 
                    :key="country.slug"
                    :to="`/precio/${country.slug}`"
                    @click.native="selectCountry(country)"
                    class="flex w-full items-center space-x-4 py-3 px-4 hover:bg-neutral-50 lg:py-2"
                    :class="{ 'bg-blue-50': selectedCountry.slug === country.slug }">
                    <img :src="country.flag" width="20" height="20" :alt="country.name" loading="lazy" />
                    <span class="text-sm font-semibold text-black">{{ country.name }}</span>
                  </NuxtLink>
                </div>
              </transition>
            </div>
          </div>
        </div>

        <!-- CTAs -->
        <div class="ctas ml-auto inline-flex items-center space-x-4 xl:ml-4">
          <div class="flex items-center space-x-3 md:space-x-5">
            <div class="flex items-center space-x-3 md:space-x-5">
              <!-- Iniciar sesión -->
              <a href="#" target="_blank"
                class="inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap border-2 text-center text-sm font-semibold md:!inline-flex hover:border-b2c-blue-25 py-2 border-transparent hover:border-transparent text-white mr-2">
                Iniciar sesión
              </a>

              <!-- Crear cuenta -->
              <div class="relative !hidden md:!inline-block" @click="showCreateAccount = !showCreateAccount"
                v-click-outside="closeCreateAccount">
                <button
                  class="inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap border-2 text-center text-sm font-semibold text-global-blue-dark bg-white hover:bg-b2c-blue-25 border-white hover:border-b2c-blue-25 py-2 px-4 rounded-full">
                  Crear cuenta
                </button>

                <!-- Dropdown Crear cuenta -->
                <transition name="fade">
                  <div v-if="showCreateAccount"
                    class="absolute right-0 mt-2 bg-white rounded-lg shadow-xl divide-y divide-neutral z-[995]">
                    <a href="#" target="_blank"
                      class="flex gap-x-3 px-8 py-6 text-xs font-medium text-neutral-500 hover:bg-neutral whitespace-nowrap">
                      <svg class="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 8a3 3 0 100-6 3 3 0 000 6zM8 9a5 5 0 00-5 5v1h10v-1a5 5 0 00-5-5z" />
                      </svg>
                      Cuenta personas
                    </a>
                    <a href="#" target="_blank"
                      class="flex gap-x-3 px-8 py-6 text-xs font-medium text-neutral-500 hover:bg-neutral whitespace-nowrap">
                      <svg class="w-4 h-5" viewBox="0 0 16 20" fill="currentColor">
                        <path d="M2 4h12v12H2V4zm1 1v10h10V5H3z" />
                      </svg>
                      Cuenta empresas
                    </a>
                  </div>
                </transition>
              </div>
            </div>

            <!-- Burger Menu -->
            <button class="burger-menu xl:hidden" @click="mobileMenuOpen = !mobileMenuOpen">
              <img src="/misc/burger-menu-icon-white.svg" width="25" height="18" alt="menu" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <transition name="slide">
      <div v-if="mobileMenuOpen" class="fixed inset-0 z-[1000] xl:hidden">
        <!-- Backdrop -->
        <div class="fixed inset-0 bg-black bg-opacity-50" @click="mobileMenuOpen = false"></div>

        <!-- Side Menu -->
        <div class="fixed bottom-0 top-0 left-0 z-10 w-full overflow-y-auto px-6 py-6 sm:max-w-sm bg-white h-screen">
          <div class="flex flex-col gap-6">
            <!-- Header -->
            <div class="flex items-center justify-between">
              <nuxt-link to="/" class="-m-1.5 p-1.5">
                <img src="~/assets/images/iso-default.svg" width="48" height="48" alt="Global66" loading="lazy"
                  class="w-10 h-10" />
              </nuxt-link>
              <button type="button" class="text-gray-700 -m-2.5 rounded-md p-2.5" @click="mobileMenuOpen = false">
                <svg aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"
                  class="h-6 w-6">
                  <path d="M6 18L18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
              </button>
            </div>

            <!-- Theme Links -->
            <div class="navbar-theme-links flex gap-4 border-b border-gray-200">
              <a href="/"
                class="relative flex flex-grow flex-col items-center justify-center font-semibold text-sm active text-global-blue personas inverted pb-3">
                PERSONAS
              </a>
              <a href="/empresas"
                class="relative flex flex-grow flex-col items-center justify-center font-semibold text-sm text-gray-600 personas inverted pb-3">
                EMPRESAS
              </a>
            </div>
          </div>

          <!-- Mobile Links -->
          <div class="mt-6 flow-root">
            <div class="-my-6 divide-y divide-neutral-200">
              <div class="min-h-[200px] space-y-2 py-6">
                <!-- Productos Mobile -->
                <div>
                  <button type="button"
                    class="flex w-full items-center justify-between py-4 text-base font-bold text-black"
                    @click="showProductosMobile = !showProductosMobile">
                    Productos
                    <svg aria-hidden="true" fill="#3F5EDF" viewBox="0 0 20 20"
                      class="h-6 w-6 flex-none transition-transform" :class="{ 'rotate-180': showProductosMobile }">
                      <path clip-rule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        fill-rule="evenodd"></path>
                    </svg>
                  </button>
                  <transition name="collapse">
                    <div v-if="showProductosMobile" class="flex flex-col gap-4 pb-3 pl-3">
                      <a href="#" class="text-sm font-semibold text-black py-2">Cuenta Global</a>
                      <a href="#" class="text-sm font-semibold text-black py-2">Tarjeta Mastercard</a>
                      <a href="#" class="text-sm font-semibold text-black py-2">Transferencias Internacionales</a>
                    </div>
                  </transition>
                </div>

                <!-- Beneficios Mobile -->
                <div>
                  <button type="button"
                    class="flex w-full items-center justify-between py-4 text-base font-bold text-black"
                    @click="showBeneficiosMobile = !showBeneficiosMobile">
                    Beneficios
                    <svg aria-hidden="true" fill="#3F5EDF" viewBox="0 0 20 20"
                      class="h-6 w-6 flex-none transition-transform" :class="{ 'rotate-180': showBeneficiosMobile }">
                      <path clip-rule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        fill-rule="evenodd"></path>
                    </svg>
                  </button>
                  <transition name="collapse">
                    <div v-if="showBeneficiosMobile" class="flex flex-col gap-4 pb-3 pl-3">
                      <a href="#" class="text-sm font-semibold text-black py-2">Beneficios Globales</a>
                      <a href="#" class="text-sm font-semibold text-black py-2">Invita y Gana</a>
                    </div>
                  </transition>
                </div>

                <!-- Ayuda Mobile -->
                <a href="https://ayuda.global66.com/" target="_blank"
                  class="relative block cursor-pointer py-4 text-base font-bold text-black">
                  Ayuda
                </a>
              </div>

              <!-- Bottom Section Mobile -->
              <div class="flex flex-col gap-6 py-6">
                <!-- Country Selector Mobile -->
                <div class="flex country-selector">
                  <button class="flex items-center space-x-4 lg:space-x-2" @click="showCountriesMobile = !showCountriesMobile">
                    <img :src="selectedCountry.flag" width="30" height="30" :alt="selectedCountry.name" />
                    <p class="text-sm font-semibold text-black-light">{{ selectedCountry.name }}</p>
                    <img src="/misc/caret-b2c.svg" width="10" height="8" alt="caret" loading="lazy"
                      class="relative top-px" :class="{ 'rotate-180': showCountriesMobile }" />
                  </button>
                </div>

                <!-- Dropdown Countries Mobile -->
                <transition name="collapse">
                  <div v-if="showCountriesMobile" class="flex flex-col gap-2 pl-3">
                    <NuxtLink 
                      v-for="country in countries" 
                      :key="country.slug"
                      :to="`/precio/${country.slug}`"
                      @click.native="selectCountry(country)"
                      class="flex items-center space-x-3 py-2 hover:bg-neutral-50 rounded"
                      :class="{ 'bg-blue-50': selectedCountry.slug === country.slug }">
                      <img :src="country.flag" width="24" height="24" :alt="country.name" loading="lazy" />
                      <span class="text-sm font-semibold text-black">{{ country.name }}</span>
                    </NuxtLink>
                  </div>
                </transition>

                <!-- CTA Mobile -->
                <div class="flex flex-col gap-4">
                  <button
                    class="inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap border-2 text-center text-sm font-semibold w-full bg-global-blue hover:bg-global-blue-dark border-global-blue hover:border-global-blue-dark text-white py-4 px-8 rounded-full">
                    Crea Tu Cuenta Global
                  </button>

                  <!-- WhatsApp Contact -->
                  <a href="https://wa.me/56233048905" target="_blank"
                    class="inline-flex cursor-pointer items-center justify-center gap-2 text-sm font-semibold text-global-green hover:text-green-700 transition-colors">
                    <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path
                        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Contacto Whatsapp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script>
export default {
  name: 'AppNavBar',
  data() {
    return {
      showProductos: false,
      showBeneficios: false,
      showCountries: false,
      showCountriesMobile: false,
      showCreateAccount: false,
      showProductosMobile: false,
      showBeneficiosMobile: false,
      mobileMenuOpen: false,
      isScrolled: true,
      hasScrolledDown: false,
      scrollThreshold: 100,
      scrollTimer: null,
      countries: [
        {
          slug: 'peso-chileno',
          name: 'Chile',
          flag: require('~/assets/images/chile.svg')
        },
        {
          slug: 'sol-peruano',
          name: 'Perú',
          flag: require('~/assets/images/peru.svg')
        },
        {
          slug: 'peso-argentino',
          name: 'Argentina',
          flag: require('~/assets/images/ar.svg')
        }
      ],
      currentCountrySlug: 'peso-chileno'
    }
  },
  computed: {
    selectedCountry() {
      // Detectar país desde la ruta actual
      const slug = this.$route?.params?.slug || this.currentCountrySlug
      return this.countries.find(c => c.slug === slug) || this.countries[0]
    }
  },
  mounted() {
    if (process.client) {
      // El navbar empieza visible
      this.isScrolled = true

      window.addEventListener('scroll', this.handleScroll, { passive: true })
    }
  },
  beforeDestroy() {
    if (process.client) {
      window.removeEventListener('scroll', this.handleScroll)
    }
  },
  directives: {
    'click-outside': {
      bind(el, binding) {
        el.clickOutsideEvent = function (event) {
          if (!(el === event.target || el.contains(event.target))) {
            binding.value(event)
          }
        }
        document.body.addEventListener('click', el.clickOutsideEvent)
      },
      unbind(el) {
        document.body.removeEventListener('click', el.clickOutsideEvent)
      }
    }
  },
  methods: {
    selectCountry(country) {
      this.currentCountrySlug = country.slug
      this.showCountries = false
      this.showCountriesMobile = false
      this.mobileMenuOpen = false
    },
    closeCountries() {
      this.showCountries = false
    },
    closeCreateAccount() {
      this.showCreateAccount = false
    },
    handleScroll() {
      const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop

      // Si estamos en el tope, resetear el estado para que el efecto pueda volver a ocurrir
      if (currentScrollPosition <= this.scrollThreshold) {
        this.isScrolled = true
        this.hasScrolledDown = false
        // Limpiar el timer si existe
        if (this.scrollTimer) {
          clearTimeout(this.scrollTimer)
          this.scrollTimer = null
        }
        return
      }

      // Si ya se hizo el efecto una vez, mantener el navbar visible
      if (this.hasScrolledDown) {
        this.isScrolled = true
        return
      }

      // Primera vez que hace scroll más allá del threshold - hacer el efecto
      if (!this.hasScrolledDown) {
        // Ocultar el navbar inmediatamente (sube)
        this.isScrolled = false

        // Limpiar el timer anterior si existe
        if (this.scrollTimer) {
          clearTimeout(this.scrollTimer)
        }

        // Después de 400ms, hacer que baje y se quede fixed
        this.scrollTimer = setTimeout(() => {
          this.isScrolled = true
          this.hasScrolledDown = true
        }, 400)
      }
    }
  }
}
</script>

<style scoped>
/* Theme Links */
.navbar-theme-links {
  height: 100%;
}

.navbar-theme-links a {
  position: relative;
}

/* Active state - Borde verde debajo de PERSONAS */
.navbar-theme-links a.active::after {
  content: '';
  position: absolute;
  bottom: 30px;
  left: 0;
  right: 0;
  height: 3px;
  background-color: #00c48c;
}

/* Active state inverted (mobile - texto azul con línea azul) */
.navbar-theme-links a.active.inverted::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background-color: #1f49b6;
}

/* Hover states */
.text-white-dark {
  color: rgba(255, 255, 255, 0.8);
}

/* Animación fade para dropdowns */
.fade-enter-active {
  transition: opacity 0.2s ease-out, transform 0.2s ease-out;
}

.fade-leave-active {
  transition: opacity 0.15s ease-in;
}

.fade-enter {
  opacity: 0;
  transform: translateY(-8px);
}

.fade-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.fade-leave {
  opacity: 1;
}

.fade-leave-to {
  opacity: 0;
}

/* Animación slide para menú móvil - Desde la izquierda */
.slide-enter-active {
  transition: transform 0.3s ease-out;
}

.slide-leave-active {
  transition: transform 0.25s ease-in;
}

.slide-enter {
  transform: translateX(-100%);
}

.slide-enter-to {
  transform: translateX(0);
}

.slide-leave {
  transform: translateX(0);
}

.slide-leave-to {
  transform: translateX(-100%);
}

/* Animación collapse para acordeones móviles */
.collapse-enter-active,
.collapse-leave-active {
  transition: max-height 0.3s ease, opacity 0.3s ease;
  max-height: 500px;
  overflow: hidden;
}

.collapse-enter,
.collapse-leave-to {
  max-height: 0;
  opacity: 0;
}

/* Rotate transition */
.rotate-180 {
  transform: rotate(180deg);
  transition: transform 0.2s ease;
}
</style>

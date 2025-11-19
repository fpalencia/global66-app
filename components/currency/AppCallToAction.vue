<template>
  <section class="py-12 md:py-20 lg:py-28 overflow-x-visible">
    <div class="container mx-auto px-2 md:px-4 lg:px-12">
      <div class="relative overflow-visible">
        <!-- Card Container con overflow visible para que la imagen sobresalga -->
        <div class="bg-global-light rounded-3xl shadow-xl overflow-visible">
          <div class="flex flex-col lg:flex-row items-center">
            
            <!-- Banner Image - Primero en móvil, segundo en desktop -->
            <div class="flex-1 relative lg:-mr-16 xl:-mr-24 lg:-my-8 order-3 lg:order-2 pt-8 lg:pt-0 -mb-8 md:-mb-12">
              <div class="relative w-full px-8 lg:px-0 lg:pr-0">
                <img
                  src="~/assets/images/banner-img.png"
                  alt="Global66 App - Teléfonos y tarjeta"
                  class="w-full h-auto object-contain scale-120 md:scale-110 lg:scale-110"
                  style="max-width: 500px;"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>

            <!-- Text Content - Segundo en móvil, primero en desktop -->
            <div class="flex-1 px-8 md:px-12 lg:px-16 py-8 lg:py-20 space-y-4 lg:space-y-6 text-left order-1 lg:order-1">
              <!-- Main Heading -->
              <h2 class="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                <span class="text-gray-800">Sé Global,</span>
                <br>
                <span class="text-global-blue-dark">paga como local</span>
              </h2>

              <!-- Description -->
              <p class="text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed">
                Tu Cuenta Global para pagar, convertir, enviar dinero y más.
              </p>

              <!-- App Store Buttons - Solo visible en desktop -->
              <div class="hidden lg:flex flex-row justify-start pt-4">
                <!-- Google Play Button -->
                <a 
                  href="https://play.google.com/store/apps/details?id=com.global66" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="inline-flex items-center justify-center text-white rounded-lg mr-2"
                >
                  <img 
                    src="~/assets/images/playstore.svg" 
                    alt="Google Play" 
                    class="h-10 w-auto"
                    loading="lazy"
                    decoding="async"
                  />
                </a>

                <!-- App Store Button -->
                <a 
                  href="https://apps.apple.com/app/global66/id1234567890" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="inline-flex items-center justify-center text-white rounded-lg"
                >
                  <img 
                    src="~/assets/images/appstore.svg" 
                    alt="App Store" 
                    class="h-10 w-auto"
                    loading="lazy"
                    decoding="async"
                  />
                </a>
              </div>
            </div>

            <!-- App Store Buttons - Solo visible en mobile, al final -->
            <div class="flex lg:hidden flex-row gap-3 justify-center px-8 order-2">
              <!-- Google Play Button -->
              <a 
                href="https://play.google.com/store/apps/details?id=com.global66" 
                target="_blank" 
                rel="noopener noreferrer"
                class="inline-flex items-center justify-center text-white rounded-lg"
              >
                <img 
                  src="~/assets/images/playstore.svg" 
                  alt="Google Play" 
                  class="h-10 w-auto"
                />
              </a>

              <!-- App Store Button -->
              <a 
                href="https://apps.apple.com/app/global66/id1234567890" 
                target="_blank" 
                rel="noopener noreferrer"
                class="inline-flex items-center justify-center text-white rounded-lg"
              >
                <img 
                  src="~/assets/images/appstore.svg" 
                  alt="App Store" 
                  class="h-10 w-auto"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AppCallToAction'
}
</script>


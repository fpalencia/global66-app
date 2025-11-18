/**
 * Configuración de TailwindCSS para Global66 App
 *
 * Define los colores corporativos, breakpoints y purge para optimización
 */

module.exports = {
  // Configuración de content para Tailwind v3
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}'
  ],

  theme: {
    extend: {
      // Colores corporativos de Global66 (actualizados desde diseño)
      colors: {
        'global-blue': '#1f49b6', // Azul principal (navbar, hero) - Figma
        'global-blue-dark': '#102a97', // Azul oscuro para textos
        'global-green': '#00c48c', // Verde acento - Figma
        'global-light': '#f5f7fe', // Fondo claro/gris - Figma
        'global-dark': '#221c1c', // Texto oscuro - Figma
        'global-gray': '#565656', // Gris para textos secundarios
        'global-border': '#9ba9d0' // Color de bordes
      },

      // Fuentes personalizadas - Montserrat desde Figma
      fontFamily: {
        sans: ['Montserrat', 'Inter', 'system-ui', '-apple-system', 'sans-serif']
      },

      // Espaciado personalizado
      spacing: {
        128: '32rem',
        144: '36rem'
      },

      // Border radius personalizado
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem'
      },

      // Box shadow personalizado
      boxShadow: {
        global: '0 10px 40px rgba(43, 79, 217, 0.1)',
        'global-lg': '0 20px 60px rgba(43, 79, 217, 0.15)'
      },

      // Animaciones personalizadas
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'slide-in': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' }
        }
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-in': 'slide-in 0.3s ease-out'
      }
    }
  },

  // Variants para diferentes estados
  variants: {
    extend: {
      opacity: ['disabled'],
      cursor: ['disabled'],
      backgroundColor: ['active', 'disabled'],
      textColor: ['active', 'disabled']
    }
  },

  // Plugins de Tailwind
  plugins: []
}


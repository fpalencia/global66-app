# Global66 App Prueba Técnica — Lead Web Frontend 🌎

Aplicación web de Global66 para consultar tipos de cambio, enviar dinero y gestionar suscripciones. Desarrollada con Nuxt.js 2, Tailwind CSS y una API Express integrada.

## 🎨 Diseño

- **Figma**: [Enlace al diseño](https://www.figma.com/design/wPCZTJ7F1phT5XhJMgaubw/Figma-Global66?node-id=0-1&m=dev&t=tW2M1qTTJCVFcsyk-1)

## 🚀 Tecnologías

### Frontend
- **Nuxt.js 2.18.1** - Framework Vue.js con SSR (Server-Side Rendering)
- **Vue.js 2.7.10** - Framework JavaScript progresivo
- **Tailwind CSS 3.4.1** - Framework CSS de utilidades
- **TypeScript 5.9.3** - Superset de JavaScript con tipado estático

### Backend/API
- **Express 4.18.2** - Framework web para Node.js
- **Google Sheets API** - Integración con Google Spreadsheets
- **Google Auth Library** - Autenticación con Google Service Account

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js**: `16.x` o superior (recomendado: `18.x`)
- **npm**: `8.x` o superior (incluido con Node.js)
- **Git**: Para clonar el repositorio

Verifica tu versión de Node.js:
```bash
node --version
```

## 📁 Estructura del Proyecto

```
global66-app/
├── api/                      # API Express (Backend)
│   ├── index.ts             # Servidor Express principal
│   ├── routes/              # Rutas de la API
│   │   ├── rates.ts        # Endpoint de tipos de cambio
│   │   └── subscribe.ts    # Endpoint de suscripciones
│   └── services/           # Servicios y lógica de negocio
│       └── googleSheets.ts # Integración con Google Sheets
├── assets/                  # Recursos estáticos (CSS, imágenes)
│   ├── css/
│   └── images/
├── components/              # Componentes Vue reutilizables
│   ├── commons/            # Componentes comunes
│   └── currency/           # Componentes de divisas
├── layouts/                # Layouts de Nuxt
│   ├── default.vue         # Layout por defecto
│   └── error.vue           # Página de error
├── pages/                  # Páginas de la aplicación (rutas)
│   ├── index.vue           # Página principal
│   └── precio/             # Páginas de precios
│       ├── index.vue
│       └── _slug.vue       # Página dinámica de divisas
├── interfaces/             # Interfaces TypeScript
├── utils/                  # Utilidades y helpers
├── static/                 # Archivos estáticos públicos
├── nuxt.config.js         # Configuración de Nuxt
├── tailwind.config.js     # Configuración de Tailwind
├── package.json           # Dependencias y scripts
└── vercel.json            # Configuración de Vercel
```

## 🛠️ Instalación

### 1. Clonar el Repositorio

```bash
git clone https://github.com/tu-usuario/global66-app.git
cd global66-app
```

### 2. Instalar Dependencias

```bash
npm install
```

## ⚙️ Configuración

### 1. Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto copiando el archivo de ejemplo:

```bash
cp .env-example .env
```

### 2. Configurar Google Sheets API

Para que funcione la integración con Google Sheets, necesitas:

1. **Google Spreadsheet ID**: ID de tu hoja de cálculo de Google
2. **Service Account Email**: Email de la cuenta de servicio de Google
3. **Private Key**: Clave privada de la cuenta de servicio

Edita el archivo `.env` con tus credenciales:

```env
# Google Sheets Configuration
GOOGLE_SPREADSHEET_ID=tu-spreadsheet-id-aqui
GOOGLE_SERVICE_ACCOUNT_EMAIL=tu-service-account@tu-proyecto.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nTU_CLAVE_PRIVADA_AQUI\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_NAME=Suscripciones

# Server Configuration
PORT=3000
NODE_ENV=development
BASE_URL=http://localhost:3000
```

#### 📊 Google Spreadsheet Público

- **Enlace al Spreadsheet**: [Ver Spreadsheet](https://docs.google.com/spreadsheets/d/1KpgC44m_b0b7jpJmQsqsBa-O_hKaPDYjTUx64wXn9pM/edit#gid=0)

#### 🔑 Cómo Obtener las Credenciales de Google

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita la API de Google Sheets
4. Ve a "Credenciales" → "Crear credenciales" → "Cuenta de servicio"
5. Descarga el archivo JSON con las credenciales
6. Copia el `client_email` y `private_key` al archivo `.env`
7. Comparte tu Google Sheet con el email de la cuenta de servicio

## 🚀 Ejecución

### Modo Desarrollo

Inicia el servidor de desarrollo con hot-reload:

```bash
npm run dev
```

La aplicación estará disponible en: **http://localhost:3000**

- Frontend: `http://localhost:3000`
- API: `http://localhost:3000/api`

### Modo Producción

#### 1. Construir la Aplicación

```bash
npm run build
```

#### 2. Iniciar el Servidor de Producción

```bash
npm start
```

### Generar Sitio Estático

Para generar una versión estática del sitio:

```bash
npm run generate
```

Los archivos estáticos se generarán en la carpeta `dist/`.

## 📜 Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo en modo hot-reload |
| `npm run build` | Construye la aplicación para producción |
| `npm start` | Inicia el servidor de producción |
| `npm run generate` | Genera el sitio estático (SSG) |

## 🌐 API Endpoints

La API está disponible en `/api` y proporciona los siguientes endpoints:

### **GET** `/api/rates`

Obtiene los tipos de cambio de divisas actuales.

**Query Parameters (opcionales):**
- `base`: Moneda base (default: `USD`). Valores soportados: `USD`, `CLP`, `PEN`, `ARS`, `BRL`, `MXN`, `COP`, `EUR`, `GBP`
- `target`: Moneda objetivo (opcional)

**Ejemplos de uso con curl:**

```bash
# Obtener todos los tipos de cambio (base USD por defecto)
curl -X GET "http://localhost:3000/api/rates"

# Obtener tipos de cambio con moneda base específica
curl -X GET "http://localhost:3000/api/rates?base=CLP"

# Obtener tipos de cambio con moneda base y objetivo
curl -X GET "http://localhost:3000/api/rates?base=USD&target=EUR"
```

**Respuesta:**
```json
{
  "success": true,
  "base": "USD",
  "rates": {
    "USD": 1.0,
    "CLP": 987.62,
    "PEN": 3.81,
    "ARS": 1025.5,
    "BRL": 5.42,
    "MXN": 17.15,
    "COP": 4125.0,
    "EUR": 0.92,
    "GBP": 0.79
  },
  "target": null,
  "asOf": "2024-01-15T10:30:00.000Z"
}
```

### **POST** `/api/subscribe`

Registra una nueva suscripción de usuario en Google Sheets.

**Body (JSON):**
```json
{
  "name": "Maria Gonzalez",
  "email": "maria.gonzalez@ejemplo.com"
}
```

**Ejemplos de uso con curl:**

```bash
# Suscripción básica
curl -X POST "http://localhost:3000/api/subscribe" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Maria Gonzalez",
    "email": "maria.gonzalez@ejemplo.com"
  }'
```

**Respuesta exitosa (201):**
```json
{
  "success": true,
  "message": "¡Gracias por suscribirte! Te mantendremos informado sobre los mejores tipos de cambio.",
  "data": {
    "name": "Maria Gonzalez",
    "email": "maria.gonzalez@ejemplo.com"
  }
}
```

**Respuesta de error (400):**
```json
{
  "success": false,
  "error": "Email inválido",
  "message": "Por favor proporciona un email válido"
}
```

## 🎨 Estilos y Diseño

- **Framework CSS**: Tailwind CSS
- **Fuente**: Montserrat (Google Fonts)
- **Sistema de diseño**: Componentes modulares con Vue
- **Responsive**: Mobile-first approach

## 🔧 Configuración Adicional

### TypeScript

El proyecto usa TypeScript para type safety. La configuración está en `tsconfig.json`.

### Tailwind CSS

Configuración personalizada en `tailwind.config.js` con:
- Colores personalizados de Global66
- Breakpoints responsivos
- Fuentes personalizadas

## 📝 Notas Importantes

- **SSR (Server-Side Rendering)**: La aplicación usa SSR para mejor SEO y rendimiento
- **API Integrada**: La API Express está integrada como serverMiddleware de Nuxt
- **Google Sheets**: Se usa como base de datos simple para suscripciones
- **Seguridad**: Las credenciales sensibles deben estar en `.env` (nunca en el código)

## 📚 Documentación Adicional

- **[Growth Thinking](./GROWTH_THINKING.md)** - Análisis de métricas, optimizaciones y estrategias de crecimiento para la página `/precio/*`

## 📄 Licencia

Este proyecto es privado y pertenece a Global66.

## 📧 Contacto

**Global66** - [https://global66.com](https://global66.com)

---

**Hecho con ❤️ por el equipo de Global66**

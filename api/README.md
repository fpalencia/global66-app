# API de Global66

Arquitectura modular de la API con separación de responsabilidades.

## 📁 Estructura

```
api/
├── index.ts                    # Servidor principal (orquestador)
├── routes/                     # Rutas de la API
│   ├── rates.ts               # Endpoints de tipos de cambio
│   └── subscribe.ts           # Endpoints de suscripciones
└── services/                   # Servicios externos
    └── googleSheets.ts        # Integración con Google Sheets
```

## 🚀 Endpoints Disponibles

### GET /api/rates
Obtiene los tipos de cambio actuales.

**Query Parameters:**
- `base` (string, opcional): Moneda base (default: 'USD')
- `target` (string, opcional): Moneda objetivo

**Respuesta:**
```json
{
  "base": "USD",
  "rates": { "CLP": 987.62, "PEN": 3.81, ... },
  "target": "CLP",
  "asOf": "2025-11-18T10:30:00.000Z",
  "success": true
}
```

### POST /api/subscribe
Registra una nueva suscripción de usuario.

**Body:**
```json
{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "currency": "CLP"  // opcional
}
```

**Respuesta:**
```json
{
  "success": true,
  "message": "¡Gracias por suscribirte!",
  "data": {
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "currency": "CLP",
    "subscribedAt": "2025-11-18T10:30:00.000Z"
  }
}
```

## 🔧 Arquitectura

### index.ts
Archivo principal que:
- Configura middleware (JSON, logging)
- Monta las rutas modulares
- Maneja errores globales

### routes/
Cada archivo de ruta es independiente y contiene:
- Definición de endpoints
- Validaciones específicas
- Lógica de negocio

### services/
Servicios externos reutilizables:
- **googleSheets.ts**: Maneja toda la lógica de Google Sheets
  - Autenticación
  - Escritura de datos
  - Manejo de errores

## 🎯 Beneficios de esta Arquitectura

1. **Separación de Responsabilidades**: Cada módulo tiene un propósito claro
2. **Mantenibilidad**: Fácil encontrar y modificar código específico
3. **Testabilidad**: Cada módulo se puede probar independientemente
4. **Escalabilidad**: Agregar nuevos endpoints es simple
5. **Reutilización**: Los servicios pueden usarse en múltiples rutas

## 📝 Agregar Nuevas Rutas

1. Crear archivo en `api/routes/nombre-ruta.ts`
2. Definir el router y endpoints
3. Importar y montar en `api/index.ts`

Ejemplo:
```typescript
// api/routes/users.ts
import { Router } from 'express'
const router = Router()

router.get('/', (req, res) => {
  // lógica aquí
})

export default router

// api/index.ts
import usersRouter from './routes/users'
app.use('/users', usersRouter)
```

## 🔐 Variables de Entorno

Ver `.env-example` para configuración completa.

Requeridas para Google Sheets:
- `GOOGLE_SPREADSHEET_ID`
- `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- `GOOGLE_PRIVATE_KEY`
- `GOOGLE_SHEET_NAME` (opcional)


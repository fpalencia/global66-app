/**
 * Netlify Function para POST /api/subscribe
 * 
 * Esta función carga la ruta de subscribe usando ts-node para TypeScript
 */

require('ts-node/register')
const serverless = require('serverless-http')
const express = require('express')

// Cargar variables de entorno
require('dotenv').config()

// Crear app Express
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Importar y usar la ruta de subscribe
const subscribeRouter = require('../../api/routes/subscribe').default
app.use('/', subscribeRouter)

// Exportar como función serverless
exports.handler = serverless(app)


/**
 * Netlify Function para GET /api/rates
 * 
 * Esta función carga la ruta de rates usando ts-node para TypeScript
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

// Importar y usar la ruta de rates
const ratesRouter = require('../../api/routes/rates').default
app.use('/', ratesRouter)

// Exportar como función serverless
exports.handler = serverless(app)


// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const rsvpRoutes = require('./routes/rsvp.routes');
const adminRoutes = require('./routes/admin.routes');
const authRoutes = require('./routes/auth.routes');
const cleanupRoutes = require('./routes/cleanup.routes');

const app = express();

/* ########################################
   CORS manual (liberado para qualquer origem)
######################################## */
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  
  next();
});

/* ########################################
   Middlewares base
######################################## */
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ########################################
   Swagger
######################################## */
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Wedding API - Samuel & Patrícia',
      version: '1.0.0',
      description: 'API RESTful para gerenciamento de confirmações de casamento',
      contact: {
        name: 'Samuel & Patrícia',
        email: 'contato@samuelpatricia.com.br'
      }
    },
    servers: [
      {
        url: '/',
        description: 'Servidor Principal'
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Insira o token JWT obtido no endpoint /api/auth/login'
        }
      }
    }
  },
  apis: ['./routes/*.js', './models/*.js', './server.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Endpoint para servir o spec JSON
app.get('/api-docs-json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// Swagger UI com HTML customizado usando CDN
app.get('/api-docs', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Wedding API - Docs</title>
  <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5.10.5/swagger-ui.css">
  <style>
    .swagger-ui .topbar { display: none; }
    body { margin: 0; padding: 0; }
  </style>
</head>
<body>
  <div id="swagger-ui"></div>
  <script src="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5.10.5/swagger-ui-bundle.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5.10.5/swagger-ui-standalone-preset.js"></script>
  <script>
    window.onload = function() {
      const ui = SwaggerUIBundle({
        url: '/api-docs-json',
        dom_id: '#swagger-ui',
        deepLinking: true,
        presets: [
          SwaggerUIBundle.presets.apis,
          SwaggerUIStandalonePreset
        ],
        plugins: [
          SwaggerUIBundle.plugins.DownloadUrl
        ],
        layout: "StandaloneLayout"
      });
      window.ui = ui;
    };
  </script>
</body>
</html>
  `);
});

/* ########################################
   Routes
######################################## */

/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Health Check da API
 *     description: Verifica o status da API e conexão com MongoDB
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: API operacional
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                   example: 2026-01-06T00:00:00.000Z
 *                 mongodb:
 *                   type: string
 *                   enum: [connected, disconnected]
 *                   example: connected
 */
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok',
    timestamp: new Date().toISOString(),
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

app.use('/api/rsvps', rsvpRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/admin/cleanup', cleanupRoutes);
app.use('/api/auth', authRoutes);

/* ########################################
   Error handler global
######################################## */
app.use((err, req, res, next) => {
  console.error('Erro não tratado:', err);
  return res.status(err.status || 500).json({
    message: err.message || 'Erro interno no servidor',
  });
});

/* ########################################
   MongoDB + Start server
######################################## */
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI;

if (!MONGO_URI) {
  console.error('❌ MONGO_URI não definida nas variáveis de ambiente!');
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✅ Conectado ao MongoDB');
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 API rodando em http://localhost:${PORT}`);
      console.log(`📚 Swagger em http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((err) => {
    console.error('❌ Erro ao conectar ao MongoDB:', err);
    process.exit(1);
  });

module.exports = app;

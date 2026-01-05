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
      description: 'API para gerenciamento de confirmações de casamento',
    },
    servers: [
      {
        url: '/api',
      },
    ],
  },
  apis: ['./routes/*.js', './models/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Swagger UI com CDN para funcionar na Vercel
app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Wedding API - Docs',
  swaggerOptions: {
    url: '/api-docs-json', // Endpoint para o spec JSON
  },
  customCssUrl: 'https://cdn.jsdelivr.net/npm/swagger-ui-dist@5.10.5/swagger-ui.css',
  customJs: [
    'https://cdn.jsdelivr.net/npm/swagger-ui-dist@5.10.5/swagger-ui-bundle.js',
    'https://cdn.jsdelivr.net/npm/swagger-ui-dist@5.10.5/swagger-ui-standalone-preset.js',
  ],
}));

// Endpoint para servir o spec JSON
app.get('/api-docs-json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

/* ########################################
   Routes
######################################## */
app.use('/api/rsvps', rsvpRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/admin/cleanup', cleanupRoutes);
app.use('/api/auth', authRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok',
    timestamp: new Date().toISOString(),
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

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

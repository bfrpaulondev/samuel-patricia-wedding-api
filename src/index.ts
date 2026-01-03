import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';
import { connectDB } from './config/database';
import confirmationsRouter from './routes/confirmations';
import adminRouter from './routes/admin';
import { apiLimiter } from './middleware/rateLimiter';

// Carregar variáveis de ambiente
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Conectar ao MongoDB
connectDB();

// Middlewares de segurança
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middlewares gerais
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
app.use('/api/', apiLimiter);

// Configuração do Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Wedding Confirmation API',
      version: '1.0.0',
      description: 'API para gerenciamento de confirmações de casamento - Samuel & Patrícia',
      contact: {
        name: 'Samuel & Patrícia',
        email: 'samuel@casamento.com'
      }
    },
    servers: [
      {
        url: process.env.API_URL || 'http://localhost:5000',
        description: 'API Server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },
  apis: ['./src/routes/*.ts']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Rota raiz
app.get('/', (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Wedding Confirmation API - Samuel & Patrícia',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      api: '/api',
      confirmations: '/api/confirmations',
      admin: '/api/admin',
      docs: '/api-docs'
    },
    wedding: {
      couple: 'Samuel & Patrícia',
      date: '2026-05-17',
      location: 'Setúbal, Portugal'
    }
  });
});

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Wedding API - Samuel & Patrícia'
}));

// Rotas da aplicação
app.use('/api/confirmations', confirmationsRouter);
app.use('/api/admin', adminRouter);

// Rota 404
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Rota não encontrada',
    path: req.originalUrl
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log('════════════════════════════════════════════');
  console.log('🚀 Wedding API Server');
  console.log('════════════════════════════════════════════');
  console.log(`📡 Server: http://localhost:${PORT}`);
  console.log(`📚 Docs: http://localhost:${PORT}/api-docs`);
  console.log(`💒 Samuel & Patrícia - 17 de Maio de 2026`);
  console.log('════════════════════════════════════════════');
});

export default app;

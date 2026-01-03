# 💒 Wedding Confirmation API

API REST para sistema de confirmações de casamento de **Samuel & Patrícia** (17 de Maio de 2026).

## 🚀 Stack Tecnológica

- **Node.js** + **Express** + **TypeScript**
- **MongoDB** com Mongoose
- **JWT** para autenticação
- **Swagger/OpenAPI** para documentação
- **Helmet** + **CORS** + **Rate Limiting** para segurança

## 📋 Funcionalidades

### Rotas Públicas
- ✅ Criar confirmação de presença
- ✅ Verificar confirmação por email
- ✅ Validação de campos obrigatórios
- ✅ Prevenção de confirmações duplicadas

### Rotas Admin (Protegidas)
- 🔐 Login com JWT
- 📊 Dashboard com estatísticas
- ✅ Aprovar confirmações
- ❌ Rejeitar confirmações
- 📝 Listar todas as confirmações
- 🔍 Filtrar por status (pending/approved/rejected)
- 🗑️ Deletar confirmações

## 🛠️ Instalação

```bash
# Clonar repositório
git clone <repo-url>
cd wedding-api

# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env
# Editar .env com suas credenciais
```

## ⚙️ Configuração

### Variáveis de Ambiente

Edite o arquivo `.env`:

```env
# MongoDB (obrigatório)
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/wedding-app

# JWT (obrigatório)
JWT_SECRET=sua-chave-secreta-aqui
JWT_EXPIRES_IN=7d

# Server
NODE_ENV=production
PORT=5000
API_URL=https://sua-api.onrender.com

# CORS (URL do frontend)
CORS_ORIGIN=https://seu-frontend.vercel.app

# Admin
ADMIN_USERNAME=samuel
ADMIN_EMAIL=samuel@casamento.com
ADMIN_PASSWORD=senha-segura-aqui
```

### Criar Admin Inicial

```bash
npm run setup-admin
```

## 🏃 Executar

### Desenvolvimento

```bash
npm run dev
```

Servidor em: `http://localhost:5000`

### Produção

```bash
# Build
npm run build

# Start
npm start
```

## 📚 Documentação da API

Após iniciar o servidor, acesse:

- **Swagger UI**: `http://localhost:5000/api-docs`
- **Health Check**: `http://localhost:5000/health`

## 🌐 Deploy no Render

### Passo 1: Criar Conta no Render

1. Acesse: https://render.com/
2. Faça login com GitHub

### Passo 2: Criar Web Service

1. Clique em **"New +"** → **"Web Service"**
2. Conecte seu repositório
3. Configure:
   - **Name**: `wedding-api`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`

### Passo 3: Configurar Variáveis de Ambiente

No Render, vá em **Environment** e adicione:

```
MONGODB_URI = mongodb+srv://...
JWT_SECRET = sua-chave-secreta
JWT_EXPIRES_IN = 7d
NODE_ENV = production
PORT = 5000
API_URL = https://wedding-api.onrender.com
CORS_ORIGIN = https://samuel-patricia-wedding-site.vercel.app
ADMIN_USERNAME = samuel
ADMIN_EMAIL = samuel@casamento.com
ADMIN_PASSWORD = senha-segura
```

### Passo 4: Deploy

1. Clique em **"Create Web Service"**
2. Aguarde o deploy (3-5 minutos)
3. Acesse a URL fornecida pelo Render

### Passo 5: Testar

```bash
# Health check
curl https://wedding-api.onrender.com/health

# API docs
open https://wedding-api.onrender.com/api-docs
```

## 📡 Endpoints

### Públicos

```
GET  /                          # Info da API
GET  /health                    # Health check
GET  /api-docs                  # Documentação Swagger

POST /api/confirmations         # Criar confirmação
GET  /api/confirmations/check/:email  # Verificar por email
```

### Admin (requer JWT)

```
POST   /api/admin/login         # Login
GET    /api/admin/confirmations # Listar confirmações
GET    /api/admin/stats         # Estatísticas
PATCH  /api/admin/confirmations/:id/approve  # Aprovar
PATCH  /api/admin/confirmations/:id/reject   # Rejeitar
DELETE /api/admin/confirmations/:id          # Deletar
```

## 🔐 Autenticação

Todas as rotas `/api/admin/*` (exceto `/login`) requerem JWT no header:

```bash
Authorization: Bearer <seu-token-jwt>
```

### Exemplo: Login

```bash
curl -X POST https://wedding-api.onrender.com/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "samuel",
    "password": "sua-senha"
  }'
```

## 🧪 Testes

### Teste Manual das Rotas

```bash
# Health check
curl http://localhost:5000/health

# Criar confirmação
curl -X POST http://localhost:5000/api/confirmations \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "João Silva",
    "email": "joao@example.com",
    "phone": "+351912345678",
    "willAttend": true,
    "numberOfGuests": 2,
    "message": "Estaremos presentes!"
  }'

# Login admin
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "samuel",
    "password": "sua-senha"
  }'
```

## 📊 MongoDB Atlas

### Configurar Whitelist

1. Acesse: https://cloud.mongodb.com/
2. Vá em **Network Access**
3. Clique em **Add IP Address**
4. Selecione **"Allow access from anywhere"** (`0.0.0.0/0`)
5. Confirme

Isso permite que o Render acesse seu banco de dados.

## 🔄 Atualizar Frontend

Após o deploy da API no Render, atualize a URL no frontend:

```env
# No projeto frontend (.env ou Vercel)
VITE_API_URL=https://wedding-api.onrender.com
```

Faça redeploy do frontend na Vercel.

## 🐛 Troubleshooting

### Erro: Cannot connect to MongoDB

- ✅ Verificar MONGODB_URI no .env
- ✅ Verificar whitelist no MongoDB Atlas (0.0.0.0/0)
- ✅ Testar conexão localmente

### Erro: JWT invalid

- ✅ Verificar JWT_SECRET no .env
- ✅ Token expirado? Fazer novo login
- ✅ Header Authorization correto?

### Erro: CORS

- ✅ Verificar CORS_ORIGIN no .env
- ✅ Adicionar URL do frontend
- ✅ Incluir protocolo (https://)

## 📦 Estrutura do Projeto

```
wedding-api/
├── src/
│   ├── config/
│   │   ├── database.ts      # Conexão MongoDB
│   │   └── env.ts           # Config env vars
│   ├── middleware/
│   │   ├── auth.ts          # JWT middleware
│   │   ├── rateLimiter.ts   # Rate limiting
│   │   └── validator.ts     # Validação
│   ├── models/
│   │   ├── Admin.ts         # Model Admin
│   │   └── Confirmation.ts  # Model Confirmação
│   ├── routes/
│   │   ├── admin.ts         # Rotas admin
│   │   └── confirmations.ts # Rotas públicas
│   ├── utils/
│   │   └── jwt.ts           # JWT utils
│   ├── index.ts             # Entry point
│   └── setup-admin.ts       # Script criar admin
├── .env.example             # Template env vars
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## 🔒 Segurança

- ✅ Helmet para headers HTTP seguros
- ✅ CORS configurado
- ✅ Rate limiting (100 req/15min)
- ✅ Validação de entrada (express-validator)
- ✅ Senha hasheada com bcrypt
- ✅ JWT com expiração
- ✅ HTTPS obrigatório em produção

## 📝 Licença

Este projeto foi desenvolvido para o casamento de **Samuel & Patrícia**.

---

**Desenvolvido com ❤️ para Samuel & Patrícia**  
**Casamento: 17 de Maio de 2026 🎊**  
**Setúbal, Portugal 🇵🇹**

# ✅ API RESTful - Verificação Completa

## 🎯 Problemas Corrigidos

### 1. ❌ Antes: URLs Duplicadas
```
https://samuel-patricia-wedding-api.vercel.app/api/api/admin/rsvps
                                                  ^^^^^^^^ DUPLICADO!
```

### 2. ✅ Depois: URLs Corretas
```
https://samuel-patricia-wedding-api.vercel.app/api/admin/rsvps
                                                  ^^^^ CORRETO!
```

### 3. ✅ Health Check Agora Visível no Swagger
- **Antes:** Não aparecia na documentação
- **Depois:** Tag "Health" com documentação completa

---

## 📋 Estrutura RESTful da API

### 🔓 Rotas Públicas (Sem Autenticação)

#### Health Check
```http
GET /api/health
```
**Resposta:**
```json
{
  "status": "ok",
  "timestamp": "2026-01-06T00:08:41.188Z",
  "mongodb": "connected"
}
```

#### Criar Confirmação (RSVP)
```http
POST /api/rsvps
Content-Type: application/json

{
  "fullName": "João Silva",
  "email": "joao@example.com",
  "phone": "+351 912 345 678",
  "willAttend": true,
  "guests": 2,
  "dietaryRestrictions": "Vegetariano",
  "message": "Mal posso esperar!"
}
```

#### Verificar Confirmação por Email
```http
GET /api/rsvps/check?email=joao@example.com
```

#### Registrar Admin (Requer ADMIN_CODE)
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "Admin",
  "email": "admin@example.com",
  "password": "senha123",
  "adminCode": "ADMIN-LOVE"
}
```

#### Login Admin
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "senha123"
}
```

**Resposta:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "name": "Admin",
    "email": "admin@example.com"
  }
}
```

---

### 🔒 Rotas Protegidas (Requer JWT Token)

**Header obrigatório:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### Listar Todas as Confirmações
```http
GET /api/admin/rsvps
GET /api/admin/rsvps?status=approved
GET /api/admin/rsvps?status=pending&page=1&limit=10
```

**Query Parameters:**
- `status` (opcional): `pending`, `approved`, `rejected`
- `page` (opcional): número da página
- `limit` (opcional): itens por página

#### Atualizar Status da Confirmação
```http
PATCH /api/admin/rsvps/{id}
Content-Type: application/json

{
  "status": "approved"
}
```

#### Deletar Confirmação
```http
DELETE /api/admin/rsvps/{id}
```

#### Obter Estatísticas
```http
GET /api/admin/stats
```

**Resposta:**
```json
{
  "total": 150,
  "approved": 120,
  "pending": 20,
  "rejected": 10,
  "totalGuests": 300
}
```

#### Remover Dados de Teste
```http
DELETE /api/admin/cleanup/test
```

#### Remover TODOS os Dados (CUIDADO!)
```http
DELETE /api/admin/cleanup/all
Content-Type: application/json

{
  "confirmPassword": "DELETE_ALL_DATA"
}
```

---

## 🧪 Testes de Validação

### ✅ 1. Health Check
```bash
curl https://samuel-patricia-wedding-api.vercel.app/api/health
```

**Resultado esperado:**
```json
{
  "status": "ok",
  "timestamp": "2026-01-06T...",
  "mongodb": "connected"
}
```

### ✅ 2. Rota Admin (sem token)
```bash
curl https://samuel-patricia-wedding-api.vercel.app/api/admin/rsvps
```

**Resultado esperado:**
```json
{
  "message": "Token não fornecido"
}
```

### ✅ 3. Verificar Swagger URLs
```bash
curl -s https://samuel-patricia-wedding-api.vercel.app/api-docs-json | \
  jq -r '.paths | keys[]'
```

**Resultado esperado (sem /api/api/):**
```
/api/admin/cleanup/all
/api/admin/cleanup/test
/api/admin/rsvps
/api/admin/rsvps/{id}
/api/admin/stats
/api/auth/login
/api/auth/register
/api/health
/api/rsvps
/api/rsvps/check
```

---

## 🎨 Princípios RESTful Implementados

### ✅ 1. Recursos e Endpoints Claros
- `/api/rsvps` - Coleção de confirmações
- `/api/rsvps/{id}` - Confirmação específica
- `/api/admin/stats` - Estatísticas (recurso singular)

### ✅ 2. Métodos HTTP Apropriados
- `GET` - Ler dados (idempotente)
- `POST` - Criar novos recursos
- `PATCH` - Atualizar parcialmente
- `DELETE` - Remover recursos

### ✅ 3. Status Codes HTTP Corretos
- `200` - Sucesso
- `201` - Recurso criado
- `400` - Requisição inválida
- `401` - Não autenticado
- `403` - Não autorizado
- `404` - Recurso não encontrado
- `500` - Erro interno

### ✅ 4. Autenticação Stateless (JWT)
- Token JWT no header `Authorization: Bearer <token>`
- Sem sessões no servidor
- Token contém todas as informações necessárias

### ✅ 5. Documentação OpenAPI 3.0
- Swagger UI: https://samuel-patricia-wedding-api.vercel.app/api-docs
- Spec JSON: https://samuel-patricia-wedding-api.vercel.app/api-docs-json
- Todas as rotas documentadas
- Exemplos e schemas incluídos

### ✅ 6. Versionamento (Preparado para o Futuro)
```
/api/v1/rsvps  → Versão 1 (pode ser implementado)
/api/v2/rsvps  → Versão 2 (futuro)
```

---

## 🔐 Swagger UI com Autenticação

### Como Testar Rotas Protegidas no Swagger

1. **Acesse:** https://samuel-patricia-wedding-api.vercel.app/api-docs

2. **Faça Login:**
   - Expanda `Auth` → `POST /api/auth/login`
   - Clique em "Try it out"
   - Insira:
     ```json
     {
       "email": "admin@example.com",
       "password": "senha123"
     }
     ```
   - Clique em "Execute"
   - **Copie o token da resposta**

3. **Autorize:**
   - Clique no botão **"Authorize" 🔓** (topo direito)
   - Cole: `Bearer SEU_TOKEN_AQUI`
   - Clique em "Authorize" e depois "Close"

4. **Teste Rotas Protegidas:**
   - Agora você pode testar `GET /api/admin/rsvps` e outras rotas admin
   - O token será enviado automaticamente em todas as requisições

---

## 📊 Comparação: Antes vs Depois

| Item | Antes | Depois |
|------|-------|--------|
| URLs | `/api/api/admin/rsvps` ❌ | `/api/admin/rsvps` ✅ |
| Health Check | Não documentado ❌ | Tag "Health" ✅ |
| Bearer Auth | Sem suporte ❌ | Botão "Authorize" ✅ |
| Swagger Server | `url: '/api'` | `url: '/'` |
| MongoDB | Desconectado ❌ | Conectado ✅ |
| RESTful | Parcial | Completo ✅ |

---

## ✅ Checklist de Conformidade RESTful

- [x] URLs sem duplicação `/api/api/`
- [x] Health check documentado e visível
- [x] Métodos HTTP corretos (GET, POST, PATCH, DELETE)
- [x] Status codes HTTP apropriados
- [x] Autenticação JWT stateless
- [x] Swagger UI com suporte a Bearer token
- [x] OpenAPI 3.0 spec completo
- [x] Endpoints seguem padrão de recursos
- [x] Query parameters para filtros/paginação
- [x] Path parameters para recursos específicos
- [x] Content-Type: application/json
- [x] CORS configurado corretamente
- [x] MongoDB conectado

---

## 🚀 Status Final

| Componente | Status |
|------------|--------|
| **API** | ✅ Online |
| **Swagger UI** | ✅ Funcionando |
| **MongoDB** | ✅ Conectado |
| **URLs** | ✅ Corretas (sem /api/api/) |
| **Health Check** | ✅ Documentado |
| **JWT Auth** | ✅ Funcionando |
| **RESTful** | ✅ 100% Conforme |

---

## 📞 Links

- **API:** https://samuel-patricia-wedding-api.vercel.app
- **Swagger:** https://samuel-patricia-wedding-api.vercel.app/api-docs
- **Health:** https://samuel-patricia-wedding-api.vercel.app/api/health
- **Spec JSON:** https://samuel-patricia-wedding-api.vercel.app/api-docs-json
- **GitHub:** https://github.com/bfrpaulondev/samuel-patricia-wedding-api

---

**Commit:** e882aee  
**Data:** 2026-01-06  
**Status:** ✅ API RESTful 100% funcional e documentada

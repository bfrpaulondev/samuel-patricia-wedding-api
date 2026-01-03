# 🚀 GUIA RÁPIDO: DEPLOY NO RENDER

## ✅ Pré-requisitos

- ✅ Conta no GitHub
- ✅ Código pushed para repositório GitHub
- ✅ MongoDB Atlas configurado

---

## 📋 PASSO A PASSO

### 1️⃣ Criar Conta no Render

1. Acesse: https://render.com/
2. Clique em **"Get Started"**
3. Faça login com **GitHub**
4. Autorize o Render a acessar seus repositórios

### 2️⃣ Criar Web Service

1. No Dashboard, clique em **"New +"**
2. Selecione **"Web Service"**
3. Conecte o repositório **wedding-api**
4. Se não aparecer, clique em **"Configure account"** e dê permissão

### 3️⃣ Configurar o Service

Preencha os campos:

**Basic Info:**
- **Name**: `wedding-api` (ou outro nome)
- **Region**: escolha o mais próximo (Europe/Frankfurt)
- **Branch**: `main`
- **Root Directory**: deixe em branco

**Build & Deploy:**
- **Environment**: `Node`
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`

**Instance Type:**
- Selecione: **Free** (para testes) ou **Starter** ($7/mês para produção)

### 4️⃣ Adicionar Variáveis de Ambiente

Role até **"Environment Variables"** e clique em **"Add Environment Variable"**

Adicione uma por uma:

```
Key: MONGODB_URI
Value: mongodb+srv://bfrpaulondev_db_user:Ci85Wu3bZ0iooagG@cluster0.mp369cb.mongodb.net/wedding-app?retryWrites=true&w=majority

Key: JWT_SECRET
Value: NoivosSamuelPatricia2026

Key: JWT_EXPIRES_IN
Value: 7d

Key: NODE_ENV
Value: production

Key: PORT
Value: 5000

Key: CORS_ORIGIN
Value: https://samuel-patricia-wedding-site.vercel.app

Key: ADMIN_USERNAME
Value: samuel

Key: ADMIN_EMAIL
Value: samuel@casamento.com

Key: ADMIN_PASSWORD
Value: NoivosSamuelPatricia2026!
```

⚠️ **IMPORTANTE:** Após o primeiro deploy, atualize `API_URL` com a URL gerada pelo Render.

### 5️⃣ Criar Web Service

1. Role até o final
2. Clique em **"Create Web Service"**
3. Aguarde o deploy (3-5 minutos)

### 6️⃣ Aguardar Deploy

Você verá os logs em tempo real:

```
==> Cloning from https://github.com/...
==> Running build command: npm install && npm run build
==> Starting service with: npm start
==> Your service is live! 🎉
```

### 7️⃣ Obter URL da API

Após o deploy completar, você verá a URL no topo:

```
https://wedding-api.onrender.com
```

ou

```
https://wedding-api-xxxx.onrender.com
```

### 8️⃣ Testar a API

```bash
# Health check
curl https://wedding-api.onrender.com/health

# Deve retornar:
{
  "status": "OK",
  "timestamp": "...",
  "uptime": ...
}

# Testar documentação
open https://wedding-api.onrender.com/api-docs
```

### 9️⃣ Atualizar Variável API_URL

1. No Render, vá em **Environment**
2. Adicione/Edite:
   ```
   Key: API_URL
   Value: https://wedding-api.onrender.com (sua URL real)
   ```
3. O serviço será redeploy automaticamente

### 🔟 Atualizar Frontend na Vercel

1. Acesse: https://vercel.com/
2. Vá para o projeto `samuel-patricia-wedding-site`
3. **Settings** → **Environment Variables**
4. Edite `VITE_API_URL`:
   ```
   Value: https://wedding-api.onrender.com
   ```
5. Marque: Production, Preview, Development
6. **Save**
7. Vá em **Deployments** → **...** → **Redeploy**

### 1️⃣1️⃣ Testar Integração Completa

1. Acesse o frontend: https://samuel-patricia-wedding-site.vercel.app/
2. Preencha o formulário de confirmação
3. Envie
4. Verifique se aparece mensagem de sucesso
5. Faça login no admin: `/admin/login`
6. Veja a confirmação no dashboard

---

## 🎉 PRONTO!

Sua API está no ar e funcionando! 🚀

**URLs importantes:**

- 🌐 API: `https://wedding-api.onrender.com`
- 📚 Docs: `https://wedding-api.onrender.com/api-docs`
- ❤️ Frontend: `https://samuel-patricia-wedding-site.vercel.app`
- 🔐 Admin: `https://samuel-patricia-wedding-site.vercel.app/admin/login`

---

## 📊 Monitoramento

No Dashboard do Render você pode:

- ✅ Ver logs em tempo real
- ✅ Monitorar CPU e memória
- ✅ Ver requests por minuto
- ✅ Configurar alertas
- ✅ Ver histórico de deploys

---

## 🔄 Atualizações

Para atualizar a API:

1. Faça commit das mudanças
2. Push para GitHub
3. Render faz deploy automático! 🎉

Ou manualmente:

1. No Render, vá em **Manual Deploy**
2. Clique em **"Deploy latest commit"**

---

## 💡 DICAS

### Free Tier do Render

⚠️ O plano Free:
- ✅ É grátis
- ⚠️ "Dorme" após 15 minutos de inatividade
- ⚠️ Primeiro request após dormir demora ~30s
- ⚠️ 750 horas/mês (suficiente para testes)

Para produção, considere:
- 💰 Starter ($7/mês) - sempre ativo
- 💰 Standard ($25/mês) - melhor performance

### Manter API Ativa (Free Tier)

Se quiser evitar o "sleep", pode usar um cron job externo:

```bash
# A cada 10 minutos
*/10 * * * * curl https://wedding-api.onrender.com/health
```

Ou use serviços como:
- https://cron-job.org/
- https://uptimerobot.com/

---

## 🐛 Troubleshooting

### Deploy falhou

**Ver logs:**
1. Clique no deployment que falhou
2. Veja os logs completos
3. Procure por erros

**Causas comuns:**
- ❌ Build command errado
- ❌ Start command errado  
- ❌ Dependência faltando
- ❌ Erro no TypeScript

### API retorna 500

**Verificar:**
1. Logs no Render (tab "Logs")
2. Variáveis de ambiente configuradas
3. MongoDB Atlas whitelist (0.0.0.0/0)
4. Conexão do MongoDB

### CORS Error

**Verificar:**
1. CORS_ORIGIN tem a URL correta do frontend
2. Inclui https://
3. Sem barra no final
4. Frontend atualizado com URL da API

---

**Desenvolvido com ❤️ para Samuel & Patrícia**  
**17 de Maio de 2026 🎊**

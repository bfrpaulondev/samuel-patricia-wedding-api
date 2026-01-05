# 🚀 DEPLOY AUTOMÁTICO NO RENDER

## ✅ CONFIGURAÇÃO PRONTA

O arquivo `render.yaml` está configurado para deploy automático!

## 📋 PASSO A PASSO SIMPLIFICADO

### 1️⃣ Conectar Repositório ao Render

1. Acesse: https://dashboard.render.com/
2. Clique em **"New +"**
3. Selecione **"Blueprint"**
4. Conecte este repositório: `samuel-patricia-wedding-api`
5. O Render detectará automaticamente o `render.yaml`

### 2️⃣ Configurar Variáveis Secretas

O Render pedirá para você adicionar as variáveis marcadas como `sync: false`:

```bash
MONGO_URI = mongodb+srv://bfrpaulondev_db_user:Ci85Wu3bZ0iooagG@cluster0.mp369cb.mongodb.net/wedding-app?retryWrites=true&w=majority

JWT_SECRET = NoivosSamuelPatricia2026

ADMIN_CODE = ADMIN-SAMUEL-PATRICIA-2026
```

### 3️⃣ Aplicar Blueprint

1. Clique em **"Apply"**
2. Aguarde 2-3 minutos
3. Pronto! 🎉

## 🔗 URL DA API

Após o deploy, sua API estará em:
```
https://wedding-api-XXXXX.onrender.com
```

## 🧪 TESTAR

```bash
# Health check
curl https://wedding-api-XXXXX.onrender.com/api/health

# Swagger
https://wedding-api-XXXXX.onrender.com/api-docs
```

## 📝 CONFIGURAÇÕES DO RENDER.YAML

```yaml
✅ Runtime: Node
✅ Region: Frankfurt (Europe)
✅ Plan: Free
✅ Build: npm install
✅ Start: npm start
✅ Auto-deploy: Habilitado
```

## ⚠️ IMPORTANTE

As variáveis `MONGO_URI`, `JWT_SECRET` e `ADMIN_CODE` **devem ser configuradas manualmente** no dashboard do Render por segurança.

Elas **NÃO** estão commitadas no repositório!

---

## 🎯 DEPOIS DO DEPLOY

### Atualizar Frontend (Vercel)

1. Vá para: https://vercel.com/bfrpaulondev/samuel-patricia-wedding-site
2. Settings → Environment Variables
3. Adicione/Edite:
```
VITE_API_URL = https://wedding-api-XXXXX.onrender.com/api
```
4. Redeploy

---

**Pronto! Deploy automático configurado!** 🚀

# 🚀 Configuração do Vercel para a API

## ✅ Problema Resolvido

**Antes:**
```
404: https://samuel-patricia-wedding-api.vercel.app/api-docs/swagger-ui-bundle.js
404: https://samuel-patricia-wedding-api.vercel.app/api-docs/swagger-ui-standalone-preset.js
SwaggerUIBundle is not defined
```

**Solução:**
- Configurado Swagger UI para usar CDN em vez de arquivos locais
- Criado `vercel.json` com rotas corretas
- Adicionado endpoint `/api-docs-json` para servir o spec

---

## 📋 Variáveis de Ambiente no Vercel

### Acesse: https://vercel.com/bfrpaulondev/samuel-patricia-wedding-api/settings/environment-variables

Adicione as seguintes variáveis:

| Nome | Valor | Ambiente |
|------|-------|----------|
| `MONGO_URI` | `mongodb+srv://bfrpaulondev_db_user:Ci85Wu3bZ0iooagG@cluster0.mp369cb.mongodb.net/wedding-app?retryWrites=true&w=majority` | Production, Preview, Development |
| `JWT_SECRET` | `NoivosSamuelPatricia2026` | Production, Preview, Development |
| `JWT_EXPIRES_IN` | `7d` | Production, Preview, Development |
| `ADMIN_CODE` | `ADMIN-LOVE` | Production, Preview, Development |
| `PORT` | `5000` | Production, Preview, Development |
| `CLIENT_ORIGIN` | `https://samuel-patricia-wedding-site.vercel.app` | Production, Preview, Development |

---

## 🔄 Deploy Manual (Se Necessário)

1. **Acesse:** https://vercel.com/bfrpaulondev/samuel-patricia-wedding-api
2. **Clique em:** "Deployments"
3. **Clique em:** "⋯" (três pontos) ao lado do último deploy
4. **Selecione:** "Redeploy"
5. **Desmarque:** "Use existing Build Cache"
6. **Confirme:** "Redeploy"

---

## 📖 Endpoints Disponíveis

### Swagger UI
```
https://samuel-patricia-wedding-api.vercel.app/api-docs
```

### Health Check
```
https://samuel-patricia-wedding-api.vercel.app/api/health
```

### OpenAPI Spec (JSON)
```
https://samuel-patricia-wedding-api.vercel.app/api-docs-json
```

---

## 🧪 Testar a API

### 1. Health Check
```bash
curl https://samuel-patricia-wedding-api.vercel.app/api/health
```

**Resposta esperada:**
```json
{
  "status": "ok",
  "timestamp": "2026-01-05T...",
  "mongodb": "connected"
}
```

### 2. Swagger UI
Acesse no navegador:
```
https://samuel-patricia-wedding-api.vercel.app/api-docs
```

Você deve ver a documentação completa da API com:
- ✅ CSS carregado do CDN
- ✅ JavaScript carregado do CDN
- ✅ Interface funcional do Swagger
- ✅ Todos os endpoints documentados

---

## 🎯 Estrutura de Arquivos

```
wedding-api/
├── server.js              # Entry point com Swagger CDN
├── vercel.json            # Configuração Vercel
├── package.json
├── models/
│   ├── Rsvp.js
│   └── User.js
├── controllers/
│   ├── rsvpController.js
│   ├── adminController.js
│   └── authController.js
├── routes/
│   ├── rsvp.routes.js
│   ├── admin.routes.js
│   ├── auth.routes.js
│   └── cleanup.routes.js
└── middleware/
    └── authAdmin.js
```

---

## 🔧 Troubleshooting

### Se o Swagger ainda não carregar:

1. **Limpe o cache do navegador:** CTRL+SHIFT+R (ou CMD+SHIFT+R no Mac)

2. **Verifique o console do navegador:** 
   - Não deve haver erros 404
   - Não deve haver erros de CORS
   - SwaggerUIBundle deve estar definido

3. **Verifique as variáveis de ambiente:**
   ```bash
   curl https://samuel-patricia-wedding-api.vercel.app/api/health
   ```
   
   Se retornar `"mongodb": "disconnected"`, verifique `MONGO_URI`

4. **Force um novo deploy:**
   - Desmarque "Use existing Build Cache"
   - Aguarde 2-3 minutos

---

## ✅ Checklist Final

- [ ] Variáveis de ambiente configuradas no Vercel
- [ ] Deploy realizado com sucesso
- [ ] `/api/health` retorna status 200
- [ ] `/api-docs` carrega a interface do Swagger
- [ ] `/api-docs-json` retorna o spec JSON
- [ ] Console do navegador sem erros
- [ ] MongoDB conectado (`"mongodb": "connected"`)

---

## 📞 Links Importantes

- **API Vercel:** https://samuel-patricia-wedding-api.vercel.app
- **Frontend Vercel:** https://samuel-patricia-wedding-site.vercel.app
- **GitHub API:** https://github.com/bfrpaulondev/samuel-patricia-wedding-api
- **GitHub Frontend:** https://github.com/bfrpaulondev/samuel-patricia-wedding-site
- **Vercel Dashboard:** https://vercel.com/bfrpaulondev

---

## 🎉 Conclusão

Agora a API está configurada corretamente para rodar na Vercel com:
- ✅ Swagger UI funcionando via CDN
- ✅ Rotas configuradas corretamente
- ✅ MongoDB conectado
- ✅ Todas as funcionalidades operacionais

**Commit:** `87446dc` - "Configure Swagger UI to use CDN for Vercel compatibility"

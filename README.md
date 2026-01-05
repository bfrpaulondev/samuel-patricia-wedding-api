# 💍 Wedding API - Samuel & Patrícia

API para sistema de confirmações de casamento.

## 🚀 Stack

- **Node.js** + **Express**
- **MongoDB** + **Mongoose**
- **JWT** para autenticação
- **Swagger** para documentação
- **Morgan** para logs

## 📦 Instalação

```bash
npm install
```

## ⚙️ Configuração

Crie um arquivo `.env`:

```env
PORT=5000
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/wedding-app
ADMIN_CODE=ADMIN-SAMUEL-PATRICIA-2026
JWT_SECRET=sua-chave-secreta
JWT_EXPIRES_IN=7d
CLIENT_ORIGIN=https://seu-frontend.com
```

## 🏃 Executar

```bash
npm start
```

## 📚 Documentação

Acesse: `http://localhost:5000/api-docs`

## 🔗 Endpoints

### Público

- `POST /api/rsvps` - Criar confirmação
- `GET /api/rsvps/check?email=` - Verificar confirmação
- `POST /api/auth/register` - Registrar admin (precisa ADMIN_CODE)
- `POST /api/auth/login` - Login admin
- `GET /api/health` - Health check

### Admin (requer token)

- `GET /api/admin/rsvps` - Listar confirmações
- `PATCH /api/admin/rsvps/:id` - Atualizar status
- `DELETE /api/admin/rsvps/:id` - Deletar confirmação
- `GET /api/admin/stats` - Estatísticas

## 🚀 Deploy no Render

1. Crie um Web Service no Render
2. Conecte este repositório
3. Configure:
   - Build Command: `npm install`
   - Start Command: `npm start`
4. Adicione as variáveis de ambiente
5. Deploy!

## 📝 Licença

ISC - Samuel & Patrícia © 2026

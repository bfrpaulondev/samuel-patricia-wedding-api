# 🔐 CREDENCIAIS DE ADMINISTRADOR

## 📋 CREDENCIAIS DE LOGIN

**Email**: `samuel@casamento.com`  
**Senha**: `NoivosSamuelPatricia2026!`

## 📊 DOCUMENTO PARA INSERIR NO MONGODB

Copie e cole este JSON no MongoDB Compass:

```json
{
  "name": "Samuel",
  "email": "samuel@casamento.com",
  "passwordHash": "$2b$10$OKrN6f.h3c12HXK2vDBq5eL2cKNbxrez1lSOGSIxNcEMJmGAkdSMG",
  "role": "ADMIN",
  "createdAt": { "$date": "2026-01-05T17:00:33.635Z" },
  "updatedAt": { "$date": "2026-01-05T17:00:33.637Z" }
}
```

## 🛠️ COMO INSERIR NO MONGODB ATLAS

### **Passo a Passo**:

1. **Abra o MongoDB Compass** (ou use a web interface do Atlas)

2. **Conecte-se** usando esta URI:
   ```
   mongodb+srv://bfrpaulondev_db_user:Ci85Wu3bZ0iooagG@cluster0.mp369cb.mongodb.net/wedding-app
   ```

3. **Selecione o database**: `wedding-app`

4. **Crie a coleção** (se não existir): `users`

5. **Clique em** "Add Data" → "Insert Document"

6. **Cole o JSON** acima (você pode usar o modo JSON View)

7. **Clique em** "Insert"

8. **Pronto!** ✅

## 🔐 FAZER LOGIN

1. Acesse: https://samuel-patricia-wedding-site.vercel.app/admin/login

2. Use as credenciais:
   - **Email**: `samuel@casamento.com`
   - **Senha**: `NoivosSamuelPatricia2026!`

3. Será redirecionado para o dashboard: `/admin/dashboard`

## 🎯 O QUE VOCÊ PODE FAZER NO DASHBOARD

- ✅ Ver todas as confirmações de presença
- ✅ Filtrar por status (Todas, Pendentes, Aprovadas, Rejeitadas)
- ✅ Ver detalhes de cada confirmação
- ✅ Aprovar confirmações
- ✅ Rejeitar confirmações
- ✅ Deletar confirmações
- ✅ Ver estatísticas em tempo real:
  - Total de confirmações
  - Confirmações pendentes
  - Confirmações aprovadas
  - Total de convidados

## ⚠️ IMPORTANTE

**NÃO COMPARTILHE ESTAS CREDENCIAIS PUBLICAMENTE!**

Se precisar mudar a senha:
1. Gere um novo hash usando o script `generate-admin-hash.js`
2. Atualize o documento no MongoDB com o novo `passwordHash`

## 🔄 GERAR NOVAS CREDENCIAIS

Se quiser criar um novo admin ou mudar a senha, execute:

```bash
cd /home/user/wedding-api
node generate-admin-hash.js
```

O script irá gerar um novo hash e mostrar as instruções.

---

**🎊 Tudo pronto para gerenciar as confirmações do casamento! 🎊**

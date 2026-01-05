# 🔐 Credenciais de Admin - INSTRUÇÕES

## ⚠️ AVISO DE SEGURANÇA

**ESTE ARQUIVO NÃO DEVE CONTER CREDENCIAIS REAIS EM TEXTO CLARO.**

---

## 📝 Como Criar um Admin

### 1. Gerar Hash de Senha

Use Node.js para gerar um hash bcrypt seguro:

```javascript
const bcrypt = require('bcryptjs');

const senha = 'SUA_SENHA_FORTE_AQUI'; // Defina uma senha forte
bcrypt.hash(senha, 10, (err, hash) => {
  if (err) throw err;
  console.log('Hash gerado:', hash);
});
```

**OU** use o comando direto:

```bash
node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('SUA_SENHA', 10, (e,h) => console.log(h))"
```

### 2. Criar Documento no MongoDB

No **MongoDB Atlas** (https://cloud.mongodb.com):

1. Acesse seu cluster
2. Navegue até a database `wedding-app`
3. Abra a collection `users`
4. Clique em "Insert Document"
5. Cole o JSON abaixo (substitua os valores):

```json
{
  "name": "Nome do Admin",
  "email": "admin@exemplo.com",
  "passwordHash": "COLE_O_HASH_GERADO_ACIMA",
  "role": "ADMIN",
  "createdAt": { "$date": "2026-01-05T00:00:00.000Z" },
  "updatedAt": { "$date": "2026-01-05T00:00:00.000Z" }
}
```

6. Clique em "Insert"

### 3. Testar Login

Acesse: https://samuel-patricia-wedding-site.vercel.app/admin/login

Use:
- **Email**: O email configurado no MongoDB
- **Senha**: A senha usada antes de gerar o hash

---

## 🔄 Como Trocar a Senha

### Método 1: Gerar Novo Hash

```javascript
const bcrypt = require('bcryptjs');
const novaSenha = 'NOVA_SENHA_FORTE';

bcrypt.hash(novaSenha, 10, (err, hash) => {
  console.log('Novo hash:', hash);
});
```

### Método 2: Atualizar no MongoDB

1. MongoDB Atlas > `wedding-app` > `users`
2. Encontre o documento do admin pelo email
3. Clique em "Edit"
4. Substitua o campo `passwordHash` pelo novo hash
5. Atualize o campo `updatedAt` para a data/hora atual
6. Salve as alterações

---

## 🛡️ Boas Práticas de Segurança

### ✅ FAÇA

- Use senhas com no mínimo 12 caracteres
- Inclua letras maiúsculas, minúsculas, números e símbolos
- Troque a senha regularmente
- Use gerenciadores de senha
- Ative 2FA no MongoDB Atlas

### ❌ NÃO FAÇA

- Commitar senhas em texto claro ao Git
- Compartilhar senhas por email ou chat
- Reusar senhas de outros serviços
- Usar senhas óbvias ou previsíveis
- Armazenar senhas em arquivos de texto

---

## 📋 Exemplo de Senha Forte

```
Exemplo: My$3cur3W3dd1ng!2026@PT
```

**Dica**: Use uma frase que você lembra + números + símbolos

---

## 🔗 Links Úteis

- **MongoDB Atlas**: https://cloud.mongodb.com
- **Admin Login**: https://samuel-patricia-wedding-site.vercel.app/admin/login
- **Gerador de Senhas**: https://passwordsgenerator.net/
- **Testador de Força**: https://www.security.org/how-secure-is-my-password/

---

## 📞 Suporte

Se precisar de ajuda, entre em contato com o desenvolvedor:
**@bfrpaulondev** via WhatsApp

---

**⚠️ LEMBRE-SE**: 
- Este arquivo é apenas um guia
- Nunca armazene credenciais reais aqui
- Sempre use variáveis de ambiente e secrets managers

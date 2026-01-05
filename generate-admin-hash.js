#!/usr/bin/env node

// Script para gerar hash de senha para admin
// Uso: node generate-admin-hash.js

const bcrypt = require('bcryptjs');

const adminData = {
  email: 'samuel@casamento.com',
  password: 'NoivosSamuelPatricia2026!',
  name: 'Samuel'
};

console.log('\n🔐 GERANDO CREDENCIAIS DE ADMIN...\n');

bcrypt.hash(adminData.password, 10, (err, hash) => {
  if (err) {
    console.error('❌ Erro ao gerar hash:', err);
    process.exit(1);
  }

  console.log('✅ Hash gerado com sucesso!\n');
  console.log('📋 CREDENCIAIS DE LOGIN:');
  console.log(`   Email: ${adminData.email}`);
  console.log(`   Senha: ${adminData.password}\n`);
  
  console.log('📊 DOCUMENTO PARA MONGODB:');
  console.log('-----------------------------------');
  console.log(JSON.stringify({
    name: adminData.name,
    email: adminData.email,
    passwordHash: hash,
    role: 'ADMIN',
    createdAt: new Date(),
    updatedAt: new Date()
  }, null, 2));
  console.log('-----------------------------------\n');
  
  console.log('📝 INSTRUÇÕES:');
  console.log('1. Copie o JSON acima');
  console.log('2. Conecte-se ao MongoDB Atlas:');
  console.log('   mongodb+srv://bfrpaulondev_db_user:Ci85Wu3bZ0iooagG@cluster0.mp369cb.mongodb.net/wedding-app');
  console.log('3. Vá para o database "wedding-app"');
  console.log('4. Crie/abra a coleção "users"');
  console.log('5. Clique em "Insert Document"');
  console.log('6. Cole o JSON');
  console.log('7. Clique em "Insert"\n');
  
  console.log('🎉 Pronto! Use as credenciais acima para fazer login em:');
  console.log('   https://samuel-patricia-wedding-site.vercel.app/admin/login\n');
});

#!/usr/bin/env node

// Script para gerar NOVA senha de admin (URGENTE)
const bcrypt = require('bcryptjs');

const newAdminData = {
  email: 'samuel@casamento.com',
  password: 'SamuelPatricia2026!@#SECURE', // SENHA NOVA E FORTE
  name: 'Samuel'
};

console.log('\n🔐 GERANDO NOVA SENHA DE ADMIN (URGENTE)...\n');

bcrypt.hash(newAdminData.password, 10, (err, hash) => {
  if (err) {
    console.error('❌ Erro ao gerar hash:', err);
    process.exit(1);
  }

  console.log('✅ Nova senha gerada com sucesso!\n');
  console.log('⚠️  IMPORTANTE: GUARDE ESTAS CREDENCIAIS EM LOCAL SEGURO!\n');
  console.log('📋 NOVAS CREDENCIAIS DE LOGIN:');
  console.log(`   Email: ${newAdminData.email}`);
  console.log(`   Senha: ${newAdminData.password}\n`);
  
  console.log('📊 DOCUMENTO PARA ATUALIZAR NO MONGODB:');
  console.log('-----------------------------------');
  console.log('INSTRUÇÕES:');
  console.log('1. Conecte ao MongoDB Atlas');
  console.log('2. Vá para wedding-app > users');
  console.log('3. ENCONTRE o documento com email: samuel@casamento.com');
  console.log('4. EDITE o campo "passwordHash" e substitua pelo valor abaixo:');
  console.log('-----------------------------------');
  console.log(`passwordHash: "${hash}"`);
  console.log('-----------------------------------\n');
  
  console.log('🔒 SEGURANÇA:');
  console.log('- Nova senha mais forte e única');
  console.log('- Altere imediatamente no MongoDB');
  console.log('- Não compartilhe com ninguém');
  console.log('- Use autenticação de dois fatores se possível\n');
  
  console.log('⚠️  PRÓXIMOS PASSOS:');
  console.log('1. Atualizar senha no MongoDB (copie o hash acima)');
  console.log('2. Limpar dados de teste do sistema');
  console.log('3. Verificar quem mais tem acesso admin');
  console.log('4. Implementar logs de auditoria\n');
});

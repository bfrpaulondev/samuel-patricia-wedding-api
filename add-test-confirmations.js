#!/usr/bin/env node

// Script para adicionar confirmações de teste no MongoDB
// Uso: node add-test-confirmations.js

const mongoose = require('mongoose');

// Conectar ao MongoDB
const MONGODB_URI = 'mongodb+srv://bfrpaulondev_db_user:Ci85Wu3bZ0iooagG@cluster0.mp369cb.mongodb.net/wedding-app?retryWrites=true&w=majority';

// Definir o modelo
const RsvpSchema = new mongoose.Schema({
  name: String,
  email: String,
  guests: Number,
  message: String,
  dietary: String,
  status: { type: String, enum: ['PENDING', 'APPROVED', 'REJECTED'], default: 'PENDING' }
}, { timestamps: true });

const Rsvp = mongoose.model('Rsvp', RsvpSchema);

// Confirmações de teste
const testRsvps = [
  {
    name: 'João Silva',
    email: 'joao.silva@example.com',
    guests: 2,
    message: 'Parabéns pelo casamento! Estamos muito felizes por vocês! 🎉',
    dietary: 'Sem restrições',
    status: 'PENDING'
  },
  {
    name: 'Maria Santos',
    email: 'maria.santos@example.com',
    guests: 3,
    message: 'Vamos adorar estar presentes neste dia especial!',
    status: 'PENDING'
  },
  {
    name: 'Pedro Oliveira',
    email: 'pedro.oliveira@example.com',
    guests: 1,
    message: 'Obrigado pelo convite! Não vejo a hora! 💜',
    dietary: 'Vegetariano',
    status: 'APPROVED'
  },
  {
    name: 'Ana Costa',
    email: 'ana.costa@example.com',
    guests: 4,
    message: 'A família toda está animada! Parabéns aos noivos!',
    status: 'APPROVED'
  },
  {
    name: 'Carlos Mendes',
    email: 'carlos.mendes@example.com',
    guests: 2,
    message: 'Felicidades ao casal! Que Deus os abençoe sempre! 🙏',
    dietary: 'Sem glúten',
    status: 'PENDING'
  },
  {
    name: 'Beatriz Lima',
    email: 'beatriz.lima@example.com',
    guests: 1,
    message: 'Parabéns! Vou levar um presente especial! 🎁',
    status: 'APPROVED'
  },
  {
    name: 'Ricardo Fernandes',
    email: 'ricardo.fernandes@example.com',
    guests: 2,
    message: 'Casamento lindo! Parabéns!',
    dietary: 'Intolerante à lactose',
    status: 'PENDING'
  },
  {
    name: 'Juliana Rodrigues',
    email: 'juliana.rodrigues@example.com',
    guests: 3,
    message: 'Muito feliz pelo convite! Família toda confirmada! 👨‍👩‍👧',
    status: 'APPROVED'
  },
  {
    name: 'Fernando Alves',
    email: 'fernando.alves@example.com',
    guests: 1,
    message: 'Obrigado! Vou estar lá!',
    status: 'REJECTED'
  },
  {
    name: 'Camila Souza',
    email: 'camila.souza@example.com',
    guests: 2,
    message: 'Lindíssimo! Parabéns Samuel e Patrícia! ❤️',
    status: 'PENDING'
  }
];

async function addTestConfirmations() {
  try {
    console.log('\n🔗 Conectando ao MongoDB...\n');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Conectado com sucesso!\n');

    console.log('📊 Verificando confirmações existentes...\n');
    const existingCount = await Rsvp.countDocuments();
    console.log(`   Confirmações existentes: ${existingCount}\n`);

    if (existingCount > 0) {
      console.log('⚠️  ATENÇÃO: Já existem confirmações no banco de dados!');
      console.log('   Este script adiciona confirmações de TESTE.\n');
      console.log('   Tem certeza que deseja continuar? (Ctrl+C para cancelar)\n');
      await new Promise(resolve => setTimeout(resolve, 5000));
    }

    console.log('📝 Adicionando confirmações de teste...\n');
    
    for (const rsvp of testRsvps) {
      // Verificar se o email já existe
      const existing = await Rsvp.findOne({ email: rsvp.email });
      if (existing) {
        console.log(`   ⏭️  Pulando ${rsvp.name} (email já existe)`);
        continue;
      }

      await Rsvp.create(rsvp);
      console.log(`   ✅ ${rsvp.name} - ${rsvp.guests} convidados - Status: ${rsvp.status}`);
    }

    console.log('\n📊 Estatísticas Finais:\n');
    const total = await Rsvp.countDocuments();
    const pending = await Rsvp.countDocuments({ status: 'PENDING' });
    const approved = await Rsvp.countDocuments({ status: 'APPROVED' });
    const rejected = await Rsvp.countDocuments({ status: 'REJECTED' });
    const totalGuests = await Rsvp.aggregate([
      { $group: { _id: null, total: { $sum: '$guests' } } }
    ]);

    console.log(`   Total de confirmações: ${total}`);
    console.log(`   Pendentes: ${pending}`);
    console.log(`   Aprovadas: ${approved}`);
    console.log(`   Rejeitadas: ${rejected}`);
    console.log(`   Total de convidados: ${totalGuests[0]?.total || 0}\n`);

    console.log('🎉 Pronto! Acesse o dashboard para ver as confirmações:\n');
    console.log('   https://samuel-patricia-wedding-site.vercel.app/admin/dashboard\n');

    await mongoose.disconnect();
    console.log('✅ Desconectado do MongoDB.\n');
    process.exit(0);

  } catch (error) {
    console.error('\n❌ Erro:', error.message);
    process.exit(1);
  }
}

addTestConfirmations();

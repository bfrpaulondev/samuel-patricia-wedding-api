// controllers/rsvpController.js
const Rsvp = require('../models/Rsvp');

exports.createRsvp = async (req, res) => {
  try {
    const { name, email, guests, dietary, message } = req.body;

    // Validar campos obrigatórios
    if (!name || !email || !guests) {
      return res.status(400).json({ message: 'Nome, email e número de convidados são obrigatórios' });
    }

    // Verificar se já existe RSVP com esse email
    const existing = await Rsvp.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({ message: 'Já existe uma confirmação com este email' });
    }

    const rsvp = await Rsvp.create({
      name,
      email: email.toLowerCase(),
      guests: guests || 1,
      dietary,
      message,
    });

    res.status(201).json({
      message: 'Confirmação registrada com sucesso!',
      rsvp,
    });
  } catch (error) {
    console.error('Erro ao criar RSVP:', error);
    res.status(500).json({ message: 'Erro ao processar confirmação' });
  }
};

exports.checkRsvpByEmail = async (req, res) => {
  try {
    const { email } = req.query;
    
    if (!email) {
      return res.status(400).json({ message: 'Email é obrigatório' });
    }

    const rsvp = await Rsvp.findOne({ email: email.toLowerCase() });
    
    if (!rsvp) {
      return res.json({ exists: false });
    }

    res.json({
      exists: true,
      name: rsvp.name,
      status: rsvp.status,
      submittedAt: rsvp.createdAt,
    });
  } catch (error) {
    console.error('Erro ao verificar RSVP:', error);
    res.status(500).json({ message: 'Erro ao verificar confirmação' });
  }
};

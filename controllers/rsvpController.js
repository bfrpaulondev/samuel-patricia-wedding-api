// controllers/rsvpController.js
const Rsvp = require('../models/Rsvp');

exports.createRsvp = async (req, res) => {
  try {
    const { fullName, email, phone, willAttend, guests, dietaryRestrictions, message } = req.body;

    // Validar campos obrigatórios
    if (!fullName || !email || willAttend === undefined) {
      return res.status(400).json({ message: 'Nome, email e confirmação são obrigatórios' });
    }

    // Verificar se já existe RSVP com esse email
    const existing = await Rsvp.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({ message: 'Já existe uma confirmação com este email' });
    }

    const rsvp = await Rsvp.create({
      fullName,
      email: email.toLowerCase(),
      phone,
      willAttend,
      guests: willAttend ? guests || 1 : 0,
      dietaryRestrictions,
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
      fullName: rsvp.fullName,
      willAttend: rsvp.willAttend,
      status: rsvp.status,
      submittedAt: rsvp.createdAt,
    });
  } catch (error) {
    console.error('Erro ao verificar RSVP:', error);
    res.status(500).json({ message: 'Erro ao verificar confirmação' });
  }
};

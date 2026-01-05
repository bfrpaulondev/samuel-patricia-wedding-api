// controllers/cleanupController.js
const Rsvp = require('../models/Rsvp');

// Limpar todos os RSVPs de teste (@example.com)
exports.cleanTestData = async (req, res) => {
  try {
    const result = await Rsvp.deleteMany({
      email: { $regex: /@example\.com$/i }
    });

    res.json({
      message: 'Dados de teste removidos com sucesso',
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error('Erro ao limpar dados de teste:', error);
    res.status(500).json({ message: 'Erro ao limpar dados de teste' });
  }
};

// Limpar TODOS os RSVPs (CUIDADO!)
exports.cleanAllData = async (req, res) => {
  try {
    const { confirmPassword } = req.body;
    
    // Senha de confirmação para segurança extra
    if (confirmPassword !== 'DELETE_ALL_CONFIRMATIONS_2026') {
      return res.status(403).json({ 
        message: 'Senha de confirmação incorreta' 
      });
    }

    const result = await Rsvp.deleteMany({});

    res.json({
      message: 'TODOS os dados foram removidos',
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error('Erro ao limpar todos os dados:', error);
    res.status(500).json({ message: 'Erro ao limpar dados' });
  }
};

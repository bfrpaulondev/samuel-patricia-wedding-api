// controllers/adminController.js
const Rsvp = require('../models/Rsvp');

exports.getAllRsvps = async (req, res) => {
  try {
    const { status, page = 1, limit = 50 } = req.query;
    
    const query = status ? { status } : {};
    
    const rsvps = await Rsvp.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Rsvp.countDocuments(query);

    res.json({
      rsvps,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Erro ao buscar RSVPs:', error);
    res.status(500).json({ message: 'Erro ao buscar confirmações' });
  }
};

exports.updateRsvpStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Status inválido' });
    }

    const rsvp = await Rsvp.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!rsvp) {
      return res.status(404).json({ message: 'RSVP não encontrado' });
    }

    res.json({
      message: 'Status atualizado com sucesso',
      rsvp,
    });
  } catch (error) {
    console.error('Erro ao atualizar status:', error);
    res.status(500).json({ message: 'Erro ao atualizar status' });
  }
};

exports.deleteRsvp = async (req, res) => {
  try {
    const { id } = req.params;

    const rsvp = await Rsvp.findByIdAndDelete(id);

    if (!rsvp) {
      return res.status(404).json({ message: 'RSVP não encontrado' });
    }

    res.json({ message: 'RSVP deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar RSVP:', error);
    res.status(500).json({ message: 'Erro ao deletar RSVP' });
  }
};

exports.getStats = async (req, res) => {
  try {
    const total = await Rsvp.countDocuments();
    const pending = await Rsvp.countDocuments({ status: 'pending' });
    const approved = await Rsvp.countDocuments({ status: 'approved' });
    const rejected = await Rsvp.countDocuments({ status: 'rejected' });
    const willAttend = await Rsvp.countDocuments({ willAttend: true });
    const wontAttend = await Rsvp.countDocuments({ willAttend: false });
    
    const guestsResult = await Rsvp.aggregate([
      { $match: { willAttend: true } },
      { $group: { _id: null, total: { $sum: '$guests' } } }
    ]);
    
    const totalGuests = guestsResult[0]?.total || 0;

    res.json({
      totalConfirmations: total,
      pendingCount: pending,
      approvedCount: approved,
      rejectedCount: rejected,
      willAttendCount: willAttend,
      wontAttendCount: wontAttend,
      totalGuests,
    });
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error);
    res.status(500).json({ message: 'Erro ao buscar estatísticas' });
  }
};

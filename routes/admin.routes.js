// routes/admin.routes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authAdmin = require('../middleware/authAdmin');

/**
 * @swagger
 * /api/admin/rsvps:
 *   get:
 *     summary: Listar todas as confirmações (admin)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, approved, rejected]
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Lista de confirmações
 */
router.get('/rsvps', authAdmin, adminController.getAllRsvps);

/**
 * @swagger
 * /api/admin/rsvps/{id}:
 *   patch:
 *     summary: Atualizar status da confirmação
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, approved, rejected]
 *     responses:
 *       200:
 *         description: Status atualizado
 */
router.patch('/rsvps/:id', authAdmin, adminController.updateRsvpStatus);

/**
 * @swagger
 * /api/admin/rsvps/{id}:
 *   delete:
 *     summary: Deletar confirmação
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Confirmação deletada
 */
router.delete('/rsvps/:id', authAdmin, adminController.deleteRsvp);

/**
 * @swagger
 * /api/admin/stats:
 *   get:
 *     summary: Obter estatísticas
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Estatísticas
 */
router.get('/stats', authAdmin, adminController.getStats);

module.exports = router;

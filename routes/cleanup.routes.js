// routes/cleanup.routes.js
const express = require('express');
const router = express.Router();
const cleanupController = require('../controllers/cleanupController');
const authAdmin = require('../middleware/authAdmin');

/**
 * @swagger
 * /api/admin/cleanup/test:
 *   delete:
 *     summary: Remover dados de teste (@example.com)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dados de teste removidos
 */
router.delete('/test', authAdmin, cleanupController.cleanTestData);

/**
 * @swagger
 * /api/admin/cleanup/all:
 *   delete:
 *     summary: Remover TODOS os dados (CUIDADO!)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               confirmPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Todos os dados removidos
 */
router.delete('/all', authAdmin, cleanupController.cleanAllData);

module.exports = router;

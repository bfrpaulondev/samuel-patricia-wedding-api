// routes/rsvp.routes.js
const express = require('express');
const router = express.Router();
const rsvpController = require('../controllers/rsvpController');

/**
 * @swagger
 * /api/rsvps:
 *   post:
 *     summary: Criar nova confirmação
 *     tags: [RSVP]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - email
 *               - willAttend
 *             properties:
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               willAttend:
 *                 type: boolean
 *               guests:
 *                 type: number
 *               dietaryRestrictions:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       201:
 *         description: Confirmação criada
 *       400:
 *         description: Dados inválidos
 */
router.post('/', rsvpController.createRsvp);

/**
 * @swagger
 * /api/rsvps/check:
 *   get:
 *     summary: Verificar confirmação por email
 *     tags: [RSVP]
 *     parameters:
 *       - in: query
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Resultado da verificação
 */
router.get('/check', rsvpController.checkRsvpByEmail);

module.exports = router;

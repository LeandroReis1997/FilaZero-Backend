const express = require('express');
const router = express.Router();
const AppointmentHistory = require('../models/AppointmentHistory');
const { body, validationResult } = require('express-validator');
const authMiddleware = require('../middlewares/authMiddleware');

// Cadastro de histórico de agendamento (protegido)
router.post('/create', authMiddleware, [
  body('appointment_id').notEmpty().withMessage('Agendamento é obrigatório'),
  body('status').notEmpty().withMessage('Status é obrigatório')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const history = await AppointmentHistory.create(req.body);
    res.status(201).json(history);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Listar histórico de um agendamento (protegido)
router.get('/appointment/:appointmentId', authMiddleware, async (req, res) => {
  try {
    const history = await AppointmentHistory.findAll({
      where: { appointment_id: req.params.appointmentId }
    });
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
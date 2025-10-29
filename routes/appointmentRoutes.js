const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const { body, validationResult } = require('express-validator');
const authMiddleware = require('../middlewares/authMiddleware');

// Cadastro de agendamento (protegido)
router.post('/schedule', authMiddleware, [
  body('establishment_id').notEmpty().withMessage('Estabelecimento é obrigatório'),
  body('user_id').notEmpty().withMessage('Usuário é obrigatório'),
  body('professional_id').notEmpty().withMessage('Profissional é obrigatório'),
  body('service_id').notEmpty().withMessage('Serviço é obrigatório'),
  body('date').isISO8601().withMessage('Data inválida'),
  body('time').notEmpty().withMessage('Hora é obrigatória')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const appointment = await Appointment.create({
      ...req.body,
      status: 'pending'
    });
    res.status(201).json(appointment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Listar agendamentos de um estabelecimento (protegido)
router.get('/establishment/:establishmentId', authMiddleware, async (req, res) => {
  try {
    const appointments = await Appointment.findAll({
      where: { establishment_id: req.params.establishmentId }
    });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Listar agendamentos de um usuário (protegido)
router.get('/user/:userId', authMiddleware, async (req, res) => {
  try {
    const appointments = await Appointment.findAll({
      where: { user_id: req.params.userId }
    });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Listar agendamentos de um profissional (protegido)
router.get('/professional/:professionalId', authMiddleware, async (req, res) => {
  try {
    const appointments = await Appointment.findAll({
      where: { professional_id: req.params.professionalId }
    });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Aprovar ou recusar agendamento (protegido)
router.patch('/:id/approve', authMiddleware, [
  body('status').isIn(['confirmed', 'cancelled']).withMessage('Status inválido')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const appointment = await Appointment.findByPk(req.params.id);
    if (!appointment) return res.status(404).json({ error: 'Agendamento não encontrado' });
    appointment.status = req.body.status;
    await appointment.save();
    res.json(appointment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
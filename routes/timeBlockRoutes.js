const express = require('express');
const router = express.Router();
const TimeBlock = require('../models/TimeBlock');
const { body, validationResult } = require('express-validator');
const authMiddleware = require('../middlewares/authMiddleware');

// Cadastro de bloqueio de horário (protegido)
router.post('/create', authMiddleware, [
  body('establishment_id').notEmpty().withMessage('Estabelecimento é obrigatório'),
  body('date').isISO8601().withMessage('Data inválida'),
  body('start_time').notEmpty().withMessage('Hora inicial é obrigatória'),
  body('end_time').notEmpty().withMessage('Hora final é obrigatória')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const timeBlock = await TimeBlock.create(req.body);
    res.status(201).json(timeBlock);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Listar bloqueios de um profissional (protegido)
router.get('/professional/:professionalId', authMiddleware, async (req, res) => {
  try {
    const blocks = await TimeBlock.findAll({
      where: { professional_id: req.params.professionalId }
    });
    res.json(blocks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const Rating = require('../models/Rating');
const { body, validationResult } = require('express-validator');
const authMiddleware = require('../middlewares/authMiddleware');

// Cadastro de avaliação (protegido)
router.post('/create', authMiddleware, [
  body('appointment_id').notEmpty().withMessage('Agendamento é obrigatório'),
  body('user_id').notEmpty().withMessage('Usuário é obrigatório'),
  body('professional_id').notEmpty().withMessage('Profissional é obrigatório'),
  body('establishment_id').notEmpty().withMessage('Estabelecimento é obrigatório'),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Avaliação deve ser entre 1 e 5')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const newRating = await Rating.create(req.body);
    res.status(201).json(newRating);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Listar avaliações de um profissional (protegido)
router.get('/professional/:professionalId', authMiddleware, async (req, res) => {
  try {
    const ratings = await Rating.findAll({
      where: { professional_id: req.params.professionalId }
    });
    res.json(ratings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
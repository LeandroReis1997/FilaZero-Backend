const express = require('express');
const router = express.Router();
const Professional = require('../models/Professional');
const { body, validationResult } = require('express-validator');
const authMiddleware = require('../middlewares/authMiddleware');

// Cadastro de profissional (protegido)
router.post('/register', authMiddleware, [
  body('establishment_id').notEmpty().withMessage('Estabelecimento é obrigatório'),
  body('name').notEmpty().withMessage('Nome é obrigatório'),
  body('email').isEmail().withMessage('Email inválido')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const professional = await Professional.create(req.body);
    res.status(201).json(professional);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Listar todos os profissionais de um estabelecimento (protegido)
router.get('/establishment/:establishmentId', authMiddleware, async (req, res) => {
  try {
    const professionals = await Professional.findAll({
      where: { establishment_id: req.params.establishmentId }
    });
    res.json(professionals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Atualizar dados de profissional (protegido)
router.put('/:id', authMiddleware, [
  body('name').optional().notEmpty().withMessage('Nome não pode ser vazio'),
  body('email').optional().isEmail().withMessage('Email inválido')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const professional = await Professional.findByPk(req.params.id);
    if (!professional) return res.status(404).json({ error: 'Profissional não encontrado' });
    await professional.update(req.body);
    res.json(professional);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
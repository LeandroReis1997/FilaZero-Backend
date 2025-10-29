const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
const { body, validationResult } = require('express-validator');
const authMiddleware = require('../middlewares/authMiddleware');

// Cadastro de serviço (protegido)
router.post('/register', authMiddleware, [
  body('establishment_id').notEmpty().withMessage('Estabelecimento é obrigatório'),
  body('name').notEmpty().withMessage('Nome do serviço é obrigatório'),
  body('duration').isInt({ min: 1 }).withMessage('Duração deve ser um número positivo'),
  body('price').isFloat({ min: 0 }).withMessage('Preço deve ser um número positivo')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const service = await Service.create(req.body);
    res.status(201).json(service);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Listar todos os serviços de um estabelecimento (protegido)
router.get('/establishment/:establishmentId', authMiddleware, async (req, res) => {
  try {
    const services = await Service.findAll({
      where: { establishment_id: req.params.establishmentId }
    });
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Atualizar dados de serviço (protegido)
router.put('/:id', authMiddleware, [
  body('name').optional().notEmpty().withMessage('Nome não pode ser vazio'),
  body('duration').optional().isInt({ min: 1 }).withMessage('Duração deve ser um número positivo'),
  body('price').optional().isFloat({ min: 0 }).withMessage('Preço deve ser um número positivo')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const service = await Service.findByPk(req.params.id);
    if (!service) return res.status(404).json({ error: 'Serviço não encontrado' });
    await service.update(req.body);
    res.json(service);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
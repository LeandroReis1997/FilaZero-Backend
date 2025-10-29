const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');
const { body, validationResult } = require('express-validator');
const authMiddleware = require('../middlewares/authMiddleware');

// Cadastro de notificação (protegido)
router.post('/create', authMiddleware, [
  body('type').isIn(['appointment', 'reminder', 'promotion', 'system']).withMessage('Tipo inválido'),
  body('title').notEmpty().withMessage('Título é obrigatório'),
  body('message').notEmpty().withMessage('Mensagem é obrigatória')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const notification = await Notification.create({
      ...req.body,
      is_read: false
    });
    res.status(201).json(notification);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Listar notificações de um usuário (protegido)
router.get('/user/:userId', authMiddleware, async (req, res) => {
  try {
    const notifications = await Notification.findAll({
      where: { user_id: req.params.userId }
    });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const Establishment = require('../models/Establishment');
const authMiddleware = require('../middlewares/authMiddleware');

// Cadastro de estabelecimento
router.post('/register', authMiddleware, async (req, res) => {
  try {
    const { name, email, phone, address, business_hours, settings, is_team } = req.body;
    const establishment = await Establishment.create({
      name, email, phone, address, business_hours, settings, is_team
    });
    res.status(201).json(establishment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Listar todos os estabelecimentos
router.get('/', authMiddleware, async (req, res) => {
  try {
    const establishments = await Establishment.findAll();
    res.json(establishments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const ProfessionalService = require('../models/ProfessionalService');
const authMiddleware = require('../middlewares/authMiddleware');

// Cadastro de serviço para profissional (protegido)
router.post('/assign', authMiddleware, async (req, res) => {
  try {
    const { professional_id, service_id } = req.body;
    const assignment = await ProfessionalService.create({
      professional_id,
      service_id
    });
    res.status(201).json(assignment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Listar serviços de um profissional (protegido)
router.get('/professional/:professionalId', authMiddleware, async (req, res) => {
  try {
    const assignments = await ProfessionalService.findAll({
      where: { professional_id: req.params.professionalId }
    });
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Listar profissionais de um serviço (protegido)
router.get('/service/:serviceId', authMiddleware, async (req, res) => {
  try {
    const assignments = await ProfessionalService.findAll({
      where: { service_id: req.params.serviceId }
    });
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
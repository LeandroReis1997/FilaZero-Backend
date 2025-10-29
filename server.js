const express = require('express');
const app = express();

app.use(express.json());

// Rotas

const notificationRoutes = require('./routes/notificationRoutes');
app.use('/notifications', notificationRoutes);

const ratingRoutes = require('./routes/ratingRoutes');
app.use('/ratings', ratingRoutes);

const timeBlockRoutes = require('./routes/timeBlockRoutes');
app.use('/timeblocks', timeBlockRoutes);

const appointmentHistoryRoutes = require('./routes/appointmentHistoryRoutes');
app.use('/appointment-history', appointmentHistoryRoutes);

const professionalServiceRoutes = require('./routes/professionalServiceRoutes');
app.use('/professional-services', professionalServiceRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
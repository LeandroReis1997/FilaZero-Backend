const sequelize = require('./config/database');
const Establishment = require('./models/Establishment');
const User = require('./models/User');

sequelize.sync({ alter: true })
  .then(() => {
    console.log('Tabelas criadas/sincronizadas!');
    process.exit();
  })
  .catch(err => {
    console.error('Erro ao sincronizar:', err);
    process.exit(1);
  });
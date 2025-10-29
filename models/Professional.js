const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Professional = sequelize.define('Professional', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  establishment_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING(20),
  },
  profile_image: {
    type: DataTypes.STRING(255),
  },
  is_owner: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive', 'on_vacation'),
    defaultValue: 'active',
  },
  working_hours: {
    type: DataTypes.JSON,
  },
  specialties: {
    type: DataTypes.JSON,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'professionals',
  timestamps: false,
});

module.exports = Professional;
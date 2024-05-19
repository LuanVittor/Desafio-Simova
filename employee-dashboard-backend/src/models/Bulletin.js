const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Employee = require('./Employee');
const Appointment = require('./Appointment');

const Bulletin = sequelize.define('Bulletin', {
  startDate: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  employeeId: {
    type: DataTypes.INTEGER,
    references: {
      model: Employee,
      key: 'id',
    },
    allowNull: false,
  },
});

Bulletin.hasMany(Appointment, { foreignKey: 'bulletinId' });
Appointment.belongsTo(Bulletin, { foreignKey: 'bulletinId' });

module.exports = Bulletin;

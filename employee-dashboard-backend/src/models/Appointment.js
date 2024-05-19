const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Activity = require('./Activity');

const Appointment = sequelize.define('Appointment', {
  date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  activityId: {
    type: DataTypes.INTEGER,
    references: {
      model: Activity,
      key: 'id',
    },
    allowNull: false,
  },
});

module.exports = Appointment;

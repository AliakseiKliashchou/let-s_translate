const Sequelize = require('sequelize');
const sequelize = require('../configs/sequelize');

const Tariff = sequelize.define('tariff', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  cost: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  coins: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  coeff:{
    type: Sequelize.REAL,
    allowNull: false,
  }
});


module.exports = Tariff;

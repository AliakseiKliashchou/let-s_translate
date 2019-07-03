const Sequelize = require('sequelize');
const sequelize = require('../configs/sequelize');

const Customer = sequelize.define("customer", {
  role: {
    type: Sequelize.STRING,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  verify: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  creditCard: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  tarif: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Customer;
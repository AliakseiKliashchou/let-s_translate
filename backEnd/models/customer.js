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
  photo: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    },
    unique: {
      args: true
    }
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
    type: Sequelize.STRING,
    allowNull: false
  },
  tariff: {
    type: Sequelize.STRING,
    allowNull: false
  },
  guid: {
    type: Sequelize.STRING,
    // allowNull: false
  }
});

module.exports = Customer;

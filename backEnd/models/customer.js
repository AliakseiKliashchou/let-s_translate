const Sequelize = require('sequelize');

const Customer = sequelize.define("customer", {
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  role: {
    type: Sequelize.STRING,
    allowNull: false
  },
  verify: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  languages: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  creditCard: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

module.exports = Customer;
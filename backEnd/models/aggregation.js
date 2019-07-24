const Sequelize = require('sequelize');
const sequelize = require('../configs/sequelize');

const Aggregation = sequelize.define("aggregation", {
  idOrder: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  translatorId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  coins: {
    type: Sequelize.INTEGER,
    allowNull: false,
  }
});

module.exports = Aggregation;

const Sequelize = require('sequelize');
const sequelize = require('../configs/sequelize');

const Order = sequelize.define('order', {
  idCustomer: {
    type: Sequelize.STRING,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  download: {
    type: Sequelize.STRING(1000),
    allowNull: false
  },
  originalLanguage: {
    type: Sequelize.STRING,
    allowNull: false
  },
  translateLanguage: {
    type: Sequelize.STRING,
    allowNull: false
  },
  urgency: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  review: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  tags: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: false
  },
  progress: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false
  }
});

module.exports = Order;
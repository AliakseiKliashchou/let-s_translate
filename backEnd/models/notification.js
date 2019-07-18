const Sequelize = require('sequelize');
const sequelize = require('../configs/sequelize');

const Notification = sequelize.define("notification", {
  text: {
    type: Sequelize.STRING,
    allowNull: false
  },
  read: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  idCustomer: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

module.exports = Notification;

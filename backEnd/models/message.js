const Sequelize = require('sequelize');
const sequelize = require('../configs/sequelize');

const Message = sequelize.define("message", {
  role: {
    type: Sequelize.STRING,
    allowNull: false
  },
  idCommentator: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  idOrder: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  message: {
    type: Sequelize.STRING,
    allowNull: false
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false
  }
});

module.exports = Message;

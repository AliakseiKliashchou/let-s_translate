const Sequelize = require('sequelize');
const sequelize = require('../configs/sequelize');

const Message = sequelize.define("message", {
  senderEmail: {
    type: Sequelize.STRING,
    allowNull: false
  },
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
  photo: {
    type: Sequelize.STRING,
    allowNull: false
  },
  message: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false
  }
});

module.exports = Message;

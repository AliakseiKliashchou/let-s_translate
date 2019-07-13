const Sequelize = require('sequelize');
const sequelize = require('../configs/sequelize');

const Admin = sequelize.define("admin", {
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
  }
});

module.exports = Admin;

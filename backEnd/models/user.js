const Sequelize = require('sequelize');
const sequelize = require('../configs/sequelize');

const User = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true, 
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  age: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

module.exports = User;
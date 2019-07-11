const Sequelize = require('sequelize');
const sequelize = require('../configs/sequelize');

const Translator = sequelize.define('translator', {
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
  // languages: {
  //   type: Sequelize.ARRAY(Sequelize.STRING),
  //   allowNull: false
  // }
});

module.exports = Translator;
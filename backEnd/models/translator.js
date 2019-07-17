const Sequelize = require('sequelize');
const sequelize = require('../configs/sequelize');
// const Waitlist = require('./waitlist');

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
  languages: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  }
});

// Translator.associate = function(models) {
//   Translator.hasMany(models.Waitlist, {foreignKey: 'idTranslator'})
// }

// Translator.belongsTo(Waitlist, {foreignKey: 'waitlistId'});

module.exports = Translator;

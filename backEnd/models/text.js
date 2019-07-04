const Sequelize = require('sequelize');
const sequelize = require('../configs/sequelize');

const Translator = sequelize.define('text', {
  idCustomer: {
    type: Sequelize.STRING,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  download: {
    type: Sequelize.STRING,
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
    type: Sequelize.NUMBER,
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
    type: Sequelize.NUMBER,
    allowNull: false
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false
  }
});

module.exports = Translator;
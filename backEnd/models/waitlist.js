const Sequelize = require('sequelize');
const sequelize = require('../configs/sequelize');

const Waitlist = sequelize.define('waitlist', {
  idCustomer: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  idOrder: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  idTranslators: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
    allowNull: false
  }
});

module.exports = Waitlist;
const Sequelize = require('sequelize');
const sequelize = require('../configs/sequelize');
const Order = require('./order');
const Translator = require('./translator');

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

Waitlist.hasMany(Order);
Waitlist.hasMany(Translator);

module.exports = Waitlist;
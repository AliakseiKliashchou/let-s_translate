const Sequelize = require('sequelize');
const sequelize = require('../configs/sequelize');

const Collection = sequelize.define("collection", {
  idOrders: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
    allowNull: false
  },
  idCustomer: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  oneTranslator: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  lng: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: false,
  }
});

module.exports = Collection;

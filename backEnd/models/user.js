const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../configs/sequelize');

const User = sequelize.define('user', {
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
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  verify: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  languages: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: false
  }
});

User.prototype.isValidPassword = async function(password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);
  return compare;
}
// User.methods.isValidPassword = async function(password) {
//   const user = this;
//   const compare = await bcrypt.compare(password, user.password);
//   return compare;
// }

module.exports = User;
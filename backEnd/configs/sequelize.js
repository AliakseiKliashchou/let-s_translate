const Sequelize = require("sequelize");
const sequelize = require('../configs/sequelize');

const sequelize = new Sequelize("test1", "postgres", "1", {
  dialect: "postgres"
});

sequelize.sync().then(result => {
  console.log(result);
})
.catch(err=> console.log(err));

module.exports = sequelize;
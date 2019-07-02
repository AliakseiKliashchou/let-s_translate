const Sequelize = require('sequelize');
const sequelize = new Sequelize("test1", "postgres", "1", {
  dialect: 'postgres',
  define: {
    timestamps: false
  }
});

sequelize.authenticate().then(() => {
  console.log("Success!");
}).catch((err) => {
  console.log(err);
});

module.exports = sequelize;
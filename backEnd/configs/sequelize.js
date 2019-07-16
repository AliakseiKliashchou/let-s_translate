const Sequelize = require('sequelize');
const sequelize = new Sequelize("test1", "postgres", "1", {
  dialect: 'postgres',
  protocol: 'postgres',
  define: {
    timestamps: false
  }
});

//  sequelize.sync({force: true}).then(() => {
//  }).catch(err => console.log(err))

sequelize.authenticate().then(() => {
  console.log("Success!");
}).catch((err) => {
  console.log(err);
});

module.exports = sequelize;

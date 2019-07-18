const Sequelize = require('sequelize');
const sequelize = new Sequelize("postgres://feqjbdayugbxxk:a4c222bb4a7870ec16f056e8199c248a3e8c9f160c47bea442b6b90260a89a95@ec2-107-20-198-176.compute-1.amazonaws.com:5432/dco7tmo6p9kcne", {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: true
  },
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

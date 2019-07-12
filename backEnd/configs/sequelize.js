const Sequelize = require('sequelize');
const sequelize = new Sequelize("postgres://kqskdyqjdnrbrn:0068d34a3cd648865de1ab9edc722f4d52539f505642e6f0a73a4e8bb87f1882@ec2-174-129-41-127.compute-1.amazonaws.com:5432/d1ejj1n2bnepj8", {
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

const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const bcypt = require('bcrypt');
const UserModel = require('../models/user');
// const CustomerModel = require('../models/customer');

passport.use('createUser', new localStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async(req, email, password, done) => {
  try {

    let user = await UserModel.create({
      role: req.body.role,
      name: req.body.name,
      email, 
      password,
      verify: false,
      languages: req.body.languages
    });

    bcypt.hash(user.password, 10).then((hash) => {
      user.password = hash;
      user.save().then((data) => { 
        console.log("DATA", data); 
        return done(null, user); 
      });
    });
  } catch(error) {
    console.log(error);
    done(error);
  }
}))

passport.use('login', new localStrategy({
  usernameField : 'email',
  passwordField : 'password'
}, async (email, password, done) => {
  try {
    const user = await UserModel.findOne({where: {email}});

    if( !user ){
      return done(null, false, { message : 'User not found'});
    }

    const validate = await user.isValidPassword(password);

    if( !validate ){
      return done(null, false, { message : 'Wrong Password'});
    }
    return done(null, user, { message : 'Logged in Successfully'});
    
  } catch (error) {
    return done(error);
  }
}));

passport.use(new JWTstrategy({
  secretOrKey: 'top_secret',
  jwtFromRequest: ExtractJWT.fromHeader('secret_token')
}, async(token, done) => {
  try {
    console.log("TOKEN", token);
    return done(null, token.user);
  } catch(error) {
    done(error);
  }
}));
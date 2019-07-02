const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/login', (req, res, next) => {
	passport.authenticate('login', (err, user, info) => {
		try {
			console.log("USER", user);

			if(err || !user){
				const error = new Error('An Error occured')
				return next(error);
			}
			req.login(user, { session : false }, async (error) => {
				if( error ) return next(error)
				const body = { email : user.email };
				const token = jwt.sign({ user : body },'top_secret');
				return res.json({ token });
			});     
		} catch (error) {
			return next(error);
		}
	})(req, res, next);
});

module.exports = router;
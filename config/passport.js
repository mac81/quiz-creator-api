// var JwtStrategy = require('passport-jwt').Strategy;
// var ExtractJwt = require('passport-jwt').ExtractJwt;
var Account = require('../models/account');
// var config = require('./main');

//
// var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// Setup work and export for the JWT passport strategy
module.exports = function(passport) {
  // var opts = {};
  // opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  // opts.secretOrKey = config.secret;
  // passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
  //   Account.findOne({id: jwt_payload.id}, function(err, user) {
  //     if (err) {
  //       return done(err, false);
  //     }
  //     if (user) {
  //       done(null, user);
  //     } else {
  //       done(null, false);
  //     }
  //   });
  // }));


  passport.use(new LocalStrategy(
    function(username, password, done) {
      Account.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    }
  ));


};
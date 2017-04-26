var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var passportLocalMongoose = require('passport-local-mongoose');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;



var Account = new Schema({
  username: {type: String},
  password: {type: String}
});

//Account.plugin(passportLocalMongoose);

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

module.exports = mongoose.model('Account', Account);

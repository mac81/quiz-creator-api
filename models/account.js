var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var passportLocalMongoose = require('passport-local-mongoose');


var AccountSchema = new Schema({
  username: {type: String},
  password: {type: String}
});

//Account.plugin(passportLocalMongoose);

AccountSchema.methods.validPassword = function(pw, cb) {
  return true;
};

module.exports = mongoose.model('Account', AccountSchema);

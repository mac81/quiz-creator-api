var Account = require('../models/account');
var passport = require('passport');

module.exports = function (router) {

  /** GET ALL ACCOUNTS (accessed at GET http://localhost:3001/api/accounts) **/
  router.route('/accounts')
    .get(function (req, res) {
      Account.find({}, function (err, users) {
        if (err) throw err;

        res.json(users);
      });
    });

  /** GET ACCOUNT WITH ID (accessed at GET http://localhost:3001/api/accounts/:account_id) **/
  router.route('/accounts/:account_id')
    .get(function (req, res) {
      Account.findById(req.params.account_id, function (err, user) {
        if (err) throw err;

        res.json(user);
      });
    });

  /** CREATE AN ACCOUNT (accessed at POST http://localhost:3001/api/accounts/signup) **/
  router.route('/accounts/signup')
    .post(function(req, res) {
      Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
          return res.send(err);
        }

        passport.authenticate('local')(req, res, function () {
          res.send(account);
        });
      });
    });

  /** SIGN IN ACCOUNT (accessed at POST http://localhost:3001/api/accounts/signin) **/
  router.route('/accounts/signin')
    .post(passport.authenticate('local'), function(req, res) {
      res.send('ok');
    });

};

var Account = require('../models/user');
var passport = require('passport');
var config = require('../config/main');
var jwt = require('jsonwebtoken');

const AuthenticationController = require('../controllers/authentication'),
  express = require('express'),
  passportService = require('./config/passport'),
  passport = require('passport');


module.exports = function (router) {

  /** GET ALL ACCOUNTS (accessed at GET http://localhost:3001/api/accounts) **/
  router.route('/accounts')
    .get(function (req, res) {
      Account.find({}, {password: 0}, function (err, users) {
        if (err) throw err;

        res.json(users);
      });
    });

  /** GET ACCOUNT WITH ID (accessed at GET http://localhost:3001/api/accounts/:account_id) **/
  router.route('/accounts/:account_id')
    .get(function (req, res) {
      Account.findById(req.params.account_id, { password: 0}, function (err, user) {
        if (err) throw err;

        res.json(user);
      });
    });

  /** CREATE AN ACCOUNT (accessed at POST http://localhost:3001/api/accounts/signup) **/
  router.route('/accounts/signup')
    .post(function(req, res) {
      if(!req.body.email || !req.body.password) {
        res.json({ success: false, message: 'Please enter email and password.' });
      } else {
        var newAccount = new Account({
          email: req.body.email,
          password: req.body.password
        });

        newAccount.save(function(err) {
          if (err) {
            return res.json({ success: false, message: 'That email address already exists.'});
          }
          res.json({ success: true, message: 'Successfully created new user.' });
        });
      }
    });

  /** SIGN IN ACCOUNT (accessed at POST http://localhost:3001/api/accounts/signin) **/
  router.route('/accounts/signin')
    .post(function(req, res) {
      Account.findOne({
        email: req.body.email
      }, function(err, account) {
        if (err) throw err;

        if (!account) {
          res.send({ success: false, message: 'Authentication failed. Account not found.' });
        } else {
          account.comparePassword(req.body.password, function(err, isMatch) {
            if (isMatch && !err) {
              const token = jwt.sign(account, config.secret, {
                expiresIn: '2h'
              });
              res.json({ success: true, token: 'JWT ' + token });
            } else {
              res.send({ success: false, message: 'Authentication failed. Password did not match.' });
            }
          });
        }
      });
    });

};

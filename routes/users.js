var User = require('../models/user');
var jwt = require('jsonwebtoken');
var passport = require('passport');




module.exports = function (router) {

  /**
   ## on routes that end in /users
   **/
  router.route('/users')

  /** GET ALL USERS (accessed at GET http://localhost:3001/api/questions) **/
    .get(function (req, res) {
      User.find({}, function (err, users) {
        if (err) throw err;

        res.json(users);
      });
    });

  /**
   ## on routes that end in /users/:user_id
   **/
  router.route('/users/:user_id')

  /** GET USER WITH ID (accessed at GET http://localhost:3001/api/users/:user_id) **/
    .get(function (req, res) {
      User.findOne({username: req.body.username}, function (err, user) {
        if (err) throw err;

        res.json(user);
      });
    });

  /**
   ## on routes that end in /users/signup
   **/
  router.route('/users/signup')

    /** CREATE A USER (accessed at POST http://localhost:3001/api/users/signup) **/
    .post(passport.authenticate('signup', {
      successRedirect: '/home',
      failureRedirect: '/signup',
      failureFlash : true
    }))
      // console.log(req.body)
      // if (!req.body.username) {
      //   res.status(401).send('username required');
      //   return;
      // }
      //
      // if (!req.body.password) {
      //   res.status(401).send('password required');
      //   return;
      // }
      //
      // User.findOne({username: req.body.username}, function (err, user) {
      //   if (user) {
      //     res.send('username taken');
      //     return;
      //   } else {
      //     var newUser = User({
      //       username: req.body.username,
      //       password: req.body.password
      //     });
      //
      //     // save the user
      //     newUser.save(function (err) {
      //       if (err) throw err;
      //
      //       newUser.comparePassword(req.body.password, function (err, isMatch) {
      //         if (err) throw err;
      //
      //         if (isMatch) {
      //           res.json('User created!');
      //         }
      //       });
      //
      //     });
      //   }
      // });
    // });

  /**
   ## on routes that end in /users/signin
   **/
  router.route('/users/signin')

  /** SIGN IN USER (accessed at POST http://localhost:3001/api/users/signin) **/
    .post(passport.authenticate('login', {
        successRedirect: '/home',
        failureRedirect: '/',
        failureFlash : true
      }));

      // if (!req.body.username) {
      //   res.status(401).send('username required');
      //   return;
      // }
      //
      // if (!req.body.password) {
      //   res.status(401).send('password required');
      //   return;
      // }
      //
      // User.findOne({username: req.body.username}, function (err, user) {
      //   // test a matching password
      //   user.comparePassword(req.body.password, function (err, isMatch) {
      //     if (err) throw err;
      //
      //     if (isMatch) {
      //       const token = jwt.sign({username: req.body.username}, 'Edinburgh 173');
      //       res.status(200).json({
      //         user,
      //         token
      //       });
      //     }
      //   });
      //
      // });
    //})

};

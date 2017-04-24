var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var morgan = require('morgan');
var expressJWT = require('express-jwt');
//var jwt = require('jsonwebtoken');
var expressSession = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');

var server = express();

server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());
// server.use(expressJWT({
//     secret: 'Edinburgh 173'
// }).unless({
//     path: ['/api/users', '/api/users/signin', '/api/users/signup']
// }));
server.use(expressSession({secret: 'mySecretKey'}));
server.use(flash());
server.use(passport.initialize());
server.use(passport.session());


var User = require('./models/user');
var LocalStrategy = require('passport-local').Strategy;
passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

// Generates hash using bCrypt
var createHash = function(password){
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

passport.use('signup', new LocalStrategy({
    passReqToCallback : true
  },
  function(req, username, password, done) {
    findOrCreateUser = function(){

      User.findOne({'username':username},function(err, user) {
        if (err){
          console.log('Error in SignUp: '+err);
          return done(err);
        }

        if (user) {
          console.log('User already exists');
          return done(null, false,
            req.flash('message','User Already Exists'));
        } else {
          // if there is no user with that email
          // create the user
          var newUser = new User();
          // set the user's local credentials
          newUser.username = username;
          newUser.password = createHash(password);
          // newUser.email = req.param('email');
          // newUser.firstName = req.param('firstName');
          // newUser.lastName = req.param('lastName');

          // save the user
          newUser.save(function(err) {
            if (err){
              console.log('Error in Saving user: '+err);
              throw err;
            }
            console.log('User Registration succesful');
            return done(null, newUser);
          });
        }
      });
    };

    // Delay the execution of findOrCreateUser and execute
    // the method in the next tick of the event loop
    process.nextTick(findOrCreateUser);
  })
)

// passport/login.js
passport.use('login', new LocalStrategy({
    passReqToCallback : true
  },
  function(req, username, password, done) {
    // check in mongo if a user with username exists or not
    User.findOne({ 'username' :  username },
      function(err, user) {
        // In case of any error, return using the done method
        if (err)
          return done(err);
        // Username does not exist, log error & redirect back
        if (!user){
          console.log('User Not Found with username '+username);
          return done(null, false,
            req.flash('message', 'User Not found.'));
        }
        // User exists but wrong password, log the error
        if (!isValidPassword(user, password)){
          console.log('Invalid Password');
          return done(null, false,
            req.flash('message', 'Invalid Password'));
        }
        // User and password both match, return user from
        // done method which will be treated like success
        return done(null, user);
      }
    );
  }));


var port = process.env.PORT || 3001;

mongoose.connect('mongodb://admin:admin@ds115110.mlab.com:15110/quiz-creator-api');

// ROUTES FOR API
var router = express.Router();

// Logger
server.use(morgan('dev'));

// middleware for all requests
router.use(function (req, res, next) {
  next();
});

/** ROOT ROUTE (accessed at GET http://localhost:3001/api) **/
router.get('/', function (req, res) {
  res.send('Welcome to Quiz Creator API!')
});

// REQUIRE ROUTES
require('./routes/quizzes')(router);
require('./routes/questions')(router);
require('./routes/users')(router);

// REGISTER ROUTES
// all routes will be prefixed with /api
server.use('/api', router);

// START THE SERVER
server.listen(port);
console.log('Server started on ' + port);

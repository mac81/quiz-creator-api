// BASE SETUP
// =============================================================================

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var morgan = require('morgan');
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');

var server = express();

server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());
server.use(expressJWT({
    secret: 'Edinburgh 173'
}).unless({
    path: ['/api/users/signin', '/api/users/signup']
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
  res.json({
    message: 'Welcome to Quiz Creator Api',
    routes: [
      {
        description: 'Create a question',
        method: 'POST',
        url: 'http://localhost:3001/api/questions'
      },
      {
        description: 'Get all questions',
        method: 'GET',
        url: 'http://localhost:3001/api/questions'
      }
    ]
  });
});

// REQUIRE ROUTES
require('./routes/questions')(router);
require('./routes/users')(router);

// REGISTER ROUTES
// all routes will be prefixed with /api
server.use('/api', router);

// START THE SERVER
server.listen(port);
console.log('Server started on ' + port);

// BASE SETUP
// =============================================================================

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Question = require('./models/question');

var server = express();

server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());

var port = process.env.PORT || 3001;

mongoose.connect('mongodb://admin:admin@ds115110.mlab.com:15110/quiz-creator-api');

// ROUTES FOR API
var router = express.Router();

// middleware for all requests
router.use(function (req, res, next) {
  console.log(`${req.method} ${req.url}`);
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

// REGISTER ROUTES
// all routes will be prefixed with /api
server.use('/api', router);

// START THE SERVER
server.listen(port);
console.log('Server started on ' + port);


var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var morgan = require('morgan');
var expressSession = require('express-session');
var passport = require('passport');
var config = require('./config/main');

var server = express();

var port = process.env.PORT || 3001;

mongoose.connect(config.database);

server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());

server.use(expressSession({secret: 'mySecretKey'}));

server.use(passport.initialize());
server.use(passport.session());

require('./config/passport')(passport);


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
require('./routes/accounts')(router);

// REGISTER ROUTES
// all routes will be prefixed with /api
server.use('/api', router);

// START THE SERVER
server.listen(port);
console.log('Server started on ' + port);

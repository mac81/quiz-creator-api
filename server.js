// BASE SETUP
// =============================================================================

var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3001;

var mongoose   = require('mongoose');
mongoose.connect('mongodb://admin:admin@ds115110.mlab.com:15110/quiz-creator-api');

var Question     = require('./models/question');

// ROUTES FOR API
// =============================================================================
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:3001/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

// on routes that end in /questions
// ----------------------------------------------------
router.route('/questions')

    // create a question (accessed at POST http://localhost:3001/api/questions)
    .post(function(req, res) {

        var question = new Question({
            question: req.body.question,
            author: req.body.author,
            answers: req.body.answers
        });

        // save the question and check for errors
        question.save(function(err) {
            if (err)
                res.send(err);

            res.json({
                message: 'Question created!',
                payload: question
            });
        });

    })

    // get all questions (accessed at GET http://localhost:3001/api/questions)
    .get(function(req, res) {
        Question.find(function(err, questions) {
            if (err)
                res.send(err);

            res.json(questions);
        });
    });

// on routes that end in /questions/:question_id
// ----------------------------------------------------
router.route('/questions/:question_id')

    // get question with id (accessed at GET http://localhost:3001/api/questions/:question_id)
    .get(function(req, res) {
        Question.findById(req.params.question_id, function(err, question) {
            if (err)
                res.send(err);
            res.json(question);
        });
    })

    // update question with id (accessed at PUT http://localhost:8080/api/questions/:question_id)
    .put(function(req, res) {

        // use our bear model to find the bear we want
        Question.findById(req.params.question_id, function(err, question) {

            if (err)
                res.send(err);

            question = {
                question: req.body.question,
                author: req.body.author,
                answers: req.body.answers
            };

            // save question
            question.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: `Question updated! ${question}` });
            });

        });
    })

    // delete question with id (accessed at DELETE http://localhost:3001/api/questions/:question_id)
    .delete(function(req, res) {
        Question.remove({
            _id: req.params.question_id
        }, function(err, question) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

// REGISTER ROUTES -------------------------------
// all routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);


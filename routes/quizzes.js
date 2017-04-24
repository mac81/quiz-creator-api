var Quiz = require('../models/quiz');
var User = require('../models/user');

module.exports = function (router) {

  /**
   ## on routes that end in /quiz
   **/
  router.route('/quiz')

    /** CREATE A QUIZ (accessed at POST http://localhost:3001/api/quiz) **/
    .post(function (req, res) {

      var quiz = new Quiz({
        name: req.body.name,
        creator: req.user
      });

      quiz.save(function (err) {
        if (err) throw err;

        res.json({
          message: 'Quiz created!',
          payload: quiz
        });
      });
    })

    /** GET ALL QUIZZES (accessed at GET http://localhost:3001/api/quiz) **/
    .get(function (req, res) {
      Quiz.find({}, function (err, quizzes) {
        if (err) throw err;

        res.json(quizzes);
      });
    });

  /**
   ## on routes that end in /quiz/:quiz_id
   **/
  router.route('/quiz/:quiz_id')

    /** GET QUIZ WITH ID (accessed at GET http://localhost:3001/api/quiz/:quiz_id) **/
    .get(function (req, res) {
      Quiz.findById(req.params.quiz_id, function(err, quiz) {
        if (err) throw err;

        if(quiz) {
          res.json(quiz);
        } else {
          res.json({
            message: 'Quiz not found!'
          });
        }
      });
    })

    /** DELETE QUIZ WITH ID (accessed at DELETE http://localhost:3001/api/quiz/:quiz_id) **/
    .delete(function (req, res) {
      Quiz.findByIdAndRemove(req.params.quiz_id, function(err, quiz) {
        if (err) throw err;

        if(quiz) {
          res.json({
            message: 'Quiz successfully deleted'
          });
        } else {
          res.json({
            message: 'Quiz not found!'
          });
        }
      });
    });

};

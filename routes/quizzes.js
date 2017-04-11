var Quiz = require('../models/quiz');

module.exports = function (router) {

  /**
   ## on routes that end in /quiz
   **/
  router.route('/quiz')

    /** CREATE A QUESTION (accessed at POST http://localhost:3001/api/questions) **/
    .post(function (req, res) {

      var quiz = new Quiz({
        name: req.body.name
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
   ## on routes that end in /quiz
   **/
  router.route('/quiz/:quiz_id')

  /** CREATE A QUESTION (accessed at POST http://localhost:3001/api/questions) **/

    /** GET QUESTION WITH ID (accessed at GET http://localhost:3001/api/questions/:question_id) **/
    .get(function (req, res) {
      Quiz.findById(req.params.quiz_id).populate('questions').exec(function(err, quiz) {
        if (err) throw err;

        res.json(quiz);
      });
    })

};

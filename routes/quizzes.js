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

};

var Question = require('../models/question');

module.exports = function (router) {

  /**
   ## on routes that end in /questions
   **/
  router.route('/questions')

    /** CREATE A QUESTION (accessed at POST http://localhost:3001/api/questions) **/
    .post(function (req, res) {

      var question = new Question({
        questionText: req.body.questionText,
        correctAnswerId: req.body.correctAnswerId,
        answers: req.body.answers
      });

      // save the question and check for errors
      question.save(function (err) {
        if (err)
          res.send(err);

        res.json({
          message: 'Question created!',
          payload: question
        });
      });

    })

    /** GET ALL QUESTIONS (accessed at GET http://localhost:3001/api/questions) **/
    .get(function (req, res) {
      Question.getQuestions(function (err, questions) {
        if (err) {
          res.send(err);
        }
        res.json(questions);
      });
    });

  /**
   ## on routes that end in /questions/:question_id
   **/
  router.route('/questions/:question_id')

    /** GET QUESTION WITH ID (accessed at GET http://localhost:3001/api/questions/:question_id) **/
    .get(function (req, res) {
      Question.findById(req.params.question_id, function (err, question) {
        if (err)
          res.send(err);
        res.json(question);
      });
    })

    /** UPDATE QUESTION WITH ID (accessed at PUT http://localhost:3001/api/questions/:question_id) **/
    .put(function (req, res) {

      Question.findOneAndUpdate(
        {_id: req.params.question_id, 'answers._id': req.body.answerId},
        {'$set': {'answers.$.answerText': req.body.answerText}},
        {new: true},
        function (error, result) {
          if (error) {
            res.json({
              message: error
            })
          }
          else {
            res.json({
              message: 'Question updated!',
              payload: result
            });
          }
        }
      );
    })

    /** DELETE QUESTION WITH ID (accessed at DELETE http://localhost:3001/api/questions/:question_id) **/
    .delete(function (req, res) {
      Question.remove({
        _id: req.params.question_id
      }, function (err, question) {
        if (err)
          res.send(err);

        res.json({message: 'Successfully deleted'});
      });
    });

  /**
   ## on routes that end in /questions/:question_id/answers
   **/
  router.route('/questions/:question_id/answers')

    /** GET QUESTION ANSWERS WITH QUESTION_ID (accessed at GET http://localhost:3001/api/questions/:question_id) **/
    .get(function (req, res) {
      Question.findById(req.params.question_id, function (err, question) {
        if (err)
          res.send(err);
        res.json(question.answers);
      });
    });

  /**
   ## on routes that end in /questions/:question_id/answers/:answer_id
   **/
  router.route('/questions/:question_id/answers/:answer_id')

    /** UPDATE QUESTION ANSWER WITH QUESTION_ID AND ANSWER_ID (accessed at PUT http://localhost:3001/api/questions/:question_id/answers/:answer_id) **/
    .put(function (req, res) {
      res.json({
        message: 'TODO'
      })
    });

}
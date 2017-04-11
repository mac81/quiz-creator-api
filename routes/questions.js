var Question = require('../models/question');
var Answer = require('../models/answer');

module.exports = function (router) {

  /**
   ## on routes that end in /questions
   **/
  router.route('/questions')

    /** CREATE A QUESTION (accessed at POST http://localhost:3001/api/questions) **/
    .post(function (req, res) {

      var question = new Question({
        questionText: req.body.questionText
      });

      Question.count({}, function(err, count) {
        question.label = `q${count + 1}`;

        if(req.body.answers) {
          req.body.answers.forEach(function(answer) {
            var answer = new Answer({
              answerText: answer.answerText,
              isCorrectAnswer: answer.isCorrectAnswer
            });
            answer.save();
            question.answers.push(answer);
          });
        }

        question.save(function (err) {
          if (err) throw err;

          res.json({
            message: 'Question created!',
            payload: question
          });
        });

      });
    })

    /** GET ALL QUESTIONS (accessed at GET http://localhost:3001/api/questions) **/
    .get(function (req, res) {
      // Question.find({}).populate('answers').exec(function(err, questions) {
      //   if (err) throw err;
      //
      //   res.json(questions);
      // });
      Question.find({}, function(err, questions) {
        if (err) throw err;

        res.json(questions);
      });
    });

  /**
   ## on routes that end in /questions/:question_id
   **/
  router.route('/questions/:question_id')

    /** GET QUESTION WITH ID (accessed at GET http://localhost:3001/api/questions/:question_id) **/
    .get(function (req, res) {
      Question.findById(req.params.question_id).populate('answers').exec(function(err, questions) {
        if (err) throw err;

        res.json(questions);
      });
    })

    /** UPDATE QUESTION WITH ID (accessed at PUT http://localhost:3001/api/questions/:question_id) **/
    .put(function (req, res) {

      Question.findByIdAndUpdate(req.params.question_id, {
        questionText: req.body.questionText
      }, {
        new: true
      },function(err, question) {
        if (err) throw err;

        res.json(question);
      });
    })

    /** DELETE QUESTION WITH ID (accessed at DELETE http://localhost:3001/api/questions/:question_id) **/
    .delete(function (req, res) {

      Question.findByIdAndRemove(req.params.question_id, function(err, question) {
        if (err) throw err;

        if(question) {
          res.json({
            message: 'Question successfully deleted'
          });
        } else {
          res.json({
            message: 'Question not found!'
          });
        }

      });

    });

  /**
   ## on routes that end in /questions/:question_id/answers
   **/
  router.route('/questions/:question_id/answers')

    /** CREATE AN ANSWER (accessed at POST http://localhost:3001/api/questions/:question_id/answers) **/
    .post(function (req, res) {

      var answer = new Answer({
        answerText: req.body.answerText,
        isCorrectAnswer: req.body.isCorrectAnswer
      });

      answer.save();

      Question.findById(req.params.question_id, function(err, question) {
        if (err) throw err;

        question.answers.push(answer);

        question.save(function(err) {
          if (err) throw err;

          res.json({
            message: 'Answer successfully created',
            payload: answer
          });
        })
      });
    })

    /** GET QUESTION ANSWERS WITH QUESTION_ID (accessed at GET http://localhost:3001/api/questions/:question_id) **/
    .get(function (req, res) {
      Question.findById(req.params.question_id).populate('answers').exec(function(err, question) {
        if(err) throw err;

        if(question) {
          res.json(question.answers)
        } else {
          res.json({
            message: 'Question not found!'
          });
        }

      });
    });

  /**
   ## on routes that end in /questions/:question_id/answers/:answer_id
   **/
  router.route('/questions/:question_id/answers/:answer_id')

    /** UPDATE QUESTION ANSWER WITH QUESTION_ID AND ANSWER_ID (accessed at PUT http://localhost:3001/api/questions/:question_id/answers/:answer_id) **/
    .put(function (req, res) {
      Answer.findByIdAndUpdate(req.params.answer_id, {
        answerText: req.body.answerText
      }, {
        new: true
      },function(err, answer) {
        if (err) throw err;

        res.json(answer);
      });
    })

    .delete(function (req, res) {

      Answer.findByIdAndRemove(req.params.answer_id, function(err, answer) {
        if (err) throw err;

        if(answer) {
          res.json({
            message: 'Answer successfully deleted'
          });
        } else {
          res.json({
            message: 'Answer not found!'
          });
        }

      });
    });

}
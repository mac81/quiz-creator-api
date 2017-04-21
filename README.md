### Quizzes

* GET     api/quiz
* POST    api/quiz
* PUT     api/quiz/:quiz_id
* DELETE  api/quiz/:quiz_id

### Questions

##### Get all questions
* GET     api/questions

##### Get all questions in quiz
* GET     api/quiz/:quiz_id/questions

##### Create new question in quiz
* POST    api/quiz/:quiz_id/questions

##### Edit question
* PUT     api/questions/:question_id

##### Delete question
* DELETE  questions/:question_id

### Answers

##### Get all answers in question
* GET     api/questions/:question_id/answers

##### Create new answer in question
* POST    api/questions/:question_id/answers

##### Edit answer
* PUT     api/answers/answer_id

##### Delete answer
* DELETE  api/answers/answer_id

### Users

* GET     api/users
* POST    api/users/signup
* POST    api/users/signup
* UPDATE  api/users/:user_id
* DELETE  api/users/:user_id
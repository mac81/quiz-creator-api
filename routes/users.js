var User = require('../models/user');

module.exports = function (router) {

  /**
   ## on routes that end in /questions
   **/
  router.route('/users')

    /** CREATE A USER (accessed at POST http://localhost:3001/api/users) **/
    .post(function (req, res) {

        if(!req.body.username) {
            res.status(400).send('username required');
            return;
        }

        if(!req.body.password) {
            res.status(400).send('password required');
            return;
        }

        User.findOne({username: req.body.username}, function(err, user) {
            if(user) {
                res.send('username taken');
                return;
            } else {
                var newUser = User({
                  username: req.body.username,
                  password: req.body.password
                });

                // save the user
                newUser.save(function(err) {
                  if (err) throw err;

                  res.json('User created!');
                });
            }
        });
    })

    /** GET ALL USERS (accessed at GET http://localhost:3001/api/questions) **/
    .get(function (req, res) {
        User.find({}, function(err, users) {
            if (err) throw err;

            res.json(users);
        });
    });

}

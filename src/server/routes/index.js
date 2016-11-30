const express = require('express');
const router = express.Router();
const queries = require('../db/queries');
const cookieParser = require('cookie-parser');

router.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  return next();
});

router.use(cookieParser());

router.post('/authenticate', function (req, res, next) {
  let submittedUsername = req.body.username;
  let submittedPassword = req.body.password;
  queries.getItems('users', submittedUsername, function (err, result) {
    if (err) {
      console.log(err);
    } else if (result[0].password !== submittedPassword) {
      res.json({
        message: 'Incorrect Password'
      });
    } else {
      res.send('loggedin');
    }
  });
});

router.post('/signup', function (req, res, next) {
  let submittedUsername = req.body.username;
  let submittedPassword = req.body.password;
  queries.newUser(submittedUsername, submittedPassword, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json({
        message: 'success'
      });
    }
  });
});

router.get('/', function(req, res, next) {
  res.json({
    message: 'did the thing'
  });
});

module.exports = router;

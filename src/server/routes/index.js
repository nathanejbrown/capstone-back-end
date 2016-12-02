const express = require('express');
const router = express.Router();
const queries = require('../db/queries');
const cookieParser = require('cookie-parser');
const passport = require('passport');

router.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  return next();
});

router.use(cookieParser());

router.post('/authenticate', function (req, res, next) {
  let submittedUsername = req.body.username;
  let submittedPassword = req.body.password;
  console.log(submittedUsername, submittedPassword);
  queries.getUser('users', submittedUsername, function (err, result) {
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

router.get('/profile/:id', (req, res) => {
  let profileId = req.params.id;
  queries.getitems('users', function(err, result) {
    if (err) {
      console.log(err);
    } else {
      result = result[0];
      res.send(result);
    }
  }, profileId);
});

router.get('/linkedin',
  passport.authenticate('linkedin'));

router.get('/linkedin/callback', passport.authenticate('linkedin', {
  // console.log(req.user);
  successRedirect: 'http://localhost:8888/#/',
  failureRedirect: '/'
}));

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get('/', (req, res) => {
  res.json({message: 'testing'});
});

module.exports = router;

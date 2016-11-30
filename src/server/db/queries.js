const knex = require('./knex');

exports.getItems = function(tableName, username, callback) {
  knex(tableName)
  .where('username', username)
  .then(result => {
    callback(null, result);
  }).catch(err => {
    callback(err);
  });
};

exports.newUser = function(username, password, callback) {
  knex('users')
  .insert({
    username: username,
    password: password
  })
  .then(result => {
    callback(null, result);
  }).catch(err => {
    callback(err);
  });
};

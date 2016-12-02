const knex = require('./knex');

exports.getUser = function(tableName, username, callback) {
  knex(tableName)
  .where('username', username)
  .then(result => {
    callback(null, result);
  }).catch(err => {
    callback(err);
  });
};

exports.getItems = function(tableName, callback, id) {
  if (id) {
    knex(tableName)
    .where('id', id)
    .then(result => {
      callback(null, result);
    }).catch(err => {
      callback(err);
    });
  } else {
    knex(tableName)
    .then(result => {
      callback(null, result);
    }).catch(err => {
      callback(err);
    });
  }
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

exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table => {
    table.increments();
    table.string('username').notNullable();
    table.string('password').notNullable();
    table.string('profilePicture').notNullable();
    table.string('description').notNullable();
    table.string('firstName').notNullable();
    table.string('lastName');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};

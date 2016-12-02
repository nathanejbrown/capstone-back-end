exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({
          username: 'Heathcliff',
          password: '123456',
          profilePicture: 'http://placekitten.com/300/300',
          description: 'A mild mannered Family Room Specialist with a strange obsession with the tv show \'Dexter\' and a mortal enemy known as \'Stewart\'.',
          firstName: 'Nathan',
          lastName: 'Brown'
        })
      ]);
    });
};

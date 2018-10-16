const knexConfig = require('./knexfile')[process.env.NODE_ENV];
const knex = require('knex')(knexConfig);
const bookshelf = require('bookshelf')(knex); 

bookshelf.plugin('registry');

module.exports = bookshelf;
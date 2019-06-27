const express = require('express');

const router = express.Router();

// const config = require('../config');

// connect to database
router.post('/', (req, res) => {
  const connection = req.body;

  var knex = require('knex')({
    client: connection.client,
    connection: {
      database: connection.dbName,
      user: connection.dbUser,
      password: connection.dbPass,
      connectString: connection.dbConnectionString
    }
  });

  process.env.client = 'oracledb';

  knex.schema
    .dropTableIfExists('db_test')
    .createTable('db_test', function(table) {
      table.increments('id');
      table.string('test');
    })
    .dropTable('db_test')
    .then(function() {
      res.status(200);
      res.send();
    })
    .catch(function(e) {
      res.status(500);
      res.send(e.message);
    });
});

module.exports = router;

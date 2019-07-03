/* eslint-disable curly */
/* eslint-disable indent */
/* eslint-disable no-undef */
/* eslint-disable space-before-function-paren */
const express = require('express');
// const config = require('../config');
const router = express.Router();
// createt database schema
router.post('/', async (req, res) => {
  const schema = req.body;
  var knex = require('knex')({
    client: schema.connection.client,
    connection: {
      database: schema.connection.dbName,
      user: schema.connection.dbUser,
      password: schema.connection.dbPass,
      connectString: schema.connection.dbConnectionString
    }
  });
  for (i = 0; i < schema.tables.length; i++) {
    var table = schema.tables[i];
    await knex.schema
      .raw(
        `BEGIN 
      EXECUTE IMMEDIATE 'DROP TABLE ' || '"${
        table.name
      }"' || ' CASCADE CONSTRAINTS PURGE'; 
  EXCEPTION 
    WHEN OTHERS THEN
    IF SQLCODE != -942 THEN 
    RAISE;
    END IF;
  END;`
      )
      .createTable(table.name, function(tableFields) {
        table.fields.forEach(field => {
          if (field.refTable && field.refField)
            tableFields
              .specificType(field.name, field.dbDataType)
              .references(field.refField)
              .on(field.refTable);
          else tableFields.specificType(field.name, field.dbDataType);
          if (field.pk) tableFields.primary([field.name]);
        });
      })
      .catch(error => {
        res.status(500);
        res.send(error.message);
      });
    if (res._headerSent) break;
  }
  if (!res._headerSent) {
    res.status(200);
    res.send();
  }
});

module.exports = router;

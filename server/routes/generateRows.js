/* eslint-disable eqeqeq */
/* eslint-disable curly */
/* eslint-disable space-before-function-paren */
const express = require('express');

const router = express.Router();

// const config = require('../config');

const faker = require('faker');

faker.locale = 'en';

// Generate rows
router.post('/', async (req, res) => {
  const schema = req.body;
  const baseMultiplicator = schema.multiplicator;

  var knex = require('knex')({
    client: schema.connection.client,
    connection: {
      database: schema.connection.dbName,
      user: schema.connection.dbUser,
      password: schema.connection.dbPass,
      connectString: schema.connection.dbConnectionString
    }
  });
  // Multiplicator
  try {
    for (var i = 1; i <= baseMultiplicator; i++) {
      var keys = {};

      // Tables
      for (var j = 0; j < schema.tables.length; j++) {
        var rows = [];
        var multiplicator = 1;
        var table = schema.tables[j];
        keys[table.name] = [];
        // console.log(table.name);

        if (table.refs.length) {
          multiplicator = tableMultiplicator(table.name);
          // console.log(multiplicator);
        } else {
          multiplicator = table.multiplicator;
          // console.log(multiplicator);
        }

        // Rows
        for (var k = 1; k <= multiplicator; k++) {
          var row = {};

          // Fields
          for (var l = 0; l < table.fields.length; l++) {
            var field = table.fields[l];
            var fakerFunction = field.generateType.split('.');

            if (field.pk) {
              var pkId = i * multiplicator + (k - multiplicator);

              row[field.name] = pkId;

              keys[table.name].push(pkId);
            } else if (field.fk) {
              var precMultiplicator = tableMultiplicator(field.refTable);
              // console.log(precMultiplicator);
              precMultiplicator = Math.floor(multiplicator / precMultiplicator);

              // console.log(`----${field.refTable}`);
              // console.log(precMultiplicator);

              var fk = Math.ceil(k / precMultiplicator) - 1;
              // console.log(keys[field.refTable][fk]);

              row[field.name] = keys[field.refTable][fk];
            } else
              row[field.name] = faker[fakerFunction[0]][fakerFunction[1]]();
          }

          rows.push(row);
          row = {};
        }
        await knex
          .table(table.name)
          .insert(rows)
          .catch(error => {
            res.status(500);
            res.send(error.message);
            console.log(error.message);
            console.log(rows);
            console.log(keys[table.name]);
          });
        if (res._headerSent) break;
      }
      if (res._headerSent) break;
    }
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }

  if (!res._headerSent) {
    res.status(200);
    res.send();
  }

  function tableMultiplicator(tableName) {
    var multiplicator = 1;
    var table = schema.tables.find(table => {
      return table.name === tableName;
    });

    multiplicator = multiplicator * table.multiplicator;

    table.refs.forEach(ref => {
      var refTable = schema.tables.find(table => {
        return table.name === ref;
      });
      if (refTable.refs.length)
        multiplicator = multiplicator * tableMultiplicator(refTable.name);
      else multiplicator = multiplicator * refTable.multiplicator;
    });
    return multiplicator;
  }
});

module.exports = router;

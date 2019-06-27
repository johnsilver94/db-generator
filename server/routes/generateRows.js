const express = require('express');

const router = express.Router();

const config = require('../config');

const faker = require('faker');

faker.locale = 'en';

//Generate rows
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
  //Multiplicator
  try {
    for (var i = 1; i <= baseMultiplicator; i++) {
      var keys = {};

      //Tables
      for (var j = 0; j < schema.tables.length; j++) {
        var rows = [];
        var multiplicator = 1;
        var table = schema.tables[j];
        keys[table.name] = [];

        if (table.refs.length) {
          multiplicator = tableMultiplicator(table.name);
        } else {
          multiplicator = table.multiplicator;
        }

        //Rows
        for (var k = 1; k <= multiplicator; k++) {
          var row = {};

          //Fields
          for (var l = 0; l < table.fields.length; l++) {
            var field = table.fields[l];
            var fakerFunction = field.generateType.split('.');

            if (field.pk) {
              var pkId = i * multiplicator + (k - multiplicator);

              row[field.name] = pkId;

              keys[table.name].push(pkId);
            } else if (field.fk) {
              var curMultiplicator = tableMultiplicator(field.refTable, true);
              var fk = Math.ceil(k / curMultiplicator) - 1;

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

  function tableMultiplicator(tableName, reverse = false) {
    var multiplicator = 1;
    var ok = true;

    if (reverse) {
      ok = true;
      var reverseTables = Object.assign([], schema.tables);
      reverseTables.reverse();
      reverseTables.forEach(reverseTable => {
        if (reverseTable.name == tableName) ok = false;
        if (ok) multiplicator = multiplicator * reverseTable.multiplicator;
      });
    } else {
      ok = true;
      schema.tables.forEach(table => {
        if (ok) multiplicator = multiplicator * table.multiplicator;
        if (table.name == tableName) ok = false;
      });
    }
    return multiplicator;
  }
});

module.exports = router;

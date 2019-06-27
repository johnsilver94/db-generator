function sortTables(schemaTables) {
  var sortedTables = [];

  try {
    schemaTables.forEach(element => {
      if (!element.refs.length) {
        sortedTables.push(element);
        addReferenceTables(element.name);
      }
    });
  } catch (error) {
    throw error;
  }

  function addReferenceTables(parentTableName) {
    schemaTables.filter(table => {
      if (table.refs.indexOf(parentTableName) !== -1) {
        if (table.refs.length === 1) {
          sortedTables.push(table);
          addReferenceTables(table.name);
        } else if (checkReferences(table.refs)) {
          sortedTables.push(table);
          addReferenceTables(table.name);
        }
      }
    });
  }

  function checkReferences(references) {
    var ok = true;
    references.forEach(reference => {
      var table = false;
      table = sortedTables.find(table => {
        if (table.name === reference) return true;
      });

      if (!table) ok = false;
    });
    return ok;
  }

  return sortedTables;
}

module.exports = sortTables;

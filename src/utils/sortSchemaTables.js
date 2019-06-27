export function sortTables(schemaTables) {
  var sortedTables = [];

  try {
    schemaTables.forEach(element => {
      if (!element.refs.length) {
        sortedTables.push(element);
      }
    });
  } catch (error) {
    throw error;
  }

  var sortTables2 = Object.assign([], sortedTables);

  sortTables2.forEach(element => {
    addReferenceTables(element.name);
  });

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
      var findTable = false;
      findTable = sortedTables.find(table => {
        console.log(`Ref=${reference} ---- table=${table.name}`);
        if (table.name === reference) return true;
      });

      if (!findTable) ok = false;
      console.log(ok);
    });
    return ok;
  }

  // function isInserted(tableName) {
  //   var index = sortedTables.findIndex(table => {
  //     return table.name === tableName;
  //   });

  //   if (index === -1) return false;
  //   else return true;
  // }

  return sortedTables;
}

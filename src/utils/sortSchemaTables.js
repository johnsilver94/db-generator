export function sortTables(schemaTables) {
  var sortedTables = [];
  var tablesWithRefs = [];
  // var order = 0;

  schemaTables.forEach(table => {
    if (!table.refs.length) {
      sortedTables.push(table);
    } else {
      tablesWithRefs.push(table);
    }
  });

  while (sortedTables.length < schemaTables.length) {
    tablesWithRefs.forEach(table => {
      if (!tableIsInserted(table.name)) {
        if (refsAreInserted(table.refs)) {
          sortedTables.push(table);
        }
      }
    });
  }

  function tableIsInserted(tableName) {
    var insertedTable = sortedTables.find(element => {
      return element.name === tableName;
    });
    if (insertedTable) return true;
    else return false;
  }

  function refsAreInserted(refsArray) {
    var ok = true;

    refsArray.forEach(refsName => {
      if (!tableIsInserted(refsName)) ok = false;
    });
    return ok;
  }

  return sortedTables;
}

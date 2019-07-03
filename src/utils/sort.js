/* eslint-disable no-unused-vars */
const schema1 = {
  name: 'New schema',
  type: 'Oracle',
  connection: {
    name: 'Oracle DB non-container',
    client: 'oracledb',
    user: 'test_user',
    password: 'test_user',
    connectString: 'localhost/john',
    database: 'Oracle'
  },
  tables: [
    {
      order: 0,
      name: 'Customers',
      multiplicator: 1,
      refs: [],
      fields: [
        {
          name: 'customerId',
          dbDataType: 'NUMBER (19 , 0) ',
          generateType: 'pk',
          refTable: '',
          refField: '',
          fk: false,
          pk: true
        },
        {
          name: 'custName',
          dbDataType: 'VARCHAR2(50 CHAR)',
          generateType: 'name.findName',
          fk: false
        },
        {
          name: 'contactLastName',
          dbDataType: 'VARCHAR2(30 CHAR)',
          generateType: 'lorem.word',
          fk: false
        },
        {
          name: 'contactFirstName',
          dbDataType: 'VARCHAR2(30 CHAR)',
          generateType: 'lorem.word',
          fk: false
        },
        {
          name: 'phone',
          dbDataType: 'VARCHAR2(20 CHAR)',
          generateType: 'phone.phoneNumber',
          fk: false
        },
        {
          name: 'address',
          dbDataType: 'VARCHAR2(50 CHAR)',
          generateType: 'address.streetAddress',
          fk: false
        },
        {
          name: 'city',
          dbDataType: 'VARCHAR2(100 CHAR)',
          generateType: 'address.city',
          fk: false
        },
        {
          name: 'state',
          dbDataType: 'VARCHAR2(100 CHAR)',
          generateType: 'address.county',
          fk: false
        },
        {
          name: 'postalCode',
          dbDataType: 'VARCHAR2(20 CHAR)',
          generateType: 'address.zipCode',
          fk: false
        },
        {
          name: 'country',
          dbDataType: 'VARCHAR2(50 CHAR)',
          generateType: 'address.country',
          fk: false
        },
        {
          name: 'creditLimit',
          dbDataType: 'NUMBER (19 , 2)',
          generateType: 'commerce.price',
          fk: false
        }
      ]
    }
  ]
};
const schema2 = {
  name: 'Newly',
  type: 'Oracle',
  connection: {},
  tables: [
    {
      order: 0,
      name: 'ARTISTS',
      multiplicator: 1,
      refs: [],
      fields: [
        {
          name: 'ArtistId',
          dbDataType: 'NUMBER(15)',
          generateType: 'pk',
          refTable: '',
          refField: '',
          fk: false,
          pk: true
        },
        {
          name: 'ArtistName',
          dbDataType: 'VARCHAR2(50)',
          generateType: '',
          refTable: '',
          refField: '',
          fk: false
        }
      ]
    },
    {
      order: 0,
      multiplicator: 1,
      name: 'GENRE',
      refs: [],
      fields: [
        {
          name: 'GenreId',
          dbDataType: 'NUMBER(15)',
          generateType: 'pk',
          refTable: '',
          refField: '',
          fk: false,
          pk: true
        },
        {
          name: 'Genre',
          dbDataType: 'VARCHAR2(50)',
          generateType: '',
          refTable: '',
          refField: '',
          fk: false
        }
      ]
    },
    {
      order: 0,
      name: 'ALBUMS',
      multiplicator: 1,
      refs: ['ARTISTS', 'GENRE'],
      fields: [
        {
          name: 'AlbumId',
          dbDataType: 'NUMBER(15)',
          generateType: 'pk',
          refTable: '',
          refField: '',
          fk: false,
          pk: true
        },
        {
          name: 'ArtistId',
          dbDataType: 'NUMBER(15)',
          generateType: 'fk',
          refTable: 'ARTISTS',
          refField: 'ArtistId',
          fk: true
        },
        {
          name: 'GenreId',
          dbDataType: 'NUMBER(15)',
          generateType: 'fk',
          refTable: 'GENRE',
          refField: 'GenreId',
          fk: true
        },
        {
          name: 'AlbumName',
          dbDataType: 'VARCHAR2(50)',
          generateType: '',
          refTable: '',
          refField: '',
          fk: false
        },
        {
          name: 'DateRelease',
          dbDataType: 'DATE',
          generateType: '',
          refTable: '',
          refField: '',
          fk: false
        }
      ]
    }
  ]
};

const schema3 = {
  name: 'Second Schema',
  type: 'Oracle',
  multiplicator: 1,
  connection: {},
  tables: [
    {
      name: 'PurchLine',
      multiplicator: 0,
      refs: [],
      fields: [
        {
          pk: true,
          name: 'purchLineId',
          dbDataType: 'NUMBER(19,0)',
          generateType: ''
        },
        {
          fk: true,
          name: 'purchId',
          dbDataType: 'NUMBER(19,0)',
          generateType: '',
          refTable: 'PurchTable',
          refField: 'purchId'
        },
        {
          name: 'prodName',
          dbDataType: 'VARCHAR2(255 CHAR)',
          generateType: ''
        },
        {
          name: 'qty',
          dbDataType: 'NUMBER(6,0)',
          generateType: ''
        },
        {
          name: 'price',
          dbDataType: 'NUMBER(9,2)',
          generateType: ''
        }
      ]
    }
  ]
};

const schema4 = {
  name: 'First Schema',
  type: 'Oracle',
  multiplicator: 1,
  connection: {
    name: 'Oracle DB non-container',
    client: 'oracledb',
    user: 'test_user',
    password: 'test_user',
    connectString: 'localhost/john',
    database: 'Oracle'
  },
  tables: [
    {
      name: 'Address',
      multiplicator: 1,
      refs: [],
      fields: [
        {
          pk: true,
          name: 'addressId',
          dbDataType: 'NUMBER(19,0)',
          generateType: 'pk'
        },
        {
          name: 'country',
          dbDataType: 'VARCHAR2(255 CHAR)',
          generateType: 'address.country'
        },
        {
          name: 'countryAbbr',
          dbDataType: 'VARCHAR2(5 CHAR)',
          generateType: 'address.countryCode'
        },
        {
          name: 'city',
          dbDataType: 'VARCHAR2(255 CHAR)',
          generateType: 'address.city'
        },
        {
          name: 'streetAddress',
          dbDataType: 'VARCHAR2(255 CHAR)',
          generateType: 'address.streetAddress'
        },
        {
          name: 'zipCode',
          dbDataType: 'VARCHAR2(15 CHAR)',
          generateType: 'address.zipCode'
        }
      ]
    },
    {
      name: 'Product',
      multiplicator: 1,
      refs: ['Address'],
      fields: [
        {
          pk: true,
          name: 'productId',
          dbDataType: 'NUMBER(19,0)',
          generateType: 'pk'
        },
        {
          fk: true,
          name: 'prodWarehoueseAddressId',
          dbDataType: 'NUMBER(19,0)',
          generateType: 'fk',
          refTable: 'Address',
          refField: 'addressId'
        },
        {
          name: 'prodName',
          dbDataType: 'VARCHAR2(255 CHAR)',
          generateType: 'commerce.productName'
        },
        {
          name: 'prodCategory',
          dbDataType: 'VARCHAR2(255 CHAR)',
          generateType: 'commerce.product'
        },
        {
          name: 'basePrice',
          dbDataType: 'NUMBER(9,2)',
          generateType: 'commerce.price'
        }
      ]
    },
    {
      name: 'Customers',
      multiplicator: 1,
      refs: ['Address'],
      fields: [
        {
          pk: true,
          name: 'custId',
          dbDataType: 'NUMBER(19,0)',
          generateType: 'pk'
        },
        {
          name: 'custName',
          dbDataType: 'VARCHAR2(255 CHAR)',
          generateType: 'name.findName'
        },
        {
          name: 'custCategory',
          dbDataType: 'VARCHAR2(255 CHAR)',
          generateType: 'name.title'
        },
        {
          fk: true,
          name: 'custAddressId',
          dbDataType: 'NUMBER(19,0)',
          generateType: 'fk',
          refTable: 'Address',
          refField: 'addressId'
        }
      ]
    },
    {
      name: 'PurchTable',
      multiplicator: 3,
      refs: ['Customers'],
      fields: [
        {
          pk: true,
          name: 'purchId',
          dbDataType: 'NUMBER(19 , 0)',
          generateType: 'pk'
        },
        {
          fk: true,
          name: 'custId',
          dbDataType: 'NUMBER(19 , 0)',
          generateType: 'fk',
          refTable: 'Customers',
          refField: 'custId'
        },
        {
          name: 'custName',
          dbDataType: 'VARCHAR2(255 CHAR)',
          generateType: 'name.findName'
        },
        {
          name: 'purchDate',
          dbDataType: 'TIMESTAMP(7)',
          generateType: 'date.past'
        },
        {
          name: 'custType',
          dbDataType: 'VARCHAR2(255 CHAR)',
          generateType: 'name.title'
        }
      ]
    },
    {
      name: 'PurchLine',
      multiplicator: 5,
      refs: ['PurchTable', 'Product'],
      fields: [
        {
          pk: true,
          name: 'purchLineId',
          dbDataType: 'NUMBER(19,0)',
          generateType: 'pk'
        },
        {
          fk: true,
          name: 'purchId',
          dbDataType: 'NUMBER(19,0)',
          generateType: 'fk',
          refTable: 'PurchTable',
          refField: 'purchId'
        },
        {
          fk: true,
          name: 'prodId',
          dbDataType: 'NUMBER(19,0)',
          generateType: 'fk',
          refTable: 'Product',
          refField: 'productId'
        },
        {
          name: 'prodName',
          dbDataType: 'VARCHAR2(255 CHAR)',
          generateType: 'commerce.productName'
        },
        {
          name: 'qty',
          dbDataType: 'NUMBER(6,0)',
          generateType: 'commerce.price'
        },
        {
          name: 'price',
          dbDataType: 'NUMBER(9,2)',
          generateType: 'commerce.price'
        }
      ]
    }
  ]
};

// sortTables(schema1.tables);
// sortTables(schema2.tables);
// sortTables(schema3.tables);
sortTables(schema4.tables);

function sortTables(schemaTables) {
  var sortedTables = [];
  var tablesWithRefs = [];

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

  console.log(sortedTables);

  return sortedTables;
}

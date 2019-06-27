export default {
  drawer: null,
  color: 'success',
  image: './img/img3.png',
  databasesNames: ['Oracle', 'Postgres'],
  databasesClients: ['oracledb', 'pg'],
  currentNotification: {},
  notifications: [
    // { type: 'warning', text: 'Mike, John responded to your email' },
    // { type: 'info', text: 'You have 5 new tasks' },
    // { type: 'success', text: "You're now a friend with Andrew" },
    // { type: 'error', text: 'Another Notification' },
    // { type: 'warning', text: 'Another One' }
  ],
  connections: [
    {
      name: 'Oracle DB connection',
      database: 'Oracle',
      client: 'oracledb',
      dbConnectionString: 'localhost/orcl',
      dbUser: 'C##john',
      dbPass: 'john'
    },
    {
      name: 'PostgreSQL connection',
      database: 'Postgres',
      client: 'pg',
      dbName: 'postgres',
      dbConnectionString: 'localhost:5432/postgres',
      dbUser: 'postgres',
      dbPass: 'postgres'
    },
    {
      name: 'Oracle DB non-container',
      database: 'Oracle',
      client: 'oracledb',
      dbConnectionString: 'localhost/john',
      dbUser: 'test_user',
      dbPass: 'test_user'
    }
  ],

  oracleDataTypesFull: [
    {
      name: 'VARCHAR2(size [BYTE | CHAR])',
      description: 'Variable-length character string.',
      size: 'From 1 byte to 4KB.'
    },
    {
      name: 'NVARCHAR2(size)',
      description:
        'Variable-length Unicode character string having maximum length size characters.',
      size:
        'Maximum size is determined by the national character set definition, with an upper limit of 4000 bytes. You must specify size for NVARCHAR2.'
    },
    {
      name: 'NUMBER [ (p [, s]) ]',
      description:
        'Number having precision p and scale s. Range of p : From 1 to 38. Ranges of s : From -84 to 127. Both precision and scale are in decimal digits.',
      size: 'A NUMBER value requires from 1 to 22 bytes.'
    },
    {
      name: 'FLOAT [(p)]',
      description:
        'A FLOAT value is represented internally as NUMBER. Range of p : From 1 to 126 binary digits.',
      size: 'A FLOAT value requires from 1 to 22 bytes.'
    },
    {
      name: 'LONG',
      description:
        'Character data of variable length up to 2 gigabytes, used for backward compatibility.',
      size: '2^31 -1 bytes'
    },
    {
      name: 'DATE',
      description:
        'Valid date range : From January 1, 4712 BC, to December 31, 9999 AD. The default format is determined explicitly by the NLS_DATE_FORMAT parameter or implicitly by the NLS_TERRITORY parameter.',
      size: 'The size is fixed at 7 bytes.'
    },
    {
      name: 'BINARY_FLOAT',
      description: '32-bit floating point number.',
      size: 'This data type requires 4 bytes.'
    },
    {
      name: 'BINARY_DOUBLE',
      description: '64-bit floating point number.',
      size: 'This data type requires 8 bytes.'
    },
    {
      name: 'TIMESTAMP [(fractional_seconds_precision)]',
      description:
        'This data type contains the datetime fields YEAR, MONTH, DAY, HOUR, MINUTE, and SECOND. It contains fractional seconds but does not have a time zone.',
      size: 'The size is 7 or 11 bytes, depending on the precision.'
    },
    {
      name: 'TIMESTAMP [(fractional_seconds_precision)] WITH TIME ZONE',
      description:
        'VThis data type contains the datetime fields YEAR, MONTH, DAY, HOUR, MINUTE, SECOND, TIMEZONE_HOUR, and TIMEZONE_MINUTE. It has fractional seconds and an explicit time zone.',
      size: 'The size is fixed at 13 bytes.'
    },
    {
      name: 'INTERVAL YEAR [(year_precision)] TO MONTH',
      description:
        'Stores a period of time in years and months, where year_precision is the number of digits in the YEAR datetime field. Accepted values are 0 to 9. The default is 2.',
      size: 'The size is fixed at 5 bytes.'
    },
    {
      name:
        'INTERVAL DAY [(day_precision)] TO SECOND [(fractional_seconds_precision)]',
      description:
        'Stores a period of time in days, hours, minutes, and seconds, where day_precision is the maximum number of digits in the DAY datetime field. Accepted values are 0 to 9. The default is 2.',
      size: 'The size is fixed at 11 bytes.'
    },
    {
      name: 'RAW(size)',
      description: 'Raw binary data of length size bytes.',
      size: 'Maximum size is 2000 bytes'
    },
    {
      name: 'LONG RAW',
      description: 'Raw binary data of variable.',
      size: 'Size up to 2 gigabytes.'
    },
    {
      name: 'ROWID',
      description:
        'The unique address (base 64 string representing) of a row in its table.',
      size: ''
    },
    {
      name: 'UROWID [(size)]',
      description:
        'The logical address of a row (base 64 string representing) of an index-organized table.',
      size: 'The maximum size and default is 4000 bytes.'
    },
    {
      name: 'CHAR [(size [BYTE | CHAR])]',
      description:
        'Fixed-length character data of length size bytes or characters.',
      size:
        'Maximum size is 2000 bytes or characters. Default and minimum size is 1 byte.'
    },
    {
      name: 'NCHAR[(size)',
      description:
        'Fixed-length character data of length size characters. The number of bytes can be up to two times size for AL16UTF16 encoding and three times size for UTF8 encoding.',
      size:
        'Maximum size is determined by the national character set definition, with an upper limit of 2000 bytes. Default and minimum size is 1 character.'
    },
    {
      name: 'CLOB',
      description:
        'A character large object containing single-byte or multibyte characters.',
      size: 'Maximum size is (4 gigabytes - 1) * (database block size).'
    },
    {
      name: 'NCLOB',
      description: 'A character large object containing Unicode characters.',
      size:
        'Maximum size is (4 gigabytes - 1) * (database block size). Stores national character set data.'
    },
    {
      name: 'BLOB',
      description: 'A binary large object.',
      size: 'Maximum size is 4 gigabytes.'
    },
    {
      name: 'BFILE',
      description:
        'Contains a locator to a large binary file stored outside the database.',
      size: 'Maximum size is 4 gigabytes.'
    }
  ],

  defaultSchemaIndex: 0,
  schemas: [
    {
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
    },
    {
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
    },
    {
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
        },
        {
          order: 0,
          multiplicator: '2',
          name: 'Payments',
          refs: ['Customers'],
          fields: [
            {
              name: 'paymentId',
              dbDataType: 'NUMBER (19 , 0) ',
              generateType: '',
              fk: false,
              pk: true
            },
            {
              name: 'custId',
              dbDataType: 'NUMBER (19 , 0) ',
              generateType: 'fk',
              refTable: 'Customers',
              refField: 'customerId',
              fk: true
            },
            {
              name: 'paymentDate',
              dbDataType: 'TIMESTAMP (7)',
              generateType: 'date.past',
              fk: false
            },
            {
              name: 'amount',
              dbDataType: 'NUMBER (19 , 2) ',
              generateType: 'commerce.price',
              fk: false
            }
          ]
        },
        {
          order: 0,
          multiplicator: '2',
          name: 'Orders',
          refs: ['Customers'],
          fields: [
            {
              name: 'orderId',
              dbDataType: 'NUMBER (19 , 0) ',
              generateType: '',
              refTable: '',
              refField: '',
              fk: false,
              pk: true
            },
            {
              name: 'orderDate',
              dbDataType: 'TIMESTAMP (7)',
              generateType: 'date.past',
              refTable: '',
              refField: '',
              fk: false
            },
            {
              name: 'requiredDate',
              dbDataType: 'TIMESTAMP (7)',
              generateType: 'date.past',
              refTable: '',
              refField: '',
              fk: false
            },
            {
              name: 'shippedDate',
              dbDataType: 'TIMESTAMP (7)',
              generateType: 'date.past',
              refTable: '',
              refField: '',
              fk: false
            },
            {
              name: 'status',
              dbDataType: 'VARCHAR2(50 CHAR)',
              generateType: 'lorem.word',
              refTable: '',
              refField: '',
              fk: false
            },
            {
              name: 'comments',
              dbDataType: 'VARCHAR2(250 CHAR)',
              generateType: 'lorem.words',
              refTable: '',
              refField: '',
              fk: false
            },
            {
              name: 'custId',
              dbDataType: 'NUMBER  (19 , 0) ',
              generateType: 'fk',
              refTable: 'Customers',
              refField: 'customerId',
              fk: true
            }
          ]
        },
        {
          order: 0,
          name: 'Products',
          multiplicator: 1,
          refs: [],
          fields: [
            {
              name: 'prodId',
              dbDataType: 'NUMBER (19 ,0) ',
              generateType: '',
              fk: false,
              pk: true
            },
            {
              name: 'prodName',
              dbDataType: 'VARCHAR2(50 CHAR)',
              generateType: 'commerce.productName',
              fk: false
            },
            {
              name: 'prodVendor',
              dbDataType: 'VARCHAR2(50 CHAR)',
              generateType: 'company.companyName',
              fk: false
            },
            {
              name: 'prodDescription',
              dbDataType: 'VARCHAR2(100 CHAR)',
              generateType: 'lorem.sentence',
              fk: false
            },
            {
              name: 'quantityInStock',
              dbDataType: 'NUMBER (19 , 0) ',
              generateType: 'commerce.price',
              fk: false
            },
            {
              name: 'price',
              dbDataType: 'NUMBER (19, 2) ',
              generateType: 'commerce.price',
              fk: false
            }
          ]
        },
        {
          order: 0,
          multiplicator: '5',
          name: 'ProdLines',
          refs: ['Products'],
          fields: [
            {
              name: 'prodLineId',
              dbDataType: 'NUMBER (19, 0) ',
              generateType: '',
              fk: false,
              pk: true
            },
            {
              name: 'description',
              dbDataType: 'VARCHAR2(100 CHAR)',
              generateType: 'lorem.word',
              fk: false
            },
            {
              name: 'image',
              dbDataType: 'VARCHAR2(100 CHAR)',
              generateType: 'internet.avatar',
              fk: false
            },
            {
              name: 'prodId',
              dbDataType: 'NUMBER (19 , 0) ',
              generateType: 'fk',
              refTable: 'Products',
              refField: 'prodId',
              fk: true
            }
          ]
        },
        {
          order: 0,
          multiplicator: '5',
          name: 'OrderDetails',
          refs: ['Products', 'Orders'],
          fields: [
            {
              name: 'orderDetailsId',
              dbDataType: 'NUMBER (19 ,0) ',
              generateType: '',
              refTable: '',
              refField: '',
              fk: false,
              pk: true
            },
            {
              name: 'prodId',
              dbDataType: 'NUMBER  (19 , 0) ',
              generateType: 'fk',
              refTable: 'Products',
              refField: 'prodId',
              fk: true
            },
            {
              name: 'orderId',
              dbDataType: 'NUMBER (19 , 0) ',
              generateType: 'fk',
              refTable: 'Orders',
              refField: 'orderId',
              fk: true
            },
            {
              name: 'qty',
              dbDataType: 'NUMBER (19,0) ',
              generateType: 'commerce.price',
              refTable: '',
              refField: '',
              fk: false
            },
            {
              name: 'price',
              dbDataType: 'NUMBER (19, 2)',
              generateType: 'commerce.price',
              refTable: '',
              refField: '',
              fk: false
            }
          ]
        }
      ],
      multiplicator: '1'
    },
    {
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
    }
  ],
  statistics: {
    schemasBar: {
      data: {
        labels: ['First Schema', 'Second Schema'],
        series: [[12, 17], [12, 29]]
      },
      options: {
        seriesBarDistance: 15,
        low: 0,
        high: 50,
        height: '300px',
        chartPadding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        }
      }
    },
    connectionsPie: {
      data: {
        labels: ['Oracle', 'PostgreSQL'],
        series: [12, 17]
      },
      options: {
        height: '300px'
      }
    },
    generatedHBar: {
      data: {
        labels: ['Table1', 'Table 2'],
        series: [[500, 372]]
      },
      options: {
        height: '300px',
        seriesBarDistance: 15,
        low: 0,
        high: 1000,
        reverseData: true,
        horizontalBars: true,
        axisY: {
          offset: 70
        },
        chartPadding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        }
      }
    },
    generatedRows: { value: '10000' },
    errors: { value: '104' },
    fieldsPerTable: { value: '6.5' },
    generatedDatabase: { value: '7' }
  }
};

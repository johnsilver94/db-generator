export default {
  drawer: null,
  color: 'success',
  image: './img/img3.png',
  oracleDataTypes: [
    'VARCHAR2(size [BYTE | CHAR])',
    'NVARCHAR2(size)',
    'NUMBER [ (p [, s]) ]',
    'FLOAT [(p)]',
    'LONG',
    'DATE',
    'BINARY_FLOAT',
    'BINARY_DOUBLE',
    'TIMESTAMP [(fractional_seconds_precision)]',
    'TIMESTAMP [(fractional_seconds_precision)] WITH TIME ZONE',
    'INTERVAL YEAR [(year_precision)] TO MONTH',
    'INTERVAL DAY [(day_precision)] TO SECOND [(fractional_seconds_precision)]',
    'RAW(size)',
    'LONG RAW',
    'ROWID',
    'UROWID [(size)]',
    'CHAR [(size [BYTE | CHAR])]',
    'NCHAR[(size)',
    'CLOB',
    'NCLOB',
    'BLOB',
    'BFILE'
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
  databases: ['All', 'Oracle', 'PostgreSQL'],
  connections: [
    {
      name: 'Oracle DB connection',
      client: 'oracledb',
      connectString: 'localhost/orcl',
      user: 'C##john',
      password: 'john',
      database: 'Oracle'
    },
    {
      name: 'PostgreSQL connection',
      client: 'pg',
      dbName: 'postgres',
      connectString: 'localhost:5432/postgres',
      user: 'postgres',
      password: 'postgres',
      database: 'PostgreSQL'
    }
  ],
  notifications: [
    // { type: 'warning', text: 'Mike, John responded to your email' },
    // { type: 'info', text: 'You have 5 new tasks' },
    // { type: 'success', text: "You're now a friend with Andrew" },
    // { type: 'error', text: 'Another Notification' },
    // { type: 'warning', text: 'Another One' }
  ],
  schema: {
    name: 'First Schema',
    type: 'Oracle',
    tables: [
      {
        name: 'PurchTable',
        fromField: '',
        toTable: '',
        toField: '',
        fields: [
          {
            name: 'purchId',
            dbDataType: 'NUMBER(19 , 0)',
            generateType: 'id'
          },
          {
            name: 'custName',
            dbDataType: 'VARCHAR2(255 CHAR)',
            generateType: ''
          },
          { name: 'purchDate', dbDataType: 'TIMESTAMP(7)', generateType: '' },
          {
            name: 'custType',
            dbDataType: 'VARCHAR2(255 CHAR)',
            generateType: ''
          }
        ]
      },
      {
        name: 'PurchLine',
        fromField: 'purchId',
        toTable: 'PurchTable',
        toField: 'purchId',
        fields: [
          {
            name: 'purchLineId',
            dbDataType: 'NUMBER(19,0)',
            generateType: ''
          },
          {
            name: 'purchId',
            dbDataType: 'NUMBER(19,0)',
            generateType: ''
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
  }
};

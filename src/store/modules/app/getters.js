export default {
  databases: state => {
    return state.databases;
  },
  notifications: state => {
    return state.notifications;
  },
  connections: state => {
    return state.connections;
  },
  schemas: state => {
    return state.schemas;
  },
  dbSchema: state => index => {
    return state.schemas[index];
  },
  databaseDataTypes: state => db => {
    switch (db) {
      case 'Oracle':
        return state.oracleDataTypes;
      case 'PostgreSQL':
        return state.postgreDataTypes;
      default:
        return state.oracleDataTypes;
    }
  },
  defaultSchemaIndex: state => {
    return state.defaultSchemaIndex;
  },
  statistics: state => {
    return state.statistics;
  }
};

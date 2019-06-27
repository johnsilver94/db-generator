export default {
  getNotifications: state => {
    return state.notifications;
  },
  getCurrentNotification: state => {
    return state.currentNotification;
  },
  getConnections: state => {
    return state.connections;
  },
  getDatabasesNames: state => {
    return state.databasesNames;
  },
  getDatabasesClients: state => {
    return state.databasesClients;
  },
  getSchemas: state => {
    return state.schemas;
  },
  getDbSchema: state => index => {
    return state.schemas[index];
  },
  getDbDataTypes: state => db => {
    switch (db) {
      case 'Oracle':
        return state.oracleDataTypes;
      case 'Postgres':
        return state.postgreDataTypes;
      default:
        return state.oracleDataTypes;
    }
  },
  getDefaultSchemaIndex: state => {
    return state.defaultSchemaIndex;
  },
  getStatistics: state => {
    return state.statistics;
  }
};

import { set, toggle } from '@/utils/vuex';

export default {
  setDrawer: set('drawer'),
  setImage: set('image'),
  setColor: set('color'),
  toggleDrawer: toggle('drawer'),
  setDefaultSchemaIndex: set('defaultSchemaIndex'),
  // Connections mutations.
  setConnections: (state, payload) => {
    state.connections = payload;
  },
  setConnection: (state, payload) => {
    Object.assign(state.connections[payload.duplicateIndex], payload.payload);
  },
  setCurrentConnection: (state, payload) => {
    state.currentConnection = payload;
  },
  addConnection: (state, payload) => {
    state.connections.push(payload);
  },
  removeConnection: (state, payload) => {
    state.connections.splice(payload, 1);
  },
  //  Notifications
  setCurrentNotification: (state, payload) => {
    state.notifications.push(payload);
    state.currentNotification = payload;
  }
};

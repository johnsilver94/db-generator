// import axios from 'axios';

export default {
  saveConnection({ commit, state }, payload) {
    const notification = {};
    const duplicateIndex = state.connections.findIndex(
      connection => connection.name === payload.name
    );

    if (duplicateIndex === -1) {
      // eslint-disable-next-line standard/computed-property-even-spacing
      payload.client =
        state.databasesClients[state.databasesNames.indexOf(payload.database)];

      commit('addConnection', payload);

      notification.text = `Connection ${payload.name.toUpperCase()} was succesfuly added.`;
      notification.type = 'success';
    } else {
      commit('setConnection', { duplicateIndex, payload });

      notification.text = `Connection ${payload.name.toUpperCase()} was overwrited.`;
      notification.type = 'warning';
    }

    commit('setCurrentNotification', notification);
  },
  deleteConnection({ commit, state }, payload) {
    const notification = {};

    // eslint-disable-next-line standard/computed-property-even-spacing
    notification.text = `Connection ${state.connections[
      payload
    ].name.toUpperCase()} was removed.`;
    notification.type = 'warning';

    commit('removeConnection', payload);
    commit('setCurrentNotification', notification);
  }
  //   testConnection({ commit, state }, payload) {
  //     const notification = {};

  //     return axios
  //       .post(`http://localhost:3000/connect`, payload)
  //       .then(response => {
  //         if (response.status === 200) {
  //           notification.text = `Connection "${payload.name.toUpperCase()}" succeed`;
  //           notification.type = 'success';

  //           commit('setCurrentNotification', notification);
  //         }
  //       })
  //       .catch(error => {
  //         notification.text = `Connection "${payload.name.toUpperCase()}" was failed with ${
  //           error.response.data
  //         }`;
  //         notification.type = 'error';

  //         commit('setCurrentNotification', notification);
  //       });
  //   }
};

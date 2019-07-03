export default {
  incrementGeneratedRows(state, generatedRows) {
    let generatedRowsValue = Number(state.statistics.generatedRows.value);
    generatedRowsValue += generatedRows;
    state.statistics.generatedRows.value = generatedRowsValue.toString();
  },
  incrementErrors(state) {
    let errorsValue = Number(state.statistics.errors.value);
    errorsValue++;
    state.statistics.errors.value = errorsValue.toString();
  },
  setFieldsPerTable(state, payload) {
    state.statistics.fieldsPerTable.value = payload.toString();
  },
  incrementGeneratedDatabase(state) {
    let generatedDatabaseValue = Number(
      state.statistics.generatedDatabase.value
    );
    generatedDatabaseValue++;
    state.statistics.generatedDatabase.value = generatedDatabaseValue.toString();
  },
  setSchemasBarData(state, data) {
    state.statistics.schemasBar.data = data;
    state.statistics.schemasBar.updateDate = new Date();
  },
  setConnectionsPieData(state, data) {
    state.statistics.connectionsPie.data = data;
    state.statistics.connectionsPie.updateDate = new Date();
  },
  setGeneratedHBar(state, data) {
    state.statistics.generatedHBar.data = data;
    state.statistics.generatedHBar.updateDate = new Date();
  }
};

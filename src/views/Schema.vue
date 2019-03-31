<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex xs12 md12 sm12>
        <v-form>
          <v-container py-0>
            <v-layout wrap>
              <v-flex xs2 md2>
                <v-select
                  v-model="schema.type"
                  label="Database"
                  :rules="[rules.required]"
                  :items="databases"
                  class="purple-input"
                ></v-select>
              </v-flex>
              <v-flex xs4 md4>
                <v-text-field
                  v-model="schema.name"
                  label="Schema Name"
                  :rules="[rules.required]"
                  class="purple-input"
                />
              </v-flex>

              <v-flex xs4 md4>
                <v-btn class="mx-0 font-weight-light" color="success">Save</v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
      </v-flex>
      <v-flex xs12 md6>
        <v-toolbar flat color="success">
          <v-toolbar-title class="white--text">Tables</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialogTable" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn icon>
                <v-icon class="mr-2" v-on="on">mdi-table-plus</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTableTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex xs12 sm12 md12>
                      <v-text-field
                        v-model="editTable.name"
                        :rules="[rules.required]"
                        class="purple-input"
                        label="Table Name"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm12 md12>
                      <v-text-field
                        v-model="editTable.fromField"
                        :rules="[rules.required]"
                        class="purple-input"
                        label="From Field"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm12 md12>
                      <v-text-field
                        v-model="editTable.toTable"
                        :rules="[rules.required]"
                        class="purple-input"
                        label="To Table"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm12 md12>
                      <v-text-field
                        v-model="editTable.toField"
                        :rules="[rules.required]"
                        class="purple-input"
                        label="To Field"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click="closeTable">Cancel</v-btn>
                <v-btn color="blue darken-1" flat @click="saveTable">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
        <v-data-table :headers="tablesHeaders" :items="tables" class="elevation-1">
          <template v-slot:items="props">
            <td>{{ props.item.name }}</td>
            <td>{{ props.item.fromField }}</td>
            <td>{{ props.item.toTable }}</td>
            <td>{{ props.item.toField }}</td>
            <td class="justify-center layout mb-2">
              <v-icon small class="mr-2" @click="editTableItem(props.item)">mdi-table-edit</v-icon>
              <v-icon small class="mr-2" @click="openTableItem(props.item)">mdi-table-search</v-icon>
              <v-icon small class="mr-2" @click="deleteTableItem(props.item)">mdi-table-remove</v-icon>
            </td>
          </template>
        </v-data-table>
      </v-flex>
      <v-flex xs12 md6>
        <v-toolbar flat color="info">
          <v-toolbar-title class="white--text">Fields</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialogField" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn icon>
                <v-icon class="mr-2" v-on="on">mdi-table-column-plus-after</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formFieldTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex xs12 sm12 md12>
                      <v-text-field
                        v-model="editField.name"
                        :rules="[rules.required]"
                        class="purple-input"
                        label="Field Name"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm12 md12>
                      <v-select
                        v-model="editField.dbDataType"
                        :items="dbDataTypes"
                        label="Base Data Type"
                        class="purple-input"
                        :rules="[rules.required]"
                      ></v-select>
                    </v-flex>
                    <v-flex xs12 sm12 md12>
                      <v-text-field
                        v-model="editField.dbDataType"
                        :rules="[rules.required]"
                        class="purple-input"
                        label="Data Type"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm12 md12>
                      <v-text-field
                        v-model="editField.generateType"
                        :rules="[rules.required]"
                        class="purple-input"
                        label="Generate Type"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click="closeField">Cancel</v-btn>
                <v-btn color="blue darken-1" flat @click="saveField">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
        <v-data-table :headers="fieldsHeaders" :items="tableFields" class="elevation-1">
          <template v-slot:items="props">
            <td>{{ props.item.name }}</td>
            <td>{{ props.item.dbDataType }}</td>
            <td>{{ props.item.generateType }}</td>
            <td class="justify-center layout mb-2">
              <v-icon small class="mr-2" @click="editFieldItem(props.item)">mdi-pencil</v-icon>
              <v-icon
                small
                class="mr-2"
                @click="deleteFieldItem(props.item)"
              >mdi-table-column-remove</v-icon>
            </td>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    databases: ["Oracle"],
    dialogTable: false,
    rules: {
      required: value => !!value || "Required."
    },
    tablesHeaders: [
      { text: "Table Name", align: "left", value: "name" },
      {
        text: "From Field",
        align: "left",
        value: "fromField",
        sortable: false
      },
      { text: "To Table", align: "left", value: "toTable", sortable: false },
      { text: "To Field", align: "left", value: "toField", sortable: false },
      { text: "Actions", value: "name", sortable: false }
    ],
    editedTableIndex: -1,
    editTable: {
      order: 0,
      name: "",
      fromField: "",
      toTable: "",
      toField: "",
      fields: []
    },
    defaultTable: {
      order: 0,
      name: "",
      fromField: "",
      toTable: "",
      toField: "",
      fields: []
    },
    dialogField: false,
    currentTableIndex: 0,
    editedFieldIndex: -1,
    fieldsHeaders: [
      { text: "Field Name", align: "left", value: "name" },
      {
        text: "Data Type",
        align: "left",
        value: "dbDataType",
        sortable: true
      },
      {
        text: "Generate Type",
        align: "left",
        value: "generateType",
        sortable: false
      },
      { text: "Actions", value: "name", sortable: false }
    ],
    editField: {
      name: "",
      dbDataType: "",
      generateType: ""
    },
    defaultField: {
      name: "",
      dbDataType: "",
      generateType: ""
    }
  }),

  computed: {
    schema() {
      return this.$store.state.app.schema;
    },
    formTableTitle() {
      return this.editedTableIndex === -1 ? "New Table" : "Edit Table";
    },
    tables() {
      return this.$store.state.app.schema.tables;
    },
    formFieldTitle() {
      return this.editedFieldIndex === -1 ? "New Field" : "Edit Field";
    },
    tableFields() {
      return this.$store.state.app.schema.tables[this.currentTableIndex].fields;
    },
    dbDataTypes() {
      return this.$store.state.app.oracleDataTypes;
    }
  },

  watch: {
    dialogTable(val) {
      val || this.closeTable();
    },
    dialogField(val) {
      val || this.closeField();
    }
  },

  methods: {
    editTableItem(item) {
      this.editedTableIndex = this.tables.indexOf(item);
      this.editTable = Object.assign({}, item);
      this.dialogTable = true;
    },
    openTableItem(item) {
      this.currentTableIndex = this.tables.indexOf(item);
    },

    deleteTableItem(item) {
      const index = this.tables.indexOf(item);
      confirm("Are you sure you want to delete this Table?") &&
        this.tables.splice(index, 1);
    },

    closeTable() {
      this.dialogTable = false;
      setTimeout(() => {
        this.editTable = Object.assign({}, this.defaultTable);
        this.editedTableIndex = -1;
      }, 300);
    },

    saveTable() {
      if (this.editedTableIndex > -1) {
        Object.assign(this.tables[this.editedTableIndex], this.editTable);
      } else {
        this.tables.push(this.editTable);
      }
      this.closeTable();
    },
    editFieldItem(item) {
      this.editedFieldIndex = this.tableFields.indexOf(item);
      this.editField = Object.assign({}, item);
      this.dialogField = true;
    },
    deleteFieldItem(item) {
      const index = this.tableFields.indexOf(item);
      confirm("Are you sure you want to delete this Field?") &&
        this.tableFields.splice(index, 1);
    },
    closeField() {
      this.dialogField = false;
      setTimeout(() => {
        this.editField = Object.assign({}, this.defaultField);
        this.editedFieldIndex = -1;
      }, 300);
    },
    saveField() {
      if (this.editedFieldIndex > -1) {
        Object.assign(this.tableFields[this.editedFieldIndex], this.editField);
      } else {
        this.tableFields.push(this.editField);
      }
      this.closeField();
    }
  }
};
</script>
<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex xs12 md12 sm12 justify-center>
        <material-card color="purple" title="Database schema" text="Complete schema data">
          <v-form ref="schemasForm" lazy-validation>
            <v-container py-0>
              <v-layout justify-center wrap>
                <v-flex lg3 md4 sm6 xs12>
                  <v-select
                    v-model="editSchema.name"
                    :items="schemaNames"
                    :rules="schemaRules.schema"
                    @change="editSchemaItem(editSchema.name)"
                    label="Schema"
                    class="purple-input"
                  ></v-select>
                </v-flex>
                <v-flex lg3 md4 sm6 xs12>
                  <v-select
                    v-model="editSchema.type"
                    label="Database"
                    :rules="schemaRules.type"
                    :items="databases"
                    class="purple-input"
                  ></v-select>
                </v-flex>
                <v-flex lg3 md4 sm12 xs12>
                  <v-text-field
                    v-model="editSchema.name"
                    label="Schema name"
                    :rules="schemaRules.name"
                    class="purple-input"
                  />
                </v-flex>
                <v-flex lg1 md3 sm6 xs6>
                  <v-btn class="mx-0 font-weight-light" color="success" @click="saveSchema">Save</v-btn>
                </v-flex>
                <v-flex lg1 md3 sm6 xs6>
                  <v-btn
                    class="mx-0 font-weight-light"
                    color="info"
                    @click="createSchema"
                  >Create New</v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </material-card>
      </v-flex>
      <v-flex xs12 md4>
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
                <v-form ref="tablesForm" lazy-validation>
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <v-flex xs12 sm12 md12>
                        <v-text-field
                          v-model="editTable.name"
                          :rules="tableRules.name"
                          class="purple-input"
                          label="Table Name"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm12 md12>
                        <v-combobox
                          v-model="editTable.refs"
                          label="Reference to tables"
                          chips
                          multiple
                          readonly
                        ></v-combobox>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-form>
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
            <td>{{ props.item.refs.toString() }}</td>
            <td class="justify-center layout mb-2">
              <v-icon small class="mr-2" @click="editTableItem(props.item)">mdi-table-edit</v-icon>
              <v-icon small class="mr-2" @click="openTableItem(props.item)">mdi-table-search</v-icon>
              <v-icon small class="mr-2" @click="deleteTableItem(props.item)">mdi-table-remove</v-icon>
            </td>
          </template>
        </v-data-table>
      </v-flex>
      <v-flex xs12 md8>
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
                <v-form ref="fieldsForm" lazy-validation>
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <v-flex xs12 sm12 md12>
                        <v-text-field
                          v-model="editField.name"
                          :rules="fieldRules.name"
                          class="purple-input"
                          label="Field name"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm12 md12>
                        <v-select
                          v-model="editField.dbDataType"
                          :items="dbDataTypes"
                          label="Base data type"
                          class="purple-input"
                        ></v-select>
                      </v-flex>
                      <v-flex xs12 sm12 md12>
                        <v-text-field
                          v-model="editField.dbDataType"
                          :rules="fieldRules.dbDataType"
                          class="purple-input"
                          label="Data type"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm12 md12>
                        <v-select
                          v-model="editField.refTable"
                          :items="refTables"
                          :rules="fieldRules.refTable"
                          @change="editField.refField = '';"
                          label="Ref table"
                          class="purple-input"
                        ></v-select>
                      </v-flex>
                      <v-flex xs12 sm12 md12>
                        <v-select
                          v-model="editField.refField"
                          :items="refFields"
                          :rules="fieldRules.refField"
                          label="Ref field"
                          class="purple-input"
                        ></v-select>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-form>
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
            <td>
              <v-checkbox v-model="props.item.pk" color="green" @change="checkPk(props.item)"></v-checkbox>
            </td>
            <td>
              <v-checkbox v-model="props.item.fk" readonly color="grey"></v-checkbox>
            </td>
            <td>{{ props.item.name }}</td>
            <td>{{ props.item.dbDataType }}</td>
            <td>{{ props.item.refTable }}</td>
            <td>{{ props.item.refField }}</td>
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
    <v-snackbar
      v-model="notificationbar"
      :timeout="timeout"
      :color="color"
      :bottom="bottom"
      :right="right"
      dark
    >
      <v-icon color="white" class="mr-3">mdi-bell-plus</v-icon>
      <div>{{text}}</div>
      <v-icon size="16" @click="notificationbar = false">mdi-close-circle</v-icon>
    </v-snackbar>
  </v-container>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import { sortTables } from "../utils/sortSchemaTables";
import { constants } from "crypto";

export default {
  data: () => ({
    //Schema
    editSchema: { name: "", type: "", connection: {}, tables: [] },
    defaultSchema: { name: "", type: "", connection: {}, tables: [] },
    schemaRules: {
      schema: [v => !!v || "Schema is required"],
      type: [v => !!v || "Database is required"],
      name: [v => !!v || "Schema name is required"]
    },
    databases: ["Oracle"],
    dialogTable: false,
    //Tables
    editedTableIndex: -1,
    tableRules: {
      name: [
        v => !!v || "Table name is required",
        v =>
          (v && v.length <= 20) || "Table name must be less than 20 characters"
      ]
    },
    tablesHeaders: [
      { text: "Table name", align: "left", value: "name", sortable: false },
      { text: "Ref tables", align: "left", sortable: false },
      { text: "Actions", align: "left", sortable: false }
    ],
    editTable: {
      order: 0,
      name: "",
      multiplicator: 1,
      refs: [],
      fields: []
    },
    defaultTable: {
      order: 0,
      multiplicator: 1,
      name: "",
      refs: [],
      fields: []
    },
    //Fields
    dialogField: false,
    currentTableIndex: 0,
    editedFieldIndex: -1,
    fieldRules: {
      name: [v => !!v || "Field name is required"],
      dbDataType: [v => !!v || "Base data type is required"],
      generateType: [v => !!v || "Generate type is required"]
    },
    fieldsHeaders: [
      { text: "Pk", align: "left", value: "pk", sortable: false },
      { text: "Fk", align: "left", value: "fk" },
      { text: "Field name", align: "left", value: "name" },
      {
        text: "Data type",
        align: "left",
        value: "dbDataType",
        sortable: true
      },
      { text: "Ref table", align: "left", value: "refTable" },
      { text: "Ref field", align: "left", value: "refField" },
      { text: "Actions", value: "name", sortable: false }
    ],
    editField: {
      name: "",
      dbDataType: "",
      generateType: "",
      refTable: "",
      refField: ""
    },
    defaultField: {
      name: "",
      dbDataType: "",
      generateType: "",
      refTable: "",
      refField: ""
    },
    postgreDataTypes: [],
    oracleDataTypes: [
      "VARCHAR2(size [BYTE | CHAR])",
      "NVARCHAR2(size)",
      "NUMBER [ (p [, s]) ]",
      "FLOAT [(p)]",
      "LONG",
      "DATE",
      "BINARY_FLOAT",
      "BINARY_DOUBLE",
      "TIMESTAMP [(fractional_seconds_precision)]",
      "TIMESTAMP [(fractional_seconds_precision)] WITH TIME ZONE",
      "INTERVAL YEAR [(year_precision)] TO MONTH",
      "INTERVAL DAY [(day_precision)] TO SECOND [(fractional_seconds_precision)]",
      "RAW(size)",
      "LONG RAW",
      "ROWID",
      "UROWID [(size)]",
      "CHAR [(size [BYTE | CHAR])]",
      "NCHAR[(size)",
      "CLOB",
      "NCLOB",
      "BLOB",
      "BFILE"
    ],
    //Notification
    color: "info",
    text: "",
    bottom: true,
    right: true,
    notificationbar: false,
    timeout: 6000
  }),

  computed: {
    ...mapGetters("app", {
      schemas: "getSchemas",
      dbSchema: "getDbSchema",
      dbDataTypes: "getDbDataTypes",
      defaultSchemaIndex: "getDefaultSchemaIndex",
      notifications: "getNotifications"
    }),
    formTableTitle() {
      return this.editedTableIndex === -1 ? "New Table" : "Edit Table";
    },
    formFieldTitle() {
      return this.editedFieldIndex === -1 ? "New Field" : "Edit Field";
    },
    schema() {
      return this.dbSchema(this.defaultSchemaIndex);
    },
    tables() {
      return this.editSchema.tables;
    },
    tableFields() {
      if (this.tables.length != 0) {
        return this.tables[this.currentTableIndex].fields;
      } else [];
    },
    dbDataTypes(db) {
      switch (db) {
        case "Oracle":
          return this.oracleDataTypes;
        case "Postgres":
          return this.postgreDataTypes;
        default:
          return this.oracleDataTypes;
      }
    },
    refTables() {
      const refTables = [];

      this.tables.forEach((table, index) => {
        if (this.currentTableIndex != index) refTables.push(table.name);
      });

      return refTables;
    },
    refFields() {
      const refFields = [];

      this.tables.forEach((table, index) => {
        if (table.name === this.editField.refTable) {
          table.fields.forEach(field => {
            refFields.push(field.name);
          });
        }
      });

      return refFields;
    },
    schemaNames() {
      const schemaNames = [];

      this.schemas.forEach(schema => {
        schemaNames.push(schema.name);
      });

      return schemaNames;
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
  created() {
    this.editSchema = Object.assign({}, this.schema);
  },
  methods: {
    ...mapActions("app", ["setTables"]),
    validateSchemasForm() {
      return this.$refs.schemasForm.validate();
    },
    resetValidationSchemasForm() {
      return this.$refs.schemasForm.resetValidation();
    },
    validateTablesForm() {
      return this.$refs.tablesForm.validate();
    },
    resetValidationTablesForm() {
      return this.$refs.tablesForm.resetValidation();
    },
    validateFieldsForm() {
      return this.$refs.fieldsForm.validate();
    },
    resetValidationFieldsForm() {
      return this.$refs.fieldsForm.resetValidation();
    },
    editSchemaItem(name) {
      this.editSchema = Object.assign(
        {},
        this.schemas.find(schema => {
          return schema.name === name;
        })
      );
    },
    createSchema() {
      this.editSchema = Object.assign({}, this.defaultSchema);
      this.resetValidationSchemasForm();
    },
    saveSchema() {
      if (this.validateSchemasForm()) {
        const duplicate = this.schemas.find(schema => {
          return schema.name === this.editSchema.name;
        });
        if (!duplicate) {
          this.schemas.push(this.editSchema);
        } else {
          const duplicateIndex = this.schemas.indexOf(duplicate);
          Object.assign(this.schemas[duplicateIndex], this.editSchema);

          const notification = {
            text: `Schema with name ${this.editSchema.name} was overwrited.`,
            type: "warning"
          };

          this.showNotification(notification);
        }
      }
    },
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
        this.resetValidationTablesForm();
        this.editedTableIndex = -1;
      }, 300);
    },

    saveTable() {
      if (this.validateTablesForm()) {
        const duplicateIndex = this.editSchema.tables.findIndex(table => {
          return table.name == this.editTable.name;
        });

        if (duplicateIndex == -1) {
          this.tables.push(this.editTable);
          this.closeTable();
        } else {
          this.tables[duplicateIndex] = Object.assign({}, this.editTable);

          this.closeTable();
        }

        this.editSchema.tables = sortTables(this.editSchema.tables);
      }
    },
    checkPk(field) {
      const currentState = field.pk;

      if (currentState) {
        this.tableFields.forEach(currentField => {
          if (currentField.name != field.name) currentField.pk = false;
        });
      }
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
        this.resetValidationFieldsForm();
        this.editedFieldIndex = -1;
      }, 300);
    },
    saveField() {
      if (this.validateFieldsForm()) {
        const duplicateIndex = this.tableFields.findIndex(field => {
          return field.name === this.editField.name;
        });

        if (this.editField.refTable && this.editField.refField) {
          this.editField.fk = true;
        } else {
          this.editField.fk = false;
        }

        if (this.editField.pk) {
          this.editField.generateType = "pk";
          this.editField.generateType = "pk";
        }
        if (this.editField.fk) {
          this.editField.generateType = "fk";
          if (
            this.tables[this.currentTableIndex].refs.indexOf(
              this.editField.refTable
            ) == -1
          )
            this.tables[this.currentTableIndex].refs.push(
              this.editField.refTable
            );
        }

        if (duplicateIndex == -1) {
          this.tableFields.push(this.editField);
          this.closeField();
          console.log(this.editField);
        } else {
          this.tableFields[duplicateIndex] = Object.assign({}, this.editField);

          this.closeField();
        }
      }

      this.editSchema.tables = sortTables(this.editSchema.tables);
    },
    showNotification(notification) {
      this.color = notification.type;
      this.text = notification.text;

      this.notifications.push(notification);
      this.notificationbar = true;
    }
  }
};
</script>

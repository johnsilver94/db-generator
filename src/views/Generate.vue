<template>
  <v-container fluid grid-list-md>
    <v-layout justify-center wrap>
      <v-flex xs12 md12 sm12 justify-center>
        <material-card color="purple" title="Generation model" text="Select schema and connection">
          <v-form ref="schemasForm" lazy-validation>
            <v-container py-0>
              <v-layout justify-center wrap>
                <v-flex lg3 md4 sm4 xs12>
                  <v-select
                    v-model="editSchema.name"
                    :items="schemaNames"
                    :rules="schemaRules.schema"
                    @change="selectSchema(editSchema.name)"
                    label="Select schema"
                    class="purple-input"
                  ></v-select>
                </v-flex>
                <v-flex lg3 md4 sm4 xs12>
                  <v-select
                    v-model="editSchema.connection.name"
                    label="Select connection"
                    :rules="schemaRules.connection"
                    :items="connectionNames"
                    @change="selectConnection(editSchema.connection.name)"
                    class="purple-input"
                  ></v-select>
                </v-flex>
                <v-flex lg2 md4 sm4 xs12>
                  <v-text-field
                    v-model="editSchema.multiplicator"
                    :rules="schemaRules.multiplicator"
                    label="Base multiplicator"
                    type="number"
                    min="1"
                  ></v-text-field>
                </v-flex>
                <v-flex lg2 md3 sm4 xs6>
                  <v-btn
                    class="mx-0 font-weight-light"
                    color="success"
                    @click="generateSchema"
                  >Generate schema</v-btn>
                </v-flex>
                <v-flex lg2 md3 sm4 xs6>
                  <v-btn
                    class="mx-0 font-weight-light"
                    color="info"
                    @click="generateRows"
                  >Generate rows</v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </material-card>
      </v-flex>
      <v-flex xs12 md12 sm12 justify-center>
        <v-data-iterator
          :items="tables"
          :rows-per-page-items="rowsPerPageItems"
          :pagination.sync="pagination"
          content-tag="v-layout"
          row
          wrap
        >
          <template v-slot:header>
            <v-toolbar class="mb-2" color="info">
              <v-toolbar-title class="white--text">Tables</v-toolbar-title>
            </v-toolbar>
          </template>
          <template v-slot:item="props">
            <v-flex xs12 sm6 md4 lg3>
              <v-card>
                <v-card-title>
                  <v-flex md8 sm12>
                    <b>
                      <h4>{{ props.item.name }}</h4>
                    </b>
                  </v-flex>
                  <v-flex md4 sm12>
                    <v-text-field
                      v-model="props.item.multiplicator"
                      type="number"
                      min="1"
                      label="Multiplicator"
                    ></v-text-field>
                  </v-flex>
                  <v-flex md6 sm6>
                    <h6>Reference to:</h6>
                  </v-flex>
                  <v-flex md6 sm6>
                    <p>{{props.item.refs.toString()}}</p>
                  </v-flex>
                </v-card-title>
                <v-divider></v-divider>
                <v-list dense>
                  <v-list-tile v-for="(field,index) in props.item.fields" :key="index">
                    <v-flex md8>
                      <v-list-tile-content>{{field.name}}</v-list-tile-content>
                    </v-flex>
                    <v-flex md4>
                      <v-list-tile-content class="align-end">
                        <v-select
                          v-if="field.pk || field.fk"
                          v-model="field.generateType"
                          :items="generateDataTypes"
                          label="Gen type"
                          class="purple-input"
                          disabled
                        ></v-select>
                        <v-select
                          v-else
                          v-model="field.generateType"
                          :items="generateDataTypes"
                          label="Gen type"
                          class="purple-input"
                        ></v-select>
                      </v-list-tile-content>
                    </v-flex>
                  </v-list-tile>
                </v-list>
              </v-card>
            </v-flex>
          </template>
        </v-data-iterator>
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
import { mapGetters, mapMutations } from "vuex";
import axios from "axios";

export default {
  data: () => {
    return {
      generateDataTypes: [
        "pk",
        "fk",
        "address.zipCode",
        "address.city",
        "address.streetAddress",
        "address.secondaryAddress",
        "address.county",
        "address.country",
        "address.countryCode",
        "commerce.color",
        "commerce.department",
        "commerce.productName",
        "commerce.price",
        "commerce.productMaterial",
        "commerce.product",
        "company.companyName",
        "company.companySuffix",
        "company.catchPhrase",
        "date.past",
        "date.future",
        "date.recent",
        "date.month",
        "date.weekday",
        "finance.account",
        "finance.accountName",
        "finance.transactionType",
        "finance.currencyCode",
        "finance.currencyName",
        "finance.currencySymbol",
        "finance.bitcoinAddress",
        "finance.iban",
        "finance.bic",
        "helpers.createCard",
        "helpers.contextualCard",
        "helpers.userCard",
        "helpers.createTransaction",
        "internet.avatar",
        "internet.email",
        "internet.exampleEmail",
        "internet.userName",
        "internet.protocol",
        "internet.url",
        "internet.domainName",
        "internet.ip",
        "internet.ipv6",
        "internet.userAgent",
        "internet.color",
        "internet.mac",
        "internet.password",
        "lorem.word",
        "lorem.words",
        "lorem.sentence",
        "lorem.slug",
        "lorem.sentences",
        "lorem.paragraph",
        "lorem.paragraphs",
        "lorem.text",
        "lorem.lines",
        "name.findName",
        "name.jobTitle",
        "name.title",
        "phone.phoneNumber",
        "random.uuid",
        "random.boolean",
        "random.alphaNumeric",
        "system.fileName",
        "system.mimeType",
        "system.semver"
      ],
      //Schema
      editSchema: {
        name: "",
        type: "",
        multiplicator: 1,
        connection: {},
        tables: []
      },
      defaultSchema: {
        name: "",
        type: "",
        multiplicator: 1,
        connection: {},
        tables: []
      },
      schemaRules: {
        schema: [v => !!v || "Schema is required"],
        connection: [v => !!v || "Connection is required"],
        multiplicator: [v => !!v || "Connection is required"]
      },
      databases: ["Oracle"],
      rowsPerPageItems: [4, 8, 12, 16, 20],
      pagination: {
        rowsPerPage: 4
      },
      //Notification
      color: "info",
      text: "",
      bottom: true,
      right: true,
      notificationbar: false,
      timeout: 6000
    };
  },
  computed: {
    ...mapGetters("app", [
      "statistics",
      "schemas",
      "connections",
      "notifications",
      "defaultSchemaIndex",
      "dbSchema"
    ]),
    schema() {
      return this.dbSchema(this.defaultSchemaIndex);
    },
    tables() {
      return this.editSchema.tables;
    },
    schemaNames() {
      const schemaNames = [];

      this.schemas.forEach(schema => {
        schemaNames.push(schema.name);
      });

      return schemaNames;
    },
    connectionNames() {
      const connectionNames = [];

      this.connections.forEach(connection => {
        if (connection.database === this.editSchema.type)
          connectionNames.push(connection.name);
      });

      return connectionNames;
    }
  },

  created() {
    this.editSchema = Object.assign({}, this.schema);
  },
  methods: {
    validateSchemasForm() {
      return this.$refs.schemasForm.validate();
    },
    resetValidationSchemasForm() {
      return this.$refs.schemasForm.resetValidation();
    },
    selectSchema(name) {
      this.editSchema = Object.assign(
        {},
        this.schemas.find(schema => {
          return schema.name === name;
        })
      );
    },
    selectConnection(name) {
      this.editSchema.connection = Object.assign(
        {},
        this.connections.find(connection => {
          return connection.name === name;
        })
      );

      console.log(this.editSchema.connection);
    },
    generateSchema() {
      if (!this.validateSchemasForm()) {
        const notification = {
          text: `Please  fill in all all required fields.`,
          type: "warning"
        };

        this.showNotification(notification);
      } else {
        axios
          .post(`http://localhost:3000/create`, this.editSchema)
          .then(response => {
            if (response.status == 200) {
              const notification = {
                text: `Schema "${this.editSchema.name.toUpperCase()}" are created`,
                type: "success"
              };

              this.showNotification(notification);
            }
          })
          .catch(error => {
            const notification = {
              text: `Schema "${this.editSchema.name.toUpperCase()}" was failed with ${
                error.response.data
              }`,
              type: "error"
            };
            this.showNotification(notification);
          });
      }
    },
    generateRows() {
      if (!this.validateSchemasForm()) {
        const notification = {
          text: `Please  fill in all all required fields.`,
          type: "warning"
        };

        this.showNotification(notification);
      } else {
        axios
          .post(`http://localhost:3000/generate`, this.editSchema)
          .then(response => {
            if (response.status == 200) {
              const notification = {
                text: `Generate rows for schema "${this.editSchema.name.toUpperCase()}" are finished with success.`,
                type: "success"
              };

              this.showNotification(notification);
            }
          })
          .catch(error => {
            const notification = {
              text: `Generate rows for schema "${this.editSchema.name.toUpperCase()}" was failed with ${
                error.response.data
              }`,
              type: "error"
            };
            this.showNotification(notification);
          });
      }
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

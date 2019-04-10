<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex xs12 md8>
        <material-card color="green" title="Database connection" text="Complete connection data">
          <v-form ref="connectionForm" lazy-validation>
            <v-container py-0>
              <v-layout wrap>
                <v-flex xs12 md12>
                  <v-text-field
                    v-model="currentConnection.name"
                    :rules="connectionRules.connectionName"
                    label="Connection name"
                  />
                </v-flex>
                <v-flex xs12 md8>
                  <v-select
                    v-model="currentConnection.client"
                    :rules="connectionRules.client"
                    :items="clients"
                    label="Client"
                    class="purple-input"
                  ></v-select>
                </v-flex>
                <v-flex xs12 md8>
                  <v-text-field
                    v-model="currentConnection.dbName"
                    :rules="connectionRules.database"
                    v-if="currentConnection.client == 'pg'"
                    label="Database"
                    class="purple-input"
                  />
                </v-flex>
                <v-flex xs12 md8>
                  <v-text-field
                    v-model="currentConnection.connectString"
                    :rules="connectionRules.connectString"
                    label="Connection String"
                    class="purple-input"
                  />
                </v-flex>
                <v-flex xs12 md8>
                  <v-text-field
                    v-model="currentConnection.user"
                    :rules="connectionRules.user"
                    label="User"
                    class="purple-input"
                  />
                </v-flex>
                <v-flex xs12 md8>
                  <v-text-field
                    v-model="currentConnection.password"
                    :rules="connectionRules.password"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showPassword ? 'text' : 'password'"
                    label="Password"
                    @click:append="showPassword = !showPassword"
                    class="purple-input"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 text-xs-right>
                  <v-btn
                    class="mx-0 font-weight-light"
                    color="info"
                    @click="testConnection()"
                  >Test connection</v-btn>
                  <v-btn
                    class="mx-0 font-weight-light"
                    color="success"
                    @click="saveConnection()"
                  >Save connection</v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </material-card>
      </v-flex>
      <v-flex xs12 md4>
        <material-card class="card-tabs" color="red">
          <v-flex slot="header">
            <v-tabs v-model="tabs" color="transparent" slider-color="white">
              <span
                class="subheading font-weight-light mr-3"
                style="align-self: center"
              >Connections:</span>
              <v-tab class="mr-3" @click="filter = 'All';">All</v-tab>
              <v-tab
                class="mr-3"
                v-for="(database,index) in databases"
                :key="index"
                @click="filter = database.name;"
              >{{database.name}}</v-tab>
            </v-tabs>
          </v-flex>

          <v-tabs-items v-model="tabs">
            <v-list
              three-line
              v-for="(item,index) in connectionsFilter(filter)"
              :item="item"
              :key="index"
            >
              <v-list-tile>
                <v-list-tile-title>{{item.name}}</v-list-tile-title>
                <div class="d-flex">
                  <v-tooltip top content-class="top">
                    <v-btn
                      slot="activator"
                      class="v-btn--simple"
                      color="success"
                      @click="editConnection(index)"
                      icon
                    >
                      <v-icon color="primary">mdi-pencil</v-icon>
                    </v-btn>
                    <span>Edit</span>
                  </v-tooltip>
                  <v-tooltip top content-class="top">
                    <v-btn
                      slot="activator"
                      class="v-btn--simple"
                      color="danger"
                      @click="deleteConnection(index)"
                      icon
                    >
                      <v-icon color="error">mdi-close</v-icon>
                    </v-btn>
                    <span>Delete</span>
                  </v-tooltip>
                </div>
              </v-list-tile>
              <v-divider/>
            </v-list>
          </v-tabs-items>
        </material-card>
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
import { mapMutations, mapState, mapGetters } from "vuex";
import axios from "axios";

export default {
  data() {
    return {
      //Connection Form
      showPassword: false,
      clients: ["oracledb", "pg"],
      databases: [
        { name: "Oracle", client: "oracledb" },
        { name: "PostgreSQL", client: "pg" }
      ],
      currentConnection: {},
      defaultConnection: {
        name: "",
        client: "",
        connectString: "",
        user: "",
        password: "",
        database: ""
      },
      connectionRules: {
        connectionName: [
          v => !!v || "Connection name is required",
          v => (v && v.length <= 50) || "Name must be less than 50 characters"
        ],
        client: [v => !!v || "Client is required"],
        database: [v => !!v || "Database is required"],
        connectString: [v => !!v || "Connection string is required"],
        user: [v => !!v || "User is required"],
        password: [v => !!v || "Password is required"]
      },
      //Notification
      color: "info",
      text: "",
      bottom: true,
      right: true,
      notificationbar: false,
      timeout: 6000,
      //Tabs Form
      tabs: 0,
      filter: "All"
    };
  },
  computed: {
    ...mapGetters("app", ["notifications", "connections"])
  },
  methods: {
    validateConnectionForm() {
      return this.$refs.connectionForm.validate();
    },
    resetValidationConnectionForm() {
      return this.$refs.connectionForm.resetValidation();
    },
    checkItem(index) {
      let currentState = this.connections[index].checked;

      if (currentState) {
        this.connections.forEach(element => {
          element.checked = false;
        });
      }
      this.connections[index].checked = !this.connections[index].checked;
    },
    connectionsFilter(filter) {
      return this.connections.filter(connection => {
        if (filter === "All") {
          return connection;
        } else {
          return connection.database === filter;
        }
      });
    },
    testConnection() {
      if (!this.validateConnectionForm()) {
        const notification = {
          text: `Please  fill in all all required fields.`,
          type: "warning"
        };

        this.showNotification(notification);
      } else {
        axios
          .post(`http://localhost:3000/connect`, this.currentConnection)
          .then(response => {
            if (response.status == 200) {
              const notification = {
                text: `connection "${this.currentConnection.name.toUpperCase()}" succeed`,
                type: "success"
              };

              this.showNotification(notification);
            }
          })
          .catch(error => {
            const notification = {
              text: `connection "${this.currentConnection.name.toUpperCase()}" was failed with ${
                error.response.data
              }`,
              type: "error"
            };
            this.showNotification(notification);
          });
      }
    },

    saveConnection() {
      if (this.validateConnectionForm()) {
        const duplicateIndex = this.connections.findIndex(
          connection => connection.name === this.currentConnection.name
        );

        if (duplicateIndex == -1) {
          switch (this.currentConnection.client) {
            case "oracledb":
              this.currentConnection.database = "Oracle";
              if (this.databases.indexOf("Oracle") == -1)
                this.databases.push("Oracle");
              break;
            case "pg":
              this.currentConnection.database = "PostgreSQL";
              if (this.databases.indexOf("PostgreSQL") == -1)
                this.databases.push("PostgreSQL");
              break;
          }

          this.connections.push(this.currentConnection);
        } else {
          Object.assign(
            this.connections[duplicateIndex],
            this.currentConnection
          );
          const notification = {
            text: `Connection with name ${
              this.currentConnection.name
            } was overwrited.`,
            type: "warning"
          };

          this.showNotification(notification);
        }
        this.currentConnection = {};
        this.resetValidationConnectionForm();
      }
    },
    editConnection(index) {
      this.currentConnection = Object.assign({}, this.connections[index]);
    },
    deleteConnection(index) {
      if (confirm("Are you sure you want to delete this Connection?")) {
        const notification = {
          text: `connection "${this.connections[
            index
          ].name.toUpperCase()}" was removed`,
          type: "warning"
        };

        this.showNotification(notification);
        this.connections.splice(index, 1);
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

<style lang="scss">
.mx-0 {
  margin-left: 50px !important;
}
</style>

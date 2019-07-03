<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex xs12 md12 lg8>
        <material-card
          color="secondary"
          title="Database connection"
          text="Complete connection data"
        >
          <v-form ref="connectionForm" lazy-validation>
            <v-container py-0>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field
                    v-model="currentConnection.name"
                    :rules="connectionRules.name"
                    label="Connection name"
                    placeholder="Ex: My Connection"
                  />
                </v-flex>
                <v-flex xs12 lg8>
                  <v-select
                    v-model="currentConnection.database"
                    :rules="connectionRules.database"
                    :items="databasesNames"
                    label="Client"
                    class="purple-input"
                  ></v-select>
                </v-flex>
                <v-flex xs12 lg8>
                  <v-text-field
                    v-model="currentConnection.dbName"
                    :rules="connectionRules.dbName"
                    v-if="currentConnection.database == 'Postgres'"
                    label="Database"
                    class="purple-input"
                  />
                </v-flex>
                <v-flex xs12 lg8>
                  <v-text-field
                    v-model="currentConnection.dbConnectionString"
                    :rules="connectionRules.dbConnectionString"
                    label="Connection String"
                    class="purple-input"
                    placeholder="Ex: localhost/orcl"
                  />
                </v-flex>
                <v-flex xs12 lg6>
                  <v-text-field
                    v-model="currentConnection.dbUser"
                    :rules="connectionRules.dbUser"
                    label="User"
                    class="purple-input"
                  />
                </v-flex>
                <v-flex xs12 lg6>
                  <v-text-field
                    v-model="currentConnection.dbPass"
                    :rules="connectionRules.dbPass"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showPassword ? 'text' : 'password'"
                    label="Password"
                    @click:append="showPassword = !showPassword"
                    class="purple-input"
                  ></v-text-field>
                </v-flex>
                <v-flex xs6 sm4 lg2 text-xs-left>
                  <v-btn
                    class="mx-0 font-weight-light"
                    color="tertiary"
                    @click="cancelConnection()"
                  >Cancel</v-btn>
                </v-flex>
                <v-flex xs6 sm8 lg10 text-xs-right>
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
      <v-flex xs12 md12 lg4>
        <material-card class="card-tabs" color="primary">
          <v-flex slot="header">
            <v-tabs v-model="tabs" color="transparent" slider-color="white">
              <span
                class="subheading font-weight-light mr-3"
                style="align-self: center"
              >Connections:</span>
              <v-tab class="mr-3" @click="filter = 'All';">All</v-tab>
              <v-tab
                class="mr-3"
                v-for="(databaseName,index) in databasesNames"
                :key="index"
                @click="filter = databaseName;"
              >{{databaseName}}</v-tab>
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
              <v-divider />
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
import { mapActions, mapMutations, mapState, mapGetters } from "vuex";
import axios from "axios";

export default {
  data() {
    return {
      //Connection Form
      showPassword: false,
      defaultConnection: {
        name: "",
        database: "",
        client: "",
        dbConnectionString: "",
        dbUser: "",
        dbPass: ""
      },
      connectionRules: {
        name: [
          v => !!v || "Connection name is required",
          v => (v && v.length <= 50) || "Name must be less than 50 characters"
        ],
        dbName: [v => !!v || "Database is required"],
        dbConnectionString: [v => !!v || "Connection string is required"],
        dbUser: [v => !!v || "User is required"],
        dbPass: [v => !!v || "Password is required"]
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
    ...mapGetters("app", {
      notifications: "getNotifications",
      currentNotification: "getCurrentNotification",
      connections: "getConnections",
      databasesNames: "getDatabasesNames",
      databasesClients: "getDatabasesClients",
      currentConnection: "getCurrentConnection"
    })
  },
  methods: {
    ...mapActions("app", {
      save: "saveConnection",
      delete: "deleteConnection",
      test: "testConnection"
    }),
    ...mapActions("statistics", {
      setConnectionsPieData: "setConnectionsPieData",
      incrementErrors: "incrementErrors"
    }),
    ...mapMutations("app", {
      setCurrentNotification: "setCurrentNotification",
      setCurrentConnection: "setCurrentConnection"
    }),
    validateConnectionForm() {
      return this.$refs.connectionForm.validate();
    },
    resetValidationConnectionForm() {
      return this.$refs.connectionForm.resetValidation();
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
      const notification = {};

      if (!this.validateConnectionForm()) {
        notification.text = `Please  fill in all all required fields.`;
        notification.type = "warning";

        this.setCurrentNotification(notification);
        this.showNotification();
      } else {
        axios
          .post(`http://localhost:3000/connect`, this.currentConnection)
          .then(response => {
            if (response.status === 200) {
              notification.text = `Connection "${this.currentConnection.name.toUpperCase()}" succeed`;
              notification.type = "success";

              this.setCurrentNotification(notification);
              this.showNotification();
            }
          })
          .catch(error => {
            notification.text = `Connection "${this.currentConnection.name.toUpperCase()}" was failed with ${
              error.response.data
            }`;
            notification.type = "error";

            this.incrementErrors();
            this.setCurrentNotification(notification);
            this.showNotification();
          });
      }
    },

    saveConnection() {
      if (this.validateConnectionForm()) {
        const duplicateIndex = this.connections.findIndex(
          connection => connection.name === this.currentConnection.name
        );

        this.save(this.currentConnection);
        this.setConnectionsPieData(this.connections);

        this.showNotification();
        this.setCurrentConnection({});
        this.resetValidationConnectionForm();
      }
    },
    editConnection(index) {
      this.setCurrentConnection(Object.assign({}, this.connections[index]));
    },
    deleteConnection(index) {
      if (confirm("Are you sure you want to delete this Connection?")) {
        this.delete(index);
        this.showNotification();
        this.setConnectionsPieData(this.connections);
      }
    },
    cancelConnection() {
      this.setCurrentConnection({});
      this.resetValidationConnectionForm();
    },
    showNotification() {
      this.color = this.currentNotification.type;
      this.text = this.currentNotification.text;

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

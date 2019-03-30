<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex xs12 md8>
        <material-card color="green" title="DB connection" text="Complete connection data">
          <v-form>
            <v-container py-0>
              <v-layout wrap>
                <v-flex xs12 md12>
                  <v-text-field
                    v-model="currentConnection.name"
                    :rules="[rules.required]"
                    label="Connection name *"
                  />
                </v-flex>
                <v-flex xs12 md8>
                  <v-select
                    v-model="currentConnection.client"
                    :items="clients"
                    label="Client *"
                    class="purple-input"
                    :rules="[rules.required]"
                  ></v-select>
                </v-flex>
                <v-flex xs12 md8>
                  <v-text-field
                    v-model="currentConnection.dbName"
                    v-if="currentConnection.client == 'pg'"
                    :rules="[rules.required]"
                    label="Database *"
                    class="purple-input"
                  />
                </v-flex>
                <v-flex xs12 md8>
                  <v-text-field
                    v-model="currentConnection.connectString"
                    :rules="[rules.required]"
                    label="Connection String *"
                    class="purple-input"
                  />
                </v-flex>
                <v-flex xs12 md8>
                  <v-text-field
                    v-model="currentConnection.user"
                    :rules="[rules.required]"
                    label="User *"
                    class="purple-input"
                  />
                </v-flex>
                <v-flex xs12 md8>
                  <v-text-field
                    v-model="currentConnection.password"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required]"
                    :type="showPassword ? 'text' : 'password'"
                    label="Password *"
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
              <v-tab
                class="mr-3"
                v-for="(database,index) in databases"
                :key="index"
                @click="filter = database;"
              >{{database}}</v-tab>
            </v-tabs>
          </v-flex>

          <v-tabs-items v-model="tabs">
            <v-list
              three-line
              v-for="(item,index) in connectionsList"
              v-if="connectionsFilter(item,filter)"
              :item="item"
              :key="index"
            >
              <v-list-tile>
                <!-- <v-list-tile @click="complete(index)">
                <v-list-tile-action>
                  <v-checkbox v-model="item.checked" color="green"/>
                </v-list-tile-action>-->
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
      v-model="snackbar"
      :timeout="timeout"
      :color="color"
      :bottom="bottom"
      :right="right"
      dark
    >
      <v-icon color="white" class="mr-3">mdi-bell-plus</v-icon>
      <div>{{text}}</div>
      <!-- <v-icon size="16">mdi-close-circle</v-icon> -->
    </v-snackbar>
  </v-container>
</template>


<script>
import { mapMutations, mapState } from "vuex";
import axios from "axios";

export default {
  data() {
    return {
      color: "info",
      text: "",
      bottom: true,
      right: true,
      snackbar: false,
      timeout: 6000,
      showPassword: false,
      clients: ["oracledb", "pg"],
      currentConnection: {},
      rules: {
        required: value => !!value || "Required."
      },
      tabs: 0,
      filter: "All"
    };
  },
  computed: {
    connectionsList() {
      return this.$store.state.app.connections;
    },
    databases() {
      return this.$store.state.app.databases;
    },
    notifications() {
      return this.$store.state.app.notifications;
    }
  },
  methods: {
    complete(index) {
      let currentState = this.connectionsList[index].checked;

      if (currentState) {
        this.connectionsList.forEach(element => {
          element.checked = false;
        });
      }
      this.connectionsList[index].checked = !this.connectionsList[index]
        .checked;
    },
    connectionsFilter(item) {
      if (this.filter === "All") return item;
      else if (this.filter === item.database) return item;
    },
    testConnection() {
      if (!this.formValidator()) {
        let notification = {};
        notification.text = `Please  fill in all required fields marked with an asterisk.`;
        notification.type = "warning";

        this.snack(notification.type, notification.text);

        this.notifications.push(notification);

        this.setNotifications(this.notifications);
      } else {
        let notification = {};

        axios
          .post(`http://localhost:3000/connect`, this.currentConnection)
          .then(response => {
            console.log(response);
            if (response.status == 200) {
              notification.type = "success";
              notification.text = `connection "${this.currentConnection.name.toUpperCase()}" succeed`;
              console.log(notification);
              this.snack(notification.type, notification.text);
              this.notifications.push(notification);
              this.setNotifications(this.notifications);
            }
          })
          .catch(e => {
            console.log(e);
            notification.type = "error";
            notification.text = `connection "${this.currentConnection.name.toUpperCase()}" was failed`;
            console.log(notification);
            this.snack(notification.type, notification.text);
            this.notifications.push(notification);
            this.setNotifications(this.notifications);
          });
      }
    },
    formValidator() {
      if (
        this.currentConnection.client == "oracledb" &&
        this.currentConnection.user &&
        this.currentConnection.password &&
        this.currentConnection.connectString &&
        this.currentConnection.name
      ) {
        return true;
      } else if (
        this.currentConnection.client == "pg" &&
        this.currentConnection.user &&
        this.currentConnection.password &&
        this.currentConnection.connectString &&
        this.currentConnection.name &&
        this.currentConnection.dbName
      ) {
        return true;
      } else return false;
    },
    saveConnection() {
      if (!this.formValidator()) {
        let notification = {};
        notification.text = `Please  fill in all required fields marked with an asterisk.`;
        notification.type = "warning";

        this.snack(notification.type, notification.text);

        this.notifications.push(notification);

        this.setNotifications(this.notifications);
      } else {
        let duplicate = this.connectionsList.find(element => {
          return element.name == this.currentConnection.name;
        });

        if (!duplicate) {
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
          this.connectionsList.push(this.currentConnection);
        }
        this.currentConnection = {};
        this.rules.required = true;
      }
    },
    editConnection(index) {
      this.currentConnection = this.connectionsList[index];
    },
    deleteConnection(index) {
      let notifications = this.$store.state.app.notifications;
      let notification = {};
      notification.text = `connection "${this.connectionsList[
        index
      ].name.toUpperCase()}" was removed`;
      notification.type = "warning";

      this.snack(notification.type, notification.text);

      notifications.push(notification);

      this.setNotifications(notifications);
      this.connectionsList.splice(index, 1);
    },
    ...mapMutations("app", ["setNotifications"]),
    setNotifications(notifications) {
      this.$store.state.app.notifications = notifications;
    },
    snack(color, text) {
      this.color = color;
      this.text = text;

      this.snackbar = true;
    }
  }
};
</script>

<style lang="scss">
.mx-0 {
  margin-left: 50px !important;
}
</style>

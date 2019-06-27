<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout wrap>
      <v-flex md12 sm12 lg4>
        <material-chart-card
          :data="statistics.schemasBar.data"
          :options="statistics.schemasBar.options"
          color="info"
          type="Bar"
        >
          <h4 class="title font-weight-light">Schema tables and fields</h4>
          <p class="category d-inline-flex font-weight-light">Table numbers by schema</p>

          <template slot="actions">
            <v-icon class="mr-2" small>mdi-clock-outline</v-icon>
            <span class="caption grey--text font-weight-light">updated 4 minutes ago</span>
          </template>
        </material-chart-card>
      </v-flex>
      <v-flex md12 sm12 lg4>
        <material-chart-card
          :data="statistics.connectionsPie.data"
          :options="statistics.connectionsPie.options"
          color="success"
          type="Pie"
        >
          <h4 class="title font-weight-light">Connections by database</h4>
          <p class="category d-inline-flex font-weight-light">Numbers of connections by database</p>

          <template slot="actions">
            <v-icon class="mr-2" small>mdi-clock-outline</v-icon>
            <span class="caption grey--text font-weight-light">updated 4 minutes ago</span>
          </template>
        </material-chart-card>
      </v-flex>
      <v-flex md12 sm12 lg4>
        <material-chart-card
          :data="statistics.generatedHBar.data"
          :options="statistics.generatedHBar.options"
          color="warning"
          type="Bar"
        >
          <h4 class="title font-weight-light">Generated rows</h4>
          <p class="category d-inline-flex font-weight-light">Numbers of rows</p>

          <template slot="actions">
            <v-icon class="mr-2" small>mdi-clock-outline</v-icon>
            <span class="caption grey--text font-weight-light">updated 4 minutes ago</span>
          </template>
        </material-chart-card>
      </v-flex>

      <v-flex sm6 xs12 md6 lg3>
        <material-stats-card
          color="green"
          icon="mdi-table-row"
          title="Generated rows"
          :value="statistics.generatedRows.value"
          sub-icon="mdi-calendar"
          sub-text="All time generated."
        />
      </v-flex>
      <v-flex sm6 xs12 md6 lg3>
        <material-stats-card
          color="red"
          icon="mdi-information-outline"
          title="Errors"
          :value="statistics.errors.value"
          sub-icon="mdi-tag"
          sub-text="Only sever warnings."
        />
      </v-flex>
      <v-flex sm6 xs12 md6 lg3>
        <material-stats-card
          color="orange"
          icon="mdi-table-column"
          title="Fields per table"
          :value="statistics.fieldsPerTable.value"
          sub-icon="mdi-alert"
          sub-text="Average value"
        />
      </v-flex>
      <v-flex sm6 xs12 md6 lg3>
        <material-stats-card
          color="info"
          icon="mdi-database"
          title="Generated database"
          :value="statistics.generatedDatabase.value"
          sub-icon="mdi-update"
          sub-text="Just Updated"
        />
      </v-flex>
      <v-flex md12 lg12>
        <material-card class="card-tabs" color="green">
          <v-flex slot="header">
            <v-tabs v-model="tabs" color="transparent" slider-color="white">
              <span class="subheading font-weight-light mr-3" style="align-self: center">Tasks:</span>
              <v-tab class="mr-3">
                <v-icon class="mr-2">mdi-clipboard-outline</v-icon>Schemas
              </v-tab>
              <v-tab class="mr-3">
                <v-icon class="mr-2">mdi-database</v-icon>Connections
              </v-tab>
            </v-tabs>
          </v-flex>

          <v-tabs-items v-model="tabs">
            <v-tab-item>
              <v-list-tile>
                <v-list-tile-title>
                  <i>Schema name</i>
                </v-list-tile-title>
                <v-list-tile-title>
                  <i>Database</i>
                </v-list-tile-title>
                <v-list-tile-title>
                  <i>Nr. of tables</i>
                </v-list-tile-title>
              </v-list-tile>
              <v-list three-line v-for="(schema,index) in schemas" :item="schema" :key="index">
                <v-list-tile>
                  <v-list-tile-title>{{schema.name}}</v-list-tile-title>
                  <v-list-tile-title>{{schema.type}}</v-list-tile-title>
                  <v-list-tile-title>{{schema.tables.length}}</v-list-tile-title>
                  <div class="d-flex">
                    <v-tooltip top content-class="top">
                      <v-btn
                        slot="activator"
                        class="v-btn--simple"
                        color="success"
                        @click="editSchema(index)"
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
                        @click="deleteSchema(index)"
                        icon
                      >
                        <v-icon color="error">mdi-close</v-icon>
                      </v-btn>
                      <span>Close</span>
                    </v-tooltip>
                  </div>
                </v-list-tile>
                <v-divider/>
              </v-list>
            </v-tab-item>
            <v-tab-item>
              <v-list-tile>
                <v-list-tile-title>
                  <i>Connection name</i>
                </v-list-tile-title>
                <v-list-tile-title>
                  <i>Client</i>
                </v-list-tile-title>
                <v-list-tile-title>
                  <i>Database</i>
                </v-list-tile-title>
                <v-list-tile-title>
                  <i>Connection String</i>
                </v-list-tile-title>
                <v-list-tile-title>
                  <i>User</i>
                </v-list-tile-title>
              </v-list-tile>
              <v-list
                three-line
                v-for="(connection,index) in connections"
                :item="connection"
                :key="index"
              >
                <v-list-tile>
                  <v-list-tile-title>{{connection.name}}</v-list-tile-title>
                  <v-list-tile-title>{{connection.client}}</v-list-tile-title>
                  <v-list-tile-title>{{connection.database}}</v-list-tile-title>
                  <v-list-tile-title>{{connection.connectString}}</v-list-tile-title>
                  <v-list-tile-title>{{connection.user}}</v-list-tile-title>
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
                      <span>Close</span>
                    </v-tooltip>
                  </div>
                </v-list-tile>
                <v-divider/>
              </v-list>
            </v-tab-item>
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
import { mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      //Tabs form
      tabs: 0,
      tabsDescription: [
        { name: "Schemas", img: "mdi-clipboard-outline" },
        { name: "Connections", img: "mdi-database" }
      ],
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
    ...mapGetters("app", {
      statistics: "getStatistics",
      schemas: "getSchemas",
      connections: "getConnections",
      notifications: "getNotifications"
    })
  },
  methods: {
    ...mapMutations("app", ["setDefaultSchemaIndex"]),
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
    editConnection(index) {
      this.$router.push("/connection");
    },
    deleteSchema(index) {
      if (confirm("Are you sure you want to delete this Schema?")) {
        const notification = {
          text: `schema "${this.schemas[
            index
          ].name.toUpperCase()}" was removed`,
          type: "warning"
        };

        this.showNotification(notification);
        this.schemas.splice(index, 1);
      }
    },
    editSchema(index) {
      this.setDefaultSchemaIndex(index);

      this.$router.push("/schema");
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

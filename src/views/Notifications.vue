<template>
  <v-container fluid grid-list-xl fill-height>
    <v-layout justify-center align-center>
      <v-flex xs12>
        <material-card color="green">
          <div slot="header">
            <div class="title font-weight-light mb-2">Notifications</div>
            <div class="category">Notifications list</div>
          </div>

          <v-card-text>
            <v-layout row wrap>
              <v-flex xs12 md12>
                <material-notification
                  v-for="(notification,index) in notifications"
                  :item="notification"
                  :key="index"
                  class="mb-3"
                  :color="notification.type"
                  dismissible
                  @click="deleteNotification(key)"
                >{{notification.text}}</material-notification>
              </v-flex>
            </v-layout>
          </v-card-text>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({}),
  computed: {
    notifications() {
      return this.$store.state.app.notifications;
    }
  },
  methods: {
    deleteNotification(index) {
      this.notifications.splice(index, 1);
    }
  }
};
</script>

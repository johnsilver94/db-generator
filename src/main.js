/* eslint-disable func-names */
/* eslint-disable linebreak-style */

import Vue from 'vue';
import VueSidebarMenu from 'vue-sidebar-menu';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(VueSidebarMenu);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

<template>
  <div id="app">
    <sidebar-menu
      :menu="menu"
      :collapsed="collapsed"
      @collapse="onCollapse"
      :showOneChild="true"
      @itemClick="onItemClick"
    />
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
import "vue-sidebar-menu/dist/vue-sidebar-menu.css";

export default {
  name: "app",
  data() {
    return {
      menu: [
        {
          header: true,
          title: "Main Navigation"
        },
        {
          href: "/",
          title: "Dasboard",
          icon: "fas fa-chart-line"
        },
        {
          // href: "/connection",
          href: "/about",
          title: "Connection",
          icon: "fas fa-database",
          child: [
            {
              href: "/connection/new",
              title: "New Connection",
              icon: "fas fa-plus"
            },
            {
              href: "/connection/all",
              title: "All Connections",
              icon: "fas fa-coins"
            }
          ]
        },
        {
          href: "/schema",
          title: "Schema",
          icon: "fas fa-project-diagram",
          child: [
            {
              href: "/connection/new",
              title: "New Schema",
              icon: "fas fa-plus"
            },
            {
              href: "/connection/all",
              title: "All Schemas",
              icon: "fas fa-sitemap"
            }
          ]
        },
        {
          href: "/generate",
          title: "Generate",
          icon: "fas fa-file-upload"
        },
        {
          href: "/settings",
          title: "Settings",
          icon: "fa fa-cog",
          disabled: true
        }
      ],
      collapsed: true,
      themes: ["", "white-theme"],
      selectedTheme: "default-theme"
    };
  },
  methods: {
    onCollapse(collapsed) {
      console.log(collapsed);
      this.collapsed = collapsed;
    },
    onItemClick(event, item) {
      console.log("onItemClick");
      console.log(event);
      console.log(item);
    }
  }
};
</script>


<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#view {
  margin-left: 100px;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

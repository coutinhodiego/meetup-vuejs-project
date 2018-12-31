<template>
  <!-- Nava bar presente em todas as paginas da aplicacao -->
  <v-app>
      <v-navigation-drawer v-model="sideNav" temporary absolute>
        <v-list>
          <v-list-tile v-for="item in menuItems" :key="item.title" :to="item.link">
            <v-list-tile-action>
              <v-icon>{{item.icon}}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{item.title}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile  v-if="userAuthenticated" @click="onLogout">
            <v-list-tile-action>
              <v-icon>power_settings_new</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Logout</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar dark class="red lighten-1">
        <v-toolbar-side-icon @click.stop="sideNav = !sideNav" class="hidden-sm-and-up"></v-toolbar-side-icon>
        <v-toolbar-title>
          <router-link to="/" tag="span" style="cursor: pointer;">Mao Meetup</router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-xs-only">
          <v-btn flat v-for="item in menuItems" :key="item.title" :to="item.link">
            <v-icon left>{{item.icon}}</v-icon>
            {{item.title}}
          </v-btn>
          <v-btn flat v-if="userAuthenticated" @click="onLogout">
            <v-icon left>power_settings_new</v-icon>
            Logout
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    <main>

      <!-- Router que adiciona os componentes no HTML -->
      <router-view></router-view>


    </main>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      sideNav: false
    }
  },
  computed: {
    menuItems () {
      let menuItems = [
        {icon: 'face', title: 'Sing up', link: '/signup'},
        {icon: 'lock_open', title: 'Sing in', link: '/signin'}
      ]
      if(this.userAuthenticated){
        menuItems = [
          {icon: 'directions_bike', title: 'View Meetups', link: '/meetups'},
          {icon: 'room', title: 'Organize Meetups', link: '/meetup/new'},
          {icon: 'person', title: 'Profile', link: '/profile'}
        ]
      }
      return menuItems
    },
    userAuthenticated () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    }
  },
  methods: {
    onLogout () {
       this.$store.dispatch('logout')
    }
  }
}
</script>

<style>

</style>

<template>
  <v-app id="inspire">
    <v-navigation-drawer
        :clipped="$vuetify.breakpoint.lgAndUp"
        app
        v-model="drawer"
    >
      <v-list dense>
        <template v-for="item in items">
          <v-row
              :key="item.heading"
              align="center"
              v-if="item.heading"
          >
            <v-col cols="6">
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-col>
            <v-col
                class="text-center"
                cols="6"
            >
              <a
                  class="body-2 black--text"
                  href="#!"
              >EDIT</a>
            </v-col>
          </v-row>
          <v-list-group
              :key="item.text"
              :prepend-icon="item.model ? item.icon : item['icon-alt']"
              append-icon=""
              v-else-if="item.children"
              v-model="item.model"
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>
                  {{ item.text }}
                </v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item
                :key="i"
                link
                v-for="(child, i) in item.children"
            >
              <v-list-item-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ child.text }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-item
              :key="item.text"
              link
              v-else
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
        :clipped-left="$vuetify.breakpoint.lgAndUp"
        app
        color="blue darken-3"
        dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title
          class="ml-0 pl-4"
          style="width: 300px"
      >
        <span class="hidden-sm-and-down">Talking Bass</span>
      </v-toolbar-title>
      <v-text-field
          class="hidden-sm-and-down"
          flat
          hide-details
          label="Search"
          prepend-inner-icon="mdi-magnify"
          solo-inverted
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
      <v-btn
          icon
          large
      >
        <v-avatar
            item
            size="32px"
        >
          <v-img
              alt="Vuetify"
              src="https://cdn.vuetifyjs.com/images/logos/logo.svg"
          ></v-img>
        </v-avatar>
      </v-btn>
    </v-app-bar>
    <v-container
        class="fill-height "
        fluid>
      <v-row
          class="height-100"
          align="start"
          justify="center"
          no-gutters>
        <v-col cols="2" class="user-group-container">
          <contact-list style="height: 70%"></contact-list>
        </v-col>
        <v-col>
          <chat></chat>
        </v-col>
        <v-col cols="2">
          <friend-profile></friend-profile>
        </v-col>

      </v-row>
    </v-container>
    <v-btn
        @click="dialog = !dialog"
        bottom
        color="pink"
        dark
        fab
        fixed
        right
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </v-app>
</template>

<script>
import ContactList from "./Shared/ContactList";
import FriendProfile from "./Shared/FriendProfile";
import Chat from "./Chat/Chat";

export default {
  components: {FriendProfile, Chat, ContactList},
  props: {
    source: String,
  },
  data: () => ({
    dialog: false,
    drawer: null,
    items: [
      {icon: 'mdi-contacts', text: 'Contacts'},
      {icon: 'mdi-history', text: 'Frequently contacted'},
      {icon: 'mdi-content-copy', text: 'Duplicates'},
      {
        icon: 'mdi-chevron-up',
        'icon-alt': 'mdi-chevron-down',
        text: 'Labels',
        model: true,
        children: [
          {icon: 'mdi-plus', text: 'Create label'},
        ],
      },
      {
        icon: 'mdi-chevron-up',
        'icon-alt': 'mdi-chevron-down',
        text: 'More',
        model: false,
        children: [
          {text: 'Import'},
          {text: 'Export'},
          {text: 'Print'},
          {text: 'Undo changes'},
          {text: 'Other contacts'},
        ],
      },
      {icon: 'mdi-cog', text: 'Settings'},
      {icon: 'mdi-message', text: 'Send feedback'},
      {icon: 'mdi-help-circle', text: 'Help'},
      {icon: 'mdi-cellphone-link', text: 'App downloads'},
      {icon: 'mdi-keyboard', text: 'Go to the old version'},
    ],
  }),
  mounted() {
    this.$store.dispatch('fetchFriends')
    this.$store.dispatch('fetchGroups')
    this.$store.dispatch('fetchAuthedUser')

  }
}
</script>
<style lang="scss">
.fill-height {
  height: 100%;

  .user-group-container {
    height: calc(100% - 60px);
    overflow-y: auto;
  }
}
</style>
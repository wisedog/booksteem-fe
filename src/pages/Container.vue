<template>
  <v-ons-page>
    <v-ons-toolbar class="home-toolbar">
      <div class="left">
        <v-ons-toolbar-button @click="$store.commit('splitter/toggle')">
          <v-ons-icon icon="fa-bars"></v-ons-icon>
        </v-ons-toolbar-button>
      </div>
      <div class="center">{{ title }}</div>
    </v-ons-toolbar>
    <transition>
        <router-view></router-view>
    </transition>
  </v-ons-page>
</template>

<script>
export default {
  data () {
    return {
      k: ['홈', '서평', '만든이']
    }
  },
  computed: {
    title: {
      get () {
        return this.k[this.$store.state.navmenu.index]
      }
    }
  }
}
</script>

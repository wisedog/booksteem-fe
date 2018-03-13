<template>
  <v-ons-page>
    <v-ons-toolbar modifier="transparent"></v-ons-toolbar>
    <div class="header">
      <img src="../assets/logo.png">
      <div class="logo-text"><strong>Booksteem</strong></div>
    </div>
    <v-ons-list>
      <v-ons-list-item v-for="(item, index) in access" :key="item.title"
        :modifier="md && 'nodivider'"
        @click="goTo(index, item.routeName)"
      >
        <div class="left">
          <v-ons-icon fixed-width class="list-item__icon" :icon="item.icon"></v-ons-icon>
        </div>
        <div class="center">
          {{ item.title }}
        </div>
      </v-ons-list-item>
    </v-ons-list>
  </v-ons-page>
</template>

<script>
export default {
  name: 'navmenu',
  data () {
    return {
      access: [
        {
          title: '홈',
          routeName: 'home',
          icon: 'fa-home'
        },
        {
          title: '서평',
          routeName: 'review',
          icon: 'fa-book'
        },
        {
          title: '만든이 & FAQ',
          routeName: 'about',
          icon: 'fa-free-code-camp'
        } /* ,
        {
          title: '작가',
          routeName: 'author',
          icon: 'fa-user'
        } */
      ]
    }
  },
  methods: {
    goTo (index, routeName) {
      this.$store.commit('splitter/toggle')
      this.$store.commit('navmenu/set', index)
      this.$router.push({ name: routeName })
    },
    loadLink (url) {
      window.open(url, '_blank')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  text-align: center;
  background-color: white;
}

.logo-text {
   font-size: large;
   margin-top: -10px;
   margin-bottom: 5px;
}

img {
  max-width: 150px;
}

ons-list-title {
  text-transform: none;
}

ons-list-item {
  cursor: pointer;
}
</style>

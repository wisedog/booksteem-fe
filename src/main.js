// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import 'font-awesome/css/font-awesome.css'
import 'onsenui/css/onsenui-core.css'
import 'onsenui/css/onsen-css-components.css'
import './booksteem.css'

import Vue from 'vue'
import $ons from 'vue-onsenui/esm'
import * as VOns from './vue-onsen-components'
import store from './store'
import App from './App'
import router from './router'
import VueAnalytics from 'vue-analytics'

Vue.config.productionTip = false

if ($ons.platform.isAndroid() === false && $ons.platform.isIOS() === false) {
  // Use material design for desktop view
  // $ons.platform.select('android')
}
Vue.use($ons)

Object.values(VOns).forEach(comp => Vue.component(comp.name, comp))

Vue.use(VueAnalytics, {
  id: 'UA-114986338-1',
  router
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: { App },
  router,
  beforeCreate () {
    // Shortcut for Material Design
    Vue.prototype.md = this.$ons.platform.isAndroid()
    // Shortcut for iOS
    Vue.prototype.ios = this.$ons.platform.isIOS()
  }
})

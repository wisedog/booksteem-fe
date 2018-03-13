import Vue from 'vue'
import App from '@/App'
import store from '@/store'
import * as VOns from '@/vue-onsen-components'

describe('App.vue', () => {
  Object.values(VOns).forEach(comp => Vue.component(comp.name, comp))
  const Constructor = Vue.extend(App)
  const vm = new Constructor({ store }).$mount()

  it('provides a closed menu by default', () => {
    expect(vm.menuIsOpen)
      .to.equal(false)
  })
})

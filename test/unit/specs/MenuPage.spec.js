import Vue from 'vue'
import store from '@/store'
import router from '@/router'
import MenuPage from '@/pages/MenuPage'
import * as VOns from '@/vue-onsen-components'

describe('MenuPage.vue', () => {
  Object.values(VOns).forEach(comp => Vue.component(comp.name, comp))
  const Constructor = Vue.extend(MenuPage)
  const vm = new Constructor({
    store,
    router,
    beforeCreate () {
      // Shortcut for Material Design
      Vue.prototype.md = this.$ons.platform.isAndroid()
      // Shortcut for iOS
      Vue.prototype.ios = this.$ons.platform.isIOS()
    }
  }).$mount()

  it('should contain proper list items', () => {
    expect(vm.essentialLinks.every(item => item.link && item.icon && item.label))
  })

  it('opens a new tab when clicking an item', () => {
    const stub = sinon.stub(window, 'open')
    stub.returns({})

    // Click on the first item
    vm.$el.querySelectorAll('ons-list-item')[0].click()
    expect(stub).calledWithExactly(vm.essentialLinks[0].link, '_blank')

    stub.restore()
  })
})

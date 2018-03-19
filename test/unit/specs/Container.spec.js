import Vue from 'vue'
import Container from '@/pages/Container'
import store from '@/store'
import router from '@/router'
import moxios from 'moxios'
import Api from '@/api'

describe('Container.vue', () => {
  const Constructor = Vue.extend(Container)
  const vm = new Constructor({
    store,
    router,
    beforeCreate () {
      // Shortcut for Material Design
      Vue.prototype.md = true
      // Shortcut for iOS
      Vue.prototype.ios = false
    }
  })

  const cateDat = {
    author: '소설/시/희곡',
    review_cnt: 131,
    total_payout: 594.5809999999999,
    vote_cnt: 1785,
    updated_at: '2018-03-18T15:15:00.795714Z'
  }

  beforeEach(function () {
    // import and pass your custom axios instance to this method
    moxios.install(Api)
  })

  afterEach(function () {
    // import and pass your custom axios instance to this method
    moxios.uninstall(Api)
  })

  it('should be 소설/시/희곡 menu at second dropdown, should be 카테고리 at first dropdown', (done) => {
    router.push({ name: 'review', query: { category: '소설/시/희곡' } })
    const mounted = vm.$mount()

    moxios.wait(function () {
      let request = moxios.requests.mostRecent()
      // API for /api/stat/category?order=review
      request.respondWith({
        status: 200,
        response: [cateDat]
      }).then(function () {
        done()
        const reviewComponent = mounted.$children[0]
        expect(reviewComponent.$data.selectedItem)
          .to.equal('category')
      })
    })
  })
})

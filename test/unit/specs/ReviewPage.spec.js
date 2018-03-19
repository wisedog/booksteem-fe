import Vue from 'vue'
import store from '@/store'
import router from '@/router'
import ReviewPage from '@/pages/ReviewPage'
import moxios from 'moxios'
import Api from '@/api'

describe('ReviewPage.vue', () => {
  const Constructor = Vue.extend(ReviewPage)
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

  const dat1 = {
    id: 38850989,
    net_votes: 6,
    author: 'naha',
    permlink: 'book-review-18-sos-or',
    title: 'Book review 18. 의지력 SOS | 숙적 다이어트, 금연',
    url: '/kr/@naha/book-review-18-sos-or',
    created: '2018-03-16T00:17:39',
    created_ts: '2018-03-16T00:17:39Z',
    total_earn: 2.246,
    book_id: 100533646,
    book_name: '의지력 SOS - 반드시 성공하는 금연, 다이어트 비법',
    book_author: '이중석 지음',
    book_img_url: 'http://image.aladin.co.kr/product/10053/36/coversum/k412536775_1.jpg',
    book_info_link: 'http://www.aladin.co.kr/shop/wproduct.aspx?ItemId=100533646\u0026amp;partner=openAPI\u0026amp;start=api',
    steem_abbr_content: '들은 얘깁니다. 어느 남자의 아내가 빵을 끊겠다고 선언하고는 정말로 빵을 끊었다고 합니다. 그',
    book_publisher: '순수와탐구'
  }

  beforeEach(function () {
    // import and pass your custom axios instance to this method
    moxios.install(Api)
    vm.$data.reviews = []
  })

  afterEach(function () {
    // import and pass your custom axios instance to this method
    moxios.uninstall(Api)
  })

  it('has a created hook', () => {
    expect(ReviewPage.created).to.be.a('function')
  })

  it('should be 전체 최신순 on init and nothing on second dropdown', () => {
    const mounted = vm.$mount()
    let dropdownList = mounted.$el.querySelectorAll('v-ons-select.dropdown')
    // console.log(dropdownList.querySelector('option'))
    expect(mounted.$el.querySelector('v-ons-select.dropdown option').textContent.trim())
      .to.equal('전체 최신 순')
    expect(dropdownList[1].getElementsByTagName('option').length).equal(0)
  })

  it('should load data from API', (done) => {
    const mounted = vm.$mount() // eslint-disable-line no-unused-vars

    moxios.wait(function () {
      let request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: [dat1]
      }).then(function () {
        done()
        let listItems = mounted.$el.querySelectorAll('v-ons-list-item')
        expect(listItems[0].getElementsByTagName('img')[0].getAttribute('src'))
          .to.equal(dat1.book_img_url)
      })
    })
  })

  it('opens a new tab when click an book info', (done) => {
    const mounted = vm.$mount() // eslint-disable-line no-unused-vars

    moxios.wait(function () {
      let request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: [dat1]
      }).then(function () {
        done()
        let listItems = mounted.$el.querySelector('v-ons-list-item')
        let link = listItems.getElementsByTagName('a')[0]
        expect(link.getAttribute('href')).to.equal(dat1.book_info_link)

        const stub = sinon.stub(window, 'open')
        stub.returns({})

        // Click on the first item
        link.click()
        expect(stub).calledWithExactly(dat1.book_info_link, '_blank')

        stub.restore()
      })
    })
  })
})

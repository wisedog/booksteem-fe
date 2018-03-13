<template slot="pages">
  <v-ons-page :infinite-scroll="loadMore">
    <v-ons-pull-hook
      :action="onAction"
      :fixed-content="md"
      :height="md ? 84 : 64"
      :on-pull="md && onPull || null"
      @changestate="state = $event.state"
    >
      <!-- Show this on Material Design. This is default -->
      <v-ons-icon v-if="!ios"
        size="22px"
        class="pull-hook-spinner"
        :icon="state === 'action' ? 'fa-spinner' : 'fa-arrow-down'"
        :rotate="state === 'preaction' && 180"
        :spin="state === 'action'"
      ></v-ons-icon>
      <!-- Show this on iOS -->
      <div v-else class="pull-hook-progress">
        <v-ons-progress-circular
          :value="ratio * 100"
          :indeterminate="state === 'action'"
          :style="{ transform: `rotate(${ratio}turn)` }"
        ></v-ons-progress-circular>
      </div>
    </v-ons-pull-hook>
    <v-ons-row class="dropdown-row">
      <v-ons-select style="margin: auto; width: 25%;" v-model="selectedItem" @change="handleFirstChange()">
        <option v-for="item in items" :value="item.value" :key="item.value">
          {{ item.text }}
        </option>
      </v-ons-select>

      <v-ons-select style="margin: auto; width: 25%;" v-model="selectedItemSecond" @change="handleSecondChange()">
        <option v-for="cate in category_list" :value="cate.author" :key="cate.author">
          {{ cate.author }}
        </option>
      </v-ons-select>
    </v-ons-row>
    <v-ons-list>
      <v-ons-list-item v-for="review in reviews" :key="review.id">
        <div style="clear: both;">
          <img :src="review.book_img_url" class="image" style="float: left;" />
          <div style="padding: 14px;">
            <span class="ml-14 font-lg" ><strong>{{review.book_name}}</strong></span>
            <div>
              <span>
                {{review.book_author}} / {{review.book_publisher}}
                <a :href="review.book_info_link" target="blank">책 정보<v-ons-icon icon="fa-external-link"></v-ons-icon></a>
              </span>
            </div>
            <div class="clearfix" style="margin-top: 13px;">
              <div>
                <span>
                  {{review.author}}
                  <a :href="`https://steemit.com/@${review.author}/${review.permlink}`" target="blank">{{review.title}}
                  <v-ons-icon icon="fa-external-link"></v-ons-icon></a>
                  </span>
              </div>
              <div>
                <span>
                  {{review.created}}
                  <v-ons-icon icon="fa-chevron-up"  style="margin-left: 5px;"/>{{review.net_votes}}
                  <v-ons-icon icon="fa-usd" style="margin-left: 5px;"/>{{review.total_earn.toFixed(2)}}
                </span>
              </div>
            </div>
          </div>
        </div>
      </v-ons-list-item>
      <div class="after-list">
        <v-ons-icon icon="fa-spinner" size="26px" spin></v-ons-icon>
      </div>
    </v-ons-list>
  </v-ons-page>
</template>

<script>
import ReviewAPI from '@/api/review'
import CategoryStatAPI from '@/api/catestat'

export default {
  data () {
    return {
      reviews: [], // data
      category_list: [], // second dropdown data
      category_bak: [], // Category data backup
      page: 1,
      state: 'initial', // for pull
      ratio: 0, // for pull
      loading: true, // for infinite scroll
      is_loading: false,
      items: [
        { text: '전체 최신 순', value: 'latest' },
        { text: '카테고리별', value: 'category' }
      ],
      selectedItem: 'latest',
      selectedItemSecond: ''
    }
  },
  created () {
    var c = this.$route.query.category
    if (c !== undefined) {
      this.selectedItem = 'category'
      CategoryStatAPI.stat('review').then(response => {
        this.category_list = response.data
        this.category_bak = response.data
        this.selectedItemSecond = c
        this.getReviewsByCategory(c)
      })
    } else {
      this.getReviews()
    }
  },
  methods: {
    onPull (ratio) {
      this.ratio = ratio
    },
    onAction (done) {
      setTimeout(() => {
        this.page = 1
        this.getReviews()
        done()
      }, 1500)
    },
    loadMore (done) {
      setTimeout(() => {
        this.page += 1
        if (this.selectedItem === 'category') {
          this.getReviewsByCategory(this.selectedItemSecond)
        } else {
          this.getReviews()
        }
        done()
      }, 600)
    },
    getReviews () {
      ReviewAPI.review(this.page, 10).then(response => {
        if (response.data != null) {
          this.reviews = this.reviews.concat(response.data)
        } else {
          this.is_last = true
        }
      })
    },
    getReviewsByCategory (secondValue) {
      ReviewAPI.cate(this.page, 10, secondValue).then(response => {
        // 아래는 API 호출 후
        this.loading = false
        if (response.data != null) {
          this.reviews = this.reviews.concat(response.data)
        }
      })
    },
    handleFirstChange () {
      if (this.selectedItem === 'category') {
        if (this.category_bak.length > 0 && this.category.length === 0) {
          // 첫 번째 item 을 선택한다.
          this.category_list = this.category_bak
          this.page = 1
          this.reviews = []
          this.loading = true
          this.selectedItemSecond = this.category_list[0].author
          this.getReviewsByCategory(this.category_list[0].author)
        } else if (this.category_bak.length === 0 && this.category_list.length === 0) {
          // TODO get category and set cateogry, category_bak
          CategoryStatAPI.stat('review').then(response => {
            this.category_list = response.data
            this.category_bak = response.data
          })
        } else {
          console.log('asdasd')
        }
      } else {
        this.category = []
      }
    },
    handleSecondChange () {
      if (this.selectedItem === 'category') {
        this.page = 1
        this.reviews = []
        this.loading = true
        this.getReviewsByCategory(this.selectedItemSecond)
      }
    }
  }
}
</script>

<style scoped>
.after-list {
  margin: 20px;
  text-align: center;
}

.dropdown-row {
  background-color: white;
  padding-top: 10px;
  padding-bottom: 10px;
}
</style>

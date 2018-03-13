<template slot="pages">
  <v-ons-page :infinite-scroll="loadMore">
    <v-ons-card>
      <div style="margin: auto; width: -moz-fit-content;">
        <div style="border-radius:100px; overflow:hidden; height:80px; width:80px; display:inline-block;">
          <img :src="`https://steemitimages.com/u/${author}/avatar`" class="image profile-img" />
        </div>
        <div style="font-size:20px;"><strong> {{author}}</strong> </div>
      </div>
    </v-ons-card>
    <v-ons-card>
      <div class="content">
        <v-ons-list>
          <v-ons-list-item v-for="review in reviews" :key="review.id">
            <img :src="review.book_img_url" class="image" style="float: left;">
            <div style="padding: 14px;">
              <span class="ml-14 font-lg"><strong>{{review.book_name}}</strong></span>
              <div>
                <div>
                  {{review.book_author}} / {{review.book_publisher}} / <a :href="review.book_info_link" target="blank">책 정보<v-ons-icon icon="fa-external-link"></v-ons-icon></a>
                </div>
                <div>
                    {{review.created}}
                    <v-ons-icon icon="fa-chevron-up"  style="margin-left: 5px;"/> {{review.net_votes}}
                    <v-ons-icon icon="fa-usd" style="margin-left: 5px;"/> {{review.total_earn.toFixed(2)}}
                </div>
              </div>
              <div class="clearfix" style="margin-top: 13px;">
                <div>
                  <span class="ml-14 font-sm">
                    <a :href="`https://steemit.com/@${review.author}/${review.permlink}`" target="blank">
                    {{review.title}} <v-ons-icon icon="fa-external-link"></v-ons-icon>
                    </a>
                  </span>
                </div>
              </div>
              <div>
                {{review.steem_abbr_content | truncate('40')}}
              </div>
            </div>
          </v-ons-list-item>
          <div class="after-list" v-if="loading">
            <v-ons-icon icon="fa-spinner" size="26px" spin></v-ons-icon>
          </div>
        </v-ons-list>
      </div>
    </v-ons-card>
  </v-ons-page>
</template>

<script>
import ReviewAPI from '@/api/review'

export default {
  data () {
    return {
      page: 0,
      reviews: [],
      author: '',
      loading: true // for infinite scroll
    }
  },
  created () {
    this.author = this.$route.query.author
    this.getReviewsByAuthor(this.author)
  },
  methods: {
    getReviewsByAuthor (authorID) {
      this.page += 1
      this.loading = true
      ReviewAPI.author(this.page, 10, authorID).then(response => {
        this.loading = false
        if (response.data != null) {
          this.reviews = this.reviews.concat(response.data)
        }
      })
    },
    loadMore (done) {
      setTimeout(() => {
        this.getReviewsByAuthor(this.author)
        done()
      }, 600)
    }
  },
  filters: {
    truncate (string, value) {
      return string.substring(0, value) + '...'
    }
  }
}
</script>

<style scoped>
.after-list {
  margin: 20px;
  text-align: center;
}

</style>

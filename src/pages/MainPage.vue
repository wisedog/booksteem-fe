<template>
  <v-ons-row>
    <v-ons-col class="resizable">
      <v-ons-card>
        <div class="title">
          최신 서평
          <router-link to="/review">
            <v-ons-button modifier="quiet" style="float: right; margin: 6px 0; font-size: 14px;">더 보기</v-ons-button>
          </router-link>
        </div>
        <div class="content">
          <div v-for="review in reviews" :key="review.id" style="text-align: left; clear:both;">
            <img :src="review.book_img_url" class="image" style="float: left;">
            <div style="padding: 14px;">
              <span class="ml-14 book-title"><strong>{{review.book_name}}</strong></span>
              <div>
                <span class="ml-14">
                  {{review.book_author}} / {{review.book_publisher}} / <a :href="review.book_info_link" target="blank">책 정보<v-ons-icon icon="fa-external-link"></v-ons-icon></a>
                </span>
              </div>
              <div class="clearfix" style="margin-top: 13px;">
                <div>
                  <span class="ml-14">{{review.author}} /
                    <a :href="`https://steemit.com/@${review.author}/${review.permlink}`" target="blank">
                    {{review.title}} <v-ons-icon icon="fa-external-link"></v-ons-icon>
                    </a>
                  </span>
                </div>
                <div>
                  <span class="ml-14">
                    {{review.created}}
                    <v-ons-icon icon="fa-chevron-up"  style="margin-left: 5px;"/> {{review.net_votes}}
                    <v-ons-icon icon="fa-usd" style="margin-left: 5px;"/> {{review.total_earn.toFixed(2)}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </v-ons-card>
    </v-ons-col>
    <v-ons-col class="resizable">
      <v-ons-card>
        <div class="title">
          서평 작가 순위
        </div>
        <div class="content">
          <div style="margin-bottom:10px; margin-top: 10px;">
            <span @click="get_author_by_votes()" v-bind:class="{ selected : selectedItem == 'vote'}" class="subitem">
              Vote순
            </span>
            <span @click="get_author_by_reviews()" v-bind:class="{ selected : selectedItem == 'review'}" class="subitem">
              리뷰 갯수 순
            </span>
            <span @click="get_author_by_payout()" v-bind:class="{ selected : selectedItem == 'payout'}" class="subitem">
              수익 순
            </span>
          </div>
          <v-ons-row>
            <v-ons-col v-for="author in authors" :key="author.author" class="authors">
              <div @click="goToAuthor(author.author)" style="cursor: pointer;">
                <div style="border-radius:100px; overflow:hidden; height:80px; width:80px; display:inline-block;">
                  <img :src="author.img_url" class="image profile-img">
                </div>
                <div><span>{{author.author}}</span></div>
                <div>
                  <span v-if="selectedItem == 'payout'">
                    <v-ons-icon icon="fa-usd" style="margin-left: 5px;"/>{{author.total_payout.toFixed(2)}}
                  </span>
                  <span v-else-if="selectedItem == 'vote'">
                    <v-ons-icon icon="fa-chevron-up"  style="margin-left: 5px;"/>{{author.vote_cnt}}
                  </span>
                  <span v-else-if="selectedItem == 'review'">{{author.review_cnt}}리뷰</span>
                </div>
              </div>
            </v-ons-col>
          </v-ons-row>
        </div>
      </v-ons-card>
      <v-ons-card>
        <div class="title">
          카테고리 정보
        </div>
        <div class="content">
          <v-ons-row>
            <v-ons-list style="width: 100%;">
              <v-ons-list-item v-for="cate in cates" :key="cate.author" modifier="chevron"
              style="cursor: pointer;" @click="goToCategory(cate.author)" tappable
              >
                <div>
                  <span>
                    <strong>{{cate.author}}</strong>
                  </span>
                  <span><v-ons-icon icon="fa-pencil"/> {{cate.review_cnt}} </span>
                  <span>
                    <v-ons-icon icon="fa-usd" style="margin-left: 2px;"/>{{cate.total_payout.toFixed(2)}}
                  </span>
                  <span>
                    <v-ons-icon icon="fa-chevron-up"  style="margin-left: 2px;"/> {{cate.vote_cnt}}
                  </span>
                </div>
              </v-ons-list-item>
            </v-ons-list>
          </v-ons-row>
        </div>
      </v-ons-card>
    </v-ons-col>
  </v-ons-row>
</template>

<script>
import ReviewAPI from '@/api/review'
import AuthorAPI from '@/api/author'
import CategoryStatAPI from '@/api/catestat'

export default {
  data () {
    return {
      msg: 'blahblah',
      selectedItem: 'payout',
      reviews: [],
      authors: [],
      cates: []
    }
  },
  created () {
    ReviewAPI.review(1, 5).then(response => {
      this.reviews = response.data
    })
    AuthorAPI.authors(1, 6, 'payout').then(response => {
      this.authors = response.data
    })
    CategoryStatAPI.stat('review').then(response => {
      this.cates = response.data
    })
  },
  methods: {
    goToAuthor (author) {
      this.$router.push({ name: 'author', query: { author: author } })
    },
    goToCategory (cate) {
      this.$router.push({ name: 'review', query: { category: cate } })
    },
    get_author_by_votes () {
      this.selectedItem = 'vote'
      AuthorAPI.authors(1, 6, 'vote').then(response => {
        this.authors = response.data
      })
    },
    get_author_by_payout () {
      this.selectedItem = 'payout'
      AuthorAPI.authors(1, 6, 'payout').then(response => {
        this.authors = response.data
      })
    },
    get_author_by_reviews () {
      this.selectedItem = 'review'
      AuthorAPI.authors(1, 6, 'reviews').then(response => {
        this.authors = response.data
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@media ( max-width: 1024px ) {
  .authors {
    flex: 25%;
    min-width: 20%;
  }
}
.ml-14{
  margin-left: 14px;
}
@media ( max-width: 480px ) {
  .profile {
    width: 120px;
  }
  .font-sm{
    font-size: small;
  }
  .resizable {
    flex: 100%;
  }
  .authors {
    flex: 50%;
    min-width: 33%;
  }
}

.authors {
  text-align: center;
}

.subitem {
  padding: 3px 8px;
  cursor: pointer;
  border-radius: 10px;
}

.selected {
  background-color: #999;
  color: #ffffff;
  font-weight: bold;
}

</style>

<template>
  <v-ons-page>
    <v-ons-row>
      <v-ons-col>
        <v-ons-card>
          <div class="content">
            <div>
              <span>만든이</span>
              <span style="margin-left:5px;"><a href="https://steemit.com/@pyrus" target="blank">pyrus</a></span>
            </div>
            <div>
              <span>Version</span><span style="margin-left:5px;">2.0.0</span>
            </div>
          </div>
        </v-ons-card>
      </v-ons-col>
    </v-ons-row>
    <v-ons-row>
      <v-ons-col>
        <v-ons-card>
          <div class="header">FAQ
          </div>
          <div class="content">
            <h3>제 글이 안보여요</h3>
            <p>글에 kr-book 태그를 넣어 발행하시고 본문에 ISBN - ISBN 번호 혹은 ISBN : ISBN 번호가 있으면 바로 등록됩니다. 예를 들어 </p>
            <div>
              <p>ISBN : 9788950962814<br />
              ISBN - 9788950962814</p>
            </div>
            <p>그렇지 않을 경우 수동으로 입력하기 때문에 시간이 걸릴 수 있습니다.</p>
            <h3>과거에 쓴 글이 안보여요</h3>
            <p>태그별 피드로 글 정보를 가져오는데, 스팀잇 특성 상 payout 된 과거 글은 보이지가 않습니다. 2월 중순부터 개발을 시작해서 이전에 payout 이 끝난 글은 별도로 문의주세요. <a href="mainto:master@booksteem.kr">master@booksteem.kr</a></p>
            <h2>개발 관련</h2>
            <h3>웹사이트는 뭘로 만드셨어요?</h3>
            <p>vue.js 로 만들었습니다. 호스팅은 Firebase를 사용했습니다.</p>
            <h3>백엔드는요?</h3>
            <p>Google Cloud App Engine에서 구동 중입니다. Go 언어로 REST API를 만들었습니다. DB로는 No-SQL 의 일종인 Datastore를 사용했습니다.</p>
            <h3>소스를 볼 수 있나요?</h3>
            <p>네, 근데 정리 좀 하고 github에 올릴 예정입니다.</p>
            <h2>기타</h2>
            <h3>연락드리고 싶어요.</h3>
            <p>master@booksteem.kr</p>
          </div>
        </v-ons-card>
      </v-ons-col>
    </v-ons-row>
  </v-ons-page>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style scoped>
span {
  font-size: large;
}
</style>

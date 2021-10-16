<template>
  <div v-if="step == 0">
    <Post v-for="item in data" :key="item" :item="item" />
  </div>

  <div v-else-if="step == 1">
    <div
      class="upload-image"
      :style="`background-image:url(${이미지})`"
      :class="clickfilter"
    ></div>
    <div class="filters">
      <FilterBox
        :이미지="이미지"
        :filter="filter"
        v-for="filter in filters"
        :key="filter"
      >
        {{ filter }}
      </FilterBox>
    </div>
  </div>

  <!-- 글작성페이지 -->
  <div v-else-if="step == 2">
    <div
      class="upload-image"
      :style="`background-image:url(${이미지})`"
      :class="clickfilter"
    ></div>
    <div class="write">
      <textarea class="write-box" @input="$emit('write', $event.target.value)">
write!</textarea
      >
    </div>
  </div>

  <div v-else-if="step == 3">
    <MyPage :one="1" />
  </div>

  <!-- 로그인페이지 -->
  <div v-else-if="step == 4" class="loginBox">
    <img src="../assets/loginLogo.png" class="logoImg" />
    <br />
    <input
      type="text"
      class="id"
      placeholder="전화번호, 사용자 이름 또는 이메일"
      v-model="user.id"
    />
    <br />
    <input
      type="password"
      class="pwd"
      placeholder="비밀번호"
      v-model="user.pwd"
    /><br />
    <h4 class="findPwd">비밀번호를 잊으셨나요?</h4>
    <button class="loginBt" @click="$store.commit('loginCheck', user)">
      로 그 인
    </button>
  </div>

  <div v-else-if="step == 5" class="commentMore">
    <div class="h">
      <p class="like2">💕 {{c.like}} Likes</p>
      <div class="profile2" :style="{ backgroundImage: `url(${c.img}` }"></div>
      <p>
        <strong class="name2">{{ c.id }}</strong> {{ c.msg }}
      </p>
      
      <p class="date2">{{c.date}}</p>
      
    </div>

    <div class="commentAll" v-for="comment in selectComments" :key="comment.id">
      <div 
        class="profile2" 
        :style="{ backgroundImage: `url(${comment.img}` }"
      ></div>
      <span>
        <strong class="name2">{{ comment.name }}</strong
        >{{ comment.msg }}
      </span>
      <div class="cright" style="white-space:nowrap;text-align:right"><span class="date2 ">{{comment.date}}</span></div>
    </div>
    <input class="comment2" placeholder="댓글달기...">
  </div>
</template>

<script>
import Post from "./Post.vue";
import FilterBox from "./FilterBox.vue";
import MyPage from "./MyPage.vue";
import { mapState } from "vuex";



export default {
  data() {
    return {
      user: {
        id: "",
        pwd: "",
      },
      filters: [
        "aden",
        "_1977",
        "brannan",
        "brooklyn",
        "clarendon",
        "earlybird",
        "gingham",
        "hudson",
        "inkwell",
        "kelvin",
        "lark",
        "lofi",
        "maven",
        "mayfair",
        "moon",
        "nashville",
        "perpetua",
        "reyes",
        "rise",
        "slumber",
        "stinson",
        "toaster",
        "valencia",
        "walden",
        "willow",
        "xpro2",
      ],
      clickfilter: "",
    };
  },
  props: {
    data: Array,
    이미지: String,
  },
  components: { Post, FilterBox, MyPage },
  mounted() {
    this.emitter.on("filter", (data) => {
      this.clickfilter = data;
    });
  },
  computed: {
    ...mapState(["step", "selectComments", "c"]),
  },
};
</script>

<style> 
.commentAll {
  margin-top: 25px;
  margin-bottom:25px;
}
.like2 {
  margin-left: 18px;
}
.date2 {
  margin-left: 58px;
  font-size: 11px;
  color: grey;
}
.cright {
  margin-right: 20px;
  white-space:nowrap;
}
.comment2 {
  margin-top: 13px;
  margin-bottom: 13px;
  padding-left: 15px;
  border: 0px solid gray;
  height: 30px;
  width: 96%;
  box-shadow: 5px 5px 8px rgba(182, 182, 182, 0.2);

}
.comment2:focus{
  outline:none;

}
.h {
  margin-top: 30px;
  padding-right: 10px;
  padding-bottom: 7px;
  padding-top: 7px;
  box-shadow: 5px 5px 5px rgba(231, 231, 231, 0.2);
  justify-content: center;
  background-color: #f5f5f5;
}
.name2 {
  margin: 12px;
}
.profile2 {
  width: 30px;
  height: 30px;
  background-size: 100%;
  border-radius: 50%;
  float: left;
  margin-left: 15px;
}
.upload-image {
  width: 100%;
  height: 450px;
  background: cornflowerblue;
  background-size: cover;
}
.filters {
  overflow-x: scroll;
  white-space: nowrap;
}
.filter-1 {
  width: 100px;
  height: 100px;
  background-color: cornflowerblue;
  margin: 10px 10px 10px auto;
  padding: 8px;
  display: inline-block;
  color: white;
  background-size: cover;
}
.filters::-webkit-scrollbar {
  height: 5px;
}
.filters::-webkit-scrollbar-track {
  background: #f1f1f1;
}
.filters::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 5px;
}
.filters::-webkit-scrollbar-thumb:hover {
  background: #555;
}
.write-box {
  border: none;
  width: 90%;
  height: 100px;
  padding: 15px;
  margin: auto;
  display: block;
  outline: none;
}
.loginBox {
  text-align: center;
}
.logoImg {
  margin: 5%;
  margin-top: 8%;
  width: 150px;
  margin-right: 20%;
}
.id {
  height: 30px;
  width: 80%;
  margin: 3%;
  margin-bottom: 2%;
  border-radius: 6px;
  border: 1px solid #999999;
}
.pwd {
  height: 30px;
  width: 80%;
  margin: 3%;
  margin-top: 2%;
  border-radius: 6px;
  border: 1px solid #999999;
}
.loginBt {
  height: 35px;
  width: 80%;
  margin: 3%;
  background: #1c99ff;
  border: 1px solid #1c99ff;
  color: white;
  border-radius: 6px;
}
.findPwd {
  font-size: 10px;
  text-align: right;
  margin-right: 45px;
  color: #1c99ff;
}
</style>
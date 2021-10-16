<template>
  <div class="header">
    <ul class="header-button-left">
      <li>Back</li>
    </ul>
    <ul class="header-button-right">
      <li v-if="step==1" @click="$store.commit('setStep',2);">Next</li>
      <li v-if="step==2" @click="publish">발행</li>
    </ul>
    <img src="./assets/logo2.png" class="logo" @click="$store.commit('setStep',0)"/>
  </div>



<!-- <h4>안녕 {{ $store.state.name }}</h4>
<h4>나이 : {{ $store.state.age }}</h4>
<h4>msg : {{$store.state.msg}}</h4>
<button @click="$store.commit('이름변경','Choi')">버튼</button>
<button @click="$store.commit('한살더')">버튼2</button>
<button @click="$store.commit('addmsg',msg)">버튼3</button>
<br>
<input type="text" @keyup="addmsg()" v-model="msg">

<h2>{{$store.state.more}}</h2>
<button @click="$store.dispatch('getData')">더보기버튼</button> -->


  <Container :data="data" :이미지="이미지" @write="작성한글=$event"/>
  
   <!-- <button @click="more">더보기</button>  -->

<!-- dh 여기부터 -->
  <div class="footer" v-if="step==0"> 
    <ul class="footer-button-plus">
      <div v-if="!loginUser.state">
        <button id="login" class="inputfile"/>
        <label for="file" class="input-plus login" @click="login" v-if="step!=4">login</label>
      </div>
      <div v-else-if="loginUser.state">
      <input @change="upload" accept="image/*" type="file" id="file" class="inputfile" />
      <label for="file" class="input-plus">+</label>
      </div>
    </ul>
 </div>
 <!-- dh 여기까지 -->

  <!-- <div v-if="step == 0">내용0</div>
  <div v-if="step == 0">내용1</div>
  <div v-if="step == 0">내용2</div>
  <button @click="step=0">버튼0</button>
  <button @click="step=0">버튼1</button>
  <button @click="step=0">버튼2</button>
  <div style="margin-top:500px"></div> -->


</template>

<script>

import Container from './components/Container.vue';
import data from './assets/data';
import axios from 'axios';
import {mapMutations, mapState} from 'vuex';
import _ from 'lodash';

export default {
  name: 'App',
  data(){
    return{

      ogdata:data,
      data:[...data],
      count:0,
      이미지:'',
      작성한글:'',
      clickfilter:'',
      msg:'',
      

    }
  },
  components: {
    Container
  },

  computed : {
    name(){
      return this.$store.state.name
    },
    ...mapState(['name','age','likes','loginUser','step']),
    ...mapState({작명:'name',})
    

  },

  methods:{
    ...mapMutations(['setMore','좋아요']),

    publish(){
      let 내게시물 = {
        id:this.$store.state.peedid,
        name: this.$store.state.loginUser.user.id,
        userImage: "https://placeimg.com/100/100/arch",
        postImage: this.이미지,
        likes: 36,
        date: "May 15",
        liked: false,
        content: this.작성한글,
        filter: this.clickfilter
      };
      this.data.unshift(내게시물);//왼쪽의 Array에 내 자료를 넣어줌
      this.$store.commit('setStep',0)
      this.$store.state.peedid++;
    },

    more(e) {
      
      console.log(`e.target.scrollingElement.scrollTop`, e.target.scrollingElement.scrollTop)
      if((e.target.scrollingElement.clientHeight + e.target.scrollingElement.scrollTop) >= e.target.scrollingElement.scrollHeight){
  
        axios
        .get(`https://codingapple1.github.io/vue/more${this.count}.json`)
        .then((result) => 
        {
          result.data.id=this.$store.state.peedid;
          this.data.push(result.data)
          this.$store.state.peedid++  

        }
        );
      this.count++;
      }
    },
    upload(e){
      let file = e.target.files;
      console.log(file[0].type);
      let url=URL.createObjectURL(file[0]);
      console.log(url);
      this.이미지 = url;
       this.$store.commit('setStep',1);
    },
    login(){
      this.$store.commit('setStep',4);
    },
  },

  created(){
   // window.addEventListener('scroll',this.moxre)
    window.addEventListener('scroll',_.throttle(this.more,400))
   // window.addEventListener('scroll',_.debounce(this.more,1000))
  }
  ,
    

  mounted(){
    this.emitter.on('filter',(data)=>{
      this.clickfilter=data
    }
    );
  }
}
</script>

<style>
  body {
  margin: 0;
}
ul {
  padding: 5px;
  list-style-type: none;
}
.logo {
  width: 22px;
  margin: auto;
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  top: 13px;
}
.header {
  width: 100%;
  height: 40px;
  background-color: rgba( 255, 255, 255, 0.9 );
  padding-bottom: 8px;
  position: sticky;
  z-index: 9998;
  top: 0;

}
.header-button-left {
  color: skyblue;
  float: left;
  width: 50px;
  padding-left: 20px;
  cursor: pointer;
  margin-top: 10px;
}
.header-button-right {
  color: skyblue;
  float: right;
  width: 50px;
  cursor: pointer;
  margin-top: 10px;
}
.footer {
  width: 100%;
  position: sticky;
  bottom: 0;
  padding-bottom: 10px;
  background-color: rgba( 255, 255, 255, 0.9 );
  border-top: 1px solid rgb(244, 244, 244);
  box-shadow: 5px 5px 5px rgba(198, 197, 197, 0.2);
}
.footer-button-plus {
  width: 80px;
  margin: auto;
  text-align: center;
  cursor: pointer;
  font-size: 24px;
  padding-top: 12px;
}
.sample-box {
  width: 100%;
  height: 600px;
  background-color: bisque;
}
.inputfile {
  display: none;
}
.input-plus {
  cursor: pointer;
}
#app {
  box-sizing: border-box;
  font-family: "consolas";
  margin-top: 60px;
  width: 100%;
  max-width: 460px;
  margin: auto;
  position: relative;
  border-right: 1px solid #eee;
  border-left: 1px solid #eee;
}
.login {
  font-size:15px
}
</style>

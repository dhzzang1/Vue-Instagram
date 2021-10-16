<template>
  <div class="post">
    <div class="post-header">
      <div class="profile" :style="{backgroundImage : `url(${item.userImage}`}"></div>
      <span class="profile-name">{{item.name}}</span>
    </div>
    <div class="post-body" :style="{backgroundImage : `url(${item.postImage}`}" :class="item.filter" @click="$store.commit('좋아요')"></div>
    <div class="post-content">
       
        <p>{{$store.state.like}} Likes</p>
        <p><strong>{{item.name}}</strong> {{item.content}}</p>
        <p class="date">{{item.date}}</p>
        <div class="moreComment" @click="moreComment(item.id) , mymsg(item)">댓글 3개 보기</div>
        <br>
        <input class="comment" placeholder="댓글달기..." @keyup.enter="addComment($event.target.value,item.id)">
    </div>
  </div>
</template>

<script>
export default {

    props : {
        item : Object
    },

    methods: {
      mymsg(item){
      this.$store.commit('mymsg',item)
      },

      moreComment(id){
      
        this.$store.commit('setStep',5)

        this.$store.commit('commentDetail',id)
      },
      addComment(msg, id){

        if(!this.$store.state.loginUser.state){
          alert('로그인 후 이용해주세요');
          this.$store.commit('setStep',4)
        }
        else{
        let obj= {
        "name": this.$store.state.loginUser.user.id,
        "msg":msg,
        "id":id,
        "img":"https://placeimg.com/200/250/arch"
    }
        this.$store.commit('addComment',obj)
      this.moreComment(id);
      }
      }

    }

};
</script>

<style>
.post {
  width: 100%;
    border-bottom: 2px solid rgba(244, 244, 244);

}
.profile {
  width: 30px;
  height: 30px;
  background-size: 100%;
  border-radius: 50%;
  float: left;
}
.profile-name {
  display: block;
  float: left;
  padding-left: 10px;
  padding-top: 7px;
  font-size: 14px;
}
.post-header {
  height: 30px;
  padding: 10px;
}
.post-body {
  height: 450px;
  background-position: center;
  background-size: cover;
}
.post-content {
  padding-left: 15px;
  padding-right: 15px;
  font-size: 14px;
}
.date {
  font-size: 11px;
  color: grey;
  margin-top: -8px;
}
.comment {
  border: 0px solid gray;
  height: 20px;
  width: 70%;
  margin-top:3px;
  margin-bottom: 20px;

}
.comment:focus {
  outline:none;
}
.moreComment {
  color:rgb(129, 129, 129);
  font-size:14px;
  margin-top:17px;
}
</style>
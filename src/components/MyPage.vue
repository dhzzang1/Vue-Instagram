<template>
<div style="padding : 10px;">
  <h4>Follower Search</h4>
  <input class="search" placeholder="   🔍  Search Id..." @keyup="find($event.target.value)"/>
  <div class="post-header" v-for="(val,i) in f" :key="i">
    <div class="profile" :style="`background-image:url(${val.image})`"></div>
    <span class="pr ofile-name">{{val.name}}</span>
  </div>
</div>
</template>
<script>
import {onMounted, reactive, ref,toRefs} from 'vue';
import axios from 'axios';

export default { 
    name: 'mypage',
    
    
    setup(props){
        let follower = ref([]);
        let f = ref([])
       
        let test = reactive({ name : 'kim'})
        
        let {one} =  toRefs(props);
        test
        one 

        onMounted(()=>{

            axios.get('/follower.json').then(a=>follower.value=a.data)
        })
        function find(data){
            console.log(`data`, data)
            let arr =follower.value.filter(item=>item.name.indexOf(data)>=0)
            f.value=arr;
        }
        

        return {f,find}
    },
    data(){
        return{
            model:'',
        }
    }
}
</script>

<style>
.search {
    height: 35px;
    width: 100%;
    border-radius: 7px;
    border: 1px solid rgb(177, 177, 177);
    margin-bottom: 18px;
}
.post-header {
    padding-top: 12px;
    box-shadow: 5px 5px 5px rgba(241, 241, 241, 0.7);
    border-radius: 7px;
}
.pr {
    margin-left: 12px;
   
}

</style>
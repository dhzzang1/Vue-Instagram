import axios from 'axios'
import { createStore } from 'vuex'
import comments from './assets/comment'


const store = createStore({
    state(){
        return{
            selectComments: [],
            comments: comments,
            c: {
                id:'',
                msg:'',
                img:'',
                date:'',
                like:''
            },
            name: 'kim',
            age: 20,
            msg: '',
            like: 44,
            flag:false,
            more : {},
            step : 3,
            peedid : 4,
            userList:[//dh
                {
                    id:'dahye',
                    pwd:'1234'
                },
                {
                    id:'sungkeun',
                    pwd:'1234'
                }
            ],
            loginUser:{
                state:false,
                user:null
            }//dh 여기까지
        }
    },
    mutations :{
        mymsg(state,item){
            state.c.id=item.name
            state.c.msg=item.content
            state.c.img=item.userImage
            state.c.date=item.date
            state.c.like=item.likes
        },
        addComment(state, obj){
            state.comments.unshift(obj);
        },
        commentDetail(state, id){
            console.log(id)
            let arr = state.comments.filter((comment)=>{
                return comment.id == id
            })
            state.selectComments=arr
            console.log(arr)
        },
        setStep(state, num){
            state.step=num;
        },
        setMore(state, data){
            state.more = data
        },
        이름변경(state,data){
            state.name=data
        },
        한살더(state){
            state.age++
        },
        addmsg(state,msg){
            state.msg=msg
        },
        좋아요(state){
            state.flag ? state.like++ : state.like--
            state.flag=!state.flag
        },
        loginCheck(state,user){
            console.log(user);

            let result = {...state.userList.find((item)=>{
                if(item.id == user.id && item.pwd == user.pwd){
                    return true;
                }
            }
            )}
            if(result.id==undefined || result.pwd==undefined){
                alert('아이디 또는 비밀번호가 일치하지 않습니다.')
            }else{
                alert('로그인 성공')
                
                state.loginUser.state=true;
                state.loginUser.user=result;

                //홈화면 보여주기
                state.step=0;
            }
        }

    },
    
    actions : {
        getData(context){

            axios.get(`https://codingapple1.github.io/vue/more0.json`)
            .then((a)=>{
                console.log(a.data);
                context.commit('setMore',a.data);
            });
        },
        



    }

})

export default store;
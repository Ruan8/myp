<template>
    <div id="app" v-if="show">
        <img :src="avatar" alt="avatar">
        <span class="username">{{ username }}</span>
        <div @click="mydata"><span>个人资料</span><span class="bold">></span></div>
        <div @click="history"><span>浏览记录</span><span class="bold">></span></div>

        <mt-button @click="quit">退出登陆</mt-button>
    </div>
</template>

<script>
import boy from "../assets/boy.png"
import girl from "../assets/girl.png"
import {userform} from "../api/index"
export default {
    name:"me",
    props:["show"],
    data(){
        return{
            username:this.$cookies.get("username") || "",
            avatar:boy
        }
    },
    created(){
        this.getuserform()
    },    
    methods:{
        getuserform(){
            var that = this
            if(that.username){
                userform(that.username).then(res=>{
                    var result = res.data.result
                    that.avatar = result.sex ? girl : boy
                })
            }
        },
        quit(){
            this.$cookies.remove("username")
            this.$emit("getchild",false)
        },
        history(){
            this.$router.push("/history")
        },
        mydata(){
            this.$router.push("/mydata")
        }
    },
    watch:{
        show(){
            this.username = this.$cookies.get("username")
        },
        $route(){
            this.getuserform()
        }
    }
}
</script>
<style scoped>
#app{
    display: flex;
    margin-top: 3.125rem;
    align-items: center;
    height: 80vh;
    flex-direction: column;
    margin-left:1.875rem;
    margin-right: 1.875rem; 
}
#app img{
    height: 4.375rem;
    width: 4.375rem;
    margin-bottom: .625rem;
}
#app .username{
    margin-bottom: 2.5rem;
}
#app .mint-button{
    background: white;
    border-radius: 1.25rem;
    width: 80%;
    border:red .0625rem solid;
    color: red;
    height: 1.875rem;
    font-size: 14px;
    margin-top: 1.25rem;
}
#app > div{
    width: 100%;
    height: 3.125rem;
    line-height: 3.125rem;
    font-size: .875rem;
    display: flex;
    justify-content: space-between;
}
.bold{
    font-weight: bold;
}
</style>

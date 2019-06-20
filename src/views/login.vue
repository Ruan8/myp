<template>
    <div id="app" v-if="show">
        <div class="login">
            <img :src="avatar" autofocus="autofocus" alt="avatar">
            <input type="text" placeholder="手机号/会员名" maxlength="10" v-model="username">
            <input type="password" placeholder="请输入密码" maxlength="16" v-model="password">
            <div class="btngroup">
                <router-link to="/codelogin">验证码登陆</router-link>
                <router-link to="/register">免费注册</router-link>
            </div>
            <mt-button type="danger" size="small" @click="tologin">登陆</mt-button>
        </div>
    </div>
</template>
<script>
import boy from '../assets/boy.png'
import girl from '../assets/girl.png'
import {Toast} from "mint-ui"
import {login} from "../api/index"
export default {
    name:"three",
    props:["show"],
    data(){
        return{
            sex:0,
            avatar:boy,
            username:"",
            password:""
        }
    },
    created(){
        
    },
    methods:{
        tologin(){
            var username = this.username
            var password = this.password
            if(username.trim().length==0 || password.trim().length==0){
                Toast('账号密码不能为空');
            }else{
                //验证成功
                login(username=username,password=password).then(res=>{
                    if(res.data.username){
                        //登陆成功
                        this.$cookies.set("username",res.data.username,60 * 60 * 24 * 30)
                        this.$emit("getchild",true)
                        this.username=this.password = ""
                    }else{
                        Toast("登陆失败")
                    }
                })
            }
        }
    },
    computed:{
    }
}
</script>
<style scoped>
.login{
    height: 90vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    
}
.login img{
    height: 4.375rem;
    width: 4.375rem;
    margin-bottom: .625rem;
}
.mint-button{
    width: 80%;
    border-radius: 1.25rem;
    margin-top: 1.875rem;
    height: 2.5rem;
}
.login input{
    width: 80%;
    height: 2.5rem;
    border: none;
    border-radius:0;
    border-bottom:red .0625rem solid; 
    margin-top: .9375rem;
    text-indent: .625rem;
    font-size: 1rem;
}
.btngroup{
    width: 80%;
    display: flex;
    justify-content: space-between;
    font-size: .875rem;
    margin-top: .625rem;
    
}
a{
    color: rgb(20, 20, 20);
}
</style>

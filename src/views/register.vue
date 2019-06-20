<template>
    <div id="app">
        <img :src="avatar" alt="avatar">
        <input type="text" placeholder="账号" v-model="username" maxlength="10" autofocus="autofocus">
        <input type="password" placeholder="密码" v-model="password" maxlength="16">
        <input type="password" placeholder="确认密码" v-model="againpassword" maxlength="16">
        <mt-button type="danger" size="small" @click="getregister">注册</mt-button>
        <mt-button size="small" class="back" @click="back">账号密码登陆</mt-button>
    </div>
</template>
<script>
import boy from "../assets/boy.png"
import { Toast } from "mint-ui"
import { register } from "../api/index"
export default {
    name:"register",
    data(){
        return{
            avatar:boy,
            username:"",
            password:"",
            againpassword:""
        }
    },
    methods:{
        back(){
            //返回登陆
            this.$router.go(-1)
        },
        getregister(){
            //注册
            var username = this.username
            var password = this.password
            var againpassword = this.againpassword
            if(username.trim().length<4){
                Toast("账号不能少于4位")
            }else if(password.trim().length<6){
                Toast("密码不能少于6位")
            }else if(password != againpassword){
                Toast("两次密码不一致")
            }else{
                //简单验证成功
                register(username=username,password=password).then(res=>{
                    if(res.data.result){
                        //注册成功
                    }else{
                        Toast("用户名已存在")
                    }
                })
            }
            
        }
    }
}
</script>
<style scoped>
#app{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
}
#app > img{
    height: 4.375rem;
    width: 4.375rem;
    margin-bottom: .625rem;
}
#app > input{
    width: 80%;
    margin-bottom: .625rem;
    text-indent: .625rem;
    border:none;
    border-bottom:red .0625rem solid;
    letter-spacing: .0625rem;
    height: 2.5rem;
    font-size: 1rem;
}
#app > .mint-button{
    width: 80%;
    border-radius: 1.25rem;
    margin-bottom: .625rem;
    margin-top: .625rem;
    height: 2.5rem;
}
.back{
    background: white;
    color: blue;
    border: 1px solid blue;
}
</style>

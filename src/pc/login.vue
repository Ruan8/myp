<template>
    <div id="app">
        <pcheader />
        <div class="body">
            <div class="login">
                <div class="login-h center">
                    <el-image :src="boy"></el-image>
                </div>
                <div class="login-b">
                    <el-input v-model.trim="username" type="text" maxlength="11"    placeholder="请输入用户名" />
                    <el-input v-model.trim="password" type="password" maxlength="16"   placeholder="请输入密码" show-password="true"/>
                    <div class="forget"><span>验证码登录</span><span>忘记密码?</span></div>
                    <button class="center" @click="login">登陆</button>
                </div>
                <div class="login-f">
                    <span>第三方登陆</span>
                    <div class="imgList">
                        <el-image :src="wx"></el-image>
                        <el-image :src="qq"></el-image>
                        <el-image :src="wb"></el-image>
                    </div>
                    <span>立即注册</span>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.body{
    width: 100%;
    height: 94vh;
    min-width: 1335px;
   /*! autoprefixer: off */
    background: linear-gradient(to bottom right,lightskyblue,purple);
    /* autoprefixer: on */
    display: flex;
    align-items: center;
    justify-content: center;
}
.login{
    width: 300px;
    height: 60%;
    background: white;
    min-height: 410px;
    border-radius: 5px;
    box-shadow: 0 0 6px rgba(0,0,0,.12);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.login-h{
    width: 100%;
    height: 25%;
}
.login-b{
    width: 100%;
    height: 40%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.login-b .el-input{
    width: 80%;
    border: none;
    margin-top: 10px;
}
.login-b button{
    width: 80%;
    height: 35px;
    border:none;
    background:linear-gradient(to right,lightskyblue,blueviolet,purple);
    color: white;
    border-radius: 20px;
    margin-top: 10px;
}
.login-b .forget{
    font-size: 12px;
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 5px;
}

.login-f{
    width: 100%;
    height: 25%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
    font-size: 12px;
}
.imgList{
    margin: 10px 0;
}
.login-f .el-image{
    width: 30px;
    height: 30px;
}
</style>
<script>
import pcheader from '../components/pcheader'
import boy from "../assets/boy.png"
import wx from "../assets/wx.png"
import qq from "../assets/qq.png"
import wb from "../assets/wb.png"
import { login } from '../api';
export default {
    data(){
        return{
            boy,
            username:"",
            password:"",
            wx,
            qq,
            wb
        }
    },
    methods:{
        login(){
            var username = this.username
            var password = this.password
            if(username.trim().length==0 || password.trim().length==0){
                this.$alert('账号密码不能为空');
            }else{
                //验证成功
                login(username=username,password=password).then(res=>{
                    if(res.data.username){
                        //登陆成功
                        this.$cookies.set("username",res.data.username,60 * 60 * 24 * 30)
                        this.$emit("getchild",true)
                        this.username = this.password = ""
                        this.$router.go(-1)
                    }else{
                        //登录失败
                        this.$alert('登录失败');
                    }
                })
                .catch(()=>{
                    this.login()
                })
            }

            
        }
    },
    components:{
        pcheader
    }
}
</script>
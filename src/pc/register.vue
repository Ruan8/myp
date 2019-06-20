<template>
    <div id="app">
        <pcheader />
        <Vmask v-show="maskflag" :content="content"/>
        <div class="alert">
            <el-alert
                :title="title"
                type="warning"
                center
                show-icon
                v-show="alert">
            </el-alert>
        </div>
        
        <div class="body">
            <div class="login">
                <div class="login-h center">
                    <el-image :src="boy"></el-image>
                </div>
                <div class="login-b">
                    <el-tooltip class="item" effect="dark" content="4~11位数字或字母" placement="right-start">
                        <el-input v-model.trim="username" autofocus type="text" maxlength="11"    placeholder="请输入用户名" />
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="6~16位数字或字母" placement="right-start">
                        <el-input v-model.trim="password" type="password" maxlength="16"   placeholder="请输入密码" show-password="true"/>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="再次输入密码" placement="right-start">
                        <el-input v-model.trim="againpassword" type="password" maxlength="16"   placeholder="确认密码" show-password="true"/>
                    </el-tooltip>
                    <button class="center" @click="register">注册</button>
                </div>
                <div class="login-f">
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
.alert{
    position: absolute;
    width: 20%;
    min-width: 200px;
    left: 40%;
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
    height: 50%;
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
    margin-top: 20px;
}

.login-f{
    width: 100%;
    height: 20%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
    font-size: 12px;
}
</style>
<script>
import pcheader from '../components/pcheader'
import Vmask from '../components/Vmask'
import boy from "../assets/boy.png"
import wx from "../assets/wx.png"
import qq from "../assets/qq.png"
import wb from "../assets/wb.png"
import {register} from "../api"
export default {
    data(){
        return{
            boy,
            username:"",
            password:"",
            againpassword:"",
            wx,
            qq,
            wb,
            title:"",
            alert:false,
            maskflag:false,
            content:""
        }
    },
    methods:{
        register(){
            var username = this.username
            var password = this.password
            var againpassword = this.againpassword
            var _this = this
            if(username.length<4){
                _this.title = "用户名不能少于4位"
                _this.alert = true
            }else if(password.length<6){
                _this.title = "密码不能少于6位"
                _this.alert = true
            }else if(againpassword !== password){
                _this.title = "两次密码不一致"
                _this.alert = true
            }else{
                register(username,password)
                .then(res=>{
                    var result = res.data.result
                    console.log(result)
                    if(result==1){
                        _this.ok(3)
                    }else{
                        _this.title = "用户已注册"
                        _this.alert = true
                    }
                })
                .catch(()=>{
                    _this.title = "注册失败"
                    _this.alert = true
                })
            }
        },
        ok(time){
            setTimeout(() => {
                if(time>0){
                    this.content = "注册成功&nbsp;"+time+"秒&nbsp;跳转登录页"
                    this.maskflag = true
                    time-=1
                    this.ok(time)
                }else{
                    this.maskflag = false
                    this.$router.push("/login")
                }
            }, 1000);
        }
    },
    watch:{
        alert(e){
            if(e){
                setTimeout(() => {
                    this.alert = false
                }, 3000);
            }
        }
    },
    components:{
        pcheader,Vmask
    }
}
</script>
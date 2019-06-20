<template>
    <div id="app">
        <img :src="avatar" alt="">
        <input type="text" autofocus="autofocus" maxlength="11" placeholder="手机号" v-model="phonenum">
        <div class="btngroup">
            <input type="text" placeholder="验证码" maxlength="6" v-model="code">
            <mt-button type="primary" @click="getcode()" :disabled="disabled">{{ codenum }}</mt-button>
        </div>
        <mt-button type="danger" size="small">登陆</mt-button>
        <mt-button size="small" class="back" @click="back">账号密码登陆</mt-button>
    </div>
</template>
<script>
import boy from "../assets/boy.png"
export default {
    name:"codelogin",
    data(){
        return{
            avatar:boy,
            codenum:"获取验证码",
            disabled:false,
            phonenum:""
        }
    },
    methods:{
        back(){
            this.$router.go(-1)
        },
        getcode(num = 60){
            if(this.phonenum.trim().length==11){
                if (num==0)  {
                    this.codenum = "获取验证码"
                    this.disabled = false
                    return
                }
                setTimeout(()=>{
                    this.getcode(--num)
                },1000)
                this.codenum = num
                this.disabled=true
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
    height: 90vh;
    flex-direction: column;
}
img{
    height: 4.375rem;
    width: 4.375rem;
    margin-bottom: .625rem;
}
input{
    border: none;
    height: 1.875rem;

    border-bottom: red 1px solid;
    text-indent: .625rem;
}
#app > input{
    width: 80%;
    margin-top: .625rem;
    font-size: 1rem;
    height: 2.5rem;
}
.btngroup{
    width: 80%;
    height: 1.875rem;
    display: flex;
    margin-top: 1.25rem;
}
.btngroup input{
    width: 70%;
    font-size: 1rem;
}
.btngroup .mint-button{
    border: none;
    width: 30%;
    height: 1.875rem;
    font-size: .625rem;
}
#app > .mint-button{
    width: 80%;
    border-radius: 1.25rem;
    margin-top: 1.25rem;
    height: 2.5rem;
}
.back{
    background: white;
    color: blue;
    border: blue solid 1px;
}
</style>

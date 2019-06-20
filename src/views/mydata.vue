<template>
    <div id="app" v-show="isshow">
        <img :src="avatar" alt="avatar">
        <div class="flex"><div class="f1">用户名：</div><div class="f1" v-text="username"></div></div>
        <div class="flex"><div class="f1">联系方式：</div><div class="f1"><input type="text" v-if="update" v-model="phonenum" maxlength="11" /><span v-else>{{ phonenum? phonenum : '空' }}</span></div></div>
        <div class="flex"><div class="f1">性别：</div><div class="f1"><div v-if="update" class="radio"><input type="radio" value="0" name="sex" v-model="sex" />&nbsp;男&nbsp;&nbsp;&nbsp;&nbsp;<input type="radio" value="1" name="sex" v-model="sex"  />&nbsp;女</div><span v-else>{{ sex == 1? "女" : "男" }}</span></div></div>
        <mt-button type="primary" @click="update = !update">{{update?"保存修改":"点击修改"}}</mt-button>
    </div>
</template>
<script>
import {userform,updateuserform} from "../api/index"
import boy from "../assets/boy.png"
import girl from "../assets/girl.png"
import {Toast} from "mint-ui"
export default {
    data(){
        return{
            update:false,
            sex:0,
            isshow:false,
            avatar:boy,
            phonenum:""
        }
    },
    created(){
        var that = this
        var username = this.$cookies.get("username")
        if(username){
            that.username = username
            userform(username).then(res=>{
            var result = res.data.result
            that.sex = result.sex
            that.phonenum = result.phonenum
            that.username = username
            that.isshow = true
            })
        }
        
    },
    methods:{

    },
    watch:{
        sex(e){
            if(e==1){
                this.avatar = girl
            }else{
                this.avatar = boy
            }
        },
        update(newVal){
            if(!newVal){
                var sex = this.sex
                var phonenum = this.phonenum
                if(phonenum.length==11){
                    var username = this.$cookies.get("username")
                    updateuserform(username,phonenum,sex).then(res=>{
                        if(res.data.result){
                            Toast("修改成功")
                        }
                    })
                }else{
                    Toast("电话号码有误")
                    this.update = true
                }
            }
        }
    }
}
</script>
<style scoped>
#app{
    display: flex;
    height: 80vh;
    align-items: center;
    margin-top: 10vh;
    flex-direction: column;
    line-height: 3.75rem
}
img{
    width: 4.375rem;
    height: 4.375rem;
    margin-bottom: 3.125rem;
}
.flex{
    display: flex;
    width: 80%;
    align-items: center;
    justify-content: center;
}
.f1{
    flex: 1;
    text-align: center;
}
input{
    border: none;
    border-bottom:1px solid lightgray; 
}
input:focus{
    border-bottom: 1px solid red;
    transition: all .5s;
}
.mint-button{
    border-radius: 1.25rem;
    width: 80%;
    margin-top: 3.125rem
}
.radio{
    float: left;
}
</style>

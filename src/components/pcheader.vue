<template>
    <el-header height="6vh">
        <el-row>
            <el-col :span="15">
                <router-link :to="{ path:'/' }" style="color:#E6A23C" title="返回首页">爬漫画</router-link>
            </el-col>
            <el-col :span="9">
                <el-row>
                    <el-col class="input" :span="10">
                        <el-input size="mini" type="text" v-model="search" placeholder="请输入漫画名、作者">
                        <el-button slot="append" size="mini" icon="el-icon-search" @click.native="searchbtn"></el-button>
                        </el-input>
                    </el-col>
                    <el-col :span="14">
                        <el-row>
                            <el-col push="17" :span="8">
                                <div v-if="islogin" class="tx">
                                    <i class="el-icon-setting" style="margin-right:10px;" @mouseout="mout" @mouseover="mover"></i>
                                    <el-image :src="userform.sex==0? boy : girl"/>
                                    <div class="toshow" v-show="toshow" @mouseover="mover" @mouseout="mout">
                                        <span>{{$cookies.get("username").length>5 ?$cookies.get("username").substr(0,5)+".." : $cookies.get("username")}}</span>
                                        <span>个人中心</span>
                                        <span @click="quit()">退出</span>
                                    </div>
                                </div>
                                <div v-else class="tx">
                                    <router-link to="/login"><el-link :underline="false" type="primary">登录</el-link></router-link>
                                    <span class="centerline">|</span>
                                    <router-link to="/register"><el-link :underline="false" type="primary">注册</el-link></router-link>
                                </div>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </el-header>
</template>
<script>
import boy from "../assets/boy.png"
import girl from "../assets/girl.png"
import { search,userform } from "../api"

export default {
    props:["search"],
    data(){
        return {
            search:"",
            userform:[],
            girl,
            boy,
            islogin:this.$cookies.get("username")?true:false,
            toshow:false,
            timeout:null
        }
    },
    beforeCreate(){
    },
    created(){
    },
    methods:{
        sex(){
            var username = this.$cookies.get("username")
            return userform(username).then(res=>{
                this.userform = res.data.result
            })
        },
        searchbtn(){
            if(this.search.trim().length>0){
                this.$router.push({path:"/search",query:{name:this.search}})
            }
        },
        mout(){
            this.timeout = setTimeout(() => {
                this.toshow=false
            }, 2000);
        },
        mover(){
            clearTimeout(this.timeout)
            this.toshow=true
            
        },
        quit(){
            this.$cookies.remove('username')
            this.islogin = false
        }
    }
}
</script>
<style scoped>
.input{
    height: 6vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
.el-header{
  width: 100%;
  min-width: 1334px;
  line-height: 6vh;
  background-color: #000000;
  color: #ffffff;
  border-bottom: 1px solid #ffffff;
  font-size: .875rem;
  font-weight: bolder;
}
.toshow{
    position: absolute;
    width: 60px;
    height: 10vh;
    bottom: -10vh;
    left: -5px;
    color: black;
    font-size: 12px;
    display: flex;
    flex-direction: column;
    line-height: 10px;
    align-items: center;
    justify-content: space-around;
    z-index: 999999;
    background: white;
    box-shadow: 0 0 6px rgba(0,0,0,.12);
}
.toshow span{
    width: 100%;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.toshow span:first-child{
    color:gray;
}
.toshow span:hover{
    background: blue;
    color: white;
}
.toshow span:nth-of-type(1){
    background: white;
    color: black;
}
.tx{
    height: 6vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight:normal;
    position: relative;
}

.el-image{
    height: 35px;
    width: 35px;
}
.centerline{
    margin: 0 10px;
}
</style>

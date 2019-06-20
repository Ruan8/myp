<template>
<div id="app">
    <div :style="{ height: height+'px'}">
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="(value , index) in lbImgUrl" :key="index">
                <router-link :to="{ path:'/pic',query:{url:lbUrl[index]}}"><img :src="value" alt="swipe" class="img"></router-link>
            </mt-swipe-item>
        </mt-swipe>
    </div>
    <div class="gg">
        <div class="f1 center">
            <!-- 搜索按钮 -->
            <router-link to="/search"><img src="../assets/search.png" alt="searchimg"></router-link>
        </div>
        <div class="f1 center">
            <!-- 分类按钮 -->
            <router-link to="/fl"><img src="../assets/fl.png" alt="flimg"></router-link>
        </div>
    </div>
    <div class="hot">
        <div class="title">
            今日最热
        </div>
        <div class="imgList" v-for="(value,index) in 2" :key="index">
            <div v-for="(v,i) in 4" :key="i">
                <router-link :to="{ path:'/list',query:{url:hotUrl[index*4+i]}}"><singleimg  :src="hotImgUrl[index*4+i]" :tt1="hotTitle[index*4+i]||''" :tt2="hotNickName[index*4+i]||''"></singleimg>     </router-link>           
            </div>
            
        </div>
    </div>
        <div class="title">
            最新发布
        </div>
        <div class="imgList" v-for="(value,index) in newImgUrl.length%4==0 ? newImgUrl.length/4 : parseInt(newImgUrl.length/4)+1"  :key="index">
                <div v-for="(v,i) in (newImgUrl.length-4*value>0?4:Math.abs(index*4-newImgUrl.length))"  :key="i">
                        <router-link :to="{path:'/list',query:{ url:newUrl[4*index+i] }}"><singleimg :src="newImgUrl[4*index+i]" :tt1="newTitle[4*index+i]" :tt2="newNickName[4*index+i]"/></router-link>
                </div>
        </div>
</div>
</template>

<script>
import {index} from "../api/index.js"
import singleimg from "../components/singleimg"
export default {
    name:"one",
    data(){
        return{
            lbImgUrl:[],
            lbUrl:[],
            hotImgUrl:[],
            hotNickName:[],
            hotTitle:[],
            hotUrl:[],
            newImgUrl:[],
            newNickName:[],
            newTitle:[],
            newUrl:[],
            height:0
        }
    },
    created(){
        var orderWidth = window.screen.width  
        this.height = parseInt(parseFloat(orderWidth)/1.4)
        this.load()
        
    },
    methods:{
        load(){
            index().then((res)=>{
                let data = res.data
                let lb = data.lb
                let hot = data.hot
                let new1 = data.new

                this.lbImgUrl = lb.LBImgUrl
                this.lbUrl = lb.LBUrl

                this.hotImgUrl = hot.hotImgUrl
                this.hotNickName = hot.hotNickName
                this.hotTitle = hot.hotTitle
                this.hotUrl = hot.hotUrl
                
                this.newImgUrl = new1.newImgUrl
                this.newNickName = new1.newNickName
                this.newTitle = new1.newTitle
                this.newUrl = new1.newUrl
            })
        },
    },
    components:{
        singleimg
    },
    watch:{
        form:function(){
        }
    }
}
</script>
<style scoped>

/* 144 192 */
.img{
    width: 100%;
}
.gg{
    width: 90%;
    height: 3.125rem;
    /* background: rgb(245, 245, 245); */
    border-radius: 1.25rem;
    padding-left: 5%;
    padding-right: 5%;
    display: flex;
    border-bottom: .0625rem solid lightgray;
}
.f1{
    flex: 1;
}
.center{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.f1 img{
    width: 2.5rem;
    height: 2.5rem;
}
.title{
    text-indent: .625rem;
    padding-top: 10px;
    font-weight: bolder;
}
.imgList{
    height: 8.125rem;
    /* background: red; */
    margin-top: .625rem;
    margin-left: .625rem;
    margin-right: .625rem;
    display: flex;
    justify-content: space-around;
}
</style>

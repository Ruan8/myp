<template>
    <div id="app">
        <div class="fl">
            <div class="tc" >
                <div class="left center">
                    题材
                </div>
                <div class="right">
                    <div class="flex" v-for="(v,i) in (tag.length%6==0?tag.length/6:parseInt(tag.length/6)+1)" :key="i">
                        <div class="text" :class="tagid==tag[i*6+index].id?'active':''" v-for="(item, index)  in (tag.length-6*v>0?6:Math.abs(6*i-tag.length))" :key="index" @click="tagid=tag[i*6+index].id">
                            {{tag[i*6+index].title}}
                        </div>
                        </div>
                    </div>
                </div>
                <div class="lb">
                    <div class="left center">
                        类别
                    </div>
                    <div class="right">
                        <div class="text" :class="stateid==lb[index].id?'active':''" v-for="(item, index) in lb" @click="stateid=lb[index].id" :key="index">
                            {{ lb[index].title }}
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="imgUrl.length>0" >
                <div  v-for="(value,index) in imgUrl.length%4==0 ? imgUrl.length/4 : parseInt(imgUrl.length/4)+1"  :key="index">
                    <div class="list" v-if="imgUrl.length>=value*4">
                        <div v-for="(v,i) in 4"  :key="i">
                            <router-link :to="{path:'/app/list',query:{ url:url[4*index+i] }}"><singleimg :src="imgUrl[4*index+i]" :tt1="title[4*index+i]" :tt2="nickName[4*index+i]"/></router-link>
                        </div>
                    </div>
                    <div v-else class="list">
                        <div v-for="(v,i) in imgUrl.length%4"  :key="i">
                            <router-link :to="{path:'/app/list',query:{ url:url[4*index+i] }}">
                                <singleimg :src="imgUrl[4*index+i]" :tt1="title[4*index+i]" :tt2="nickName[4*index+i]"/>
                            </router-link>
                        </div>
                        <div v-for="(v,i) in 4-imgUrl.length%4" :key="i">
                            <div class="noneimg"></div>
                        </div>
                    </div>
                </div>
            </div>
        <div class="btngroup" v-if="btngroup" >
            <mt-button type="primary" :disabled="pageid==1" class="btn" @click="pageid-=1">上一页</mt-button>
            <mt-button type="primary" :disabled="(imgUrl.length<=47 ? true : false )" class="btn" @click="pageid+=1">下一页</mt-button>
        </div>
    </div>
</template>

<script>
import { tag,fl } from "../api/index"
import singleimg from "../components/singleimg"
export default {
    name:"fl",
    data(){
        return {
            tag:[],
            lb:[
                {id:1,title:"全部"},
                {id:2,title:"连载中"},
                {id:3,title:"已完结"}
            ],
            imgUrl:[],
            title:[],
            url:[],
            nickName:[],
            tagid:0,
            stateid:1,
            pageid:1,
            btngroup:false
        }
    },
    created(){
        this.gettag()
        this.getfl()
    },
    methods:{
        gettag(){
            tag().then((res)=>{
                this.tag = res.data.tag
            })
        },
        getfl(){
            var tag=this.tagid
            var state=this.stateid
            var page=this.pageid
            fl(tag,state,page).then((res)=>{
                let data = res.data
                this.imgUrl = data.imgUrl
                this.title = data.title
                this.url = data.url
                this.nickName = data.nickName
                data = Object.keys(data.imgUrl)
                this.btngroup = data.length<48?false:true
                window.scrollTo(0,0)
            })
            .catch(()=>{
                this.getfl()
            })
        },
    },
    components:{
        singleimg
    },
    watch:{
        tagid(e){
            this.getfl()
            this.pageid = 1
        },
        stateid(e){
            this.getfl()
            this.pageid = 1
        },
        pageid(e){
            this.getfl()
        }
    }
}
</script>
<style scoped>
#app{
    width: 100%;
}
.noneimg{
    width: 4.5rem;
    height: 6rem;
}
.fl{
    width: 100%;
    height: 9.375rem;
}
.tc{
    height:6.875rem;
    display: flex;
    margin-bottom: 10px;
}
.list{
    display: flex;
    margin-top: .625rem;
    justify-content:space-around;
}
.left{
    line-height: 6.875rem;
    color: gray;
    width: 15%;
    font-size: .875rem;
}
.right{
    height: 100%;
    width: 85%;
    font-size: .625rem;
}
.flex{
    display: flex;
    margin-top: .4375rem;
}
.text{
    height: 1.25rem;
    width: 15%;
    margin-left: 1.5%;
    line-height: 1.25rem;
    text-align: center;
    border-radius: .625rem;
}
.active{
    background-color: rgb(187, 187, 4);
}
.lb{
    width: 100%;
    height: 2.5rem;
    display: flex;
}
.lb .right{
    display: flex;
    align-items: center;
}
.btngroup{
    display: flex;
    justify-content: space-around;
}
.btn{
    font-size: .75rem;
    margin-top: 1.25rem;
    margin-bottom: .625rem;
    height: 1.875rem;
    border-radius: 1.25rem;
    width: 80px;
}
</style>

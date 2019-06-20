<template>
    <div id="app">
        <div class="searchbtn">
            <input type="text" autofocus="autofocus"  placeholder="搜索作品、作者名" v-model="name">
            <div class="ss" @click="tosearch">搜索</div>
        </div>
        <div v-if="result">
            <div class="total" v-show="total">
                "{{ searchname }}"的搜索结果
            </div>
            <div v-if="imgUrl.length>0">
                <div  v-for="(value,index) in imgUrl.length%4==0 ? imgUrl.length/4 : parseInt(imgUrl.length/4)+1"  :key="index">
                    <div class="list" v-if="imgUrl.length>=value*4">
                        <div v-for="(v,i) in 4"  :key="i">
                            <router-link :to="{path:'/list',query:{ url:url[4*index+i] }}"><singleimg :src="imgUrl[4*index+i]" :tt1="title[4*index+i]" :tt2="nickName[4*index+i]"/></router-link>
                        </div>
                    </div>
                    <div class="list" v-else>
                        <div v-for="(v,i) in imgUrl.length%4"  :key="i">
                            <router-link :to="{path:'/list',query:{ url:url[4*index+i] }}"><singleimg :src="imgUrl[4*index+i]" :tt1="title[4*index+i]" :tt2="nickName[4*index+i]"/></router-link>
                        </div>
                        <div v-for="(v,i) in 4-imgUrl.length%4"  :key="i">
                            <div class="noneimg"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="center">
            没有任何搜索结果
        </div>
    </div>
</template>

<script>
import { search } from "../api/index"
import singleimg from "../components/singleimg"
export default {
    name:"search",
    data(){
        return{
            name:"",
            total:"",
            imgUrl:[],
            total:[],
            nickName:[],
            title:[],
            url:[],
            total:false,
            result:true,
            searchname:""
        }
    },
    methods:{
        tosearch(){
            if(this.name.trim().length>0){
                search(this.name).then((res)=>{
                    let data = res.data
                    if(!data.error){
                        this.total = data.imgUrl.length
                        this.imgUrl = data.imgUrl
                        this.nickName = data.nickName
                        this.title = data.title
                        this.url = data.url
                        this.searchname = this.name
                        this.total = true
                    } 
                }).catch(err=>{
                    this.result = false
                })
            }
                
        },
    },
    components:{
        singleimg
    }
}
</script>
<style scoped>
#app{
    width: 100%
}
.noneimg{
    width: 4.5rem;
    height: 6rem;
}
.searchbtn{
    width: 100%;
    height: 3.125rem;
    display: flex;
    align-items: center;
}
.center{
    width: 100%;
    height: 90vh;
    display: flex;
    justify-content: center;
    align-items: center;
    color: gray;
}
.searchbtn input{
    height: 1.875rem;
    border: none;
    width: 65%;
    margin-left: 15%;
    border-radius: 1.875rem;
    padding-left:5%; 
    padding-right: 5;
    font-size: .875rem;
    background: rgb(240, 240, 240);
}
.ss{
    color: gray;
    font-size: .875rem;
    margin-left: 2.5%
}
.total{
    text-indent: .625rem;
    font-weight: bold;
    margin-top: 20px;
}
.list{
    display: flex;
    margin-top: .625rem;
    justify-content:space-around;
}


</style>

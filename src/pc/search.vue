<template>
    <div id="app">
        <pcheader :search="search"/>
            
            <div v-show="nosearchresult" class="nosearchresult">
                没有找到搜索结果
            </div>
            <div v-if="searchdata.imgUrl && searchdata">
                <div class="searchresult" >
                    “<em>{{ search }}</em>”的搜索结果
                </div>
                <div v-for="(item, index) in (searchdata.imgUrl.length%6==0? parseInt(searchdata.imgUrl.length/6) : parseInt(searchdata.imgUrl.length/6+1))" :key="index">
                    <div v-if="item*6<=searchdata.imgUrl.length" class="imgList">
                        <div  v-for="(v, i) in 6" :key="i">
                            <router-link target="_blank" :to="{path:'/list',query:{url:searchdata.url[index*6+i]}}"><pcimg :src="searchdata.imgUrl[index*6+i]" :nickname="searchdata.nickName[index*6+i]" :cartoon_name="searchdata.title[index*6+i]"/></router-link>
                        </div>
                    </div>
                    <div v-else class="imgList">
                        <div  v-for="(v, i) in searchdata.imgUrl.length%6" :key="i">
                            <router-link target="_blank"  :to="{path:'/list',query:{url:searchdata.url[index*6+i]}}"><pcimg :src="searchdata.imgUrl[index*6+i]" :nickname="searchdata.nickName[index*6+i]" :cartoon_name="searchdata.title[index*6+i]"/></router-link>
                        </div>
                        <div class="noneimg"  v-for="(v, i) in 6-searchdata.imgUrl.length%6" :key="i">

                        </div>
                    </div>
                </div>
            </div>
    </div>
</template>
<style scoped>
.searchresult{
    width: 80%;
    min-width: 1184px;
    margin: 0 10%;
    margin-top: 50px;
    margin-bottom: 30px;
}
.nosearchresult{
    width: 100%;
    display: flex;
    font-size: 20px;
    min-width: 1184px;
    margin-top: 50px;
    justify-content: center;
}
.imgList{
    width: 80%;
    min-width: 1184px;
    margin: 0 10%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
}
.noneimg{
    width: 160px;
}
</style>
<script>
import pcheader from "../components/pcheader"
import pcimg from "../components/pcimg"
import { search } from '../api';
export default {
    data(){
        return{
            search:"",
            searchdata:[],
            nosearchresult:false
        }
    },
    mounted(){
        this.$nextTick(()=>{
            this.search_mh()
        })
        
    },
    methods:{
        search_mh(){
                this.search = this.$route.query.name
                search(this.search).then(res=>{
                this.searchdata = res.data
                this.nosearchresult = false
            }).catch(err=>{
                this.nosearchresult=true
            })
        }
    },
    components:{
        pcheader,pcimg
    },
    watch:{
        "$route.query"(){
            this.searchdata = []
            this.search_mh()
        }
    }
}
</script>
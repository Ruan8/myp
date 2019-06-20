<template>
    <div v-if="rdata && rdata.imgUrl">
         <div class="result">
            <span v-for="(item, index) in rdata.imgUrl.length%6==0? rdata.imgUrl.length/6 : parseInt(rdata.imgUrl.length/6)+1" :key="index">
                <span class="imgList" v-if="item*6<=rdata.imgUrl.length">
                    <div v-for="(v,i) in 6" :key="i">
                        <router-link target="_blank" :to="{ path:'/list',query:{url:rdata.url[index*6+i]} }"><pcimg :src="rdata.imgUrl[index*6+i]" :cartoon_name="rdata.title[index*6+i]" :nickname="rdata.nickName[index*6+i]"/></router-link>
                    </div>
                </span>
                <span v-else class="imgList">
                    <div v-for="(v,i) in rdata.imgUrl.length%6" :key="i">
                        <router-link target="_blank" :to="{ path:'/list',query:{url:rdata.url[index*6+i]} }"><pcimg :src="rdata.imgUrl[index*6+i]" :cartoon_name="rdata.title[index*6+i]" :nickname="rdata.nickName[index*6+i]"/></router-link>
                    </div>
                    <div v-for="(v,i) in 6-rdata.imgUrl.length%6" class="noneimg" :key="i"></div>
                </span>
            </span>
        </div>
        <div class="btng">
            <el-pagination
                v-if="rdata.max_page"
                background
                :current-page="$route.query.page || 1"
                @current-change="size_page"
                layout="prev, pager, next"
                :total="rdata.max_page*10">
            </el-pagination>
        </div>
    </div>
</template>
<style scoped>
.result{
    width: 100%;
    margin-top: 50px;
}
.imgList{
    display: flex;
    justify-content: space-between;
    margin-top: 30px
}

.noneimg{
    height: 212px;
    width: 160px;
}

.btng{
    display: flex;
    width: 100%;
    justify-content: center;
    margin:30px 0;
}
.btng .el-button{
    margin: 0 20px;
}
</style>
<script>
import {fl} from "../api"
import pcimg from '../components/pcimg';
export default {
    data(){
        return {
            page:this.$route.query.page || 1,
            state:this.$route.query.state || 1,
            tc:this.$route.query.tc || 0,
            rdata:[],
        }
    },
    mounted(){
        this.$nextTick(()=>{
            this.getfl()
        })
    },
    deactivated(){
        this.rdata = []
    },
    methods:{
        size_page(e){
            this.$router.replace({query:{page:e,state:this.state,tc:this.tc}})
        },
        getfl(){
            let _this = this
            fl(this.tc,this.state,this.page).then(
                res=>{
                    _this.rdata = res.data
                }
            )
            .catch(err=>{
                this.getfl()
            })
        }
    },
    watch:{
        $route(e){
            this.page = e.query.page
            this.state = e.query.state
            this.tc = e.query.tc
            this.getfl()
            if(Object.keys(e.query).length > 0){ 
                this.$store.flquery = e.query
            }
        },
    },
    components:{
        pcimg
    }
}
</script>

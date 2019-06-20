<template>
    <div id="app" v-if="lb.LBImgUrl && lb">
        <el-carousel   trigger="click" :interval="4000" type="card" :height="imgHeight+'px'">
            <el-carousel-item v-for="(item,index) in lb.LBImgUrl.length" :key="item">
                <router-link target="_blank" :to="{path:'/pic',query:{url:lb.LBUrl[index]}}"><el-image :src="lb.LBImgUrl[index]" ref="imgHeight"></el-image></router-link>
            </el-carousel-item>
        </el-carousel>
        
        <div>
            <div class="hot"> 
                <span class="title" v-pre>
                    每日热推
                </span>
                <div  v-for="(item, index) in (hot.hotImgUrl.length%5==0? hot.hotImgUrl.length/5 :hot.hotImgUrl.length/5+1)" :key="index">
                    <div  class="img" v-if="hot.hotImgUrl.length>=item*5">
                        <div v-for="(v,i) in 5" :key="i">
                            <router-link target="_blank" :to="{path:'/list',query:{url:hot.hotUrl[index*5+i]}}"><pcimg :src="hot.hotImgUrl[index*5+i]" :cartoon_name="hot.hotTitle[index*5+i]" :nickname="hot.hotNickName[index*5+i]"/></router-link>
                        </div>
                    </div>
                    <div class="img" v-else>
                        <div v-for="(v,i) in hot.hotImgUrl.length%5" :key="i">
                            <router-link target="_blank" :to="{path:'/list',query:{url:hot.hotUrl[index*5+i]}}"><pcimg :src="hot.hotImgUrl[index*5+i]" :cartoon_name="hot.hotTitle[index*5+i]" :nickname="hot.hotNickName[index*5+i]"/></router-link>
                        </div>
                        <div class="noneimg" v-for="(v,i) in (5-hot.hotImgUrl.length%5)" :key="i">
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div>
        <div class="new">
            <span class="title" v-pre>
                最新热作
            </span>
            <div v-for="(item, index) in (newarr.newImgUrl.length%6==0? newarr.newImgUrl.length/6 :newarr.newImgUrl.length/6+1)" :key="index">
                    <div class="img" v-if="newarr.newImgUrl.length>=item*6">
                        <div v-for="(v,i) in 6" :key="i">
                            <router-link target="_blank" :to="{path:'/list',query:{url:newarr.newUrl[index*6+i]}}"><pcimg :src="newarr.newImgUrl[index*6+i]" :cartoon_name="newarr.newTitle[index*6+i]" :nickname="newarr.newNickName[index*6+i]"/></router-link>
                        </div>
                    </div>
                    <div class="img" v-else>
                        <div v-for="(v,i) in newarr.newImgUrl.length%6" :key="i">
                            <router-link target="_blank" :to="{path:'/list',query:{url:newarr.newUrl[index*6+i]}}"><pcimg :src="newarr.newImgUrl[index*6+i]" :cartoon_name="newarr.newTitle[index*6+i]" :nickname="newarr.newNickName[index*6+i]"/></router-link>
                        </div>
                        <div class="noneimg" v-for="(v,i) in (6-newarr.newImgUrl.length%6)" :key="i">
                        </div>
                    </div>
                    
            </div>
        </div>
        </div>
    </div>
</template>
<style scoped>
#app{
    width: 100%;
    min-width: 1090px;
    margin: 5px auto;
    height: 100vh;
}
.hot{
    margin: 20px 5%;
}
.new{
    margin: 20px 5%;
}
.noneimg{
    height: 160px;
}
.img{
    display: flex;
    margin-top: 20px;
    justify-content: space-between;
}
.title{
    font-size: 24px;
}
.el-carousel{
    width: 86%;
    margin: 0 7% 0 7%;
}

.el-carousel .el-image{
    display: inline-block;
    height: auto;
    max-width: 100%;
}
</style>
<script>
import {index} from "../api/index"
import pcimg from "../components/pcimg"
export default {
    data(){
        return{
            lb:[],
            hot:[],
            newarr:[],
            loading:true,
            imgHeight: 415
        }
    },
    created(){
        this.$nextTick(()=>{
            this.getform()
        })
    },
    methods:{
        getform(){
            var _this = this
            index().then(res=>{
                var data = res.data
                _this.lb = data.lb
                _this.hot = data.hot
                _this.newarr = data.new
                _this.loading = false
            })
            .catch(err=>{
                this.getform()
            })
        }
    },
    computed:{
       
        
    },
    components:{
        pcimg
    }
}
</script>
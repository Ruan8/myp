<template>
    <div id="app" v-show="showall">
        <div v-if="login">
            <div v-if="star.length==0">
                <span class="span">您的收藏还是空的哦(*^▽^*)</span>
            </div>
            <div v-else>
                <div v-for="(v,i) in (star.length%4==0?star.length/4:parseInt(star.length/4)+1)" :key="i">
                    <div v-if="star.length>=v*4" class="flex">
                        <div v-for=" (item,index) in 4 " :key="index">
                            <router-link :to="{ path:'/list',query:{url:star[i*4+index].nav_url}}"><singleimg   :src="star[i*4+index].pic_url" :tt1="star[i*4+index].name" :tt2="star[i*4+index].nickname"></singleimg></router-link>
                        </div>
                    </div>
                    <div v-else class="flex">
                        <div v-for=" (item,index) in star.length%4 "  :key="index">
                            <router-link :to="{ path:'/list',query:{url:star[i*4+index].nav_url}}"><singleimg   :src="star[i*4+index].pic_url" :tt1="star[i*4+index].name" :tt2="star[i*4+index].nickname"></singleimg></router-link>
                        </div>   
                        <div v-for=" (item,index) in 4-star.length%4 "  :key="index">
                            <div class="noneimg"></div>
                        </div>                 
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <span class="span" @click="tologin">去登陆</span>
        </div>
    </div>
</template>

<script>
import { star } from "../api/index"
import singleimg from "../components/singleimg"
export default {
    props:["isu"],
    data(){
        return{
            login:false,
            star:[],
            showall:false
        }
    },
    created(){
        setTimeout(() => {
            this.showall = true
        }, 300);
        this.login = this.$cookies.isKey("username")?true:false
        this.getstar()
    },
    methods:{
        tologin(){
            this.$router.push("/view/three")
        },
        getstar(){
            const that =  this
            var username = this.$cookies.get("username")
            if(username){
                star(username).then(res=>{
                    that.star = res.data
                })
            }
        }
    },
    watch:{
        $route(){
            this.getstar()
        },
        isu(){
        this.login = this.$cookies.isKey("username")?true:false
        this.getstar()
        }
    },
    components:{
        singleimg
    },
    
}
</script>
<style scoped>

#app{
    margin: .3125rem;
}
.span{
    display: flex;
    height: 90vh;
    justify-content: center;
    align-items: center;
    font-size:.875rem; 
    color: blue;
}
.flex{
    display: flex;
    justify-content: space-around;
    margin-top: .625rem;
}
.noneimg{
    width: 4.5rem;
    height: 6rem;
}
</style>

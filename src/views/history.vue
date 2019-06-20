<template>
    <div id="app" v-show="showall">
            <div v-if="isshow">
                <div v-for="(v,i) in (history.length%4==0?history.length/4:parseInt(history.length/4)+1)" :key="i">
                    <div v-if="history.length>=v*4" class="flex">
                        <div v-for=" (item,index) in 4 " :key="index">
                            <router-link :to="{ path:'/list',query:{url:history[i*4+index].nav_url}}" ><singleimg   :src="history[i*4+index].pic_url" :tt1="history[i*4+index].name" :tt2="history[i*4+index].nickname"></singleimg></router-link>
                        </div>
                    </div>
                    <div v-else class="flex">
                        <div v-for=" (item,index) in history.length%4" :key="index">
                            <router-link :to="{ path:'/list',query:{url:history[i*4+index].nav_url}}"><singleimg :src="history[i*4+index].pic_url" :tt1="history[i*4+index].name" :tt2="history[i*4+index].nickname"></singleimg></router-link>
                        </div>   
                        <div v-for="(item,index) in 4-history.length%4" :key="index">
                            <div class="noneimg">
                            </div>
                        </div>        
                    </div>
                </div>
                <mt-button type="primary" size="small" @click="clear">清除记录</mt-button>
            </div>
            <div v-else>
                <span class="span">你还没有浏览记录(*^▽^*)</span>
            </div>
    </div>
</template>
<script>
import {search_cartoon} from "../api/index"
import singleimg from "../components/singleimg"
export default {
    data(){
        return{
            history:[],
            showall:false,
            isshow:false
        }
    },
    created(){
        setTimeout(()=>{
            this.showall = true
        },300)
        var history = localStorage.history.split(",").slice(0,-1)
        var historyArr = []
        var history = Object.values(history)
        for(let i = 0;i<history.length;i++){
            search_cartoon(history[i]).then(res=>{
                var result = res.data.result
                result = result?result:false
                result ? historyArr.splice(i,0,result) : ""
                if(history[i] == history[history.length-1]){
                    this.history = historyArr
                    this.isshow = true
                }
            })
        }
    },
    methods:{
        clear(){
            localStorage.setItem("history",[])
            this.history = []
            this.isshow = false
        }
    },
    components:{
        singleimg
    }
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
.mint-button{
    font-size: .75rem;
    position: fixed;
    bottom: 0rem;
    right: 0rem;
}
</style>

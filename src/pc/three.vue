<template>
    <div id="app" v-if="isshow">
        <span id="nohistory" v-show="history.length==0">
            暂无浏览记录
        </span>
        <span v-show="history.length>0">
            <el-button  type="primary" size="mini" @click.native="delhistory">清除所有</el-button>
            <span  v-for="(item, index) in history.length%6==0? history.length/6 : parseInt(history.length/6)+1" :key="index">
                <div class="list" v-if="item*6<=history.length">
                    <div v-for="(v,i) in 6" :key="i">
                        <router-link target="_blank" :to="{path:'/list',query:{url:history[index*6+i].nav_url}}"><pcimg  :src="history[index*6+i].pic_url" :cartoon_name="history[index*6+i].name" :nickname="history[index*6+i].nickname"/></router-link>
                    </div>
                </div>
                <div class="list" v-else>
                    <div  v-for="(v,i) in history.length%6" :key="i">
                        <router-link target="_blank" :to="{path:'/list',query:{url:history[index*6+i].nav_url}}"><pcimg  :src="history[index*6+i].pic_url" :cartoon_name="history[index*6+i].name" :nickname="history[index*6+i].nickname"/></router-link>
                    </div>
                    <div class="noneimg" v-for="(v,i) in 6-history.length%6" :key="i"></div>
                </div>
            </span>
        </span>
        
    </div>
</template>
<style scoped>
#app{
    height: 94vh;
    width: 90%;
    margin: 0 5%;
}
.noneimg{
    width: 160px;
}
.list{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin:10px 0 20px 0;
}
.el-button{
    margin-top: 10px;
}
#nohistory{
    color: black;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    
}
</style>
<script>
import pcimg from '../components/pcimg';
import {search_cartoon} from "../api"
export default {
    data(){
        return{
            history:[],
            isshow:false
        }
    },
    activated(){
        var history = localStorage.history.split(",").slice(0,-1)
        var historyArr = []
        var history = Object.values(history)
        if(history.length>0){
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
                .catch()
            }
        }else{
            this.isshow = true
        }
        
        
    },
    methods:{
        delhistory(){
            localStorage.setItem("history",[])
            this.history = []
        }
        
    },
    components:{
        pcimg
    }
}
</script>
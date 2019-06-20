<template>
    <div id="app" v-if="tag">
        <div class="header">
            <div class="left">
                题材
            </div>
            <div class="right">
                <span v-for="(item, index) in tag.length%11==0? tag.length/11 : parseInt(tag.length/11)+1 " :key="index">
                    <span v-if="tag.length>=item*11" class="list">
                        <span v-for="(v,i) in 11" :key="i" :class="tc!=tag[index*11+i].id||'select'" @click="tc=tag[index*11+i].id">
                            {{ tag[index*11+i].title }}
                        </span>
                    </span>
                    <span v-else class="list">
                        <span v-for="(v,i) in tag.length%11" :class="tc!=tag[index*11+i].id||'select'" :key="i" @click="tc=tag[index*11+i].id">
                            {{ tag[index*11+i].title }}
                        </span>
                        <span v-for="(v,i) in 11-tag.length%11" :key="i"></span>
                    </span>
                </span>
            </div>
        </div>
        <div class="header2">
            <div class="left">
                类别
            </div>
            <div class="right">
                <span v-for="(item, index) in lb" :key="index" :class="state!=item.id||'select'" @click="state=item.id" >
                    {{ item.title }}
                </span>
            </div>
        </div>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>
<style scoped>
#app{
    width: 80%;
    margin: 30px 10%;
    min-width: 1090px;
    height: auto;
    color: rgb(50, 50, 50);
}
.header{
    height: 100px;
    width: 80%;
    display: flex;
    border-bottom: 1px solid rgb(200, 200, 200);
}
.header .left{
    width: 10%;
    height: 80px;
    display: flex;
    justify-content: right;
    padding-top: 23px;
    font-size: 12px;
    padding-right: 30px;
    color: gray;
    border-right: 1px solid rgb(200, 200, 200);
    /* background: red; */
}
.list{
    display: flex;
    margin-top: 20px;
    margin-bottom: 20px;
    width: 100%;
    min-width: 600px;
}
.list span{
    width: 40px;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin:  0 10px;
    height: 20px;
    padding: 3px 3px;
}
.header2{
    height: 40px;
    width: 80%;
    /* background: red; */
    font-size: 12px;
    display: flex;
}
.header2 .left{
    width: 10%;
    height: 100%;
    display: flex;
    justify-content: right;
    align-items: center;
    font-size: 12px;
    padding-right: 30px;
    color: gray;
    border-right: 1px solid rgb(200, 200, 200);
    /* background: blue; */
    
}
.header2 .right{
    display: flex;
    min-width: 600px;
    height: 100%;
    display: flex;
    align-items: center;
}
.header2 .right span{
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin:  0 10px;
    padding: 3px 3px;
    height: 20px;
    
}
.select{
    border-radius: 3px;
    background: #E6A23C;
}
</style>
<script>
import {tag} from "../api"
import pcimg from '../components/pcimg';
export default {
    data(){
        return {
            tag:[],
            fldata:[],
            lb:[
                {id:1,title:"全部"},
                {id:2,title:"连载中"},
                {id:3,title:"已完结"},
            ],
            state:this.$route.query.state || 1,
            tc:this.$route.query.tc || 0
        }
    },
    created(){
        this.$nextTick(()=>{
            this.gettag()
        })
    },
    methods:{
        gettag(){
            tag().then(res=>{
                this.tag = res.data.tag
            })
            .catch(err=>{
                this.gettag()
            })
        }
    },
    watch:{
        state(e){
            this.$router.replace({query:{page:1,state:e,tc:this.tc}})
        },
        tc(e){
            this.$router.replace({query:{page:1,state:this.state,tc:e}})
        }
    },
    components:{
        pcimg
    }
}
</script>

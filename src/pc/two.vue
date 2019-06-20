<template>
    <div id="app">
            <span class="tologin center" v-if="islogin">
                <router-link to="/login">
                    请先登录
                </router-link>
            </span>
            <div v-else>
                <span v-show="listdata.length>0">
                    <span  v-for="(item, index) in listdata.length%6==0? listdata.length/6 : parseInt(listdata.length/6)+1" :key="index">
                        <div class="list" v-if="item*6<=listdata.length">
                            <div class="a" v-for="(v,i) in 6" :key="i">
                                <router-link target="_blank" :to="{path:'/list',query:{url:listdata[index*6+i].nav_url}}">
                                    <pcimg  :src="listdata[index*6+i].pic_url" :cartoon_name="listdata[index*6+i].name" :nickname="listdata[index*6+i].nickname" class="img"/>
                                    <el-button circle icon="el-icon-star-on" @click.prevent="star(listdata[index*6+i].name)" type="warning" size="mini"></el-button>

                                </router-link>
                                
                            </div>
                        </div>
                        <div class="list" v-else>
                            <div class="a" v-for="(v,i) in listdata.length%6" :key="i">
                                <router-link target="_blank" :to="{path:'/list',query:{url:listdata[index*6+i].nav_url}}">
                                    <pcimg  :src="listdata[index*6+i].pic_url" :cartoon_name="listdata[index*6+i].name" :nickname="listdata[index*6+i].nickname"/>
                                    <el-button title="取消收藏" circle icon="el-icon-star-on" @click.prevent="star(listdata[index*6+i].name)" type="warning" size="mini"></el-button>
                                </router-link>

                            </div>
                            <div class="noneimg" v-for="(v,i) in 6-listdata.length%6" :key="i"></div>
                        </div>
                    </span>
                </span>
                <span class="span center" v-show="isshow && listdata.length==0">
                    您的收藏还是空的哦(*^▽^*)
                </span>
            </div>
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
#nohistory{
    color: black;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    
}
.tologin{
    height: 100%;
}
.a{
    position: relative;
}
.el-button{
    position: absolute;
    bottom: 60px;
    right: 10px;
    opacity: 0;
}
.a:hover .el-button{
    opacity: 1;
}
.span{
    width: 100%;
    height: 100vh;
}
</style>
<script>
import pcimg from "../components/pcimg"
import {star,del_star} from '../api'
export default {
    data(){
        return{
            islogin:this.$cookies.get("username")==null,
            username:this.$cookies.get("username"),
            listdata:[],
            isshow:false
        }
    },
    activated(){
        this.get_star()
    },
    destroyed(){

    },
    methods:{
        get_star(){
            var username = this.$cookies.get("username")
            star(username).then(res=>{
                var data = res.data
                this.listdata = data
                if(this.listdata.length==0){
                    this.isshow = true
                }
            })
            .catch(()=>{
                this.get_star()
            })
        },
        star(name){
            del_star(this.$cookies.get("username"),name).then(res=>{
                var result = res.data.result
                
                if(result==1){
                    this.listdata.forEach((value,key)=>{
                        if(value.name==name){
                            this.listdata.splice(key,1)
                        }
                    })
                    this.$notify({
                        message: name+'取消收藏成功',
                        type: 'success',
                        duration:2000
                    });
                }else{
                    this.$notify({
                        message: name+'取消收藏失败',
                        type: 'error',
                        duration:2000
                    });
                }

            })
            .catch(()=>{
                this.$notify({
                        message: "请检查网络！",
                        type: 'error'
                    });
            })
        }
    },
    watch:{
    },
    components:{
        pcimg
    }
}
</script>
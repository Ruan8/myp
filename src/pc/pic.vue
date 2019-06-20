<template>
    <div id="app" v-if="isshow">
        <pcheader />
        <div class="container">
            <div class="header">
                <el-button @click="goBack" size="mini" round icon="el-icon-back">上一页</el-button>
                <el-button-group>
                    <el-button size="mini" type="primary" icon="el-icon-star-off" v-show="!isstar" @click="star"></el-button>
                    <el-button size="mini" type="primary" icon="el-icon-star-on" v-show="isstar" @click="star"></el-button>
                    <el-button size="mini" type="primary" icon="el-icon-s-data" @mouseleave.native="listleave" @mouseenter.native="listenter"></el-button>
                </el-button-group>
                <transition name="el-fade-in-linear">
                    <div   class="showmenu" v-show="listshow" @mouseleave="listleave" @mouseenter="listenter">
                        <div v-if ="listdata && listdata.listUrl">
                            <div class="menulist center" v-for="(item, index) in listdata.listTitle" :key="index">
                                <router-link :to="{query:{url:listdata.listUrl[index]}}"><span :style="url==listdata.listUrl[index] ? 'color:black' : (listdata.listUrl[index].includes('void(0)')? 'color:#E6A23C':'color:#409EFF')">{{ listdata.listTitle[index] }}</span><i v-show="listdata.listUrl[index].includes('void(0)')" class="el-icon-lock yellow"></i></router-link>
                            </div>
                        </div>
                        <div v-else class="loadingcenter center">
                            <i class="el-icon-loading"></i>
                        </div>
                    </div>
                </transition>
            </div>
            <div class="imglist">
                    <el-button-group>
                        <el-button type="text" :disabled="this.picdata.up_url.includes('void')" @click.native="lastpage">上一话</el-button>
                        <el-button type="text" :disabled="this.picdata.next_url.includes('void')" @click.native="nextpage">下一话</el-button>
                    </el-button-group>
                <el-image v-lazy v-for="(item, index) in picdata.img_url" :key="index" :src="item">
                    <div slot="placeholder" class="loading">
                        <i class="el-icon-loading"></i>
                    </div>
                </el-image>
                    <el-button-group>
                        <el-button type="text" :disabled="this.picdata.up_url.includes('void')" @click.native="lastpage">上一话</el-button>
                        <el-button type="text" :disabled="this.picdata.next_url.includes('void')" @click.native="nextpage">下一话</el-button>
                    </el-button-group>
            </div>
        </div>
        <transition name="el-fade-in-linear">
            <div class="totop center" v-show="topshow" @click="totop">
                <i class="el-icon-caret-top"></i>
            </div>
        </transition>
    </div>
    <div v-else id="mask" v-loading="true"></div>
</template>
<style scoped>
/* #app{
    background: rgb(50, 50, 50);
} */
#mask{  
    height: 94vh;
    width: 100%;
}
.imglist{
    display: flex;
    flex-direction: column;
    width: 45%;
    height: auto;
    margin: 0 auto;
}
.loading{
    width: 100%;
    height: 400px;
    background: lightgray;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
}
.header{
    
    position: relative;
    height: 40px;
    display: flex;
    align-items: center;
    width: 90%;
    padding: 0 5%;
    font-size: 14px;
    border-radius: 10px 10px 0 0;
    color: black;
    justify-content: space-between;
}
.showmenu{
    position: absolute;
    width: 230px;
    height: 200px;
    font-size: 10px;
    color: gray;
    top: 40px;
    right: 5%;
    box-shadow: 0 0 6px rgba(0,0,0,.12);
    overflow-x: hidden;
    overflow-y: scroll;
}
.menulist{
    border-bottom:1px solid rgb(245, 245, 245);
    display: flex;
    line-height: 25px;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    justify-content: center;
}
.container{
    width: 80%;
    margin: 0 10% 10px 10%;
    border: 1px solid gray;
    border-radius: 10px;
    margin-top: 40px;
    min-width: 1184px;
}
.el-button-group{
    display: flex;
    align-content: center;
    justify-content: space-around;
    margin:20px 0;
}
.totop{
    z-index: 999;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    position: fixed;
    bottom: 60px;
    right: 40px;
    box-shadow: 0 0 6px rgba(0,0,0,.12);
}
.totop:hover{
    background: rgba(134, 134, 241, 0.5);
    transition: all 1s;
}
.loadingcenter{
    font-size: 30px;
    position: absolute;
    top: 45%;
    right: 45%;
}
.yellow{
    color: #E6A23C;
    margin-left: 5px;
}
</style>
<script>
import { getpic,list,search_cartoon,star,add_star,del_star } from "../api/index"
import { Loading } from 'element-ui';
import pcheader from "../components/pcheader"
export default {
    data(){
        return{
            picdata:[],
            next:false,
            up:false,
            url:"",
            isheight:"",
            topshow:false,
            isstar:false,
            listshow:false,
            timeout:null,
            listdata:[],
            loading:true,
            loadingInstance:null,
            isshow:false
        }
    },
    created(){
        // this.loadingInstance = Loading.service({ fullscreen: true })
        this.$nextTick(()=>{
            this.pic()
        })
        window.addEventListener('scroll',this.Scroll)
    },
    methods:{
        listenter(){
            clearTimeout(this.timeout)
            this.listshow = true
        },
        listleave(){
            clearTimeout(this.timeout)
            this.timeout = setTimeout(() => {
                this.listshow = false
            }, 2000);
        },
        Scroll(e){
            this.isheight = e.pageY || document.body.scrollTop
            this.topshow = this.isheight>=2000
        },
         pic(){
            let url = this.$route.query.url
            this.url = url
            var _this = this
            getpic(url).then(res=>{
                _this.picdata = res.data
                this.history(res.data.cartoon_name)
                
                // this.loadingInstance.close()
                search_cartoon(res.data.cartoon_name).then(r=>{ 
                    list(r.data.result.nav_url).then(response=>{
                        _this.listdata = response.data
                        _this.is_star()
                        
                    })
                    .catch(()=>{
                    })
                })
                .catch(()=>{
                    })
            })
            .catch(()=>{
                    })
        },
        goBack(){
            this.$router.go(-1)
        },
        totop(){
            let i = 100
            setTimeout(() => {
                this.isheight-=i
                if(this.isheight>=i){
                    window.scrollTo(0,this.isheight)
                    this.totop()
                }else if(this.isheight<i && this.isheight>0){
                    window.scrollTo(0,0)
                }
            }, 1);
        },
        lastpage(){
            this.$router.push({query:{url:this.picdata.up_url}})
        },
        nextpage(){
            this.$router.push({query:{url:this.picdata.next_url}})
        },
        history(cartoon_name){
            var history = localStorage.getItem("history")
            var historyArr = history.split(",")
            if(historyArr.includes(cartoon_name)){
                var index = historyArr.indexOf(cartoon_name)
                historyArr.splice(index,1)
                historyArr.unshift(cartoon_name)
            }else{
                historyArr.unshift(cartoon_name)
            }
            localStorage.setItem("history",historyArr)
        },
        is_star(){
            let _this = this
            var username = _this.$cookies.get("username")
            var cartoon_name = _this.listdata.title
            if(username==null){
                //未登录

            }else{
                //已登录
                star(username).then(res=>{
                    var data = res.data
                    for(var i of data){
                        if(i.name==cartoon_name){
                            _this.isstar = true
                            break
                        }
                    }
                })
                .catch(()=>{
                    _this.is_star()
                })

            }
            this.isshow=true
        
        },
        star(){
            var username = this.$cookies.get("username")
            var cartoon_name = this.listdata.title
            if(username==null){
                //未登录
                this.$confirm('您还未登录，是否跳转到登录页', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
                })
                .then(res=>{
                    this.$router.push("/login")
                })
            }else{
                //已登录
                if(this.isstar){
                    //已收藏
                    del_star(username,cartoon_name).then(res=>{
                        var data = res.data
                        if(data.result==1){
                            //取消收藏成功
                            this.$notify({title: '取消收藏成功',type: 'success',duration:2000});
                            this.isstar = false
                        }else{
                            //取消收藏失败
                            this.$notify({title: '取消收藏失败',type: 'error',duration:2000
                            });

                        }
                    })
                }else{
                    //未收藏
                    add_star(username,cartoon_name).then(res=>{
                        var data = res.data
                        if(data.result==1){
                            this.$notify({title: '收藏成功',type: 'success',duration:2000});
                            this.isstar = true
                        }else{
                            //收藏失败
                            this.$notify({title: '收藏失败',type: 'error',duration:2000});
                        }
                    })
                }
            }
        }
    },
    watch:{
        $route(){
            this.pic()
        }
    },
    components:{
        pcheader
    }
}
</script>
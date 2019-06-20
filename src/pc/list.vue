<template>
    <div id="app"  >
        <div v-loading="!(listdata && listdata.imgurl)" v-if="!(listdata && listdata.imgurl)" class="loading">
        </div>
        <div v-if="listdata && listdata.imgurl">
            <pcheader />
            <div class="list" >
                <div class="header">
                    <div class="left">
                        <el-image :src="listdata.imgurl" lazy=true>
                            <div class="imgerr center" slot="placeholder">
                                <i class="el-icon-loading"></i>
                            </div>
                            <div slot="error" class="imgerr center">
                                <i class="el-icon-picture-outline"></i>
                            </div>
                        </el-image>
                    </div>
                    <div class="right">
                        <span>{{ listdata.title }}</span>
                        <span>{{ listdata.nickname }}</span>
                        <span class="bottom_line">漫画简介</span>
                        <span class="profile" v-if="listdata.profile.length>90" :style="'height:'+profileheight">{{ listdata.profile }}</span>
                        <span v-else>
                            {{ listdata.profile }}
                        </span>
                        <span class="seeall" v-html="allflag? allzk : allsq" @click="allfun" v-show="listdata.profile.length>90"></span>
                        <div class="btng">
                            <el-button type="primary" size="mini" @click="seeone">查看第一话</el-button>
                            <el-button type="primary" size="mini" @click="star">{{isstar?"取消收藏":"收藏"}}</el-button>
                        </div>
                    </div>
                </div>
                <div class="footer">
                    <div class="container" v-for="(item, index) in listdata.listTitle" :key="index">
                        <div @click="topic(listdata.listUrl[index])">{{ listdata.listTitle[index] }}<i v-show="listdata.listUrl[index].includes('void(0)')" class="el-icon-lock yellow"></i></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.loading{
    height: 100vh;
}
.list{
    width: 74%;
    height: auto;
    min-width: 1120px;
    margin: 0 10%;
    padding: 0 3%;
    border-style: solid;
    border-color: lightgray;
    border-width: 1px;
    border-radius: 10px;
    margin-top: 20px;
    margin-bottom: 10px;
}
.header{
    width: 90%;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.left .el-image{
    height: 213px;
    width: 338px;
    border-radius: 10px;
}
.right{
    display: flex;
    /* background: red; */
    height: 208px;
    margin-left: 40px;
    width: 100vh;
    flex-direction: column;
    position: relative;
}
span{
    font-size: 14px;
    color: gray;
}
.right span:first-child{
    font-size: 18px;
    font-weight: bold;
    color: black;
}
.bottom_line{
    width: 60px;
    text-align: center;
    display: inline-block;
    border-bottom: 2px solid #f5ce03;
    margin-top: 15px;
}
.imgerr{
    height: 213px;
    width: 338px;
    border-radius: 10px;
    background: lightgray;
    color: gray;
    font-size: 40px;
}
.container{
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    border-top: 1px solid lightgray;
}
.yellow{
    color: #E6A23C;
    margin-left: 30px;
}
.profile{
    font-size: 14px;
    line-height: 22px;
    text-align: left;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
.seeall{
    color: rgb(200, 200, 200);
    text-align: right;
}
a{
    color: black;
}
</style>
<script>
import pcheader from "../components/pcheader"
import {list,star,add_star,del_star} from "../api"
export default {
    data(){
        return{
            listdata:[],
            profileheight:"44px",
            allzk:`展开<i class="el-icon-arrow-down"></i>`,
            allsq:`收起<i class="el-icon-arrow-up"></i>`,
            allflag:true,
            isstar:false
        }
    },
    created(){
      this.$nextTick(()=>{
          this.getlist()
          
      })
    },
    methods:{
        getlist(){
            let url = this.$route.query.url
            var _this = this
            list(url).then(res=>{
                _this.listdata = res.data
                this.is_star()
            })
            .catch(err=>{
                this.getlist()
            })
        },
        topic(url){
            if(!url.includes("void(0)")){
                this.$router.push({path:"/pic",query:{url}})
            }
        },
        seeone(){
            let onepic = this.listdata.listUrl.slice(-1)
            this.topic(onepic[0])
        },
        allfun(){
            this.allflag ? this.profileheight="auto" : this.profileheight = "44px"
            this.allflag = !this.allflag
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
    components:{
        pcheader
    }
}
</script>
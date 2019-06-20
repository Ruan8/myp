<template>
    <div id="app" v-if="mask">
        <com-alert v-show="isshow" :isshow="isshow" :text="text"/>
        <div class="header">
            <img v-lazy="imgurl" alt="img">
            <div class="tt">
                <span class="tt1" v-text="title"></span>
                <span class="tt2" v-text="nickname"></span> 
            <div class="btngroup">
               <router-link :to="{ path:'/pic',query:{url:listUrl[listUrl.length-1]}}"><button class="btn1">查看第一话</button></router-link>
               <button class="btn2" @click="addstar">{{ starflag?"取消收藏":"收藏" }}</button>
            </div>
            </div>
        </div>
        <div class="content">
            <div v-for="(v,i) in listTitle" :key="i">
                <div class="list" @click="listitem(listUrl[i])">{{ v }}<img v-if="listUrl[i].indexOf('javascript:void(0)')!=-1" class="suo" src="../assets/suo.png"/></div>
            </div>
        </div>
    </div>
</template>

<script>
import {list, star,add_star,del_star} from "../api/index"
import {Indicator,MessageBox,Popup} from 'mint-ui'
import comAlert from "../components/alert"
export default {
    name:"list",
    data(){
        return {
            listTitle:[],
            listUrl:[],
            listcontent:"",
            title:"",
            imgurl:"",
            nickname:"",
            mask:false,
            starflag:false,
            isshow:false,
            text:""
        }
    },
    beforeCreate(){
        Indicator.open({
        text: 'Loading...',
        spinnerType: 'double-bounce'
        });
    },
    created(){
        var url= this.$route.query.url
        this.list(url)
    },
    methods:{
        list(url){
            var that = this
            list(url).then((res)=>{
                if(!res.data.error){
                    let data = res.data
                    that.listTitle = data.listTitle
                    that.listUrl = data.listUrl
                    that.listcontent = data.listcontent
                    that.title = data.title
                    that.nickname = data.nickname
                    that.imgurl = data.imgurl
                    that.mask = true
                    Indicator.close()
                    if(that.$cookies.get("username")){
                    star(that.$cookies.get("username")).then(res=>{
                        for(var i of res.data){
                            if(i.name==that.title){
                                that.starflag = true
                        }
                    }   
            })
            }
                }else{
                    MessageBox.alert('出错了！').then(action => {  
                        this.mask = true
                        this.$router.go(-1)
                    });
                }
            })
        },
        listitem(url){
            if(url.indexOf("javascript:void(0)")==-1){
                this.$router.push({
                    path:"/pic",
                    query:{
                        url
                    }
                })
            }
        },
        addstar(){
            if(this.$cookies.get("username")){
                //已登陆
                if(this.starflag){
                    console.log(this.starflag)
                    //取消收藏
                    del_star(this.$cookies.get("username"),this.title).then(res=>{
                        if(res.data){
                            this.starflag = false
                            this.isshow = true
                            this.text = "取消成功"
                        }else{
                            Toast("出错了")
                        }
                    })
                    }else{
                        //收藏
                    add_star(this.$cookies.get("username"),this.title).then(res=>{
                        if(res.data){
                            this.starflag = true
                            this.isshow = true
                            this.text = "收藏成功"
                        }else{
                            Toast("出错了")
                        }
                    })
                }
            }else{
                //未登陆
                MessageBox.alert('请先去登陆').then(action => {  
                        this.mask = true
                        this.$router.push("/view/three")
                });
            }
            
        }
    },
    watch:{
        $route(){
            var that = this
            star(this.$cookies.get("username")).then(res=>{
                for(var i of res.data){
                    if(i.name==that.title){
                        that.starflag = true
                        break
                    }else{
                        that.starflag = false
                    }
                }   
            })
        }
    },
    components:{
        comAlert
    }
    
}
</script>
<style scoped>
/* 338 213 */
#app{
    width: 100%;
}
.btngroup{
    display: flex;
}
.btngroup button{
    width: 4.375rem;
    font-size: .625rem;
    height: 1.5625rem;
    line-height: 1.5625rem;
    border-radius:.625rem;
    color: gray;
}
.header{
    height: 4.4375rem;
    display: flex;
    border-left:rgb(230, 230, 230) solid .0625rem;
    border-right:rgb(230, 230, 230) solid .0625rem;
    padding: 1.875rem 1.25rem;
    margin-left: .625rem;
    margin-right: .625rem;
}
.header img{
    width: 7rem;
    border-radius: .625rem;
}
.content{
    margin-left: 1.25rem;
    margin-right: 1.25rem;
}

.list{
    text-align: center;
    border-top: .0625rem solid rgb(230, 230, 230);
    padding: .625rem 0;
    font-size: .875rem;
    color: gray;
}
.tt{
    font-size: .8125rem;
    display: flex;
  	flex-direction: column;
    line-height: 1.25rem;
    margin-left:.625rem; 
    justify-content: space-around;
}
.tt2{
    color: lightgray;
}
.btn1{
    background: yellow;
    border: none;
}
.btn2{
    background: white;
    border:solid gray .0625rem;
    margin-left: .625rem;
}
.suo{
    width: .625rem;
    height: .625rem;
    margin-left: 1.25rem;
}

</style>
